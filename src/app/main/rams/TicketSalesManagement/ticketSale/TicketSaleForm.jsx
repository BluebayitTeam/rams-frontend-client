/* eslint-disable jsx-a11y/iframe-has-title */
/* eslint-disable jsx-a11y/alt-text */
import { styled } from '@mui/system';
import { useParams } from 'react-router-dom';

import { Autocomplete, Box, Button, Checkbox, FormControlLabel, Icon, TextField, Tooltip, Typography, tooltipClasses } from '@mui/material';
import { getAgencys, getAgents, getAirways, getBranches, getCountries, getCurrencies, getCurrentstatuses, getEmployees, getPassengers, getProfessions } from 'app/store/dataSlice';
import clsx from 'clsx';
import { makeStyles } from '@mui/styles';

import { useEffect, useRef, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { BASE_URL } from 'src/app/constant/constants';
import { activeCncl } from 'src/app/@data/data';
import { PictureAsPdf } from '@mui/icons-material';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import DescriptionIcon from '@mui/icons-material/Description';
import CustomDatePicker from 'src/app/@components/CustomDatePicker';
import CustomDropdownField from 'src/app/@components/CustomDropdownField';
import CustomTextField from 'src/app/@components/CustomTextField';
import CustomCheckbox from 'src/app/@components/CustomCheckbox';

const HtmlTooltip = styled(Tooltip)(({ theme }) => ({
	[`& .${tooltipClasses.tooltip}`]: {
		backgroundColor: '#f5f5f9',
		color: 'rgba(0, 0, 0, 0.87)',
		maxWidth: 220,
		fontSize: theme.typography.pxToRem(12),
		border: '1px solid #dadde9'
	}
}));
const useStyles = makeStyles((theme) => ({
	hidden: {
		display: 'none'
	},
	productImageUpload: {
		transitionProperty: 'box-shadow',
		transitionDuration: theme.transitions.duration.short,
		transitionTimingFunction: theme.transitions.easing.easeInOut
	}
}));

function TicketSaleForm(props) {
	const dispatch = useDispatch();
	const methods = useFormContext();
	const { control, formState, watch, setValue, setError } = methods;
	const { errors } = formState;
	const routeParams = useParams();
	const { ticketSaleId } = routeParams;
	const classes = useStyles(props);
	const passengers = useSelector((state) => state.data.passengers);
  const professions = useSelector((state) => state.data.professions);
  const countries = useSelector((state) => state.data.countries);
  const branches = useSelector((state) => state.data.branches);
  const agencys = useSelector((state) => state.data.agents);
  const employees = useSelector((state) => state.data.employees);

  const airways = useSelector((state) => state.data.airways);

  const currencies = useSelector((state) => state.data.currencies);
  const currentstatuses = useSelector((state) => state.data.currentstatuses);
  const visaAgents = useSelector((state) => state.data.agents);
	const getCountryCode1 = watch('country_code1');
	const image = watch('image');
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);

		useEffect(() => {
      dispatch(getProfessions());
      dispatch(getCountries());
      dispatch(getAgents());
      dispatch(getPassengers());
      dispatch(getAgencys());
      dispatch(getBranches());
      dispatch(getEmployees());
      dispatch(getAirways());
      dispatch(getCurrencies());
      dispatch(getCurrentstatuses());
    }, []);


	const handleRemoveslipPicFile = () => {
		setPreviewslipPicFile(null);

		setFileExtPCName(null);

		setValue('file', '');

		if (fileInputRef.current) {
			fileInputRef.current.value = '';
		}

		console.log('sfsdferwer', getValues());
	};
	return (
    <div>
      <div className='flex flex-wrap md:flex-nowrap w-full'>
        <div className='w-full md:w-1/2 px-2'>
          <CustomDropdownField
            name='branch'
            label='Branch'
            options={branches}
          />
        </div>
        <div className='w-full md:w-1/2 px-2'>
          <CustomDropdownField
            name='customer'
            label='Customer'
            options={agencys}
            optionLabelFormat={(option) =>
              `${option.first_name || ''} ${option.last_name || ''}`
            }
          />
        </div>
      </div>{' '}
      <div className='flex flex-wrap md:flex-nowrap w-full'>
        <div className='w-full md:w-1/2 px-2'>
          <CustomDropdownField
            name='ticket_agency'
            label='Ticket Agency'
            options={agencys}
            optionLabelFormat={(option) =>
              `${option.first_name || ''} ${option.last_name || ''}`
            }
          />
        </div>
        <div className='w-full md:w-1/2 px-2'>
          <CustomDropdownField
            name='issue_person'
            label='Issue Person'
            options={employees}
            optionLabelFormat={(option) =>
              `${option.first_name || ''} ${option.last_name || ''}`
            }
          />
        </div>
      </div>
      <div className='flex flex-wrap md:flex-nowrap w-full'>
        <div className='w-full md:w-1/2 px-2'>
          <CustomCheckbox name='_other' label='Other' />
        </div>
        <div className='w-full md:w-1/2 px-2'>
          <CustomCheckbox
            name='multi_ticket_entry'
            label='Multiple Ticket No'
          />
        </div>
      </div>
      <div className='flex flex-wrap md:flex-nowrap w-full'>
        <div className='w-full md:w-1/2 px-2'>
          <CustomDropdownField
            name='passenger'
            label='Passenger'
            options={passengers}
            disabled={watch('pax_name')?.length > 1}
            optionLabelFormat={(option) => `${option.passenger_name || ''}`}
          />{' '}
        </div>
        <div className='w-full md:w-1/2 px-2 mt-8'>
          <CustomTextField
            name='pax_name'
            label='Pax Name'
            disabled={watch('passenger')}
            required
          />
        </div>
      </div>
      <div className='flex flex-wrap md:flex-nowrap w-full'>
        <div className='w-full md:w-1/2 px-2'>
          <CustomTextField name='passport_no' label='Passport No' required />
        </div>
        <div className='w-full md:w-1/2 px-2'>
          <CustomTextField
            name='ticket_no'
            label='Ticket No'
            placeholder='Ticket number must be 10 digits'
            required
          />
        </div>
      </div>
      <div className='flex flex-wrap md:flex-nowrap w-full'>
        <div className='w-full md:w-1/2 px-2'>
          <CustomDatePicker
            name='flight_date'
            label='Flight Date'
            placeholder='DD-MM-YYYY'
          />
        </div>
        <div className='w-full md:w-1/2 px-2'>
          <CustomTextField name='flight_no' label='Flight No' required />
        </div>
      </div>
      <div className='flex flex-wrap md:flex-nowrap w-full'>
        <div className='w-full md:w-1/2 px-2'>
          <CustomTextField name='_class' label='Class name' required />
        </div>
        <div className='w-full md:w-1/2 px-2'>
          <CustomTextField name='sector' label='Sector Name' required />
        </div>
      </div>
      <div className='flex flex-wrap md:flex-nowrap w-full'>
        <div className='w-full md:w-1/2 px-2'>
          <CustomTextField name='flight_time' label='Flight Time' required />
        </div>
        <div className='w-full md:w-1/2 px-2'>
          <CustomTextField name='arrived_time' label='Arrival Time' required />
        </div>
      </div>
      <div className='flex flex-wrap md:flex-nowrap w-full'>
        <div className='w-full md:w-1/2 px-2'>
          <CustomTextField name='airline_pnr' label='Airline PNR' required />
        </div>
        <div className='w-full md:w-1/2 px-2'>
          <CustomDatePicker
            name='return_flight_date'
            label='Return Flight Date'
            placeholder='DD-MM-YYYY'
          />{' '}
        </div>
      </div>
      <div className='flex flex-wrap md:flex-nowrap w-full'>
        <div className='w-full md:w-1/2 px-2'>
          <CustomTextField name='sales_amount' label='Sales Amount' required />
        </div>
        <div className='w-full md:w-1/2 px-2'>
          <CustomTextField
            name='purchase_amount'
            label='Purchase Amount'
            required
          />
        </div>
      </div>
    </div>
  );
}

export default TicketSaleForm;
