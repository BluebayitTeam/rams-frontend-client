import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Tooltip from "@mui/material/Tooltip";
import { useState } from "react";
import TableHead from "@mui/material/TableHead";
import { lighten } from "@mui/material/styles";
import Swal from "sweetalert2";
import { useDeleteShiftTimeTablesMutation } from "../ShiftTimeTableApi";

/**
 * The shift time table head component.
 */

const rows = [
  {
    id: "SL",
    align: "left",
    disablePadding: true,
    label: "SL",
    sort: true,
  },
  {
    id: "name",
    align: "left",
    disablePadding: false,
    label: "Name",
    sort: true,
  },
  {
    id: "onDutyTime",
    align: "left",
    disablePadding: false,
    label: "OnDuty Time",
    sort: true,
  },
  {
    id: "offDutyTime",
    align: "left",
    disablePadding: false,
    label: "OffDuty Time",
    sort: true,
  },
  {
    id: "checkInStartTime",
    align: "left",
    disablePadding: false,
    label: "CheckIn Start",
    sort: true,
  },
  {
    id: "checkInEndTime",
    align: "left",
    disablePadding: false,
    label: "CheckIn End",
    sort: true,
  },
  {
    id: "checkoutStartTime",
    align: "left",
    disablePadding: false,
    label: "Checkout Start",
    sort: true,
  },
  {
    id: "checkoutEndTime",
    align: "left",
    disablePadding: false,
    label: "checkout End",
    sort: true,
  },
  {
    id: "color",
    align: "left",
    disablePadding: false,
    label: "Color",
    sort: true,
  },
  {
    id: "action",
    align: "right",
    disablePadding: false,
    label: "Action",
    sort: true,
  },
];

function ShiftTimeTablesTableHead({
  selectedShiftTimeTableIds,
  tableOrder,
  onSelectAllClick,
  onRequestSort,
  rowCount,
  onMenuItemClick,
}) {
  // console.log("onMenuItemClick", onMenuItemClick);
  //   console.log("selectedShiftTimeTableIds", selectedShiftTimeTableIds);

  const [removeShiftTimeTables] = useDeleteShiftTimeTablesMutation();
  const numSelected = selectedShiftTimeTableIds.length;
  const [selectedShiftTimeTablesMenu, setSelectedShiftTimeTablesMenu] =
    useState(null);
  const createSortHandler = (event, property) => {
    onRequestSort(event, property);
  };

  function openSelectedShiftTimeTablesMenu(event) {
    setSelectedShiftTimeTablesMenu(event.currentTarget);
  }

  function closeSelectedShiftTimeTablesMenu() {
    setSelectedShiftTimeTablesMenu(null);
  }

  function handleDeleteMultipleItem() {
    removeShiftTimeTables(selectedShiftTimeTableIds).then((data) => {
      Swal.fire({
        position: "top-center",
        icon: "success",
        title: "Deleted Successfully",
        showConfirmButton: false,
        timer: 2000,
      });
    });
  }

  return (
    <TableHead>
      <TableRow className="h-48 sm:h-64">
        {rows.map((row, index, array) => {
          return (
            <TableCell
              sx={{
                backgroundColor: (theme) =>
                  theme.palette.mode === "light"
                    ? lighten(theme.palette.background.default, 0.4)
                    : lighten(theme.palette.background.default, 0.02),
              }}
              className="p-4 md:p-16 whitespace-nowrap"
              key={row.id}
              align={row.align}
              padding={row.disablePadding ? "none" : "normal"}
              style={{
                position:
                  index === 0 || index === array.length - 1
                    ? "sticky"
                    : "inherit",
                left: index === 0 ? 0 : undefined,
                right: index === array.length - 1 ? 0 : undefined,
                zIndex: index === 0 || index === array.length - 1 ? 1 : "auto",
              }}
              sortDirection={
                tableOrder.id === row.id ? tableOrder.direction : false
              }
            >
              {row.sort && (
                <Tooltip
                  title="Sort"
                  placement={
                    row.align === "right" ? "bottom-end" : "bottom-start"
                  }
                  enterDelay={300}
                >
                  <TableSortLabel
                    active={tableOrder.id === row.id}
                    direction={tableOrder.direction}
                    onClick={(ev) => createSortHandler(ev, row.id)}
                    className="font-semibold"
                  >
                    {row.label}
                  </TableSortLabel>
                </Tooltip>
              )}
            </TableCell>
          );
        })}
      </TableRow>
    </TableHead>
  );
}

export default ShiftTimeTablesTableHead;
