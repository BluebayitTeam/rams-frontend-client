/* eslint-disable no-plusplus */
/* eslint-disable array-callback-return */
/* eslint-disable no-undef */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-nested-ternary */

import FuseLoading from "@fuse/core/FuseLoading";
import withRouter from "@fuse/core/withRouter";
import _ from "@lodash";
import PrintIcon from "@mui/icons-material/Print";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

import PrintMaleCv from "@fuse/utils/Print/PrintMaleCv";
import { zodResolver } from "@hookform/resolvers/zod";
import { Delete, Edit, PictureAsPdf } from "@mui/icons-material";
import DescriptionIcon from "@mui/icons-material/Description";
import { Pagination, TableCell, TableContainer } from "@mui/material";
import { makeStyles } from "@mui/styles";
import moment from "moment";
import { useForm } from "react-hook-form";
import { rowsPerPageOptions } from "src/app/@data/data";
import { BASE_URL } from "src/app/constant/constants";
import { selectFilteredCvMales, useGetCvMalesQuery } from "../CvMalesApi";
import CvMalesTableHead from "./CvMalesTableHead";
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
function CvMalesTable(props) {
  const { navigate, searchKey } = props;
  const classes = useStyles();

  const { _setValue } = useForm({
    mode: "onChange",
    resolver: zodResolver(),
  });

  const [pageAndSize, setPageAndSize] = useState({ page: 1, size: 25 });
  const { data, isLoading, refetch } = useGetCvMalesQuery({
    ...pageAndSize,
    searchKey,
  });
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const totalData = useSelector(selectFilteredCvMales(data));
  const maleCvs = useSelector(selectFilteredCvMales(data?.male_cvs));
  const printMaleCvRef = useRef();
  useEffect(() => {
    refetch({ searchKey });
  }, [searchKey]);

  let serialNumber = 1;

  const [rows, setRows] = useState([]);
  useEffect(() => {
    // Fetch data with specific page and size when component mounts or when page and size change
    refetch({ page, rowsPerPage });
  }, [page, rowsPerPage]);

  useEffect(() => {
    if (totalData?.male_cvs) {
      const modifiedRow = [
        {
          id: "sl",
          align: "left",
          disablePadding: false,
          label: "SL",
          sort: true,
        },
      ];

      Object.entries(totalData?.male_cvs[0] || {})
        .filter(([key]) => key !== "id" && key !== "random_number") // Filter out the 'id' and 'random_number' fields
        .map(([key]) => {
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
  }, [totalData?.male_cvs]);

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
      setSelected(maleCvs.map((n) => n.id));
      return;
    }

    setSelected([]);
  }

  function handleDeselect() {
    setSelected([]);
  }

  function _handleClick(item) {
    navigate(`/apps/cvMale/cvMales/${item.id}`);
  }

  function handleUpdateCvMale(item, event) {
    localStorage.removeItem("deleteCvMale");
    localStorage.setItem("updateCvMale", event);
    navigate(`/apps/cvMale/cvMales/${item.id}`);
  }

  function handleDeleteCvMale(item, event) {
    localStorage.removeItem("updateCvMale");
    localStorage.setItem("deleteCvMale", event);
    navigate(`/apps/cvMale/cvMales/${item.id}`);
  }

  function _handleCheck(event, id) {
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

  if (maleCvs?.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.1 } }}
        className="flex flex-1 items-center justify-center h-full"
      >
        <Typography color="text.secondary" variant="h5">
          There are no male Cv !
        </Typography>
      </motion.div>
    );
  }

  return (
    <div className="w-full flex flex-col min-h-full px-10 ">
      <div className="grow overflow-x-auto overflow-y-auto">
        <PrintMaleCv ref={printMaleCvRef} title="printMaleCv" type="CV" />
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
            <CvMalesTableHead
              selectedCvMaleIds={selected}
              tableOrder={tableOrder}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={maleCvs?.length}
              onMenuItemClick={handleDeselect}
              rows={rows}
            />

            <TableBody>
              {_.orderBy(maleCvs, [tableOrder.id], [tableOrder.direction])
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((n) => {
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
                        {serialNumber++}
                      </TableCell>

                      {Object.entries(n).map(
                        ([key, value]) =>
                          key !== "id" &&
                          key !== "random_number" && (
                            <TableCell
                              className="p-4 md:p-16 border-t-1 border-gray-200"
                              component="th"
                              scope="row"
                              key={key}
                            >
                              {key === "image" ? (
                                n[key]?.split(".").pop()?.toLowerCase() ===
                                "pdf" ? (
                                  <PictureAsPdf
                                    style={{
                                      color: "red",
                                      cursor: "pointer",
                                      display: "block",
                                      fontSize: "35px",
                                    }}
                                    onClick={() =>
                                      window.open(`${BASE_URL}${n[key]}`)
                                    }
                                  />
                                ) : ["doc", "docx"].includes(
                                    n[key]?.split(".").pop()?.toLowerCase()
                                  ) ? (
                                  <DescriptionIcon
                                    style={{
                                      color: "blue",
                                      cursor: "pointer",
                                      display: "block",
                                      fontSize: "35px",
                                    }}
                                    onClick={() =>
                                      window.open(`${BASE_URL}${n[key]}`)
                                    }
                                  />
                                ) : (
                                  <img
                                    onClick={() =>
                                      n.file &&
                                      showImage(`${BASE_URL}${n[key]}`)
                                    }
                                    src={
                                      n[key]
                                        ? `${BASE_URL}${n[key]}`
                                        : "/assets/images/logos/user.jpg"
                                    }
                                    style={{
                                      height: "40px",
                                      width: "40px",
                                      borderRadius: "50%",
                                    }}
                                    alt="uploaded file"
                                  />
                                )
                              ) : (key === "created_at" ||
                                  key === "flight_date") &&
                                n[key] ? (
                                moment(new Date(n[key])).format("DD-MM-YYYY")
                              ) : (key === "is_debtor" || key === "is_paid") &&
                                n[key] !== undefined ? (
                                n[key] ? (
                                  "Yes"
                                ) : (
                                  "No"
                                )
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
                        <PrintIcon
                          className="cursor-pointer custom-print-icon-style text-3xl"
                          onClick={() => printMaleCvRef.current.doPrint(n)}
                        />
                        <Edit
                          onClick={() => handleUpdateCvMale(n, "updateCvMale")}
                          className="cursor-pointer custom-edit-icon-style"
                        />

                        <Delete
                          onClick={() => handleDeleteCvMale(n, "deleteCvMale")}
                          className="cursor-pointer custom-delete-icon-style"
                        />
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

export default withRouter(CvMalesTable);
