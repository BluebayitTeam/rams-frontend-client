import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Tooltip from "@mui/material/Tooltip";
import { useState } from "react";
import TableHead from "@mui/material/TableHead";
import { lighten } from "@mui/material/styles";
import { useDeletePermissionsMutation } from "../PermissionsApi";

/**
 * The departments table head component.
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
    id: "note",
    align: "left",
    disablePadding: false,
    label: "Note",
    sort: true,
  },
  {
    id: "action",
    align: "center",
    disablePadding: false,
    label: "Action",
    sort: true,
  },
];

function PermissionsTableHead(props) {
  const { selectedPermissionIds, tableOrder, onRequestSort } = props;

  const [removePermissions] = useDeletePermissionsMutation();
  const numSelected = selectedPermissionIds.length;
  const [selectedPermissionsMenu, setSelectedPermissionsMenu] = useState(null);
  const createSortHandler = (event, property) => {
    onRequestSort(event, property);
  };

  function openSelectedPermissionsMenu(event) {
    setSelectedPermissionsMenu(event.currentTarget);
  }

  return (
    <TableHead
      sx={{
        position: "sticky",
        top: 0, // Fix the header at the top
        zIndex: 10, // Ensure it stays on top
        backgroundColor: (theme) =>
          theme.palette.mode === "light"
            ? lighten(theme.palette.background.default, 0.4)
            : lighten(theme.palette.background.default, 0.02),
      }}
    >
      <TableRow className="h-48 sm:h-64">
        {/* <TableCell
					sx={{
						backgroundColor: (theme) =>
							theme.palette.mode === 'light'
								? lighten(theme.palette.background.default, 0.4)
								: lighten(theme.palette.background.default, 0.02)
					}}
					padding="none"
					className="w-40 md:w-64 text-center z-99"
				/> */}
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

export default PermissionsTableHead;
