import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { CREATE_CITY, DELETE_CITY, GET_CITYID, UPDATE_CITY } from '../../../../constant/constants';


export const getCity = createAsyncThunk('cityManagement/city/getCity', async (params, { rejectWithValue }) => {
  const authTOKEN = {
    headers: {
      'Content-type': 'application/json',
      Authorization: localStorage.getItem('jwt_access_token'),
    }
  };

  try {
    const response = await axios.get(`${GET_CITYID}${params}`, authTOKEN);
    const data = await response.data;
    return data === undefined ? null : data;
  } catch (err) {

    return rejectWithValue(params)
  }

})

export const removeCity = createAsyncThunk(
  'cityManagement/city/removeCity',
  async (val, { dispatch, getState }) => {

    const authTOKEN = {
      headers: {
        'Content-type': 'application/json',
        Authorization: localStorage.getItem('jwt_access_token'),
      }
    };

    const cityId = val.id;
    await axios.delete(`${DELETE_CITY}${cityId}`, authTOKEN);
  }
);

export const updateCity = createAsyncThunk(
  'cityManagement/city/updateCity',
  async (cityData, { dispatch, getState }) => {
    const { city } = getState().citysManagement;


    const authTOKEN = {
      headers: {
        'Content-type': 'application/json',
        Authorization: localStorage.getItem('jwt_access_token'),
      }
    };
    const response = await axios.put(`${UPDATE_CITY}${city.id}`, cityData, authTOKEN);
  }

)

export const saveCity = createAsyncThunk(
  'cityManagement/city/saveCity',
  async (cityData, { dispatch, getState }) => {


    const authTOKEN = {
      headers: {
        'Content-type': 'application/json',
        Authorization: localStorage.getItem('jwt_access_token'),
      }
    };
    const response = await axios.post(`${CREATE_CITY}`, cityData, authTOKEN)
  }
)

const citySlice = createSlice({
  name: 'cityManagement/city',
  initialState: null,
  reducers: {
    resetCity: () => null,
    newCity: {
      reducer: (state, action) => action.payload,
      prepare: event => ({
        payload: {}
      })
    }
  },
  extraReducers: {
    [getCity.fulfilled]: (state, action) => action.payload,
    [saveCity.fulfilled]: (state, action) => {
      localStorage.setItem("cityAlert", "saveCity")
      return action.payload
    },
    [removeCity.fulfilled]: () => { localStorage.setItem("cityAlert", "deleteCity") },
    [updateCity.fulfilled]: () => { localStorage.setItem("cityAlert", "updateCity") }
  }
})


export const { newCity, resetCity } = citySlice.actions;

export default citySlice.reducer;