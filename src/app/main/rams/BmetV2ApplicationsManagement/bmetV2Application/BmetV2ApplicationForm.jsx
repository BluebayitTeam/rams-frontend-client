
import { useEffect } from 'react';
import CustomDatePicker from 'src/app/@components/CustomDatePicker';
import { GET_FORM_CONTENT_DETAILS_BY_TITLE } from 'src/app/constant/constants';
import { MANPOWER_SUBMISSION_LIST_FOOTER } from 'src/app/constant/FormContentTitle/formContentTitle';
import CustomTextField from 'src/app/@components/CustomTextField';
import CustomDropdownField from 'src/app/@components/CustomDropdownField';
import { useSelector } from 'react-redux';
import { getAgencys } from 'app/store/dataSlice';
import { useDispatch } from 'react-redux';
import { useFormContext } from 'react-hook-form';
import { Watch } from '@mui/icons-material';

function BmetV2ApplicationForm({ handleSearchManPowerDateClick,isButtonDisabled }) {
		const dispatch = useDispatch();

	const { agencies } = useSelector((state) => state.data);
	 const methods = useFormContext();  
    const {setValue ,control,errors,  watch ,error} = methods;
	useEffect(() => {
		dispatch(getAgencys());
		
	}, []);

	const agency = watch('agency')
	

	return (
		<div>
			<div className="flex flex-nowrap gap-7 ">
				
				<div className="w-full">
			<CustomDropdownField
              name="agency"
              label="Agency"
              options={agencies}
              optionLabelFormat={(option) => `${option?.name}`}
            //   error={errors?.agency?.message}
              onChange={(newValue) => setValue('agency_info', newValue)}
				/>
			</div>
					
				<div className="w-full">
					<CustomDatePicker
						name="man_power_date"
						label="Manpower Date"
						placeholder="DD-MM-YYYY"
					/>
				</div>
				
				

				<div className="w-full">
					<CustomTextField
						name="gender"
						label="Gender"
					/>
				</div>
			</div>

			<div>
  <button
    style={{
      background: 'white',
      border: '1px solid grey',
      borderRadius: '4px',
      padding: '0px 5px',
      height: '35px',
      marginLeft: '30px',
    }}
    onClick={() => handleSearchManPowerDateClick()}
					disabled={!agency}
					//  disabled={isButtonDisabled}
  >
    Search
  </button>
</div>

		</div>
	);
}

export default BmetV2ApplicationForm;
