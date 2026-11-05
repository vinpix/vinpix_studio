/** Soft fade between wiki pages (opacity only, so sticky/fixed UI is unaffected). */
export default function WikiTemplate({ children }: { children: React.ReactNode }) {
  return <div className="ldw-fade">{children}</div>;
}
