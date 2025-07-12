export function convertRelationToIncludesPrisma(
  relation: string[],
): Record<string, boolean> | null {
  // relation is an array of strings and the includes should be an object
  // For example, if relation is ['user', 'posts'], the includes should be:
  // { user: true, posts: true }
  if (relation?.length === 0 || !Array.isArray(relation)) {
    return null;
  } else {
    return relation.reduce((includes, relation) => {
      includes[relation] = true;
      return includes;
    }, {});
  }
}
