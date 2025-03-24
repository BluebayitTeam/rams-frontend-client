/* eslint-disable no-console */
/* eslint-disable array-callback-return */
/* eslint-disable no-undef */
/* eslint-disable no-plusplus */
/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable no-nested-ternary */
import FuseLoading from "@fuse/core/FuseLoading";
import withRouter from "@fuse/core/withRouter";
import { zodResolver } from "@hookform/resolvers/zod";
import _ from "@lodash";
import { Delete, Edit } from "@mui/icons-material";
import { Pagination, TableCell, TableContainer } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";
import { motion } from "framer-motion";
import moment from "moment";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { rowsPerPageOptions } from "src/app/@data/data";
import { BASE_URL } from "src/app/constant/constants";
import { hasPermission } from "src/app/constant/permission/permissionList";
import {
  selectFilteredPassengers,
  useGetPassengersQuery,
} from "../PassengersApi";
import PassengersTableHead from "./PassengersTableHead";

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
function PassengersTable(props) {
  const dispatch = useDispatch();
  const classes = useStyles();

  const routeParams = useParams();
  console.log("routeParams", routeParams);
  const { passengerType } = routeParams;

  const { navigate, searchKey } = props;
  const { reset, formState, watch, control, getValues, setValue } = useForm({
    mode: "onChange",
    resolver: zodResolver(),
  });
  const [pageAndSize, setPageAndSize] = useState({ page: 1, size: 25 });
  const [openModal, setOpenModal] = useState(false);
  const { data, isLoading, refetch } = useGetPassengersQuery({
    ...pageAndSize,
    searchKey,
    name: passengerType,
  });
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const totalData = useSelector(selectFilteredPassengers(data));
  const passengers = useSelector(selectFilteredPassengers(data?.passengers));

  const [singlePassengerDetails, setSinglePassengerDetails] = useState({});
  const [passengerPackagePrice, setPassengerPackagePrice] = useState(0);

  const { paymentStaus } = routeParams;
  useEffect(() => {
    refetch({ searchKey });
  }, [searchKey]);

  let serialNumber = 1;

  const [rows, setRows] = useState([]);
  useEffect(() => {
    // Fetch data with specific page and size when component mounts or when page and size change
    refetch({ page, rowsPerPage, name: passengerType });
  }, [page, rowsPerPage]);
  useEffect(() => {
    if (totalData?.passengers) {
      const modifiedRow = [
        {
          id: "sl",
          align: "left",
          disablePadding: false,
          label: "SL",
          sort: true,
        },
      ];

      Object.entries(totalData?.passengers[0] || {})
        .filter(([key]) => key !== "id" && key !== "random_number")
        .map(([key, value]) => {
          modifiedRow.push({
            id: key,
            label: key
              .split("_")
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(" "),
            align: "left",
            disablePadding: false,
            sort: true,
            style: { whiteSpace: "nowrap" },
          });
        });

      modifiedRow.push({
        id: "action",
        align: "left",
        disablePadding: false,
        label: "Action",
        sort: true,
      });

      setRows(modifiedRow);
    }
  }, [totalData?.passengers]);
  const [open, setOpen] = useState(false);

  console.log("open", open);
  const methods = useForm({
    mode: "onChange",
    defaultValues: {},
  });
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
      setSelected(passengers?.map((n) => n?.id));
      return;
    }

    setSelected([]);
  }

  function handleDeselect() {
    setSelected([]);
  }

  function handleClick(item) {
    navigate(`/apps/passenger/passengers/${item?.id}/${passengerType}`);
  }

  function handleUpdatePassenger(item) {
    console.log("item", item);
    localStorage.removeItem("passengerEvent");

    navigate(`/apps/passenger/passengers/${item?.id}/${passengerType}`);
  }

  function handleDeletePassenger(item, passengerEvent) {
    localStorage.removeItem("passengerEvent");
    localStorage.setItem("passengerEvent", passengerEvent);
    navigate(`/apps/passenger/passengers/${item?.id}/${passengerType}`);
  }

  function handleCheck(event, id) {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
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

  if (passengers?.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.1 } }}
        className="flex flex-1 items-center justify-center h-full"
      >
        <Typography color="text.secondary" variant="h5">
          There are no passengers!
        </Typography>
      </motion.div>
    );
  }

  return (
    <div className="w-full flex flex-col min-h-full px-10 ">
      <div className="grow overflow-x-auto overflow-y-auto">
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
            <PassengersTableHead
              selectedPassengerIds={selected}
              tableOrder={tableOrder}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={passengers?.length}
              onMenuItemClick={handleDeselect}
              rows={rows}
            />

            <TableBody>
              {_.orderBy(
                passengers,
                [tableOrder?.id],
                [tableOrder.direction]
              ).map((n) => {
                const isSelected = selected.indexOf(n?.id) !== -1;
                return (
                  <TableRow
                    className="h-20 cursor-pointer border-t-1  border-gray-200"
                    hover
                    role="checkbox"
                    aria-checked={isSelected}
                    tabIndex={-1}
                    key={n?.id}
                    selected={isSelected}
                  >
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
                    {Object?.entries(n)?.map(
                      ([key, value]) =>
                        key !== "id" &&
                        key !== "random_number" && (
                          <TableCell
                            className="p-4 md:p-16 border-t-1  border-gray-200 "
                            component="th"
                            scope="row"
                            key={key}
                          >
                            {key === "passenger_pic" ? (
                              <img
                                className="h-full block rounded"
                                style={{
                                  height: "50px",
                                  width: "50px",
                                  borderRadius: "50%",
                                  marginRight: "15px",
                                }}
                                // src={`${BASE_URL}${n[key]}`}

                                src={
                                  n[key]
                                    ? `${BASE_URL}${n[key]}`
                                    : "/assets/images/logos/user.jpg"
                                }
                                alt={n.first_name}
                              />
                            ) : key === "passport_pic" ? (
                              <img
                                className="h-full block rounded"
                                style={{
                                  height: "50px",
                                  width: "50px",
                                  borderRadius: "50%",
                                  marginRight: "15px",
                                }}
                                src={
                                  n[key]
                                    ? `${BASE_URL}${n[key]}`
                                    : "assets/images/logos/passport.png"
                                }
                                alt={n.first_name}
                              />
                            ) : key === "passport_expiry_date" && n[key] ? (
                              moment(new Date(n[key])).format("DD-MM-YYYY")
                            ) : key === "passport_issue_date" && n[key] ? (
                              moment(new Date(n[key])).format("DD-MM-YYYY")
                            ) : key === "date_of_birth" && n[key] ? (
                              moment(new Date(n[key])).format("DD-MM-YYYY")
                            ) : (
                              value
                            )}
                          </TableCell>
                        )
                    )}

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
                      {hasPermission("PASSENGER_UPDATE") && (
                        <Edit
                          onClick={(passengerEvent) => handleUpdatePassenger(n)}
                          className="cursor-pointer custom-edit-icon-style"
                        />
                      )}

                      {hasPermission("PASSENGER_DELETE") && (
                        <Delete
                          onClick={(event) =>
                            handleDeletePassenger(n, "Delete")
                          }
                          className="cursor-pointer custom-delete-icon-style"
                        />
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      <div className={classes.root} id="pagiContainer">
        <Pagination
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
          className="shrink-0"
          component="div"
          rowsPerPageOptions={rowsPerPageOptions}
          count={totalData?.total_elements}
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

export default withRouter(PassengersTable);
