import { makeStyles } from "@mui/styles";
import { getAgents, getPassengers } from "app/store/dataSlice";
import { useFormContext } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useGetPassengerSummaryUpdatesQuery } from "../PassengerSummaryUpdatesApi";
import { useState } from "react";
import ReportSelectPassenger from "src/app/@components/ReportComponents/ReportSelectPassenger";

const useStyles = makeStyles((theme) => ({
    ...getReportFilterMakeStyles(theme)
}));

function PassengerSummaryFilterMenu() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const methods = useFormContext();
  const { getValues } = methods;
  const [inShowAllMode, setInShowAllMode] = useState(false);
  const theme = useTheme();
  const { agents } = useSelector((state) => state.data);
  const values = getValues();

    const [_reRender, setReRender] = useState(0);
    const [pageAndSize, setPageAndSize] = useState({ page: 1, size: 25 });

      useEffect(() => {
        dispatch(getAgents());
         dispatch(getPassengers());
  }, [dispatch]);

    
      const { data, isLoading, refetch } = useGetPassengerSummaryUpdatesQuery({
        ...pageAndSize,
      });
    
    
    const handleGetAllPassengerSummarys = (e) => {
      const data = {
        agent: getValues().agent,
        passenger: getValues().passenger,
        flight_status: getValues().flight_status,
        page: 1,
        size: 25,
      };

      // const data = { agent, passenger, flight };
        refetch();
    };

 const commonFieldProps = {
   setReRender,
   onEnter: () => {
     if (inShowAllMode) {
       handleGetAllPassengerSummarys();
     }
   },
 };

  const commonKewordProps = {
    setReRender,
    onClick: () =>
     if (inShowAllMode) {
       handleGetAllPassengerSummarys();
     }
  };


  return (
    <div className={classes.filterMenuContainer}>
      <div className='allFieldContainer borderTop mt-4'>
        {/* Agent */}
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
            `${option.passenger_id} -${option.office_serial} - ${option.passport_no}- ${option.passenger_name}`
          }
          icon='person'
          width='78px'
        />
      </div>

      {/* keywords */}
      <div className='allKeyWrdContainer'>
        <Keyword
          {...commonKewordProps}
          type='select'
          name='agent'
          icon='person'
          options={agents}
          />
        <Keyword
          {...commonKewordProps}
          type='select'
          name='passenger'
          icon='person'
        />{' '}
      </div>
    </div>
  );
}

export default PassengerSummaryFilterMenu;
