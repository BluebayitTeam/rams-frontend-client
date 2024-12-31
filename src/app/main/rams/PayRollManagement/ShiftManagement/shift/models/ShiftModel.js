import _ from "@lodash";

const ShiftModel = (data) =>
  _.defaults(data || {}, {
    name: "",
  });
export default ShiftModel;
