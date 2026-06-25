export default function LoadingScreen() {
  // wavy surface shared by both phases (solid below a wavy top edge)
  const wavePath =
    "M0,8 q12.5,-8 25,0 t25,0 t25,0 t25,0 t25,0 t25,0 t25,0 t25,0 L200,16 L0,16 Z";
  // mirror (solid above a wavy bottom edge)
  const wavePathUp =
    "M0,8 q12.5,-8 25,0 t25,0 t25,0 t25,0 t25,0 t25,0 t25,0 t25,0 L200,0 L0,0 Z";

  return (
    <div className="loader" role="status" aria-label="Loading">
      <div className="logo">
        {/* the real brand logo — fully visible at the midpoint of the flow */}
        <img className="logo__art" src="/art/logo.png" alt="3ΛΛ" />

        {/* phase 1: yellow drains off, revealing the real logo */}
        <div className="logo__drain">
          <div className="drain">
            <svg
              className="drain__wave"
              viewBox="0 0 200 16"
              preserveAspectRatio="none"
            >
              <path d={wavePath} fill="#c4e600" />
            </svg>
            <div className="drain__body" />
          </div>
        </div>

        {/* phase 2: blue floods in, ending fully blue */}
        <div className="logo__flood">
          <div className="flood">
            <div className="flood__body" />
            <svg
              className="flood__wave"
              viewBox="0 0 200 16"
              preserveAspectRatio="none"
            >
              <path d={wavePathUp} fill="#1a2bf5" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
