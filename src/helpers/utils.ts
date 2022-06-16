/**
 * Capitalizes the given string contents.
 *
 * @param {string} contents
 * @return {string}
 */
export function capitalize(contents: string) {
  const firstLetter = contents.charAt(0).toUpperCase();
  const remaining = contents.slice(1);

  return `${firstLetter}${remaining}`;
}

/**
 * This method returns undefined on purpose.
 *
 * @return {undefined}
 */
export function noop() {}
