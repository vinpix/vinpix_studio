import Footer from "@/components/Footer";
import { company, formatTwitterHandle } from "@/lib/company";

export default function SupportPage() {
  return (
    <>
      <main className="min-h-screen pt-20 px-6 sm:px-10 pb-16">
        <div className="mx-auto max-w-5xl">
          <h1 className="text-center text-5xl font-bold tracking-tight">
            Customer Support
          </h1>
          <div className="mt-10 space-y-8 text-xl">
            <p>If you have any question please contact me at:</p>
            <p>
              <span className="font-semibold">Mail:</span>{" "}
              <a
                href={`mailto:${company.contact.email}`}
                className="underline underline-offset-4 hover:opacity-70 transition-opacity"
              >
                {company.contact.email}
              </a>
            </p>
            <p>
              <span className="font-semibold">Twitter:</span>{" "}
              <a
                href={company.urls.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-4 hover:opacity-70 transition-opacity"
              >
                {formatTwitterHandle()}
              </a>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
