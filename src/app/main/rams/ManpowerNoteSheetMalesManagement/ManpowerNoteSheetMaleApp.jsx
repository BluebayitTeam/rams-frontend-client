import { Outlet } from "react-router";
import withReducer from "app/store/withReducer";
import reducer from "./store";

function ManpowerNoteSheetMaleApp() {
  return <Outlet />;
}

export default withReducer(
  "manpowerNoteSheetMaleApp",
  reducer
)(ManpowerNoteSheetMaleApp);
