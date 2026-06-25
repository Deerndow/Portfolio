# 3ΛΛ — portfolio

A hand-illustrated forest landing page. Four real trees (extracted from the
source Illustrator artwork) lean forward fluidly on hover/focus; clicking a tree
or its nav word navigates through a water-fill loading screen where the brand
logo fills yellow → logo → blue.

## Stack

- Vite + React + TypeScript
- react-router-dom
- Art assets exported from the source `.ai` files into `public/art/`

## Develop

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check + production build
npm run preview  # preview the build
```

## Structure

```
public/art/        scene + tree cut-outs + logo (exported from the .ai files)
src/pages/Home.tsx scene: artwork + real trees + nav, shared hover state
src/components/     LoadingScreen (water-fill logo)
src/context/        Loading (click -> loading screen -> route)
src/trees.ts        the 4 tree/nav/page entries + their geometry
```
