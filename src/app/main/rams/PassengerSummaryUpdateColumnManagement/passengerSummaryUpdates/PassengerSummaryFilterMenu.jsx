import { makeStyles } from "@mui/styles";
import { getAgents } from "app/store/dataSlice";
import { useFormContext } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useGetPassengerSummaryUpdatesQuery } from "../PassengerSummaryUpdatesApi";
import { useState } from "react";

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
    
      const { data, isLoading, refetch } = useGetPassengerSummaryUpdatesQuery({
        ...pageAndSize,
      });
    
    
    const handleGetAllPassengerSummarys = (e) => {
      const data = {
        agent: getValues().agent,
        passenger: getValues().passenger,
        flight_status: getValues().flight_status,
        page: 1,
        size: 100,
      };

      // const data = { agent, passenger, flight };
        refetch();
    };

  const commonFieldProps = {
    setReRender,
    onEnter: () =>
      inShowAllMode
        ? handleGetAllPassengerSummarys()
        : handleGetPassengerAccountSummarys(),
  };
  const commonKewordProps = {
    setReRender,
    onClick: () =>
      inShowAllMode
        ? handleGetAllPassengerSummarys()
        : handleGetPassengerAccountSummarys(),
  };

  useEffect(() => {
    dispatch(getAgents());
  }, [dispatch]);

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
      </div>
    </div>
  );
}

export default PassengerSummaryFilterMenu;
