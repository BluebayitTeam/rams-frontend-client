import { useTheme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import { getCities, getGroups } from 'app/store/dataSlice';
import { useEffect, useRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import Keyword from 'src/app/@components/ReportComponents/Keyword';
import ReportDatePicker from 'src/app/@components/ReportComponents/ReportDatePicker';
import ReportSelect from 'src/app/@components/ReportComponents/ReportSelect';
import ReportTextField from 'src/app/@components/ReportComponents/ReportTextField';
import { getReportFilterMakeStyles } from '../../ReportUtilities/reportMakeStyls';

const useStyles = makeStyles((theme) => ({
  ...getReportFilterMakeStyles(theme),
}));

function PassengerEditHistoryFilterMenu({
  inShowAllMode,
  handleGetPassengerEditHistorys,
  handleGetAllPassengerEditHistorys,
}) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const methods = useFormContext();
  const { getValues } = methods;

  const theme = useTheme();
  const { groups, cities } = useSelector((state) => state.data);
  const values = getValues();
  const [_reRender, setReRender] = useState(0);
  console.log('Passenger Values:', getValues());

  // element refs
  const userNameEl = useRef(null);
  const primaryPhoneEl = useRef(null);
  const passengeredithistoryCodeEl = useRef(null);

  const commonFieldProps = {
    setReRender,
    onEnter: () =>
      inShowAllMode
        ? handleGetAllPassengerEditHistorys()
        : handleGetPassengerEditHistorys(),
  };
  const commonKewordProps = {
    setReRender,
    onClick: () =>
      inShowAllMode
        ? handleGetAllPassengerEditHistorys()
        : handleGetPassengerEditHistorys(),
  };

  useEffect(() => {
    dispatch(getCities());
    dispatch(getGroups());
  }, [dispatch]);

  console.log('sadhbjkasbdkj', getValues());
  return (
    <div className={classes.filterMenuContainer}>
      <div className='allFieldContainer borderTop mt-4'>
        {/* user name */}
        <ReportTextField
          {...commonFieldProps}
          name='username'
          label='User Name'
          domEl={userNameEl}
          icon='person'
          width='75px'
        />
      </div>
    </div>
  );
}

export default PassengerEditHistoryFilterMenu;
