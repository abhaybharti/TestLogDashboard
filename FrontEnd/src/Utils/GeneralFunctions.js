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

const getSumByKey = (data, key) => {
  return data.reduce(
    (accumulator, current) => accumulator + Number(current[key]),
    0
  );
};

module.exports = {
  getStringCountInArrayOfObjects,
  getSumByKey,
};
