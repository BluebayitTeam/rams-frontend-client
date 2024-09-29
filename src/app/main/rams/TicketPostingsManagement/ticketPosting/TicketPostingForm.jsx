/* eslint-disable jsx-a11y/iframe-has-title */
/* eslint-disable jsx-a11y/alt-text */
import { styled } from '@mui/system';
import { useParams } from 'react-router-dom';
import { Autocomplete, TextField, Tooltip, tooltipClasses } from '@mui/material';
import { getCurrentStatuss, getDemands, getPassengers } from 'app/store/dataSlice';
import { makeStyles } from '@mui/styles';

import { useEffect, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import {
	CHECK_AVAILABLE_VISA_FOR_CALLING_ASSIGN,
	CHECK_CALLING_ASSIGN_EXIST_IN_PASSENGER
} from 'src/app/constant/constants';
import Swal from 'sweetalert2';
import MultiplePassengersTable from './MultiplePassengersTable';
import { useCreateTicketPostingMutation } from '../TicketPostingsApi';
import CustomDatePicker from 'src/app/@components/CustomDatePicker';

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

function TicketPostingForm(props) {
	const dispatch = useDispatch();
	const methods = useFormContext();
	const { control, formState, watch, setValue, setError } = methods;
	const [createTicketPosting] = useCreateTicketPostingMutation();

	const { errors } = formState;
	const routeParams = useParams();
	const { ticketPostingId } = routeParams;
	const classes = useStyles(props);
	
	const passengers = useSelector((state) => state.data.passengers);
  const agents = useSelector((state) => state.data.agents);
	const [selectedValueDisable, setSelectedValueDisable] = useState(false);
	const [mltPassengerList, setMltPassengerList] = useState([]);
	const [mltPassengerDeletedId, setMltPassengerDeletedId] = useState(null);
	const [showError, setShowError] = useState(false);
	const [availableDemand, setAvailableDemand] = useState(null);

	console.log('mltPassengerList', mltPassengerList, mltPassengerDeletedId);

	useEffect(() => {
		if (mltPassengerDeletedId) {
			setMltPassengerList(mltPassengerList?.filter((item) => item.id !== mltPassengerDeletedId));
			setMltPassengerDeletedId(null);
		}
	}, [mltPassengerDeletedId]);


	useEffect(() => {
    dispatch(getPassengers());
    dispatch(getAgents());
  }, []);
	useEffect(() => {
		setValue(
			'passengers',
			mltPassengerList?.map((data) => data.id)
		);
	}, [mltPassengerList]);

	const handleCheckAvailableDemand = (id, qty) => {
		setShowError(true);
		const authTOKEN = {
			headers: {
				'Content-type': 'application/json',
				Authorization: localStorage.getItem('jwt_access_token')
			}
		};
		fetch(`${CHECK_AVAILABLE_VISA_FOR_CALLING_ASSIGN}${id}`, authTOKEN)
			.then((response) => response.json())
			.then((data) => setAvailableDemand(qty - data.demand_passenger_count))
			.catch((err) => {});
	};

	function handleSaveMultipleStatusUpdate(id) {
		if (mltPassengerList?.length >= availableDemand) {
			Swal.fire({
				position: 'top-center',
				icon: 'warning',
				title: `Number of Pax Full for this Demand No`,
				showConfirmButton: false,
				timer: 5000
			});
		} else {
			fetch(`${CHECK_CALLING_ASSIGN_EXIST_IN_PASSENGER}/${id}/${watch('visa_entry')}`)
				.then((response) => response.json())
				.then((data) => {
					if (data?.same_visa_entry) {
						Swal.fire({
							position: 'top-center',
							icon: 'warning',
							title: `This Passenger Has Already Been Assigned the same Demand Demand`,
							showConfirmButton: false,
							timer: 5000
						});
					} else if (data?.visa_entry_exist) {
						Swal.fire({
							title: 'Demand Demand Already Assigned for This Passenger',
							text: 'Please Remove the Previous Demand Demand.',
							icon: 'error',
							showConfirmButton: false,
							timer: 5000
						});
					} else {
						setMltPassengerList((prevList) => [...prevList, passengers.find((data) => data?.id === id)]);
					}
				})
				.catch(() => {});
		}
	}

	return (
    <div>
      <CustomDatePicker
        name='date_after'
        label='Date From'
        placeholder='DD-MM-YYYY'
      />
      <CustomDatePicker
        name='date_before'
        label='Date To'
        placeholder='DD-MM-YYYY'
      />
      <CustomDropdownField
        name='customer'
        label='Customer'
        options={agents}
        optionLabelFormat={(option) =>
          `${option.first_name || ''} ${option.agent_code || ''}`
        }
      />
      {mltPassengerList?.length > 0 && (
        <div>
          <MultiplePassengersTable
            passengers={mltPassengerList}
            setMltPassengerList={setMltPassengerList}
          />
        </div>
      )}

      {showError && mltPassengerList?.length >= availableDemand && (
        <h4 style={{ color: 'red' }}>Number of Pax Full for this Demand No</h4>
      )}
    </div>
  );
}

export default TicketPostingForm;
