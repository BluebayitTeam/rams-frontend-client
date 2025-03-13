import TextField from '@mui/material/TextField';
import { makeStyles } from '@mui/styles';
import {
  getAgencys,
  getAgents,
  getCountries,
  getPassengers,
  getProfessions,
} from 'app/store/dataSlice';
import { useEffect, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import CustomDatePicker from 'src/app/@components/CustomDatePicker';
import CustomDropdownField from 'src/app/@components/CustomDropdownField';
import CustomTextField from 'src/app/@components/CustomTextField';
import FileUpload from 'src/app/@components/FileUploader';
import { activeRetrnCncl } from 'src/app/@data/data';
import { BASE_URL } from 'src/app/constant/constants';



const useStyles = makeStyles((theme) => ({
  hidden: {
    display: 'none',
  },
  productImageUpload: {
    transitionProperty: 'box-shadow',
    transitionDuration: theme.transitions.duration.short,
    transitionTimingFunction: theme.transitions.easing.easeInOut,
  },
}));

function TicketPurchaseForm(props) {
  const dispatch = useDispatch();
  const methods = useFormContext();
  	const classes = useStyles(props);
  const { control, formState, watch, setValue, getValues } = methods;
  const passengers = useSelector((state) => state.data.passengers);
  const routeParams = useParams();
	const { ticketPurchaseId } = routeParams;
  const professions = useSelector((state) => state.data.professions);
  const countries = useSelector((state) => state.data.countries);
  const agencys = useSelector((state) => state.data.agents);
  const visaAgents = useSelector((state) => state.data.agents);
  const { errors } = formState;
  const [file, setFile] = useState(null);

  useEffect(() => {
    dispatch(getProfessions());
    dispatch(getCountries());
    dispatch(getAgents());
    dispatch(getPassengers());
    dispatch(getAgencys());
  }, []);
  useEffect(() => {
    const currentImage = getValues('ticket_image');

    if (currentImage && !currentImage.name) {
      setFile(`${BASE_URL}/${currentImage}`);
    }
  }, [ticketPurchaseId, watch('ticket_image')]);
  return (
    <div>
      <CustomDropdownField
        name='passenger'
        label='Passenger'
        options={passengers}
        optionLabelFormat={(option) => `${option.passenger_name || ''}`}
        required
      />{' '}
      <CustomDropdownField
        name='ticket_agency'
        label='Ticket Agency'
        options={agencys}
        required
        optionLabelFormat={(option) =>
          `${option.first_name || ''} ${option.last_name || ''}`
        }
      />
      <CustomTextField
        name='purchase_amount'
        label='Purchase Amount'
        required
      />{' '}
      <CustomTextField name='ticket_no' label='Ticket No' required />
      <CustomTextField name='sector_name' label='Sector Name' required />
      <CustomDropdownField
        name='country'
        label='Country'
        required
        options={countries}
        optionLabelFormat={(option) => `${option.name || ''}`}
      />
      <CustomDatePicker
        name='issue_date'
        label='Issue Date'
        placeholder='DD-MM-YYYY'
        className='w-full mt-15 mb-16'
   
      />{' '}
     
      <CustomTextField
        name='carrier_air_way'
        label='Carrier Air Way'
        required
      />
       <CustomDatePicker
        name='flight_date'
        label='Flight Date'
        placeholder='DD-MM-YYYY'
  

      />
       
     
      <CustomTextField name='flight_time' label='Flight Time' required />
      <CustomTextField name='arrival_time' label='Arrival Time' required />
      <CustomTextField name='flight_no' label='Flight No' required />
      <CustomTextField name='notes' label='Notes' required />
      <CustomDropdownField
        name='ticket_status'
        label='Ticket Status'
        options={activeRetrnCncl}
        optionLabelFormat={(option) => `${option.name || ''}`}
      />
      <div className='text-center'>
        <div>
          <FileUpload
            name='ticket_image'
            label='File'
            control={control}
            setValue={setValue}
            setFile={setFile}
            file={file}
            BASE_URL={BASE_URL}
            classes={classes}
          />
        </div>
      </div>
    </div>
  );
}

export default TicketPurchaseForm;
