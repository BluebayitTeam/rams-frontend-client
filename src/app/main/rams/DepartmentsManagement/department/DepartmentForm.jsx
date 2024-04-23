import { FormControl } from '@mui/base';
import { Autocomplete, Box, Checkbox, FormControlLabel, Icon, IconButton, InputAdornment } from '@mui/material';
import TextField from '@mui/material/TextField';
import { getBranches, getCities, getCountries, getDepartments, getRoles, getThanas } from 'app/store/dataSlice';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import countryCodes from 'src/app/@data/countrycodes';
import { genders } from 'src/app/@data/data';
import { BASE_URL } from 'src/app/constant/constants';

function DepartmentForm(props) {
	const dispatch = useDispatch();
	const methods = useFormContext();
	const { control, formState, watch } = methods;
	const { errors } = formState;


	return (
		<div>
			<Controller
				name="name"
				control={control}
				render={({ field }) => (
					<TextField
						{...field}
						className="mt-8 mb-16"
						required
						label="Name"
						autoFocus
						id="name"
						variant="outlined"
						fullWidth
						error={!!errors.name}
						helperText={errors?.name?.message}
					/>
				)}
			/>
	
		</div>
	);
}

export default DepartmentForm;
