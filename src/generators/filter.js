export default function generator({ prefix }) {
  return `
  ${prefix}filter-none {
    filter: none !important;
    -webkit-backdrop-filter: none !important;
    backdrop-filter: none !important;
  }
`;
}
