import _ from "@lodash";

const MultipleStatusUpdateModel = (data) =>
  _.defaults(data || {}, {
    current_status: "",
    date: "",
    passengers: "",
    selected_value: "",
    status: "",
  });
export default MultipleStatusUpdateModel;
