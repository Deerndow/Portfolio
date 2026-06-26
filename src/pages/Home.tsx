import { useEffect, useState } from "react";
import { TREES } from "../trees";
import { useLoading } from "../context/Loading";
import { playPop, initSound } from "../sound";

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
        <img className="stage__bg" src="/art/bg.png" alt="3ΛΛ forest" />

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
        <span className="nav__logo" role="img" aria-label="3ΛΛ" />
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
      </nav>
    </div>
  );
}
