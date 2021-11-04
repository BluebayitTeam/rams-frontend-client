import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { CREATE_QUALIFICATION, DELETE_QUALIFICATION, GET_QUALIFICATIONID, UPDATE_QUALIFICATION } from '../../../../constant/constants';


export const getQualification = createAsyncThunk('qualificationManagement/qualification/getQualification', async (params, { rejectWithValue }) => {
  const authTOKEN = {
    headers: {
      'Content-type': 'application/json',
      Authorization: localStorage.getItem('jwt_access_token'),
    }
  };

  try {
    const response = await axios.get(`${GET_QUALIFICATIONID}${params}`, authTOKEN);
    const data = await response.data;
    return data === undefined ? null : data;
  } catch (err) {

    return rejectWithValue(params)
  }

})

export const removeQualification = createAsyncThunk(
  'qualificationManagement/qualification/removeQualification',
  async (val, { dispatch, getState }) => {

    const authTOKEN = {
      headers: {
        'Content-type': 'application/json',
        Authorization: localStorage.getItem('jwt_access_token'),
      }
    };

    const qualificationId = val.id;
    await axios.delete(`${DELETE_QUALIFICATION}${qualificationId}`, authTOKEN);
  }
);

export const updateQualification = createAsyncThunk(
  'qualificationManagement/qualification/updateQualification',
  async (qualificationData, { dispatch, getState }) => {
    console.log(qualificationData);
    const { qualification } = getState().qualificationsManagement;

    function buildFormData(formData, data, parentKey) {
      if (data && typeof data === 'object' && !(data instanceof Date) && !(data instanceof File)) {
        Object.keys(data).forEach(key => {
          buildFormData(formData, data[key], parentKey ? `${parentKey}[${key}]` : key);
        });
      } else {
        const value = data === null ? '' : data;

        formData.append(parentKey, value);
      }
    }

    function jsonToFormData(data) {
      const formData = new FormData();

      buildFormData(formData, data);

      return formData;
    }

    const qualificationDataToFormData = jsonToFormData(qualificationData)

    const authTOKEN = {
      headers: {
        'Content-type': 'multipart/form-data',
        Authorization: localStorage.getItem('jwt_access_token'),
      }
    };
    const response = await axios.put(`${UPDATE_QUALIFICATION}${qualification.id}`, qualificationDataToFormData, authTOKEN);
    console.log(response);
  }

)

export const saveQualification = createAsyncThunk(
  'qualificationManagement/qualification/saveQualification',
  async (qualificationData, { dispatch, getState }) => {
    console.log(qualificationData);
    function buildFormData(formData, data, parentKey) {
      if (data && typeof data === 'object' && !(data instanceof Date) && !(data instanceof File)) {
        Object.keys(data).forEach(key => {
          buildFormData(formData, data[key], parentKey ? `${parentKey}[${key}]` : key);
        });
      } else {
        const value = data === null ? '' : data;

        formData.append(parentKey, value);
      }
    }

    function jsonToFormData(data) {
      const formData = new FormData();

      buildFormData(formData, data);

      return formData;
    }

    const getFormDateFJ = jsonToFormData(qualificationData)

    const authTOKEN = {
      headers: {
        'Content-type': 'multipart/form-data',
        Authorization: localStorage.getItem('jwt_access_token'),
      }
    };
    const response = await axios.post(`${CREATE_QUALIFICATION}`, getFormDateFJ, authTOKEN)
  }
)

const qualificationSlice = createSlice({
  name: 'qualificationManagement/qualification',
  initialState: null,
  reducers: {
    resetQualification: () => null,
    newQualification: {
      reducer: (state, action) => action.payload,
      prepare: event => ({
        payload: {}
      })
    }
  },
  extraReducers: {
    [getQualification.fulfilled]: (state, action) => action.payload,
    [saveQualification.fulfilled]: (state, action) => {
      localStorage.setItem("qualificationAlert", "saveQualification")
      return action.payload
    },
    [removeQualification.fulfilled]: () => { localStorage.setItem("qualificationAlert", "deleteQualification") },
    [updateQualification.fulfilled]: () => { localStorage.setItem("qualificationAlert", "updateQualification") }
  }
})


export const { newQualification, resetQualification } = qualificationSlice.actions;

export default qualificationSlice.reducer;