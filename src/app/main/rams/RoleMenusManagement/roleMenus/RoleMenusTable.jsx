/* eslint-disable no-nested-ternary */
import FuseLoading from "@fuse/core/FuseLoading";
import FuseScrollbars from "@fuse/core/FuseScrollbars";
import withRouter from "@fuse/core/withRouter";
import _ from "@lodash";
import { Delete, Edit } from "@mui/icons-material";
import { Pagination, TableContainer } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import {
  getBranches,
  getCities,
  getCountries,
  getRoles,
  getThanas,
} from "app/store/dataSlice";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { rowsPerPageOptions } from "src/app/@data/data";
import { hasPermission } from "src/app/constant/permission/permissionList";
import { selectFilteredRoleMenus, useGetRoleMenusQuery } from "../RoleMenusApi";
import RoleMenusTableHead from "./RoleMenusTableHead";
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
function RoleMenusTable(props) {
  const dispatch = useDispatch();
  const classes = useStyles();

  const { navigate, searchKey } = props;
  const [pageAndSize, setPageAndSize] = useState({ page: 1, size: 25 });

  const { data, isLoading, refetch } = useGetRoleMenusQuery({
    ...pageAndSize,
    searchKey,
  });

  console.log("sdsdsds", data);

  const totalData = useSelector(selectFilteredRoleMenus(data));
  const roleMenus = useSelector(selectFilteredRoleMenus(data?.role_menus));
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(50);
  let serialNumber = 1;

  useEffect(() => {
    refetch({ page, rowsPerPage });
  }, [page, rowsPerPage]);
  useEffect(() => {
    dispatch(getBranches());
    dispatch(getThanas());
    dispatch(getRoles());
    dispatch(getCities());
    dispatch(getCountries());
  }, []);
  const [selected, setSelected] = useState([]);
  useEffect(() => {
    refetch({ searchKey });
  }, [searchKey]);
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
      setSelected(roleMenus.map((n) => n.id));
      return;
    }

    setSelected([]);
  }

  function handleDeselect() {
    setSelected([]);
  }

  function handleClick(item) {
    navigate(`/apps/roleMenu/roleMenus/${item.id}/${item.handle}`);
  }

  function handleUpdateRoleMenu(item, event) {
    localStorage.removeItem("deleteRoleMenu");
    localStorage.setItem("updateRoleMenu", event);
    navigate(`/apps/roleMenu/roleMenus/${item.id}/${item.handle}`);
  }

  function handleDeleteRoleMenu(item, event) {
    localStorage.removeItem("updateRoleMenu");
    localStorage.setItem("deleteRoleMenu", event);
    navigate(`/apps/roleMenu/roleMenus/${item.id}/${item.handle}`);
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

  if (roleMenus?.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.1 } }}
        className="flex flex-1 items-center justify-center h-full"
      >
        <Typography color="text.secondary" variant="h5">
          There are no roleMenus!
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
            <RoleMenusTableHead
              selectedRoleMenuIds={selected}
              tableOrder={tableOrder}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={roleMenus?.length}
              onMenuItemClick={handleDeselect}
            />

            <TableBody>
              {_.orderBy(
                roleMenus,
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
                      {n.role}
                    </TableCell>
                    <TableCell
                      className="p-4 md:p-16 border-t-1  border-gray-200"
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
                      {hasPermission("ROLE_MENU_UPDATE") && (
                        <Edit
                          onClick={(event) =>
                            handleUpdateRoleMenu(n, "updateRoleMenu")
                          }
                          className="cursor-pointer custom-edit-icon-style"
                        />
                      )}

                      {hasPermission("ROLE_MENU_DELETE") && (
                        <Delete
                          onClick={(event) =>
                            handleDeleteRoleMenu(n, "deleteRoleMenu")
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

export default withRouter(RoleMenusTable);
