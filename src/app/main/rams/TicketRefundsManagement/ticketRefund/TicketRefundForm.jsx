import TextField from '@mui/material/TextField';
import { getAgents, getPassengers, getProfessions } from 'app/store/dataSlice';
import { useEffect } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import CustomDatePicker from 'src/app/@components/CustomDatePicker';
import CustomDropdownField from 'src/app/@components/CustomDropdownField';
import CustomTextField from 'src/app/@components/CustomTextField';

function TicketRefundForm(props) {
	const dispatch = useDispatch();
	const methods = useFormContext();
	const { control, formState, watch } = methods;
		const passengers = useSelector((state) => state.data.passengers);
    const airline_agency = useSelector((state) => state.data.agents);
	const { errors } = formState;

		useEffect(() => {
      dispatch(getProfessions());
      dispatch(getAgents());
      dispatch(getPassengers());
    }, []);
	return (
    <div>
      <CustomDatePicker
        name='refund_date'
        label='Refund Date'
        placeholder='DD-MM-YYYY'
      />
      <CustomDropdownField
        name='customer'
        label='Customer'
        options={airline_agency}
        optionLabelFormat={(option) =>
          `${option.first_name || ''} ${option.last_name || ''}`
        }
      />{' '}
      <CustomDropdownField
        name='airline_agency'
        label='Airline Agency'
        options={airline_agency}
        optionLabelFormat={(option) =>
          `${option.first_name || ''} ${option.last_name || ''}`
        }
      />
      <CustomTextField name='ticket_no' label='Ticket No' required />
      <CustomTextField
        name='customer_amount'
        label='Customer Amount'
        required
      />
      <CustomTextField name='airline_amount' label='Airline Amount' required />
      <CustomTextField name='detail' label='Details'  />
    </div>
  );
}

export default TicketRefundForm;
