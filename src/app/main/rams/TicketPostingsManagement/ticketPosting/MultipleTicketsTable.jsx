import FuseScrollbars from "@fuse/core/FuseScrollbars";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import { useState } from "react";
import withRouter from "@fuse/core/withRouter";
import {
  Checkbox,
  FormControlLabel,
  TableCell,
  TableContainer,
} from "@mui/material";
import { useForm } from "react-hook-form";
import MultipleTicketsTableHead from "./MultipleTicketsTableHead";
import moment from "moment";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    position: "fixed",
    bottom: 12,
    padding: "0px 20px 10px 20px",

    backgroundColor: "#fff",
    zIndex: 1000,
    borderTop: "1px solid #ddd",
    width: "calc(100% - 350px)",
  },
  paginationContainer: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    padding: "0 20px",
  },
  pagination: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
}));
function MultipleTicketsTable(props) {
  const serialNumber = 1;
  const classes = useStyles();

  const methods = useForm({
    mode: "onChange",
    defaultValues: {},
  });

  // State to store selected ticket IDs

  // Function to handle checkbox change
  const handleCheckboxChange = (ticketId) => {
    if (props?.selectedTickets.includes(ticketId)) {
      // If the ticketId is already selected, remove it from the state
      props?.setSelectedTickets(
        props?.selectedTickets.filter((id) => id !== ticketId)
      );
    } else {
      // If the ticketId is not selected, add it to the state
      props?.setSelectedTickets([...props?.selectedTickets, ticketId]);
    }
  };

  return (
    <div className="w-full flex flex-col min-h-full px-10 ">
      <FuseScrollbars className="grow overflow-x-auto ">
        <TableContainer
          sx={{
            height: "calc(100vh - 248px)",
            overflowY: "auto",
          }}
        >
          <Table
            stickyHeader
            className="min-w-xl "
            aria-labelledby="tableTitle"
          >
            <MultipleTicketsTableHead />
            <TableBody>
              {props?.tickets?.map((ticket, sl) => {
                const isChecked = props?.selectedTickets.includes(ticket.id);

                return (
                  <TableRow
                    className="h-72 cursor-pointer border-t-1  border-gray-200"
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={ticket.id}
                  >
                    <TableCell
                      className="w-40 md:w-64 border-t-1  border-gray-200"
                      component="th"
                      scope="row"
                    >
                      {sl + 1}
                    </TableCell>
                    <TableCell
                      className="p-4 md:p-16 border-t-1  border-gray-200"
                      component="th"
                      scope="row"
                    >
                      {moment(ticket.issue_date).format("DD-MM-YYYY")}
                    </TableCell>
                    <TableCell
                      className="p-4 md:p-16 border-t-1  border-gray-200"
                      component="th"
                      scope="row"
                    >
                      {ticket?.ticket_no}
                    </TableCell>

                    <TableCell
                      className="p-4 md:p-16 border-t-1  border-gray-200"
                      component="th"
                      scope="row"
                    >
                      {ticket?.passenger}
                    </TableCell>

                    <TableCell
                      align="center"
                      className="p-4 md:p-16 border-t-1  border-gray-200"
                    >
                      <FormControlLabel
                        name={ticket.id}
                        style={{ width: "45%" }}
                        control={
                          <Checkbox
                            checked={isChecked}
                            onChange={() => handleCheckboxChange(ticket.id)}
                          />
                        }
                      />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </FuseScrollbars>
    </div>
  );
}

export default withRouter(MultipleTicketsTable);
