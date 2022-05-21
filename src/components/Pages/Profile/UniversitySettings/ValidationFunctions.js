export const validateNames = (text) => {
  if ((text === undefined) | (text === "")) return false;
  if (/^(?! *$)[a-zA-ZıiİçÇşŞğĞÜüÖö.+ '-,-\/:\d+]+$/.test(text) === false) return false; //eslint-disable-line

  return true;
};
/*
export const validateDescription = (text) => {
  if ((text === undefined) | (text === "")) return false;
  if (/^(?! *$)[a-zA-ZıiİçÇşŞğĞÜüÖö.0-9 \W]+$/.test(text) === false) return false;

  return true;
};
*/

export const validateFileSize = (size) => {
  if (size >= 5242880) return false;
  return true;
};

export const validateFileExtension = (type) => {
  if (type === "image/gif" | type === "image/png" | type === "image/jpeg") return true;
  return false;
};

