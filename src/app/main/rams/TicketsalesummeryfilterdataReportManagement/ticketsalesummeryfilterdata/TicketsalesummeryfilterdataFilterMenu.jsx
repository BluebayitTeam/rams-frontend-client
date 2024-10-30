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
import { useParams } from 'react-router';

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

  const { methods, setValue } = useFormContext();
  const routeParams = useParams();

  const { issuepersonId, agentId, airwayId, ticketId } = routeParams;

  console.log(
    ' issuepersonId, agentId, airwayId, ticketId ',
    issuepersonId,
    agentId,
    airwayId,
    ticketId
  );

  useEffect(() => {
    if (issuepersonId) {
      setValue('issue_person', issuepersonId);
      setValue('ticket_agency', agentId);
      setValue('current_airway', airwayId);
      setValue('ticket_agency', ticketId);
    }
  }, [issuepersonId, agentId, airwayId, ticketId]);
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
