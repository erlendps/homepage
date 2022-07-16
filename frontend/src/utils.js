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

const parseToDbName = (name) => {
  let result = name[0].toLowerCase();
  let newWord = false;
  for (let i = 1; i < name.length; i++) {
    if (newWord) {
      result += name[i].toLowerCase();
      newWord = false;
    } else if (name[i] === " ") {
      result += "_";
      newWord = true;
    } else {
      result += name[i];
    }
  }
  return result;
}

const checkStringIsIncluded = (query, target) => {
  return target.toLowerCase().includes(query.toLowerCase());
}

export {parseToTitle, parseToDbName, checkStringIsIncluded};