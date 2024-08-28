import { createSlice } from '@reduxjs/toolkit';
import _ from 'lodash'; // Use lodash instead of @lodash
import { appSelector } from 'app/store/store';

const initialState = [];

/**
 * The CalendarApp labels slice.
 */
export const selectedLabelsSlice = createSlice({
	name: 'calendarApp/selectedLabels',
	initialState,
	reducers: {
		setSelectedLabels: (state, action) => action.payload,
		toggleSelectedLabels: (state, action) => {
			const labelId = action.payload;
			return _.xor(state, [labelId]);
		}
	}
});

export const selectSelectedLabels = appSelector((state) => state.calendarApp?.selectedLabels || []);
export const { toggleSelectedLabels, setSelectedLabels } = selectedLabelsSlice.actions;
export default selectedLabelsSlice.reducer;
