import FusePageCarded from "@fuse/core/FusePageCarded";
import useThemeMediaQuery from "@fuse/hooks/useThemeMediaQuery";
import { useState } from "react";
import { hasPermission } from "src/app/constant/permission/permissionList";
import ShiftTimeTablesHeader from "./ShiftTimeTablesHeader";
import ShiftTimeTablesTable from "./ShiftTimeTablesTable";

/**
 * The ShiftTime Table page.
 */
function ShiftTimeTables() {
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
          <ShiftTimeTablesHeader
            searchKey={searchKey}
            setSearchKey={setSearchKey}
          />
        )
      }
      content={
        hasPermission("TODO_TASK_TYPE_LIST") && (
          <ShiftTimeTablesTable
            searchKey={searchKey}
            setSearchKey={setSearchKey}
          />
        )
      }
      scroll={isMobile ? "normal" : "content"}
    />
  );
}

export default ShiftTimeTables;
