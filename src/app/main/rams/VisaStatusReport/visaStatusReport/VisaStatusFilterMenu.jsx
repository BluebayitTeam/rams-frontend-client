import { useTheme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import { getAgents, getCountries } from 'app/store/dataSlice';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import Keyword from 'src/app/@components/ReportComponents/Keyword';
import ReportSelectFirstLastName from 'src/app/@components/ReportComponents/ReportSelectFirstLastName';
import { getReportFilterMakeStyles } from '../../ReportUtilities/reportMakeStyls';
import ReportSelect from 'src/app/@components/ReportComponents/ReportSelect';

const useStyles = makeStyles((theme) => ({
  ...getReportFilterMakeStyles(theme),
}));

function VisaStatusFilterMenu({
  inShowAllMode,
  handleGetVisaStatuss,
  handleGetAllVisaStatuss,
}) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const methods = useFormContext();
  const { getValues } = methods;

  const theme = useTheme();
  const { agents, countries } = useSelector((state) => state.data);
  const values = getValues();

  const [_reRender, setReRender] = useState(0);

  const commonFieldProps = {
    setReRender,
    onEnter: () =>
      inShowAllMode ? handleGetAllVisaStatuss() : handleGetVisaStatuss(),
  };
  const commonKewordProps = {
    setReRender,
    onClick: () =>
      inShowAllMode ? handleGetAllVisaStatuss() : handleGetVisaStatuss(),
  };

  useEffect(() => {
    dispatch(getCountries());
  }, [dispatch]);

  return (
    <div className={classes.filterMenuContainer}>
      <div className='allFieldContainer borderTop mt-4'>
        {/* Agent */}

        {/* Country */}
        <ReportSelect
          {...commonFieldProps}
          name='country'
          options={countries}
          label='Country'
          icon='flag'
          width='60px'
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
          name='country'
          label='Country'
          icon='flag'
        />
      </div>
    </div>
  );
}

export default VisaStatusFilterMenu;
