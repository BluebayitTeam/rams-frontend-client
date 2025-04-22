/* eslint-disable no-nested-ternary */
import FuseLoading from "@fuse/core/FuseLoading";
import FuseScrollbars from "@fuse/core/FuseScrollbars";
import withRouter from "@fuse/core/withRouter";
import _ from "@lodash";
import { Checkbox, Pagination, TableContainer } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import { motion } from "framer-motion";
import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { rowsPerPageOptions } from "src/app/@data/data";

import {
  Delete,
  Edit,
  ViewDay,
  ViewWeek,
  Visibility,
} from "@mui/icons-material";
import { hasPermission } from "src/app/constant/permission/permissionList";
import {
  selectFilteredMakeALists,
  useGetMakeAListsQuery,
} from "../MakeAListsApi";
import MakeAListsTableHead from "./MakeAListsTableHead";
import { makeStyles } from "@mui/styles";

/**
 * The makeALists table.
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

function MakeAListsTable(props) {
  const dispatch = useDispatch();
  const classes = useStyles();

  const { navigate, searchKey } = props;
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const [pageAndSize, setPageAndSize] = useState({ page: 1, size: 25 });
  const { data, isLoading, refetch } = useGetMakeAListsQuery({
    ...pageAndSize,
    searchKey,
  });
  const totalData = useSelector(selectFilteredMakeALists(data));
  const makeALists = useSelector(selectFilteredMakeALists(data?.make_lists));
  let serialNumber = 1;

  useEffect(() => {
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
      setSelected(makeALists.map((n) => n.id));
      return;
    }

    setSelected([]);
  }

  function handleDeselect() {
    setSelected([]);
  }

  function handleClick(item) {
    navigate(`/apps/makeAList/makeALists/${item.id}/${item.handle}`);
  }

  function handleUpdateMakeAList(item, event) {
    localStorage.removeItem("deleteMakeAList");
    localStorage.setItem("updateMakeAList", event);
    navigate(`/apps/makeAList/makeALists/${item.id}/${item.handle}`);
  }

  function handleDeleteMakeAList(item, event) {
    localStorage.removeItem("updateMakeAList");
    localStorage.setItem("deleteMakeAList", event);
    navigate(`/apps/makeAList/makeALists/${item.id}/${item.handle}`);
  }

  function handleMakeAListRow(item) {
    localStorage.removeItem("makeAListEvent");
    navigate(
      `/apps/makeAList/makeALists/makeAListRows/${item.id}/${item.title}`
    );
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

  if (makeALists?.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.1 } }}
        className="flex flex-1 items-center justify-center h-full"
      >
        <Typography color="text.secondary" variant="h5">
          There are no makeALists Managements!
        </Typography>
      </motion.div>
    );
  }

  const user_role = localStorage.getItem("user_role");

  function handleMakeAListColumn(item) {
    localStorage.removeItem("makeAListEvent");
    navigate(
      `/apps/makeAList/makeALists/makeAListColumns/${item.id}/${item.title}`
    );
  }

  return (
    <div className="w-full flex flex-col min-h-full px-10">
      <FuseScrollbars className="grow overflow-x-auto">
        <TableContainer
          sx={{
            height: "calc(100vh - 248px)",
            overflowY: "auto",
          }}
        >
          <Table stickyHeader className="min-w-xl" aria-labelledby="tableTitle">
            <MakeAListsTableHead
              selectedMakeAListIds={selected}
              tableOrder={tableOrder}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={makeALists?.length}
              onMenuItemClick={handleDeselect}
            />

            <TableBody>
              {_.orderBy(
                makeALists,
                [tableOrder.id],
                [tableOrder.direction]
              ).map((n) => {
                const isSelected = selected.indexOf(n.id) !== -1;
                return (
                  <TableRow
                    className="h-20 cursor-pointer "
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
                        position: "sticky",
                        left: 0,
                        zIndex: 1,
                        backgroundColor: "#fff",
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
                      className="p-4 md:p-16 border-t-1  border-gray-200"
                      component="th"
                      scope="row"
                    >
                      {n.make_date
                        ? moment(n.make_date).format("DD-MM-YYYY")
                        : "Invalid Date"}
                    </TableCell>
                    <TableCell
                      className="p-4 md:p-16 border-t-1  border-gray-200"
                      component="th"
                      scope="row"
                    >
                      {n.title}
                    </TableCell>
                    <TableCell
                      className="p-4 md:p-16 border-t-1  border-gray-200"
                      component="th"
                      scope="row"
                    >
                      {n.note}
                    </TableCell>
                    <TableCell className="p-4 md:p-16 border-t-1  border-gray-200">
                      <div>
                        {hasPermission("MAKE_LIST_UPDATE") && (
                          <ViewWeek
                            onClick={() => handleMakeAListColumn(n)}
                            className="cursor-pointer mr-14"
                            style={{ color: "blue" }}
                          />
                        )}
                        {hasPermission("MAKE_LIST_UPDATE") && (
                          <ViewDay
                            onClick={() => handleMakeAListRow(n)}
                            className="cursor-pointer mr-14"
                            style={{ color: "orange" }}
                          />
                        )}
                        {hasPermission("MAKE_LIST_UPDATE") && (
                          <Visibility
                            onClick={() => handleMakeAListReport(n)}
                            className="cursor-pointer mr-14"
                            style={{ color: "#00c7f3" }}
                          />
                        )}

                        {hasPermission("MAKE_LIST_UPDATE") && (
                          <Edit
                            onClick={() => handleUpdateMakeAList(n)}
                            className="cursor-pointer mr-14"
                            style={{ color: "green" }}
                          />
                        )}

                        {hasPermission("MAKE_LIST_DELETE") && (
                          <Delete
                            onClick={() => handleDeleteMakeAList(n, "Delete")}
                            className="cursor-pointer mr-15"
                            style={{
                              color: "red",
                            }}
                          />
                        )}
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
          className="shrink-0 "
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

export default withRouter(MakeAListsTable);
