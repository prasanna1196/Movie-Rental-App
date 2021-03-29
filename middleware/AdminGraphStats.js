const { DateTime } = require("luxon");

function graphArray(array) {
  let da = DateTime.now().endOf("month").day;

  let data = [];

  for (let i = 1; i <= da; i++) {
    let count = 0;
    let dataItem = {};
    dataItem.date = DateTime.local(2021, 3, i).toString();

    for (let i = array.length - 1; i >= 0; i--) {
      if (
        dataItem.date.slice(0, 10) ===
        array[i].rentedOn.toISOString().slice(0, 10)
      ) {
        count += 1;
        array.splice(i, 1);
      }
    }

    dataItem.date = dataItem.date.slice(8, 10);
    dataItem.count = count;
    data.push(dataItem);
  }

  return data;
}

module.exports = graphArray;
