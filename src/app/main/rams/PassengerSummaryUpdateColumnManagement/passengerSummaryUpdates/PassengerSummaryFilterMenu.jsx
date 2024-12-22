import { makeStyles } from "@mui/styles";
import { getAgents, getPassengers } from "app/store/dataSlice";
import { useFormContext } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useGetPassengerSummaryUpdatesQuery } from "../PassengerSummaryUpdatesApi";
import { useEffect, useState } from "react";
import ReportSelectPassenger from "src/app/@components/ReportComponents/ReportSelectPassenger";
import ReportSelect from "src/app/@components/ReportComponents/ReportSelect";
import Keyword from "src/app/@components/ReportComponents/Keyword";
import { doneNotDone } from "src/app/@data/data";
import useTheme from "@mui/material/styles/useTheme";
import { getReportFilterMakeStyles } from '../../ReportUtilities/reportMakeStyls';
import ReportSelectFirstLastName from "src/app/@components/ReportComponents/ReportSelectFirstLastName";

const useStyles = makeStyles((theme) => ({
  ...getReportFilterMakeStyles(theme),
}));

function PassengerSummaryFilterMenu({
  handleGetAllPassengerSummarys,
  inShowAllMode,
}) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const theme = useTheme();

  const methods = useFormContext();
  const { getValues, watch } = methods;
  const [_reRender, setReRender] = useState(0);


  const { agents, passengers } = useSelector((state) => state.data);

  useEffect(() => {
    dispatch(getAgents());
    dispatch(getPassengers());
  }, [dispatch]);

  const commonFieldProps = {
    setReRender,
    onEnter: () => {
      if (inShowAllMode) {
        handleGetAllPassengerSummarys();
      }
    },
  };

  const commonKeywordProps = {
    setReRender,
    onClick: () => {
      if (inShowAllMode) {
        handleGetAllPassengerSummarys();
      }
    },
  };

  return (
    <div className={classes.filterMenuContainer}>
      <div className='allFieldContainer  mt-24'>
        <ReportSelectFirstLastName
          {...commonFieldProps}
          name='agent'
          options={agents}
          icon='person'
          width='40px'
        />

        {/* Passenger */}
        <ReportSelectPassenger
          {...commonFieldProps}
          name='passenger'
          options={passengers}
          getOptionLabel={(option) =>
            `${option.passenger_id} - ${option.office_serial} - ${option.passport_no} - ${option.passenger_name}`
          }
          icon='person'
          width='78px'
        />
        {/* Flight Status */}
        <ReportSelect
          {...commonFieldProps}
          name='flight_status'
          options={doneNotDone}
          icon='local_activity'
          width='84px'
        />
      </div>

      {/* Keywords */}
      <div className='allKeyWrdContainer'>
        <Keyword
          {...commonKeywordProps}
          type='select'
          name='agent'
          icon='person'
          options={agents}
        />
        <Keyword
          {...commonKeywordProps}
          type='select'
          name='passenger'
          icon='person'
        />
        <Keyword
          {...commonKeywordProps}
          type='select'
          name='flight_status'
          options={doneNotDone}
          icon='local_activity'
        />
      </div>
    </div>
  );
}

export default PassengerSummaryFilterMenu;
