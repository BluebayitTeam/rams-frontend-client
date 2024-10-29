import { useTheme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import {
  getAgents,
  getAirways,
  getBranches,
  getCountries,
  getCurrentStatuss,
  getEmployees,
  getLedgers,
  getPassengers,
  getPassengerTypes,
  getSubLedgers,
} from 'app/store/dataSlice';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import Keyword from 'src/app/@components/ReportComponents/Keyword';
import ReportDatePicker from 'src/app/@components/ReportComponents/ReportDatePicker';
import ReportSelect from 'src/app/@components/ReportComponents/ReportSelect';
import { bankAndCash } from 'src/app/@data/data';
import { getReportFilterMakeStyles } from '../../ReportUtilities/reportMakeStyls';
import ReportSelectFirstAgentCode from 'src/app/@components/ReportComponents/ReportSelectFirstAgentCode';
import ReportSelectFirstLastName from 'src/app/@components/ReportComponents/ReportSelectFirstLastName';

const useStyles = makeStyles((theme) => ({
  ...getReportFilterMakeStyles(theme),
}));

function TicketsalesummeryfilterdatasFilterMenu({
  inShowAllMode,
  handleGetTicketsalesummeryfilterdatas,
  handleGetAllTicketsalesummeryfilterdatas,
}) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const methods = useFormContext();

  const theme = useTheme();

  const [loop, setLoop] = useState(true);
  console.log('loopsssss', loop);
  const renderFunction = () => {
    if (loop == true) {
      inShowAllMode
        ? handleGetAllTicketsalesummeryfilterdatas()
        : handleGetTicketsalesummeryfilterdatas();
      setLoop(false);
    }
  };

  return (
    <div>
      {renderFunction()}

      {/* {inShowAllMode ? handleGetAllTicketsalesummeryfilterdatas() : handleGetTicketsalesummeryfilterdatas()} */}
    </div>
  );
}

export default TicketsalesummeryfilterdatasFilterMenu;
