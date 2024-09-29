import { createSlice } from '@reduxjs/toolkit';
import { appSelector } from 'app/store/store';

const initialState = '';

export const searchTextSlice = createSlice({
	name: 'ticketRefundApp/searchText',
	initialState,
	reducers: {
		resetSearchText: () => initialState,
		setSearchText: {
			reducer: (state, action) => action.payload,
			prepare: (event) => ({
				payload: event.target.value || '',
				meta: undefined,
				error: null
			})
		}
	}
});
export const { setSearchText, resetSearchText } = searchTextSlice.actions;
export const selectSearchText = appSelector((state) => state.ticketRefundApp?.searchText);
const searchTextReducer = searchTextSlice.reducer;
export default searchTextReducer;
