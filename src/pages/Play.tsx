import PageShell from "../components/PageShell";

// Placeholder experiments — color-block tiles that lift + tilt on hover.
const TOYS: { label: string; note: string; c: "pink" | "lime" | "blue" | "slate" }[] = [
  { label: "pop pop", note: "click-noise generator", c: "pink" },
  { label: "goo", note: "metaball sandbox", c: "blue" },
  { label: "tree maker", note: "l-system doodler", c: "lime" },
  { label: "ascii cam", note: "webcam → text", c: "slate" },
  { label: "color dice", note: "palette roulette", c: "pink" },
  { label: "404 garden", note: "the lost page", c: "lime" },
];

export default function Play() {
  return (
    <PageShell accent="blue" index="03 / play">
      <section className="play">
        <header className="play__head">
          <h1 className="page__title">play</h1>
          <p className="page__lead">
            experiments, toys, and things with no point. go on, poke them.
          </p>
        </header>

        <ul className="toys">
          {TOYS.map((t) => (
            <li key={t.label} className={`toy toy--${t.c}`}>
              <button type="button" onClick={(e) => e.preventDefault()}>
                <span className="toy__label">{t.label}</span>
                <span className="toy__note">{t.note}</span>
              </button>
            </li>
          ))}
        </ul>
      </section>
    </PageShell>
  );
}
