export function chooseLabel(text) {
  if (text === "IN_PROGRESS" || text === "MODERATE") return "rgb(216, 175, 14)";
  if (text === "OPEN" || text === "URGENT") return "rgba(204, 0,0, 0.8)";
  if (text === "CLOSED" || text === "LOW") return "Green";
}

export function formatStatus(word) {
  let replacedWord = word.replace("_", " ");
  let formattedWord =
    replacedWord.charAt(0).toUpperCase() + replacedWord.slice(1).toLowerCase();

  return formattedWord;
}

export function isPwdComplicatedEnough(password) {
  const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;

  return regex.test(password);
}
