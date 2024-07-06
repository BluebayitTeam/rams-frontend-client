import _ from "@lodash";

const MultipleStatusUpdateModel = (data) =>
  _.defaults(data || {}, {
    current_status: "",
    date: "",
    passengers: "",
    selectedValue: "",
    status: "",
  });
export default MultipleStatusUpdateModel;
