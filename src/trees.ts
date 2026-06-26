// The 4 nav words / trees / pages, ordered left -> right to match the artwork.
// Geometry is % of the full-bleed bg stage, eyeballed from BG.png's 4 trees.

export interface TreeEntry {
  label: string;
  route: string;
  // hover/click hit area over the drawn tree
  hit: { left: number; top: number; width: number; height: number };
  // the 3D tree cut-out, placed exactly over the drawn tree.
  // left/width are % of stage width; bottom is % of stage height (trunk base).
  img: { src: string; left: number; width: number; bottom: number };
}

export const TREES: TreeEntry[] = [
  {
    label: "ABOUT",
    route: "/about",
    hit: { left: 2, top: 27, width: 21, height: 55 },
    img: { src: "/art/tree1.png", left: 1.1, width: 24.9, bottom: 18.7 },
  },
  {
    label: "WORKS",
    route: "/works",
    hit: { left: 23, top: 26, width: 21, height: 51 },
    img: { src: "/art/tree2.png", left: 23.7, width: 23.5, bottom: 23.7 },
  },
  {
    label: "PLAY",
    route: "/play",
    hit: { left: 45, top: 28, width: 23, height: 57 },
    img: { src: "/art/tree3.png", left: 44.6, width: 26.6, bottom: 22.5 },
  },
  {
    label: "CONNECT",
    route: "/connect",
    hit: { left: 68, top: 26, width: 26, height: 52 },
    img: { src: "/art/tree4.png", left: 70.9, width: 24.0, bottom: 23.2 },
  },
];
