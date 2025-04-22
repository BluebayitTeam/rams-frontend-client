import withReducer from "app/store/withReducer";
import { Outlet } from "react-router";
import reducer from "./store";

function MakeAListReportApp() {
  return <Outlet />;
}

export default withReducer("makeAListReportApp", reducer)(MakeAListReportApp);
