const URL_REGEX = /https?:\/\/[^\s"'<>)\]]+/gi;

/**
 * Extracts all URLs found in a text string.
 * Returns a deduplicated array of URL strings.
 */
export function extractUrls(text: string): string[] {
  const matches = text.match(URL_REGEX);
  if (!matches) return [];
  // Deduplicate while preserving order
  return [...new Set(matches)];
}

/**
 * Returns a display-friendly label for a URL:
 * strips the protocol and truncates long paths.
 */
export function formatUrlLabel(url: string, maxLength = 50): string {
  const stripped = url.replace(/^https?:\/\//, '');
  return stripped.length > maxLength ? stripped.slice(0, maxLength) + '…' : stripped;
}
