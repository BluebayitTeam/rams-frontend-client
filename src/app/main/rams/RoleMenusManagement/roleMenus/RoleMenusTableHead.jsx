import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Tooltip from "@mui/material/Tooltip";
import { useState } from "react";
import TableHead from "@mui/material/TableHead";
import { lighten } from "@mui/material/styles";
import { useDeleteRoleMenusMutation } from "../RoleMenusApi";

/**
 * The roleMenus table head component.
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
    id: "role",
    align: "left",
    disablePadding: false,
    label: "Role",
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

function RoleMenusTableHead(props) {
  const {
    tableOrder,

    onRequestSort,
  } = props;
  const createSortHandler = (event, property) => {
    onRequestSort(event, property);
  };

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

export default RoleMenusTableHead;
