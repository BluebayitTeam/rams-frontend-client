import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Tooltip from "@mui/material/Tooltip";
import { useState } from "react";
import TableHead from "@mui/material/TableHead";
import { lighten } from "@mui/material/styles";
import Swal from "sweetalert2";
import { useDeleteTicketeditsMutation } from "../TicketeditsApi";

/**
 * The ticketedits table head component.
 */

const rows = [
  {
    id: "id",
    align: "left",
    disablePadding: true,
    label: "SL",
    sort: true,
  },
  {
    id: "issue_date",
    align: "left",
    disablePadding: false,
    label: "Issue date",
    sort: true,
  },
  {
    id: "invoice_no",
    align: "left",
    disablePadding: false,
    label: "Invoice No.",
    sort: true,
  },
  {
    id: "issue_person",
    align: "left",
    disablePadding: false,
    label: "Issue Person.",
    sort: true,
  },
  // {
  // 	id: 'passenger_name',
  // 	align: 'left',
  // 	disablePadding: false,
  // 	label: 'User',
  // 	sort: true
  // },
  {
    id: "pax_name",
    align: "left",
    disablePadding: false,
    label: "Passenger Name",
    sort: true,
  },

  {
    id: "ticket_agency",
    align: "left",
    disablePadding: false,
    label: "Ticket Agency Name",
    sort: true,
  },

  {
    id: "flight_date",
    align: "left",
    disablePadding: false,
    label: "Flight Date",
    sort: true,
  },
  {
    id: "gds",
    align: "left",
    disablePadding: false,
    label: "GDS",
    sort: true,
  },
  {
    id: "gds_pnr",
    align: "left",
    disablePadding: false,
    label: "GDS PNR",
    sort: true,
  },
  {
    id: "airline_pnr",
    align: "left",
    disablePadding: false,
    label: "Airline PNR",
    sort: true,
  },
  {
    id: "return_flight_date",
    align: "left",
    disablePadding: false,
    label: "Return Flight Date",
    sort: true,
  },
  {
    id: "ticket_no",
    align: "left",
    disablePadding: false,
    label: "Ticket No",
    sort: true,
  },
  {
    id: "sector",
    align: "left",
    disablePadding: false,
    label: "Sector ",
    sort: true,
  },
  {
    id: "current_airway",
    align: "left",
    disablePadding: false,
    label: "Air Way",
    sort: true,
  },
  {
    id: "flight_no",
    align: "left",
    disablePadding: false,
    label: "Flight No",
    sort: true,
  },

  {
    id: "_class",
    align: "left",
    disablePadding: false,
    label: "Class",
    sort: true,
  },
  {
    id: "fare_amount",
    align: "left",
    disablePadding: false,
    label: "Fare Amount",
    sort: true,
  },
  {
    id: "airline_commission_amount",
    align: "left",
    disablePadding: false,
    label: "Airline Commision Amount",
    sort: true,
  },
  {
    id: "customer_commission_amount",
    align: "left",
    disablePadding: false,
    label: "Customer Commision Amount",
    sort: true,
  },
  {
    id: "tax_amount",
    align: "left",
    disablePadding: false,
    label: "Tax Amount",
    sort: true,
  },
  {
    id: "service_charge",
    align: "left",
    disablePadding: false,
    label: "Service Charge",
    sort: true,
  },
  {
    id: "purchase_amount",
    align: "left",
    disablePadding: false,
    label: "Airlines Net Rate",
    sort: true,
  },
  {
    id: "sales_amount",
    align: "left",
    disablePadding: false,
    label: "Sales Amount",
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

function TicketeditsTableHead(props) {
  const {
    selectedTicketeditIds,
    tableOrder,
    onSelectAllClick,
    onRequestSort,
    rowCount,
    onMenuItemClick,
  } = props;

  const [removeTicketedits] = useDeleteTicketeditsMutation();
  const numSelected = selectedTicketeditIds.length;
  const [selectedTicketeditsMenu, setSelectedTicketeditsMenu] = useState(null);
  const createSortHandler = (event, property) => {
    onRequestSort(event, property);
  };

  function openSelectedTicketeditsMenu(event) {
    setSelectedTicketeditsMenu(event.currentTarget);
  }

  function closeSelectedTicketeditsMenu() {
    setSelectedTicketeditsMenu(null);
  }

  function handleDeleteMultipleItem() {
    removeTicketedits(selectedTicketeditIds).then((data) => {
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

export default TicketeditsTableHead;
