import { type ReactNode } from "react";
import { useLoading } from "../context/Loading";

// Shared chrome for every inner page: the bracketed back button (which routes
// home THROUGH the slime loader, same as the trees), the buq.ai logo, and the
// page index. Each page passes an accent so its hovers stay on-palette.
type Accent = "pink" | "lime" | "blue" | "slate";

const logoSrc = `${import.meta.env.BASE_URL}art/logo-blue.png`;

export default function PageShell({
  accent,
  index,
  children,
}: {
  accent: Accent;
  index: string;
  children: ReactNode;
}) {
  const { go } = useLoading();
  return (
    <div className={`page page--${accent}`}>
      <header className="page__bar">
        <button className="page__back" onClick={() => go("/")}>
          <span className="bracket">[</span>
          <span className="page__back-word">back</span>
          <span className="bracket">]</span>
        </button>
        <button
          className="page__logo-btn"
          onClick={() => go("/")}
          aria-label="home"
        >
          <img className="page__logo" src={logoSrc} alt="3AΛ" />
        </button>
        <span className="page__index">{index}</span>
      </header>
      <main className="page__body">{children}</main>
    </div>
  );
}
