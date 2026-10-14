import { cx } from "tailmantic";

const join = (...classes) => classes.filter(Boolean).join(" ");
const button = ({ tone = "primary", size = "md" } = {}) => join("bench-button", `bench-button-${tone}`, `bench-button-${size}`);
const badge = ({ tone = "neutral" } = {}) => join("bench-badge", `bench-badge-${tone}`);
const card = () => ({
  root: "bench-card",
  header: "bench-card-header",
  body: "bench-card-body",
});
const input = ({ state = "default" } = {}) => join("bench-input", state === "error" ? "bench-input-error" : "bench-input-default");

export const styles = {
  button,
  badge,
  card,
  input,
  field: "bench-field",
  page: "bench-page",
  intro: "bench-intro",
  grid: "bench-grid",
  row: "bench-row",
  fields: "bench-fields",
};

export { cx };
