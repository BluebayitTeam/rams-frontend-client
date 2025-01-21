/* eslint-disable no-nested-ternary */
import FuseLoading from "@fuse/core/FuseLoading";
import FuseScrollbars from "@fuse/core/FuseScrollbars";
import withRouter from "@fuse/core/withRouter";
import _ from "@lodash";
import { Delete, Edit } from "@mui/icons-material";
import ScheduleSendIcon from "@mui/icons-material/ScheduleSend";
import { Box, Button, Checkbox, FormControl, FormControlLabel, Modal, Pagination, TableContainer } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from "react-redux";
import { rowsPerPageOptions, weeks } from "src/app/@data/data";
import { CREATE_SHIFT_DAYTIME, GET_TIMETABLE_BY_SHIFT_ID } from "src/app/constant/constants.js";
import { hasPermission } from "src/app/constant/permission/permissionList";
import { selectFilteredShifts, useGetShiftsQuery, useGetShiftTimetableQuery, useGetTimetablesQuery } from "../ShiftApi.js";
import ShiftsTableHead from "./ShiftsTableHead.jsx";
import WeekTable from "./WeekTable.jsx";
// import { getShifts, getTimetables } from 'app/store/dataSlice';

/**
 * The Shift table.
 */
function ShiftsTable(props) {
  const dispatch = useDispatch();
  const { navigate, searchKey } = props;
  const [page, setPage] = useState(0);
  const [open, setOpen] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const [timeId, setTimeId] = useState(null);
  const [shiftName, setShiftName] = useState('');
  const [timeIdUpdate, setTimeIdUpdate] = useState(null);
  const [newShiftId, setNewShitId] = useState(0);
  const [shifId, setShifId] = useState(null);
  const [shiftChecked, setShiftChecked] = useState({});
  const [pageAndSize, setPageAndSize] = useState({ page: 1, size: 25 });
  // const [timetable, setTimetable] = useState([]);
  // const timetable = useSelector(state => state.data.timetables);
  const { data: timetable } = useGetTimetablesQuery({
    ...pageAndSize,
    searchKey,
  });
  const { data: shiftTimetable, reftech: refetchShiftTimetable } = useGetShiftTimetableQuery({
    ...pageAndSize,
    searchKey,
  });

  const { data, isLoading, refetch } = useGetShiftsQuery({
    ...pageAndSize,
    searchKey,
  });
  const methods = useForm({
    mode: 'onChange',
    defaultValues: {
      sunday: false,
      monday: false,
      tuesday: false,
      wednesday: false,
      thursday: false,
      friday: false,
      saturday: false
    }
  });

  console.log("timetable", timetable);
  const totalData = useSelector(selectFilteredShifts(data));
  const shifts = useSelector(selectFilteredShifts(data?.shifts));
  let serialNumber = 1;

  const { control, formState, setValue, getValues } = methods || {};

  const handleChange = id => {
    setShiftChecked({ [id]: true });
  };

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
      setSelected(shifts.map((n) => n.id));
      return;
    }

    setSelected([]);
  }

  function handleDeselect() {
    setSelected([]);
  }

  function handleClick(item) {
    navigate(`/apps/shifts-management/shifts/${item.id}/${item.handle}`);
  }

  function handleUpdateShift(item, event) {
    localStorage.removeItem("deleteShift");
    localStorage.setItem("updateShift", event);
    navigate(`/apps/shifts-management/shifts/${item.id}`);
  }

  function handleDeleteShift(item, event) {
    localStorage.removeItem("updateShift");
    localStorage.setItem("deleteShift", event);
    navigate(`/apps/shifts-management/shifts/${item.id}`);
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

  if (shifts?.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.1 } }}
        className="flex flex-1 items-center justify-center h-full"
      >
        <Typography color="text.secondary" variant="h5">
          There are no shift time tables!
        </Typography>
      </motion.div>
    );
  }

  const handleOpen = shift => {

    setShiftName(shift.name);
    timetable?.shift_timetables?.find(e => setValue(`${e.name}`, false));

    axios
      .get(`${GET_TIMETABLE_BY_SHIFT_ID}${shift.id}`, {
        headers: {
          'Content-type': 'application/json',
          Authorization: localStorage.getItem('jwt_access_token')
        }
      })
      .then(res => {
        console.log("shift_data", res.data);
        // return;
        setShifId(res.data?.id);
        setTimeIdUpdate(res.data?.timetable.id);
        setValue('sunday', res.data?.sunday);
        setValue('monday', res.data?.monday);
        setValue('tuesday', res.data?.tuesday);
        setValue('wednesday', res.data?.wednesday);
        setValue('thursday', res.data?.thursday);
        setValue('friday', res.data?.friday);
        setValue('saturday', res.data?.saturday);
        setShiftChecked({ [res.data?.timetable.id]: true });
      });
    setNewShitId(shift.id);

    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const shiftId = e => {
    localStorage.setItem('shiftId', e);
    // refetchShiftTimetable();
    // dispatch(getShiftTimetable(e));
  };

  function handleSaveShiftTimetable() {
    const timeData = getValues();
    timeData.id = shifId ?? null;
    timeData.timetable = timeId || timeIdUpdate;
    timeData.shift = newShiftId;

    axios
      .post(`${CREATE_SHIFT_DAYTIME}`, timeData, {
        headers: {
          'Content-type': 'application/json',
          Authorization: localStorage.getItem('jwt_access_token')
        }
      })
      .then(res => {
        console.log("shift_data", res, shifId);

        setOpen(false);
        // refetchShiftTimetable();
        // dispatch(getShiftTimetable(shifId));
      });
  }

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 700,
    bgcolor: '#111827',
    border: '2px solid #000',
    boxShadow: 24,
    p: 2,
  };

  return (
    <div className="w-full flex flex-col min-h-full px-10">
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <FormProvider {...methods}>
            <div
              className="px-32"
              style={{
                display: 'flex',
                justifyContent: 'space-evenly',
                marginTop: '2rem'
              }}
            >
              <div
                style={{
                  border: '2px solid white',
                  width: '100%',
                  height: '350px',
                  color: 'black',
                  backgroundColor: 'whitesmoke'
                }}
              >
                <div>
                  <p className="font-medium">
                    Select <span className="font-bold">{shiftName}</span> category for this time
                    period
                  </p>
                </div>
                {timetable?.shift_timetables?.map((support, index) => (
                  <div style={{ display: 'flex' }} key={index}>
                    <Controller
                      name={support?.name}
                      control={control}
                      render={({ field }) => {
                        return (
                          <FormControl>
                            <FormControlLabel
                              label={support?.name}
                              control={
                                <Checkbox
                                  {...field}
                                  checked={
                                    shiftChecked[support?.id] ||
                                    // field.value ||
                                    false
                                  }
                                  onChange={event => {
                                    handleChange(support?.id);
                                  }}
                                  onClick={e => {
                                    setShiftChecked({ [support?.id]: true });
                                    e.target.checked === true
                                      ? setTimeId(support.id)
                                      : 0;
                                  }}
                                // onChange={e =>
                                // 	e.target.checked === true ? support.id : 0
                                // }
                                />
                              }
                            />
                          </FormControl>
                        );
                      }}
                    />


                  </div>
                ))}
              </div>
              <div
                style={{
                  border: '2px solid white',
                  width: '100%',
                  height: '350px',
                  color: 'black',
                  backgroundColor: 'whitesmoke'
                }}
              >
                {weeks?.map(day => (
                  <div
                    key={day?.name}
                    style={{ display: 'flex', alignItems: 'center', }}
                  >
                    <Controller
                      name={day?.name}
                      control={control}
                      render={({ field }) => (
                        <FormControl>
                          <FormControlLabel
                            style={{ width: '100px', marginRight: '22px' }}
                            label={day?.name}
                            control={
                              <Checkbox
                                {...field}
                                checked={field.value ? field.value : false}
                              />
                            }
                          />
                        </FormControl>
                      )}
                    />
                    {/* Uncomment and adjust the following block if you want to include radio buttons as well */}
                    {/* <input
				style={{ margin: '5px' }}
				type="radio"
				id={support?.name}
				name="radio"
				value="30"
			></input>
			<label htmlFor={support?.name}>
				{support?.name}
			</label> */}
                  </div>
                ))}
              </div>
            </div>
          </FormProvider>
          <div className="flex justify-end mr-32">
            <Button
              className="whitespace-nowrap mx-4"
              variant="contained"
              color="secondary"
              style={{ backgroundColor: '#22d3ee' }}
              // disabled={!name || _.isEmpty(name)}
              onClick={handleSaveShiftTimetable}
            >
              Save
            </Button>
          </div>
        </Box>
      </Modal>
      <FuseScrollbars className="grow overflow-x-auto grid grid-cols-2 gap-16">

        <div className="p-4 mt-10">
          <Typography
            variant="h6"
            className="my-10"
          >
            Shift Management
          </Typography>
          <TableContainer
          // sx={{
          //   height: 'calc(100vh - 250px)',
          //   overflowY: 'auto',
          // }}
          >
            <Table stickyHeader aria-labelledby="tableTitle">
              <ShiftsTableHead
                selectedShiftIds={selected}
                tableOrder={tableOrder}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={shifts.length}
                onMenuItemClick={handleDeselect}
              />

              <TableBody>
                {_.orderBy(shifts, [tableOrder.id], [tableOrder.direction]).map(
                  (n) => {
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
                      </TableCell> */}
                        <TableCell
                          className="p-4 md:p-16 border-t-1  border-gray-200 text-xs"
                          component="th"
                          scope="row"
                        >
                          {n.name}
                        </TableCell>
                        <TableCell
                          className="p-4 md:p-16 border-t-1  border-gray-200 text-xs"
                          component="th"
                          scope="row"
                        >
                          {n.start_date}
                        </TableCell>
                        <TableCell
                          className="p-4 md:p-16 border-t-1  border-gray-200 text-xs"
                          component="th"
                          scope="row"
                        >
                          {n.end_date}
                        </TableCell>
                        <TableCell
                          className="p-4 md:p-16 border-t-1  border-gray-200 text-xs"
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
                          {hasPermission("TODO_TASK_TYPE_UPDATE") && (
                            <Edit
                              onClick={() => handleUpdateShift(n, "updateShift")}
                              className="cursor-pointer custom-edit-icon-style"
                            />
                          )}

                          {hasPermission("TODO_TASK_TYPE_DELETE") && (
                            <Delete
                              onClick={() => handleDeleteShift(n, "deleteShift")}
                              className="cursor-pointer custom-delete-icon-style"
                            />
                          )}
                        </TableCell>
                        <TableCell
                          className="p-4 mx-auto md:p-16 border-t-1  border-gray-200 text-center text-xs"
                          component="th"
                          scope="row"
                        >
                          <ScheduleSendIcon
                            onClick={(event) => handleOpen(n)}
                            style={{ color: "gray", fontSize: "25px" }}
                          />
                        </TableCell>
                      </TableRow>
                    );
                  }
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        <div>
          <WeekTable />
        </div>
      </FuseScrollbars>

      <div id="pagiContainer">
        <Pagination
          // classes={{ ul: 'flex-nowrap' }}
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

export default withRouter(ShiftsTable);
