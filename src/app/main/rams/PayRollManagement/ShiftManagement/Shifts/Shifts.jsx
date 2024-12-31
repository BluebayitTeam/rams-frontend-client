import FusePageCarded from "@fuse/core/FusePageCarded";
import useThemeMediaQuery from "@fuse/hooks/useThemeMediaQuery";
import { useState } from "react";
import { hasPermission } from "src/app/constant/permission/permissionList";
import ShiftsHeader from "./ShiftsHeader";
import ShiftsTable from "./ShiftsTable";

/**
 * The ShiftTime Table page.
 */
function Shifts() {
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));

  const [searchKey, setSearchKey] = useState("");
  return (
    <FusePageCarded
      classes={{
        root: {},
        toolbar: "p-0",
        header: "min-h-80 h-80",
      }}
      header={
        hasPermission("TODO_TASK_TYPE_LIST") && (
          <ShiftsHeader searchKey={searchKey} setSearchKey={setSearchKey} />
        )
      }
      content={
        hasPermission("TODO_TASK_TYPE_LIST") && (
          <ShiftsTable searchKey={searchKey} setSearchKey={setSearchKey} />
        )
      }
      scroll={isMobile ? "normal" : "content"}
    />
  );
}

export default Shifts;
