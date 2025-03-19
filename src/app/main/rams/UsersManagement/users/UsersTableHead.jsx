import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Tooltip from "@mui/material/Tooltip";
import { useState } from "react";
import TableHead from "@mui/material/TableHead";
import { lighten } from "@mui/material/styles";
/**
 * The table head rows data.
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
    id: "image",
    align: "left",
    disablePadding: false,
    label: "Image",
    sort: true,
  },
  {
    id: "username",
    align: "left",
    disablePadding: false,
    label: "Username",
    sort: true,
  },
  {
    id: "email",
    align: "left",
    disablePadding: false,
    label: "Email",
    sort: true,
  },
  {
    id: "mobile",
    align: "left",
    disablePadding: false,
    label: "Mobile",
    sort: true,
  },

  {
    id: "action",
    align: "left",
    disablePadding: false,
    label: "Action",
    sort: true,
  },
];

/**
 * The users table head component.
 */
function UsersTableHead(props) {
  const {
    selectedUserIds,
    tableOrder,
    onSelectAllClick,
    onRequestSort,
    rowCount,
    onMenuItemClick,
  } = props;
  const numSelected = selectedUserIds.length;
  const [selectedUsersMenu, setSelectedUsersMenu] = useState(null);
  const createSortHandler = (event, property) => {
    onRequestSort(event, property);
  };

  function openSelectedUsersMenu(event) {
    setSelectedUsersMenu(event.currentTarget);
  }

  function closeSelectedUsersMenu() {
    setSelectedUsersMenu(null);
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
        {rows.map((row, index, array) => {
          return (
            <TableCell
              sx={{
                position:
                  index === 0 || index === array.length - 1
                    ? "sticky"
                    : "inherit",
                left: index === 0 ? 0 : undefined,
                right: index === array.length - 1 ? 0 : undefined,
                zIndex: index === 0 || index === array.length - 1 ? 2 : "auto",
                backgroundColor: (theme) =>
                  theme.palette.mode === "light"
                    ? lighten(theme.palette.background.default, 0.4)
                    : lighten(theme.palette.background.default, 0.02),
                fontWeight: "bold",
              }}
              className="p-4 md:p-16 whitespace-nowrap"
              key={row.id}
              align={row.align}
              padding={row.disablePadding ? "none" : "normal"}
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

export default UsersTableHead;
