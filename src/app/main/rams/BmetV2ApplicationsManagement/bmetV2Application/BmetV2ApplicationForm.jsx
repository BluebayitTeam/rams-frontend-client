/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-undef */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useEffect } from 'react';
import CustomDatePicker from 'src/app/@components/CustomDatePicker';

import { GET_FORM_CONTENT_DETAILS_BY_TITLE } from 'src/app/constant/constants';
import { MANPOWER_SUBMISSION_LIST_FOOTER } from 'src/app/constant/FormContentTitle/formContentTitle';
import CustomTextField from 'src/app/@components/CustomTextField';

function BmetV2ApplicationForm({ handleSearchManPowerDateClick }) {
	useEffect(() => {
		const authTOKEN = {
			headers: {
				'Content-type': 'application/json',
				Authorization: localStorage.getItem('jwt_access_token')
			}
		};

		fetch(`${GET_FORM_CONTENT_DETAILS_BY_TITLE}${MANPOWER_SUBMISSION_LIST_FOOTER}`, authTOKEN)
			.then((response) => response.json())
			.then((data) =>
				sessionStorage.setItem('formContentFooterData', data?.formcontent_detail[0]?.details || '')
			);
	}, []);

	return (
		<div>
			<div className="flex flex-nowrap ">
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
						marginLeft: '30px'
					}}
					onClick={() => {
						handleSearchManPowerDateClick();
					}}
				>
					Search
				</button>
			</div>
		</div>
	);
}

export default BmetV2ApplicationForm;
