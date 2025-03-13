import _ from "@lodash";

const ShiftModel = (data) =>
  _.defaults(data || {}, {
    name: "",
    // start_date: null,
    // end_date: null,
  });
export default ShiftModel;
