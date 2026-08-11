import { visit } from "unist-util-visit";

/**
 * Turns ```jsx live fences into `<Live code={...} />` so the gallery can render
 * them as editable previews. MDX drops a fence's meta string otherwise, which
 * is the only place the `live` marker can live.
 */
export function remarkLive() {
  return (tree) => {
    visit(tree, "code", (node, index, parent) => {
      const flags = node.meta?.split(/\s+/) ?? [];
      if (!flags.includes("live") || index == null || !parent) return;

      const attributes = [
        { type: "mdxJsxAttribute", name: "code", value: node.value },
      ];
      if (flags.includes("noInline")) {
        attributes.push({ type: "mdxJsxAttribute", name: "noInline", value: null });
      }

      parent.children[index] = {
        type: "mdxJsxFlowElement",
        name: "Live",
        attributes,
        children: [],
      };
    });
  };
}
