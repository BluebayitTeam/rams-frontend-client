import _ from "@lodash";

const ManpowerNoteSheetFemaleModel = (data) =>
  _.defaults(data || {}, {
    visa_entry: "",
  });
export default ManpowerNoteSheetFemaleModel;
