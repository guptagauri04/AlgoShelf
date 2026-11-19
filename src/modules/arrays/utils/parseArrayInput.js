export const MIN_ARRAY_SIZE = 2;

export const MAX_ARRAY_SIZE = 20;

/**
 * Parse a user supplied array definition (e.g. "12, 7, 19, 3") into a
 * validated list of numbers. Returns either the values or an error message
 * that can be shown inline in the input field.
 */
export function parseArrayInput(raw) {
  const tokens = String(raw)
    .split(/[\s,]+/)
    .filter(Boolean);

  if (tokens.length === 0) {
    return {
      values: null,
      error: `Enter at least ${MIN_ARRAY_SIZE} numbers, separated by commas (for example: 12, 7, 19, 3).`,
    };
  }

  const values = tokens.map(Number);

  if (values.some((value) => !Number.isFinite(value))) {
    const invalid = tokens.find((token) => !Number.isFinite(Number(token)));

    return {
      values: null,
      error: `"${invalid}" is not a valid number.`,
    };
  }

  if (values.length < MIN_ARRAY_SIZE) {
    return {
      values: null,
      error: `Please enter at least ${MIN_ARRAY_SIZE} numbers so the traversal has more than one step.`,
    };
  }

  if (values.length > MAX_ARRAY_SIZE) {
    return {
      values: null,
      error: `That is ${values.length} values — the visualizer supports up to ${MAX_ARRAY_SIZE}.`,
    };
  }

  return { values, error: null };
}
