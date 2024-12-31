import _ from "@lodash";

const ShiftTimeTableModel = (data) =>
  _.defaults(data || {}, {
    name: "",
  });
export default ShiftTimeTableModel;
