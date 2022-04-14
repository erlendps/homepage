const parseToTitle = (title) => {
  let result = title[0].toUpperCase();
  let newWord = false;
  for (let i = 1; i < title.length; i++) {
    if (newWord) {
      result += title[i].toUpperCase();
      newWord = false;
    } else if (title[i] === "_") {
      result += " ";
      newWord = true;
    } else {
      result += title[i];
    }
  }
  return result;
}

export default parseToTitle;