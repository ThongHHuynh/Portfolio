// Vite's client types only declare lower-case image and video extensions, but phone and
// camera exports are often upper-case (e.g. MAKEX.JPG). Vite serves these
// fine at runtime; these declarations just tell TypeScript what the import is.
// Keep import paths matching the file's real case — Windows ignores case, but
// Linux build hosts do not.
declare module "*.JPG" {
  const src: string;
  export default src;
}

declare module "*.JPEG" {
  const src: string;
  export default src;
}

declare module "*.PNG" {
  const src: string;
  export default src;
}

declare module "*.MOV" {
  const src: string;
  export default src;
}
