import { access } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import {
  mains,
  pairings,
  validateCatalog,
} from "../lib/order-catalog.mjs";

const projectRoot = fileURLToPath(new URL("../", import.meta.url));
const items = [...mains, ...Object.values(pairings)];
const issues = validateCatalog();

for (const item of items) {
  try {
    await access(`${projectRoot}public${item.image}`);
  } catch {
    issues.push(`Item ${item.id} references a missing asset: ${item.image}`);
  }
}

if (issues.length > 0) {
  throw new Error(`Catalog validation failed:\n- ${issues.join("\n- ")}`);
}

console.log(
  `Validated ${mains.length} mains, ${Object.keys(pairings).length} pairings, and their assets.`,
);
