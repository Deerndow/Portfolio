import PageShell from "../components/PageShell";

// Placeholder project list — a typographic index. Each row color-floods on
// hover and reveals an arrow. Wire `href` to real case studies later.
const WORKS = [
  { n: "01", title: "neon orchard", tag: "creative dev", year: "2025" },
  { n: "02", title: "buq.ai identity", tag: "branding", year: "2025" },
  { n: "03", title: "slime loader", tag: "motion", year: "2024" },
  { n: "04", title: "forest landing", tag: "web", year: "2024" },
  { n: "05", title: "pocket synth", tag: "toy", year: "2023" },
  { n: "06", title: "field notes", tag: "editorial", year: "2023" },
];

export default function Works() {
  return (
    <PageShell accent="lime" index="02 / works">
      <section className="works">
        <header className="works__head">
          <h1 className="page__title">works</h1>
        </header>

        <ul className="index">
          {WORKS.map((w) => (
            <li className="index__row" key={w.n}>
              <a
                className="index__link"
                href="#"
                onClick={(e) => e.preventDefault()}
              >
                <span className="index__n">{w.n}</span>
                <span className="index__title">{w.title}</span>
                <span className="index__tag">{w.tag}</span>
                <span className="index__year">{w.year}</span>
                <span className="index__arrow" aria-hidden="true">
                  →
                </span>
              </a>
            </li>
          ))}
        </ul>
      </section>
    </PageShell>
  );
}
