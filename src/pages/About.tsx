import PageShell from "../components/PageShell";

// Placeholder copy — swap with the real bio. Structure is what matters here.
const TAGS = [
  "illustration",
  "creative dev",
  "3d",
  "sound design",
  "motion",
  "weird little toys",
  "branding",
  "p5.js",
];

export default function About() {
  return (
    <PageShell accent="pink" index="01 / about">
      <section className="about">
        <div className="about__intro">
          <h1 className="page__title">about</h1>
          <p className="page__lead">
            i'm a designer-developer who grows little forests on the internet. i
            draw, i code, i make things pop — mostly i chase the feeling of a
            page that wants to be touched.
          </p>
        </div>

        <figure className="about__portrait" aria-label="portrait placeholder">
          <span>your face here</span>
        </figure>

        <div className="about__cols">
          <p>
            placeholder bio paragraph — replace me. a decade of pixels, a love
            of neon on cream, and an unreasonable number of half-built side
            projects living in folders called "final_final".
          </p>
          <p>
            second paragraph for studios, freelance, the usual story. say what
            you make and why it's fun to make it. keep it short, keep it a
            little weird.
          </p>
        </div>

        <div className="about__status">
          <span className="dot" /> currently: open to playful work
        </div>

        <ul className="chips">
          {TAGS.map((t) => (
            <li key={t} className="chip">
              {t}
            </li>
          ))}
        </ul>
      </section>
    </PageShell>
  );
}
