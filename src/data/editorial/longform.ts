/**
 * Places article-specific analysis between the original argument beats, so it
 * deepens the line of reasoning instead of becoming an appendix.
 */
export function weaveLongForm(body: string[], depth: string[] | undefined) {
  if (!depth?.length) return body;

  const result: string[] = [];
  const insertionPoints = new Set(
    depth.map((_, index) => Math.round(((index + 1) * body.length) / (depth.length + 1))),
  );
  let depthIndex = 0;

  body.forEach((paragraph, index) => {
    result.push(paragraph);
    if (insertionPoints.has(index + 1) && depthIndex < depth.length) {
      result.push(depth[depthIndex]);
      depthIndex += 1;
    }
  });

  return [...result, ...depth.slice(depthIndex)];
}
