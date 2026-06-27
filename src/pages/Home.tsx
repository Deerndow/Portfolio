import { useEffect, useState } from "react";
import { TREES } from "../trees";
import { useLoading } from "../context/Loading";
import { playPop, initSound } from "../sound";

const bgSrc = `${import.meta.env.BASE_URL}art/bg.png`;
const logoSrc = `${import.meta.env.BASE_URL}art/logo.png`;

export default function Home() {
  // Which tree/word is currently "lit". Shared so hovering the nav word OR the
  // tree itself activates the matching pair.
  const [active, setActive] = useState<number | null>(null);
  const { go } = useLoading();

  // arm the audio so hover pops play after the first interaction
  useEffect(() => initSound(), []);

  // light a tree (and play its little pop) only when it wasn't already lit
  const activate = (i: number) =>
    setActive((c) => {
      if (c !== i) playPop();
      return i;
    });

  // pressing a tree/button is a real user gesture: always pop (this also
  // unlocks the audio so subsequent hovers can play)
  const press = (i: number) => {
    setActive(i);
    playPop();
  };

  return (
    <div className="stage-wrap">
      <div className="stage">
        {/* raw artwork, full-bleed */}
        <img className="stage__bg" src={bgSrc} alt="3ΛΛ forest" />

        {/* 3D tree cut-outs placed exactly over the drawn trees; they pop on hover */}
        {TREES.map((t, i) => (
          <img
            key={t.label}
            className={`tree3d${active === i ? " is-active" : ""}`}
            src={t.img.src}
            alt=""
            aria-hidden="true"
            style={{
              left: `${t.img.left}%`,
              width: `${t.img.width}%`,
              bottom: `${t.img.bottom}%`,
            }}
          />
        ))}

        {/* hover/click hotspots over each tree */}
        {TREES.map((t, i) => (
          <div
            key={t.label}
            className="hit"
            style={{
              left: `${t.hit.left}%`,
              top: `${t.hit.top}%`,
              width: `${t.hit.width}%`,
              height: `${t.hit.height}%`,
            }}
            onMouseEnter={() => activate(i)}
            onMouseLeave={() => setActive((c) => (c === i ? null : c))}
            onPointerDown={() => press(i)}
            onClick={() => go(t.route)}
            role="link"
            aria-label={t.label}
          />
        ))}
      </div>

      {/* nav lives OUTSIDE .stage (which is transformed) so it can pin to the
          viewport top-left and never gets cropped with the artwork */}
      <nav className="nav">
        <img className="nav__logo" src={logoSrc} alt="3ΛΛ" />
        <div className="nav__links" aria-label="Primary">
          {TREES.map((t, i) => (
            <button
              key={t.label}
              className={`nav__item${active === i ? " is-active" : ""}`}
              onMouseEnter={() => activate(i)}
              onMouseLeave={() => setActive((c) => (c === i ? null : c))}
              onPointerDown={() => press(i)}
              onClick={() => go(t.route)}
            >
              {t.label}
            </button>
          ))}
        </div>
      </nav>

      <header className="home-hero" aria-label="Portfolio introduction">
        <p className="home-hero__kicker">Portfolio / 2026</p>
        <h1 className="home-hero__title">Digital design with a little bite.</h1>
        <p className="home-hero__copy">
          Selected work, experiments, and contact paths tucked into the forest.
        </p>
      </header>

      <div className="home-index" aria-hidden="true">
        {TREES.map((t, i) => (
          <span key={t.label} className={active === i ? "is-active" : ""}>
            0{i + 1} {t.label}
          </span>
        ))}
      </div>
    </div>
  );
}
