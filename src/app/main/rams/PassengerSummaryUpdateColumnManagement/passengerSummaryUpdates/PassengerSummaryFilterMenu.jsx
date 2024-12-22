import { makeStyles } from "@mui/styles";
import { getAgents } from "app/store/dataSlice";
import { useFormContext } from "react-hook-form";
import { useDispatch } from "react-redux";

const useStyles = makeStyles((theme) => ({
    ...getReportFilterMakeStyles(theme)
}));

function PassengerSummaryFilterMenu({
  inShowAllMode,
  handleGetPassengerAccountSummarys,
  handleGetAllPassengerAccountSummarys,
}) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const methods = useFormContext();
  const { getValues } = methods;

  const theme = useTheme();
  const { agents } = useSelector((state) => state.data);
  const values = getValues();

  const [_reRender, setReRender] = useState(0);

  const commonFieldProps = {
    setReRender,
    onEnter: () =>
      inShowAllMode
        ? handleGetAllPassengerAccountSummarys()
        : handleGetPassengerAccountSummarys(),
  };
  const commonKewordProps = {
    setReRender,
    onClick: () =>
      inShowAllMode
        ? handleGetAllPassengerAccountSummarys()
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
