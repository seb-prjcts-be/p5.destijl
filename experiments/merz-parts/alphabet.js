/* Compatibility wrapper for the earlier letter-parts study. */
(function (root) {
  "use strict";
  const geometry = (value, options) => root.Merz.geometry(value, options);
  const parts = (value, options) => root.Merz.parts(value, options);
  const letter = (value, options) => ({ ...geometry(value, options), parts: parts(value, options) });
  root.MerzAlphabetStudy = { geometry, parts, letter };
})(globalThis);
