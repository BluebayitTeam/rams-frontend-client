/* eslint-disable no-nested-ternary */
import FuseScrollbars from '@fuse/core/FuseScrollbars';
import withRouter from '@fuse/core/withRouter';
import { makeStyles } from '@mui/styles';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DepartmentTable from './DepartmentTable';
import MonthTable from './MonthTable';
import WidgetTable from './WidgetTable';

/**
 * The schedules table.
 */
const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'nowrap',
    overflow: 'auto',
    minHeight: '35px'
  },
  toolbar: {
    '& > div': {
      minHeight: 'fit-content'
    }
  }
}));

const SchedulesTable = props => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const schedules = [];
  // const schedules = useSelector(selectSchedules);
  const searchText = useSelector(({ schedulesManagement }) => schedulesManagement);

  const [searchSchedule, setSearchSchedule] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [pageAndSize, setPageAndSize] = useState({ page: 1, size: 5 });
  const timetable = useSelector(state => state.data.timetables);

  const totalPages = sessionStorage.getItem('total_schedules_pages');
  const totalElements = sessionStorage.getItem('total_schedules_elements');

  const [order, setOrder] = useState({
    direction: 'asc',
    id: null
  });
  let serialNumber = 1;
  const [deleteItem, setDeleteItem] = useState('');
  useEffect(() => {
    // dispatch(getSchedules(pageAndSize)).then(() => setLoading(false));
  }, [dispatch]);

  useEffect(() => {
    // dispatch(getTimetables());
  }, []);

  function handleRequestSort(event, property) {
    const id = property;
    let direction = 'desc';

    if (order.id === property && order.direction === 'desc') {
      direction = 'asc';
    }

    setOrder({
      direction,
      id
    });
  }

  function handleSelectAllClick(event) {
    if (event.target.checked) {
      setSelected(schedules.map(n => n.id));
      return;
    }
    setSelected([]);
  }

  function handleDeselect() {
    setSelected([]);
  }

  //pagination
  const handlePagination = (e, handlePage) => {
    setPageAndSize({ ...pageAndSize, page: handlePage });
    setPage(handlePage - 1);
    // dispatch(getSchedules({ ...pageAndSize, page: handlePage }));
  };

  function handleChangePage(event, value) {
    setPage(value);
    setPageAndSize({ ...pageAndSize, page: value + 1 });
    // dispatch(getSchedules({ ...pageAndSize, page: value + 1 }));
  }

  function handleChangeRowsPerPage(event) {
    setRowsPerPage(event.target.value);
    setPageAndSize({ ...pageAndSize, size: event.target.value });
    // dispatch(getSchedules({ ...pageAndSize, size: event.target.value }));
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
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }

    setSelected(newSelected);
  }

  // if (loading) {
  //   return <FuseLoading />;
  // }

  // if (schedules?.length === 0) {
  //   return (
  //     <motion.div
  //       initial={{ opacity: 0 }}
  //       animate={{ opacity: 1, transition: { delay: 0.1 } }}
  //       className="flex flex-1 items-center justify-center h-full"
  //     >
  //       <Typography color="textSecondary" variant="h5">
  //         There are no schedule!
  //       </Typography>
  //     </motion.div>
  //   );
  // }
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
    <div className="w-full flex flex-col">
      <FuseScrollbars className="flex-grow overflow-x-auto">
        <div className="flex">
          <div className=" w-1/3 p-12">
            <DepartmentTable />
          </div>
          <div className=" w-full	 p-12">
            <WidgetTable />
          </div>
        </div>
        <motion.div className="flex flex-wrap" variants={container} initial="hidden" animate="show">
          <motion.div style={{ overflow: 'visible' }} variants={item} className="widget flex w-full p-12">
            <MonthTable />
          </motion.div>
        </motion.div>
      </FuseScrollbars>

      {/* <div className={classes.root} id="pagiContainer">
				<Pagination
					classes={{ ul: 'flex-nowrap' }}
					count={totalPages}
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
					classes={{ root: 'overflow-visible' }}
					rowsPerPageOptions={rowsPerPageOptions}
					component="div"
					count={totalElements}
					rowsPerPage={rowsPerPage}
					page={page}
					className={classes.toolbar}
					backIconButtonProps={{
						'aria-label': 'Previous Page',
						className: 'py-0'
					}}
					nextIconButtonProps={{
						'aria-label': 'Next Page',
						className: 'py-0'
					}}
					onChangePage={handleChangePage}
					onChangeRowsPerPage={handleChangeRowsPerPage}
				/>
			</div> */}
    </div>
  );
};

export default withRouter(SchedulesTable);
