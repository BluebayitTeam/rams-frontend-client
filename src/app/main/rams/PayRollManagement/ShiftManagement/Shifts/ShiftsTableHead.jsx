import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Tooltip from "@mui/material/Tooltip";
import { lighten } from "@mui/material/styles";
import { useState } from "react";
import Swal from "sweetalert2";
import { useDeleteShiftsMutation } from "../ShiftApi";

/**
 * The shift table head component.
 */

const rows = [
  // {
  //   id: "SL",
  //   align: "left",
  //   disablePadding: true,
  //   label: "SL",
  //   sort: true,
  // },
  {
    id: "name",
    align: "left",
    disablePadding: false,
    label: "Name",
    sort: true,
  },
  {
    id: "start_date",
    align: "left",
    disablePadding: false,
    label: "Start Date",
    sort: true,
  },
  {
    id: "end_date",
    align: "left",
    disablePadding: false,
    label: "End Date",
    sort: true,
  },

  {
    id: "action",
    align: "right",
    disablePadding: false,
    label: "Action",
    sort: true,
  },
  {
    id: "time_period",
    align: "right",
    disablePadding: false,
    label: "Time Period",
    sort: true,
  },
];

function ShiftsTableHead({
  selectedShiftIds,
  tableOrder,
  onSelectAllClick,
  onRequestSort,
  rowCount,
  onMenuItemClick,
}) {
  // console.log("onMenuItemClick", onMenuItemClick);
  //   console.log("selectedShiftIds", selectedShiftIds);

  const [removeShifts] = useDeleteShiftsMutation();
  const numSelected = selectedShiftIds.length;
  const [selectedShiftsMenu, setSelectedShiftsMenu] = useState(null);
  const createSortHandler = (event, property) => {
    onRequestSort(event, property);
  };

  function openSelectedShiftsMenu(event) {
    setSelectedShiftsMenu(event.currentTarget);
  }

  function closeSelectedShiftsMenu() {
    setSelectedShiftsMenu(null);
  }

  function handleDeleteMultipleItem() {
    removeShifts(selectedShiftIds).then((data) => {
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
              className="p-4 md:p-16 whitespace-nowrap text-xs"
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

export default ShiftsTableHead;
