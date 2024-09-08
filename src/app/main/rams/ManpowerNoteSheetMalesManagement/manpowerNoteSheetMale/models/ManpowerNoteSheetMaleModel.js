import _ from "@lodash";

const MaletrainingModel = (data) =>
  _.defaults(data || {}, {
    man_power_date: "",
  });
export default MaletrainingModel;
