import { useTheme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import { getAgents, getLedgers, getSubLedgers } from 'app/store/dataSlice';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import Keyword from 'src/app/@components/ReportComponents/Keyword';
import ReportDatePicker from 'src/app/@components/ReportComponents/ReportDatePicker';
import ReportSelect from 'src/app/@components/ReportComponents/ReportSelect';
import { bankAndCash } from 'src/app/@data/data';
import { getReportFilterMakeStyles } from '../../ReportUtilities/reportMakeStyls';
import ReportSelectFirstAgentCode from 'src/app/@components/ReportComponents/ReportSelectFirstAgentCode';

const useStyles = makeStyles((theme) => ({
  ...getReportFilterMakeStyles(theme),
}));

function TicketsalesFilterMenu({
  inShowAllMode,
  handleGetTicketsaless,
  handleGetAllTicketsaless,
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
      inShowAllMode ? handleGetAllTicketsaless() : handleGetTicketsaless(),
  };
  const commonKewordProps = {
    setReRender,
    onClick: () =>
      inShowAllMode ? handleGetAllTicketsaless() : handleGetTicketsaless(),
  };

  useEffect(() => {
    dispatch(getAgents());
  }, []);

  return (
    <div className={classes.filterMenuContainer}>
      <div className='allFieldContainer borderTop mt-4'>
        {/* Issue Date From */}
        <ReportDatePicker
          {...commonFieldProps}
          name='issue_date_after'
          label='Issue Date From'
          maxDate={values.issue_date_before || new Date()}
        />
        {/* Issue Date To:*/}
        <ReportDatePicker
          {...commonFieldProps}
          name='issue_date_before'
          label='Issue Date To:'
          minDate={values.issue_date_after}
          maxDate={new Date()}
        />
        {/* Agency Name */}

        <ReportSelectFirstAgentCode
          {...commonFieldProps}
          name='agent'
          label='Agency Name'
          options={agents}
          icon='person_icon'
          width='94px'
          getOptionLabel={(option) =>
            `${option.first_name}- ${option.agent_code}`
          }
        />
      </div>

      {/* keywords */}
      <div className='allKeyWrdContainer'>
        <Keyword
          {...commonKewordProps}
          type='date'
          name='issue_date_after'
          label='Date From'
        />

        <Keyword
          {...commonKewordProps}
          type='date'
          name='issue_date_before'
          label='Date To'
        />

        <Keyword
          {...commonKewordProps}
          type='select'
          name='agent'
          icon='person'
        />
      </div>
    </div>
  );
}

export default TicketsalesFilterMenu;
