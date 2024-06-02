import { createSlice } from '@reduxjs/toolkit';
import { appSelector } from 'app/store/store';

const initialState = '';

export const searchTextSlice = createSlice({
	name: 'complainApp/searchText',
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
export const selectSearchText = appSelector((state) => state.complainApp?.searchText);
const searchTextReducer = searchTextSlice.reducer;
export default searchTextReducer;
