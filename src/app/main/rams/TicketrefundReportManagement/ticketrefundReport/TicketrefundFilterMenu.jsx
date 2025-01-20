import { useTheme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import { getAgents, getLedgers, getSubLedgers } from 'app/store/dataSlice';
import { useEffect, useRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import Keyword from 'src/app/@components/ReportComponents/Keyword';
import ReportDatePicker from 'src/app/@components/ReportComponents/ReportDatePicker';
import ReportSelect from 'src/app/@components/ReportComponents/ReportSelect';
import { bankAndCash } from 'src/app/@data/data';
import { getReportFilterMakeStyles } from '../../ReportUtilities/reportMakeStyls';
import ReportSelectFirstAgentCode from 'src/app/@components/ReportComponents/ReportSelectFirstAgentCode';
import ReportTextField from 'src/app/@components/ReportComponents/ReportTextField';

const useStyles = makeStyles((theme) => ({
  ...getReportFilterMakeStyles(theme),
}));

function TicketrefundFilterMenu({
  inShowAllMode,
  handleGetTicketrefunds,
  handleGetAllTicketrefunds,
}) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const methods = useFormContext();
  const { getValues } = methods;

  const theme = useTheme();
  const { agents } = useSelector((state) => state.data);
  const values = getValues();
  const [_reRender, setReRender] = useState(0);
  const ticketNoEl = useRef(null);
  const invoiceNoEl = useRef(null);
  const commonFieldProps = {
    setReRender,
    onEnter: () =>
      inShowAllMode ? handleGetAllTicketrefunds() : handleGetTicketrefunds(),
  };
  const commonKewordProps = {
    setReRender,
    onClick: () =>
      inShowAllMode ? handleGetAllTicketrefunds() : handleGetTicketrefunds(),
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
          name='date_after'
          label='Date From'
          maxDate={values.date_before || new Date()}
        />
        {/* Issue Date To:*/}
        <ReportDatePicker
          {...commonFieldProps}
          name='date_before'
          label='Date To'
          minDate={values.date_after}
          maxDate={new Date()}
        />
        {/* Ticket No*/}
        <ReportTextField
          {...commonFieldProps}
          name='ticket_no'
          label='Ticket No'
          domEl={ticketNoEl}
          icon=' confirmation_number'
          width='77px'
        />{' '}
        {/* invoice no*/}
        <ReportTextField
          {...commonFieldProps}
          name='invoice_no'
          label='Invoice No'
          domEl={invoiceNoEl}
          icon=' receipt'
          width='77px'
        />
        {/* Airline Agency */}
        <ReportSelectFirstAgentCode
          {...commonFieldProps}
          name='airline_agency'
          options={agents}
          icon='person'
          width='95px'
        />{' '}
        {/* Customer*/}
        <ReportSelectFirstAgentCode
          {...commonFieldProps}
          name='agent'
          options={agents}
          label='Customer'
          icon='person'
          width='65px'
        />
      </div>

      {/* keywords */}
      <div className='allKeyWrdContainer'>
        <Keyword
          {...commonKewordProps}
          type='date'
          name='date_after'
          label='Date From'
        />
        <Keyword
          {...commonKewordProps}
          type='date'
          name='date_before'
          label='Date To'
        />
        <Keyword
          {...commonKewordProps}
          type='text'
          name='ticket_no'
          domEl={ticketNoEl}
          icon='confirmation_number'
        />{' '}
        <Keyword
          {...commonKewordProps}
          type='text'
          name='invoice_no'
          domEl={invoiceNoEl}
          icon='receipt'
        />
        <Keyword
          {...commonKewordProps}
          type='select'
          name='airline_agency'
          icon='person'
        />{' '}
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

export default TicketrefundFilterMenu;
