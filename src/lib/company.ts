/**
 * Single source of truth for public studio identity.
 *
 * Optional fields (phone, postalCode, etc.) stay unset when unknown.
 * Helpers and UI only render them when present — never invent placeholders.
 */

export type CompanyLocation = {
  city: string;
  country: string;
  countryCode: string;
  streetAddress?: string;
  postalCode?: string;
};

export type CompanyContact = {
  email: string;
  phone?: string;
};

export type CompanySocialLink = {
  label: string;
  href: string;
  /**
   * When true, included in Organization JSON-LD `sameAs`.
   * Prefer org-level profiles only; personal founder pages should be false.
   */
  sameAs?: boolean;
};

export type CompanyUrls = {
  website: string;
  canonicalHost: string;
  github: string;
  twitter: string;
};

export type CompanyInfo = {
  brandName: string;
  /** Registered legal entity name — only set when known */
  legalName?: string;
  tagline: string;
  /** MST / tax ID — only set when known */
  taxId?: string;
  foundedYear: number;
  location: CompanyLocation;
  contact: CompanyContact;
  /** Display handle without @ (e.g. "QucKiet") — keep in sync with urls.twitter */
  twitterHandle: string;
  urls: CompanyUrls;
  social: readonly CompanySocialLink[];
};

/** Canonical public URLs — single source for github/twitter hrefs. */
const URLS: CompanyUrls = {
  website: "https://www.vinpixstudio.com",
  canonicalHost: "https://www.vinpixstudio.com",
  github: "https://github.com/vinpix",
  twitter: "https://x.com/QucKiet",
};

const FOUNDER_LINKEDIN = "https://www.linkedin.com/in/anhluom/";

/**
 * Footer / human-facing social list.
 * GitHub + Twitter hrefs derive from URLS so they cannot drift.
 * Founder LinkedIn is for display only (sameAs: false) until an org page exists.
 */
const SOCIAL: readonly CompanySocialLink[] = [
  {
    label: "GitHub",
    href: URLS.github,
    sameAs: true,
  },
  {
    label: "Twitter / X",
    href: URLS.twitter,
    sameAs: true,
  },
  {
    label: "LinkedIn (Founder)",
    href: FOUNDER_LINKEDIN,
    sameAs: false,
  },
];

export const company: CompanyInfo = {
  brandName: "Vinpix Studio",
  /** Registered entity (GPKD / tax registration) */
  legalName: "CÔNG TY TNHH VINPIX",
  tagline:
    "Independent software studio for products, games, and AI-powered workflows.",
  /** Mã số thuế */
  taxId: "0319239233",
  foundedYear: 2021,
  location: {
    city: "Ho Chi Minh City",
    country: "Vietnam",
    countryCode: "VN",
    /** Trụ sở chính — Số 13, Đường CN6, Phường Tây Thạnh, TP. HCM */
    streetAddress: "Số 13, Đường CN6, Phường Tây Thạnh",
    postalCode: undefined,
  },
  contact: {
    email: "kietle@vinpixstudio.com",
    phone: undefined,
  },
  twitterHandle: "QucKiet",
  urls: URLS,
  social: SOCIAL,
};

/** True when a string is present and non-empty after trim. */
export function hasValue(
  value: string | undefined | null
): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

/** City + country line (always available). */
export function formatLocationLine(
  location: CompanyLocation = company.location
): string {
  return `${location.city}, ${location.country}`;
}

/**
 * Full postal-style address lines for footer/schema.
 * Only includes street/postal when set — never invents them.
 * Order: street → city, country [postal]
 */
export function formatAddressLines(
  location: CompanyLocation = company.location
): string[] {
  const lines: string[] = [];
  if (hasValue(location.streetAddress)) {
    lines.push(location.streetAddress.trim());
  }
  const cityCountry = [location.city, location.country]
    .filter(Boolean)
    .join(", ");
  if (cityCountry) {
    lines.push(
      hasValue(location.postalCode)
        ? `${cityCountry} ${location.postalCode.trim()}`
        : cityCountry
    );
  }
  return lines;
}

/** Single-line address for compact display / schema. */
export function formatAddressSingleLine(
  location: CompanyLocation = company.location
): string {
  return formatAddressLines(location).join(", ");
}

/** Display handle with leading @ for UI. */
export function formatTwitterHandle(
  handle: string = company.twitterHandle
): string {
  const trimmed = handle.trim().replace(/^@+/, "");
  return trimmed ? `@${trimmed}` : "";
}

/**
 * sameAs URLs for Organization JSON-LD.
 * Only entries with sameAs === true (explicit) are included.
 */
export function getSameAsUrls(
  social: readonly CompanySocialLink[] = company.social
): string[] {
  return social
    .filter((s) => s.sameAs === true && hasValue(s.href))
    .map((s) => s.href);
}

/**
 * Organization / ProfessionalService JSON-LD built only from known fields.
 */
export function buildOrganizationJsonLd() {
  const address: Record<string, string> = {
    "@type": "PostalAddress",
    addressLocality: company.location.city,
    addressCountry: company.location.countryCode,
  };
  if (hasValue(company.location.streetAddress)) {
    address.streetAddress = company.location.streetAddress.trim();
  }
  if (hasValue(company.location.postalCode)) {
    address.postalCode = company.location.postalCode.trim();
  }

  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: company.brandName,
    url: company.urls.canonicalHost,
    email: company.contact.email,
    description: company.tagline,
    foundingDate: String(company.foundedYear),
    address,
    sameAs: getSameAsUrls(),
  };

  if (hasValue(company.legalName)) {
    data.legalName = company.legalName.trim();
  }
  if (hasValue(company.taxId)) {
    data.taxID = company.taxId.trim();
  }
  if (hasValue(company.contact.phone)) {
    data.telephone = company.contact.phone.trim();
  }

  return data;
}

/**
 * Safe JSON-LD string for <script type="application/ld+json"> injection.
 * Escapes `<` so a future CMS-fed field cannot break out of the script tag.
 */
export function serializeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
