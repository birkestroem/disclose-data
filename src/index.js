const defaultEmailOptions = {
  maskWith: "*",
  discloseStartCharacters: 3,
  discloseEndCharacters: 2,
  maskAt: false,
};

function maskString(str, fromIndex, toIndex, withChar) {
  return [...str]
    .map((char, index) => {
      if (index < fromIndex || index >= toIndex) return char;
      else return withChar;
    })
    .join("");
}

function discloseEmail(email, maskOptions = {}) {
  const options = Object.assign({}, defaultEmailOptions, maskOptions);

  const atIndex = email.lastIndexOf("@");
  let localPart = email.substring(0, atIndex) || "";
  let hostPart = email.substring(atIndex + 1) || "";

  let localPartStart;
  let localPartEnd;
  const localDiscloseProcentage =
    options.discloseStartCharacters / localPart.length;
  if (localDiscloseProcentage >= 1) {
    localPartStart = 0;
    localPartEnd = localPart.length;
  } else {
    localPartStart = options.discloseStartCharacters;
    localPartEnd = localPart.length;
  }
  localPart = maskString(
    localPart,
    localPartStart,
    localPartEnd,
    options.maskWith
  );

  let hostPartStart = 0;
  let hostPartEnd = hostPart.length - options.discloseEndCharacters;
  hostPart = maskString(hostPart, hostPartStart, hostPartEnd, options.maskWith);

  return email ? `${localPart}${options.maskAt ? "*" : "@"}${hostPart}` : "";
}

module.exports = {
  discloseEmail,
};
