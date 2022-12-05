const keyName = "status";
function getStringCountInArrayOfObjects(arrayOfObjects, keyName, value) {
  let countOfValue = 0;
  arrayOfObjects.filter((element) => {
    if (element.status === value) {
      countOfValue++;
    }
  });
  return countOfValue;
}

module.exports = {
  getStringCountInArrayOfObjects,
};
