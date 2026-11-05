# Footer and company identity review

Reviewed: 2026-09-09. Scope: shared public footer, homepage founding claim, organization JSON-LD.

## Evidence and implementation

- Owner-supplied source: `/Users/kietle/Desktop/Vinpix_Ho_so_doanh_nghiep/01_Thong_tin_doanh_nghiep.md`, collected 2026-09-08.
- Registration details were supplied directly by the owner on 2026-09-09 and saved to the dossier. No registration certificate was inspected.
- `src/lib/company.ts` supplies the footer and structured data: CÔNG TY TNHH VINPIX, tax ID 0319239233, Số 13, Đường CN6, Phường Tây Thạnh, Thành phố Hồ Chí Minh, Việt Nam, and kietle@vinpixstudio.com.
- Added owner-confirmed phone +84 375 180 140 and postal code 72009 from the dossier.
- Replaced the unverified 2021 claim with owner-supplied first registration date 2025-10-29 (`incorporationDate`). Footer displays 29/10/2025 with an explicit first-registration label; homepage displays REGISTERED 2025; JSON-LD uses the full legal formation date. Copyright remains the build year.
- Footer displays legal representative LÊ QUỐC KIỆT — Giám đốc. Birth date, nationality and charter capital are saved only in the external business dossier.
- Shared footer is used by the homepage, hiring and support pages.

## Compliance findings and missing inputs

The footer alone does not establish compliance. Public pages inspected introduce products and link to external products/stores or email; this does not by itself settle the site's legal classification.

| Item | Status / required action |
| --- | --- |
| Legal name, tax ID, address, email, phone | Displayed from supplied information; verify identity against the registration certificate. |
| First registration date and legal representative | Owner supplied 29/10/2025 and LÊ QUỐC KIỆT — Giám đốc on 2026-09-09; displayed in footer. |
| Certificate issue date/place and issuing authority | Still not supplied. Do not assume first registration date is the current certificate issue date. |
| Studio founding year | Remains unknown; legal registration in 2025 is explicitly distinguished from studio history. |
| Studio-wide privacy and transaction policies | No studio-wide policy routes found. `/kitchentogether/privacy` and `/kitchentogether/term` cover the game only. Actual data retention, recipients, complaint response timelines and service terms require owner input before publishing policies. |
| E-commerce notification/registration | No confirmation supplied. Determine applicability from actual operations; do not display an official confirmation badge without evidence. |

## Legal references

- [Law 122/2025/QH15, official publication](https://congbao.chinhphu.vn/van-ban/luat-so-122-2025-qh15-468683.htm): effective 2026-07-01.
- [Decree 248/2026/NĐ-CP, official publication](https://congbao.chinhphu.vn/van-ban/nghi-dinh-so-248-2026-nd-cp-469983.htm).
- [Decree full text](https://thuvienphapluat.vn/van-ban/Thuong-mai/Nghi-dinh-248-2026-ND-CP-huong-dan-Luat-Thuong-mai-dien-tu-713280.aspx): Articles 4–7 cover operator identity, privacy, party obligations and complaints for e-commerce platforms. Article 4 includes the legal representative and registration certificate number, issue date and place. Applicability must be established before treating this as a binding checklist for this site.

Do not infer that all disclosures must physically be in the footer, or that adding footer text completes operational/legal requirements.
