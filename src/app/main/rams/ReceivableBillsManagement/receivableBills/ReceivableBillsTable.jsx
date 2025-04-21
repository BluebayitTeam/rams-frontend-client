/* eslint-disable no-nested-ternary */
import FuseLoading from "@fuse/core/FuseLoading";
import FuseScrollbars from "@fuse/core/FuseScrollbars";
import withRouter from "@fuse/core/withRouter";
import _ from "@lodash";
import {
  Cancel,
  DataUsage,
  Delete,
  Edit,
  PlaylistAddCheck,
} from "@mui/icons-material";
import { Pagination, TableContainer } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";
import axios from "axios";
import { motion } from "framer-motion";
import moment from "moment";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { rowsPerPageOptions } from "src/app/@data/data";
import {
  DELETE_AUTHORIZE_REQUEST,
  UPDATE_RECEIVABLEBILL,
} from "src/app/constant/constants";
import { hasPermission } from "src/app/constant/permission/permissionList";
import {
  selectFilteredReceivableBills,
  useGetReceivableBillsQuery,
} from "../ReceivableBillsApi";
import ReceivableBillsTableHead from "./ReceivableBillsTableHead";
import PrintIcon from "@mui/icons-material/Print";
import PrintVoucher from "@fuse/utils/Print/PrintVoucher";
import PrintReceivableBills from "@fuse/utils/Print/PrintReceivableBills";

/**
 * The receivableBills table.
 */
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

function ReceivableBillsTable(props) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { navigate, searchKey } = props;
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const [pageAndSize, setPageAndSize] = useState({ page: 1, size: 25 });
  const { data, isLoading, refetch } = useGetReceivableBillsQuery({
    ...pageAndSize,
    searchKey,
  });
  const totalData = useSelector(selectFilteredReceivableBills(data));
  const receivableBills = useSelector(
    selectFilteredReceivableBills(data?.sales)
  );
  let serialNumber = 1;
  const printVoucherRef = useRef();

  // Authorize Status
  const [openPendingStatusAlert, setOpenPendingStatusAlert] = useState(false);
  const [openSuccessStatusAlert, setOpenSuccessStatusAlert] = useState(false);
  const [openCanceledStatusAlert, setOpenCanceledStatusAlert] = useState(false);
  const [openDeleteStatusAlert, setOpenDeleteStatusAlert] = useState(false);
  const role = localStorage.getItem("user_role").toLowerCase();
  const currentDate = moment().format("DD-MM-YYYY");
  const previousDate = moment().subtract(1, "days").format("DD-MM-YYYY");
  const previousDate2 = moment().subtract(2, "days").format("DD-MM-YYYY");
  const previousDate3 = moment().subtract(3, "days").format("DD-MM-YYYY");
  const user_role = localStorage.getItem("user_role");

  useEffect(() => {
    // Fetch data with specific page and size when component mounts or when page and size change
    refetch({ page, rowsPerPage });
  }, [page, rowsPerPage]);

  useEffect(() => {
    refetch({ searchKey });
  }, [searchKey]);
  const [selected, setSelected] = useState([]);

  const [tableOrder, setTableOrder] = useState({
    direction: "asc",
    id: "",
  });

  function handleRequestSort(event, property) {
    const newOrder = { id: property, direction: "desc" };

    if (tableOrder.id === property && tableOrder.direction === "desc") {
      newOrder.direction = "asc";
    }

    setTableOrder(newOrder);
  }

  function handleSelectAllClick(event) {
    if (event.target.checked) {
      setSelected(receivableBills.map((n) => n.id));
      return;
    }

    setSelected([]);
  }

  function handleDeselect() {
    setSelected([]);
  }

  function handleClick(item) {
    navigate(`/apps/receivableBill/receivableBills/${item.id}/${item.handle}`);
  }

  function handleUpdateReceivableBill(item, event) {
    localStorage.removeItem("deleteReceivableBill");
    localStorage.setItem("updateReceivableBill", event);
    navigate(
      `/apps/receivableBill/receivableBills/${item.id}/${item.invoice_no}`
    );
  }

  function handleDeleteReceivableBill(item, event) {
    localStorage.removeItem("updateReceivableBill");
    localStorage.setItem("deleteReceivableBill", event);
    navigate(
      `/apps/receivableBill/receivableBills/${item.id}/${item.invoice_no}`
    );
  }

  // ======Authorize Status==========
  async function handleUpdateReceivableBillsStatus(invoice, type) {
    setOpenSuccessStatusAlert(true);

    const authTOKEN = {
      headers: {
        "Content-type": "application/json",
        Authorization: localStorage.getItem("jwt_access_token"),
      },
    };
    const data = {
      invoice_no: invoice,
      request_type: type,
    };
    await axios.put(`${UPDATE_RECEIVABLEBILL}`, data, authTOKEN);
    refetch();
  }

  async function deleteAuthorizeRequest(invoice_no) {
    setOpenDeleteStatusAlert(true);
    const authTOKEN = {
      headers: {
        "Content-type": "application/json",
        Authorization: localStorage.getItem("jwt_access_token"),
      },
    };

    await axios.delete(`${DELETE_AUTHORIZE_REQUEST}${invoice_no}`, authTOKEN);
    refetch();
  }

  // ======Authorize Status End==========

  function handleCheck(event, id) {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected?.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  }

  // pagination
  const handlePagination = (e, handlePage) => {
    setPageAndSize({ ...pageAndSize, page: handlePage });
    setPage(handlePage - 1);
  };

  function handleChangePage(event, value) {
    setPage(value);
    setPageAndSize({ ...pageAndSize, page: value + 1 });
  }

  function handleChangeRowsPerPage(event) {
    setRowsPerPage(+event.target.value);
    setPageAndSize({ ...pageAndSize, size: event.target.value });
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <FuseLoading />
      </div>
    );
  }

  if (receivableBills?.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.1 } }}
        className="flex flex-1 items-center justify-center h-full"
      >
        <Typography color="text.secondary" variant="h5">
          There are no receivable bills!
        </Typography>
      </motion.div>
    );
  }

  return (
    <div className="w-full flex flex-col min-h-full px-10">
      <FuseScrollbars className="grow overflow-x-auto">
        <PrintReceivableBills
          ref={printVoucherRef}
          title="Receivable Bills"
          type="receipt"
        />
        <TableContainer
          sx={{
            height: "calc(100vh - 248px)",
            overflowY: "auto",
          }}
        >
          <Table stickyHeader className="min-w-xl" aria-labelledby="tableTitle">
            <ReceivableBillsTableHead
              selectedReceivableBillIds={selected}
              tableOrder={tableOrder}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={receivableBills?.length}
              onMenuItemClick={handleDeselect}
            />

            <TableBody>
              {_.orderBy(
                receivableBills,
                [tableOrder.id],
                [tableOrder.direction]
              ).map((n) => {
                const isSelected = selected.indexOf(n.id) !== -1;
                return (
                  <TableRow
                    className="h-20 cursor-pointer border-t-1  border-gray-200"
                    hover
                    role="checkbox"
                    aria-checked={isSelected}
                    tabIndex={-1}
                    key={n.id}
                    selected={isSelected}
                  >
                    {/* <TableCell
										className="w-40 md:w-64 text-center"
										padding="none"
										style={{
											position: 'sticky',
											left: 0,
											zIndex: 1, backgroundColor: '#fff',
											 
										}}
									>
										<Checkbox
											checked={isSelected}
											onClick={(event) => event.stopPropagation()}
											onChange={(event) => handleCheck(event, n.id)}
										/>
									</TableCell> */}

                    <TableCell
                      className="w-40 md:w-64 border-t-1  border-gray-200"
                      component="th"
                      scope="row"
                      style={{
                        position: "sticky",
                        left: 0,
                        zIndex: 1,
                        backgroundColor: "#fff",
                      }}
                    >
                      {pageAndSize.page * pageAndSize.size -
                        pageAndSize.size +
                        serialNumber++}
                    </TableCell>
                    <TableCell
                      className="p-4 md:p-12 whitespace-nowrap border-t-1  border-gray-200"
                      component="th"
                      scope="row"
                    >
                      {n.sales_date &&
                        moment(new Date(n.sales_date)).format(
                          "DD-MM-YYYY"
                        )}{" "}
                    </TableCell>

                    <TableCell
                      className="p-4 md:p-12  whitespace-nowrap	border-t-1  border-gray-200"
                      component="th"
                      scope="row"
                    >
                      {n.branch?.name}
                    </TableCell>
                    <TableCell
                      className="p-4 md:p-12  whitespace-nowrap	border-t-1  border-gray-200"
                      component="th"
                      scope="row"
                    >
                      {n.invoice_no}
                    </TableCell>

                    <TableCell
                      className="p-4 md:p-12  whitespace-nowrap	border-t-1  border-gray-200"
                      component="th"
                      scope="row"
                    >
                      {n?.related_ledgers?.toString()}
                    </TableCell>

                    <TableCell
                      className="p-4 md:p-12  whitespace-nowrap	border-t-1  border-gray-200"
                      component="th"
                      scope="row"
                    >
                      {n.sub_ledger?.name}
                    </TableCell>
                    <TableCell
                      className="p-4 md:p-12  whitespace-nowrap	border-t-1  border-gray-200"
                      component="th"
                      scope="row"
                    >
                      {n.currency?.name}
                    </TableCell>
                    <TableCell
                      className="p-4 md:p-12  whitespace-nowrap	border-t-1  border-gray-200"
                      component="th"
                      scope="row"
                    >
                      {n.currency_rate}
                    </TableCell>
                    <TableCell
                      className="p-4 md:p-12  whitespace-nowrap	border-t-1  border-gray-200"
                      component="th"
                      scope="row"
                    >
                      {n.currency_amount}
                    </TableCell>
                    <TableCell
                      className="p-4 md:p-12  whitespace-nowrap	border-t-1  border-gray-200"
                      component="th"
                      scope="row"
                    >
                      {`${n.details || ""}, ${n.ledger?.name || ""}`}
                    </TableCell>

                    <TableCell
                      className="p-4 md:p-12  whitespace-nowrap	border-t-1  border-gray-200"
                      component="th"
                      scope="row"
                    >
                      {n.amount}
                    </TableCell>
                    <TableCell
                      className="p-4 md:p-16 whitespace-nowrap border-t-1  border-gray-200"
                      component="th"
                      scope="row"
                      align="right"
                      style={{
                        position: "sticky",
                        right: 0,
                        zIndex: 1,
                        backgroundColor: "#fff",
                      }}
                    >
                      <div className="flex flex-nowrap">
                        <PrintIcon
                          className="cursor-pointer custom-print-icon-style"
                          onClick={() => printVoucherRef.current.doPrint(n)}
                        />
                        {hasPermission("SALES_UPDATE") && (
                          <Edit
                            style={{
                              display:
                                n?.update_status === "null" &&
                                moment(new Date(n?.sales_date)).format(
                                  "DD-MM-YYYY"
                                ) != currentDate &&
                                localStorage
                                  .getItem("user_role")
                                  .toLowerCase() != "admin"
                                  ? "block"
                                  : "none",
                            }}
                            onClick={() =>
                              handleUpdateReceivableBillsStatus(
                                n?.invoice_no,
                                "update"
                              )
                            }
                            className="cursor-pointer custom-edit-icon-style"
                          />
                        )}
                        <Edit
                          style={{
                            display:
                              role !== "admin" &&
                              (n?.update_status === "update_canceled" ||
                                n?.update_status === "update_pending" ||
                                n?.update_status === "delete_approved" ||
                                n?.update_status === "delete_pending" ||
                                n?.update_status === "delete_canceled")
                                ? "block"
                                : "none",
                            color: "#b1d9b1",
                          }}
                          onClick={() => setOpenPendingStatusAlert(true)}
                          className="cursor-pointer"
                        />{" "}
                        <Edit
                          style={{
                            display:
                              n?.update_status === "update_approved" ||
                              moment(new Date(n?.sales_date)).format(
                                "DD-MM-YYYY"
                              ) === currentDate ||
                              localStorage.getItem("user_role").toLowerCase() ==
                                "admin"
                                ? "block"
                                : "none",
                          }}
                          onClick={(event) =>
                            handleUpdateReceivableBill(
                              n,
                              "updateReceivableBill"
                            )
                          }
                          className="cursor-pointer custom-edit-icon-style"
                        />{" "}
                        {hasPermission("SALES_DELETE") && (
                          <Delete
                            style={{
                              display:
                                n?.update_status === "null" &&
                                moment(new Date(n?.sales_date)).format(
                                  "DD-MM-YYYY"
                                ) != currentDate &&
                                localStorage
                                  .getItem("user_role")
                                  .toLowerCase() != "admin"
                                  ? "block"
                                  : "none",
                            }}
                            onClick={() =>
                              handleUpdateReceivableBillsStatus(
                                n?.invoice_no,
                                "delete"
                              )
                            }
                            className="cursor-pointer custom-delete-icon-style"
                          />
                        )}
                        <Delete
                          onClick={() =>
                            handleDeleteReceivableBill(
                              n,
                              "deleteReceivableBill"
                            )
                          }
                          className="cursor-pointer custom-delete-icon-style"
                          style={{
                            display:
                              n?.update_status === "delete_approved" ||
                              moment(new Date(n?.sales_date)).format(
                                "DD-MM-YYYY"
                              ) === currentDate ||
                              localStorage.getItem("user_role").toLowerCase() ==
                                "admin"
                                ? "block"
                                : "none",
                          }}
                        />
                        <Delete
                          style={{
                            display:
                              role !== "admin" &&
                              (n?.update_status === "delete_canceled" ||
                                n?.update_status === "delete_pending" ||
                                n?.update_status === "update_pending" ||
                                n?.update_status === "update_approved" ||
                                n?.update_status === "update_canceled")
                                ? "block"
                                : "none",
                            color: "#f1a3a3",
                          }}
                          onClick={() => setOpenCanceledStatusAlert(true)}
                          className="cursor-pointer"
                        />
                        <DataUsage
                          style={{
                            color: "green",
                            display:
                              n?.update_status == "update_pending" &&
                              role !== "admin"
                                ? "block"
                                : "none",
                          }}
                          className="cursor-pointer"
                        />
                        <DataUsage
                          style={{
                            color: "red",
                            display:
                              n?.update_status == "delete_pending" &&
                              role !== "admin"
                                ? "block"
                                : "none",
                          }}
                          className="cursor-pointer"
                        />
                        <PlaylistAddCheck
                          style={{
                            color: "green",
                            display:
                              role !== "admin" &&
                              n?.update_status == "update_approved"
                                ? "block"
                                : "none",
                          }}
                          className="cursor-pointer"
                        />
                        <PlaylistAddCheck
                          style={{
                            color: "red",
                            display:
                              role !== "admin" &&
                              n?.update_status == "delete_approved"
                                ? "block"
                                : "none",
                          }}
                          className="cursor-pointer"
                        />
                        <Cancel
                          style={{
                            color: "green",
                            display:
                              role !== "admin" &&
                              n?.update_status == "update_canceled"
                                ? "block"
                                : "none",
                          }}
                          className="cursor-pointer"
                        />
                        <Cancel
                          style={{
                            color: "red",
                            display:
                              role !== "admin" &&
                              n?.update_status == "delete_canceled"
                                ? "block"
                                : "none",
                          }}
                          className="cursor-pointer"
                        />
                        <Delete
                          onClick={() => deleteAuthorizeRequest(n?.invoice_no)}
                          className="cursor-pointer"
                          style={{
                            fontSize: "14px",
                            color: "red",
                            display:
                              role !== "admin" &&
                              (n?.update_status == "update_canceled" ||
                                n?.update_status == "delete_canceled")
                                ? "block"
                                : "none",
                          }}
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </FuseScrollbars>

      <div className={classes.root} id="pagiContainer">
        <Pagination
          classes={{ ul: "flex-nowrap" }}
          count={totalData?.total_pages}
          page={page + 1}
          defaultPage={1}
          color="primary"
          showFirstButton
          showLastButton
          variant="outlined"
          shape="rounded"
          onChange={handlePagination}
        />

        <TablePagination
          className="shrink-0 border-t-1"
          component="div"
          rowsPerPageOptions={rowsPerPageOptions}
          count={totalData?.total_pages}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            "aria-label": "Previous Page",
          }}
          nextIconButtonProps={{
            "aria-label": "Next Page",
          }}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div>
    </div>
  );
}

export default withRouter(ReceivableBillsTable);
