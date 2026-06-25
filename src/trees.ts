// The 4 buttons / trees / pages, ordered left -> right to match the artwork.
// All geometry is expressed as % of the 4:3 stage (= the Illustrator artboard),
// derived directly from the .ai element bounds so overlays line up pixel-perfect.

export interface TreeEntry {
  label: string;
  route: string;
  img: string;
  // The real nav word's horizontal slice (over the baked "[ ... ]" text).
  nav: { left: number; width: number };
  // Hover/click hit area covering the drawn tree.
  hit: { left: number; top: number; width: number; height: number };
  // Trunk-base anchor the tree leans out from.
  origin: { x: number; y: number };
}

// Shared vertical band of the baked nav text (slightly padded for easy hover).
export const NAV_TOP = 6.4;
export const NAV_HEIGHT = 4.6;

export const TREES: TreeEntry[] = [
  {
    label: "ABOUT",
    route: "/about",
    img: "/art/t1.png",
    nav: { left: 8.26, width: 5.98 },
    hit: { left: 0.5, top: 27.5, width: 29.2, height: 57 },
    origin: { x: 15.1, y: 84.5 },
  },
  {
    label: "Works",
    route: "/works",
    img: "/art/t2.png",
    nav: { left: 14.9, width: 5.98 },
    hit: { left: 28.8, top: 26.3, width: 27.4, height: 50.9 },
    origin: { x: 42.5, y: 77.2 },
  },
  {
    label: "Play",
    route: "/play",
    img: "/art/t3.png",
    nav: { left: 21.54, width: 5.31 },
    hit: { left: 56.3, top: 28.3, width: 25.4, height: 48.2 },
    origin: { x: 69.0, y: 76.5 },
  },
  {
    label: "Connect",
    route: "/connect",
    img: "/art/t4.png",
    nav: { left: 27.52, width: 7.3 },
    hit: { left: 80.75, top: 20.3, width: 19.3, height: 57.3 },
    origin: { x: 90.4, y: 77.6 },
  },
];
