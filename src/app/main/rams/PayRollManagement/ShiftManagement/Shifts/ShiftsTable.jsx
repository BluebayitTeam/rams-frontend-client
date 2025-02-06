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
import { makeStyles } from "@mui/styles";
import { getShiftTimetableById } from "app/store/dataSlice.js";
import axios from "axios";
import { motion } from 'framer-motion';
import { useEffect, useState } from "react";
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from "react-redux";
import { rowsPerPageOptions, weeks } from "src/app/@data/data";
import { CREATE_SHIFT_DAYTIME, GET_TIMETABLE_BY_SHIFT_ID } from "src/app/constant/constants.js";
import { selectFilteredShifts, useGetShiftsQuery, useGetTimetablesQuery } from "../ShiftApi.js";
import ShiftsTableHead from "./ShiftsTableHead.jsx";
import WeekTable from "./WeekTable.jsx";
// import { getShifts, getTimetables } from 'app/store/dataSlice';

/**
 * The Shift table.
 */

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    // position: 'fixed',
    // bottom: 12,
    padding: '0px 20px 0px 20px',
    backgroundColor: '#fff',
    // zIndex: 1000,
    borderTop: '1px solid #ddd',
    // width: 'calc(100% - 350px)',
  },
  paginationContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    padding: '0 20px',
  },
  pagination: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
}));

function ShiftsTable(props) {
  const dispatch = useDispatch();
  const classes = useStyles();
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
  const [selectedRow, setSelectedRow] = useState(null);
  const [pageAndSize, setPageAndSize] = useState({ page: 1, size: 25 });
  // const [timetable, setTimetable] = useState([]);
  // const timetable = useSelector(state => state.data.timetables);
  const { data: timetable } = useGetTimetablesQuery(); // shift time table without pagination

  // const { data: shiftTimetable, reftech: refetchShiftTimetable } = useGetShiftTimetableQuery({
  //   ...pageAndSize,
  //   searchKey,
  // });

  const { data, isLoading, refetch } = useGetShiftsQuery({
    ...pageAndSize,
    searchKey,
  });

  // console.log("all_shifts_data", timetable, data)

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

  // console.log("timetable", timetable);
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
    navigate(`/apps/shift/shifts/${item.id}/${item.handle}`);
  }

  function handleUpdateShift(item, event) {
    localStorage.removeItem("deleteShift");
    localStorage.setItem("updateShift", event);
    navigate(`/apps/shift/shifts/${item.id}`);
  }

  function handleDeleteShift(item, event) {
    localStorage.removeItem("updateShift");
    localStorage.setItem("deleteShift", event);
    navigate(`/apps/shift/shifts/${item.id}`);
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
    setNewShitId(shift.id);
    timetable?.shift_timetables?.find(e => setValue(`${e.name}`, false));

    axios
      .get(`${GET_TIMETABLE_BY_SHIFT_ID}${shift.id}`, {
        headers: {
          'Content-type': 'application/json',
          Authorization: localStorage.getItem('jwt_access_token')
        }
      })
      .then(res => {
        // console.log("shift_data", res.data);
        localStorage.setItem('shiftId', res?.data?.daytime?.id);
        setShifId(res?.data?.daytime?.id);
        setTimeIdUpdate(res?.data?.daytime?.timetable.id);
        setValue('sunday', res?.data?.daytime?.sunday);
        setValue('monday', res?.data?.daytime?.monday);
        setValue('tuesday', res?.data?.daytime?.tuesday);
        setValue('wednesday', res?.data?.daytime?.wednesday);
        setValue('thursday', res?.data?.daytime?.thursday);
        setValue('friday', res?.data?.daytime?.friday);
        setValue('saturday', res?.data?.daytime?.saturday);
        setShiftChecked({ [res.data?.daytime?.timetable.id]: true });
      });


    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const shiftId = e => {
    localStorage.setItem('shiftId', e);
  };

  function handleSaveShiftTimetable() {
    const timeData = getValues();
    timeData.id = shifId ?? null;
    timeData.timetable = timeId || timeIdUpdate;
    timeData.shift = newShiftId;
    // console.log("all_time_data", timeData)

    axios
      .post(`${CREATE_SHIFT_DAYTIME}`, timeData, {
        headers: {
          'Content-type': 'application/json',
          Authorization: localStorage.getItem('jwt_access_token')
        }
      })
      .then(res => {
        setOpen(false);
        dispatch(getShiftTimetableById(res?.data?.shift))

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

  //colored row when clicked
  const handleRowClick = shiftId => {
    setSelectedRow(shiftId);
    // setSelectedRow(shiftId);
  };

  const container = {
    show: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };
  return (
    <div className="w-full flex flex-col  min-h-full px-10 pt-10">
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
      <FuseScrollbars className="flex-grow">
        <motion.div className="grid grid-cols-2 gap-10" variants={container} initial="hidden" animate="show">
          <motion.div variants={item} className="widget">
            <div>
              <Typography
                variant="h6"
                className="my-10 ml-10"
              >
                Shift Management
              </Typography>
              <TableContainer
                sx={{
                  height: 'calc(100vh - 248px)',
                  overflowY: 'auto',
                }}
                className="no-scrollbar"
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
                            onClick={() => {
                              handleRowClick(shift?.id);
                              shiftId(shift?.id);
                            }}
                          >
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
                            // style={{
                            //   position: "sticky",
                            //   right: 0,
                            //   zIndex: 1,
                            //   backgroundColor: "#fff",
                            // }}
                            >
                              <Edit
                                onClick={() => handleUpdateShift(n, "updateShift")}
                                className="cursor-pointer custom-edit-icon-style"
                              />
                              <Delete
                                onClick={() => handleDeleteShift(n, "deleteShift")}
                                className="cursor-pointer custom-delete-icon-style"
                              />
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
          </motion.div>
          <motion.div
            style={{ overflow: 'visible' }}
            variants={item}
            className="widget"
          >
            <WeekTable id={newShiftId} />
          </motion.div>
        </motion.div>
      </FuseScrollbars>

      <div className={classes.root} id="pagiContainer">
        <Pagination
          classes={{ ul: 'flex-nowrap' }}
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
