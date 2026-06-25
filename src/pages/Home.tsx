import { useState } from "react";
import { TREES, NAV_TOP, NAV_HEIGHT } from "../trees";
import { useLoading } from "../context/Loading";

export default function Home() {
  // Which tree/word is currently "lit". Shared so hovering the nav word OR the
  // tree itself activates the matching pair.
  const [active, setActive] = useState<number | null>(null);
  const { go } = useLoading();

  return (
    <div className="stage-wrap">
      <div className="stage">
        {/* full scene exported straight from beq.ai */}
        <img className="stage__bg" src="/art/scene.png" alt="3ΛΛ forest" />

        {/* real tree cut-outs, layered exactly over their drawn counterparts */}
        {TREES.map((t, i) => (
          <img
            key={t.label}
            className={`tree-img${active === i ? " is-active" : ""}`}
            style={{ transformOrigin: `${t.origin.x}% ${t.origin.y}%` }}
            src={t.img}
            alt=""
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
            onMouseEnter={() => setActive(i)}
            onMouseLeave={() => setActive((c) => (c === i ? null : c))}
            onClick={() => go(t.route)}
            role="link"
            aria-label={t.label}
          />
        ))}

        {/* hotspots over the existing nav text "[ ABOUT ] [ Works ] ..." */}
        {TREES.map((t, i) => (
          <div
            key={t.label}
            className={`navhit${active === i ? " is-active" : ""}`}
            style={{
              left: `${t.nav.left}%`,
              top: `${NAV_TOP}%`,
              width: `${t.nav.width}%`,
              height: `${NAV_HEIGHT}%`,
            }}
            onMouseEnter={() => setActive(i)}
            onMouseLeave={() => setActive((c) => (c === i ? null : c))}
            onClick={() => go(t.route)}
            role="link"
            aria-label={t.label}
          />
        ))}
      </div>
    </div>
  );
}
