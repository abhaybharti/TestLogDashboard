import React, { useState } from "react";
import moment from "moment";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRangePicker } from "react-date-range";
import { pl, enGB } from "date-fns/locale";
import { defaultStaticRanges } from "./DefaultRange";
import "../App.css";
import { Button } from "@material-ui/core";

const staticRangesLabels = {
  Today: "Today",
  Yesterday: "Yesterday",
  "This Week": "This Week",
  "This Month": "This Month",
};

const DateRangeFilter = ({ onChange, open, setOpen }) => {
  const [state, setState] = useState([
    {
      startDate: "",
      endDate: "",
      key: "selection",
    },
  ]);

  const handleOnChange = (ranges) => {
    const { selection } = ranges;
    onChange(selection);
    setState([selection]);
  };

  function translateRange(dictionary) {
    return (item) =>
      dictionary[item.label]
        ? { ...item, label: dictionary[item.label] }
        : item;
  }

  const ruStaticRanges = defaultStaticRanges.map(
    translateRange(staticRangesLabels)
  );

  const formatDate = (date) => moment(date).format("YYYY-MM-DD");
  const Endate =
    state[0].endDate === null
      ? formatDate(state[0].startDate)
      : formatDate(state[0].endDate);
  const startDate = state[0].startDate ? formatDate(state[0].startDate) : "";

  return (
    <>
      <div className="daterange">
        <Button
          variant="contained"
          color="secondary"
          onClick={() => setOpen(!open)}
        >
          Open Date
        </Button>
        {state[0].startDate !== "" && state[0].endDate !== "" && (
          <p>
            {" "}
            <strong>
              {startDate} {" : "}
              {Endate}
            </strong>
          </p>
        )}
        {open && (
          <DateRangePicker
            onChange={handleOnChange}
            showSelectionPreview={true}
            moveRangeOnFirstSelection={false}
            months={2}
            editableDateInputs={true}
            dateDisplayFormat="MM-dd-yyyy"
            maxDate={new Date()}
            ranges={state}
            direction="horizontal"
            locale={enGB}
            rangeColors={["#00a870"]}
            staticRanges={ruStaticRanges}
          />
        )}
      </div>
    </>
  );
};

export default DateRangeFilter;
