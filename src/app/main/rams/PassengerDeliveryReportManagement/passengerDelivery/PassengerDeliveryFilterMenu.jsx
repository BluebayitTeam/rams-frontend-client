import { useTheme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import {
  getAgents,
  getCountries,
  getPassengers,
  getPassengerTypes,
} from 'app/store/dataSlice';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import Keyword from 'src/app/@components/ReportComponents/Keyword';
import ReportDatePicker from 'src/app/@components/ReportComponents/ReportDatePicker';
import ReportSelect from 'src/app/@components/ReportComponents/ReportSelect';
import { getReportFilterMakeStyles } from '../../ReportUtilities/reportMakeStyls';
import ReportSelectPassenger from 'src/app/@components/ReportComponents/ReportSelectPassenger';
import ReportSelectFirstLastName from 'src/app/@components/ReportComponents/ReportSelectFirstLastName';

const useStyles = makeStyles((theme) => ({
  ...getReportFilterMakeStyles(theme),
}));

function PassengerDeliveryFilterMenu({
  inShowAllMode,
  handleGetPassengerDeliverys,
  handleGetAllPassengerDeliverys,
}) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const methods = useFormContext();
  const { getValues } = methods;
  const theme = useTheme();
  const values = getValues();
  const [_reRender, setReRender] = useState(0);
  const { countries, passengerTypes, agents, passengers } = useSelector(
    (state) => state.data
  );

  const commonFieldProps = {
    setReRender,
    onEnter: () =>
      inShowAllMode
        ? handleGetPassengerDeliverys()
        : handleGetAllPassengerDeliverys,
  };
  const commonKewordProps = {
    setReRender,
    onClick: () =>
      inShowAllMode
        ? handleGetPassengerDeliverys()
        : handleGetAllPassengerDeliverys,
  };

  useEffect(() => {
    dispatch(getPassengers());
  }, []);

  return (
    <div className={classes.filterMenuContainer}>
      <div className='allFieldContainer borderTop mt-4'>
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
          name='passenger'
          icon='person'
        />{' '}
      </div>
    </div>
  );
}

export default PassengerDeliveryFilterMenu;
