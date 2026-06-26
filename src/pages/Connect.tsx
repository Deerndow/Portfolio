import PageShell from "../components/PageShell";

// Placeholder contact rows — oversized links that flood on hover. Swap the
// handles/href for the real ones.
const LINKS = [
  { label: "email", value: "hello@3aa.studio", href: "mailto:hello@3aa.studio" },
  { label: "github", value: "@Deerndow", href: "#" },
  { label: "instagram", value: "@3aa.studio", href: "#" },
  { label: "twitter / x", value: "@3aa_studio", href: "#" },
  { label: "read.cv", value: "/3aa", href: "#" },
];

export default function Connect() {
  return (
    <PageShell accent="pink" index="04 / connect">
      <section className="connect">
        <header className="connect__head">
          <h1 className="page__title">connect</h1>
          <p className="page__lead">
            got a weird idea? a normal idea? send it over.
          </p>
        </header>

        <ul className="links">
          {LINKS.map((l) => (
            <li key={l.label} className="links__row">
              <a className="links__link" href={l.href}>
                <span className="links__label">{l.label}</span>
                <span className="links__value">{l.value}</span>
                <span className="links__arrow" aria-hidden="true">
                  ↗
                </span>
              </a>
            </li>
          ))}
        </ul>

        <p className="connect__foot">made in a forest · 3ΛΛ © 2026</p>
      </section>
    </PageShell>
  );
}
