/* eslint-disable no-nested-ternary */
import FuseScrollbars from "@fuse/core/FuseScrollbars";
import _ from "@lodash";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import withRouter from "@fuse/core/withRouter";
import FuseLoading from "@fuse/core/FuseLoading";
import { useSelector, useDispatch } from "react-redux";
import { rowsPerPageOptions } from "src/app/@data/data";
import { Pagination, TableContainer } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import PermissionsTableHead from "./PermissionsTableHead";
import {
  selectFilteredPermissions,
  useGetPermissionsQuery,
} from "../PermissionsApi";
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

function PermissionsTable(props) {
  const dispatch = useDispatch();
  const classes = useStyles();

  const { navigate, searchKey } = props;
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const [pageAndSize, setPageAndSize] = useState({ page: 1, size: 25 });
  const { data, isLoading, refetch } = useGetPermissionsQuery({
    ...pageAndSize,
    searchKey,
  });
  const totalData = useSelector(selectFilteredPermissions(data));

  const permissions = useSelector(selectFilteredPermissions(data?.permissions));
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
      setSelected(permissions.map((n) => n.id));
      return;
    }

    setSelected([]);
  }

  function handleDeselect() {
    setSelected([]);
  }

  function handleClick(item) {
    navigate(`/apps/permission/permissions/${item.id}/${item.handle}`);
  }

  function handleUpdatePermission(item, event) {
    localStorage.removeItem("deletePermission");
    localStorage.setItem("updatePermission", event);
    navigate(`/apps/permission/permissions/${item.id}/${item.handle}`);
  }

  function handleDeletePermission(item, event) {
    localStorage.removeItem("updatePermission");
    localStorage.setItem("deletePermission", event);
    navigate(`/apps/permission/permissions/${item.id}/${item.handle}`);
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

  if (permissions.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.1 } }}
        className="flex flex-1 items-center justify-center h-full"
      >
        <Typography color="text.secondary" variant="h5">
          There are no permissions!
        </Typography>
      </motion.div>
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
            <PermissionsTableHead
              selectedPermissionIds={selected}
              tableOrder={tableOrder}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={permissions.length}
              onMenuItemClick={handleDeselect}
            />

            <TableBody>
              {_.orderBy(
                permissions,
                [tableOrder.id],
                [tableOrder.direction]
              ).map((n) => {
                const isSelected = selected.indexOf(n.id) !== -1;
                return (
                  <TableRow
                    className="h-20 cursor-pointer"
                    hover
                    role="checkbox"
                    aria-checked={isSelected}
                    tabIndex={-1}
                    key={n.id}
                    selected={isSelected}
                  >
                    <TableCell
                      className="w-40 w-1/3 md:w-64 border-t-1  border-gray-200"
                      component="th"
                      scope="row"
                    >
                      {pageAndSize.page * pageAndSize.size -
                        pageAndSize.size +
                        serialNumber++}{" "}
                    </TableCell>

                    <TableCell
                      className="p-4 w-1/3 md:p-12  whitespace-nowrap border-t-1  border-gray-200	"
                      component="th"
                      scope="row"
                    >
                      {n.name}
                    </TableCell>

                    <TableCell
                      className="p-4 w-1/3 md:p-12  whitespace-nowrap border-t-1  border-gray-200	"
                      align="center"
                      component="th"
                      scope="row"
                    >
                      <div>
                        <Edit
                          onClick={() =>
                            handleUpdatePermission(n, "updatePermission")
                          }
                          className="cursor-pointer custom-edit-icon-style"
                        />

                        <Delete
                          onClick={() =>
                            handleDeletePermission(n, "deletePermission")
                          }
                          className="cursor-pointer custom-delete-icon-style"
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

export default withRouter(PermissionsTable);
