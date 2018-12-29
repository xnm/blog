import * as diacritics from 'diacritics';

const remove = diacritics.remove;

// eslint-disable-next-line no-control-regex
const R_CONTROL = /[\u0000-\u001f]/g;
const R_SPECIAL = /[\s~`!@#$%^&*()\-_+=[\]{}|\\;:"'<>,.?/]+/g;
const R_CONTINUES_SEPARATORS = /-{2,}/g;
const R_TRAILING_SEPARATORS = /^-+|-+$/g;

function slugify(input) {
  return remove(input)                        // Remove Diacritics
    .replace(R_CONTROL, '')                   // Remove control characters
    .replace(R_SPECIAL, '-')                  // Replace special characters
    .replace(R_CONTINUES_SEPARATORS, '-')     // Remove continues separators
    .replace(R_TRAILING_SEPARATORS, '')       // Remove prefixing and trailing separtors
    .toLowerCase();
}

export default slugify;
