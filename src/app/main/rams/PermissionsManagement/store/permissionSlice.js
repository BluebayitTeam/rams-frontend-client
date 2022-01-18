import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { CREATE_PERMISSION, DELETE_PERMISSION, GET_PERMISSIONID, UPDATE_PERMISSION } from '../../../../constant/constants';


export const getPermission = createAsyncThunk('permissionManagement/permission/getPermission', async (params, { rejectWithValue }) => {
  const authTOKEN = {
    headers: {
      'Content-type': 'application/json',
      Authorization: localStorage.getItem('jwt_access_token'),
    }
  };

  try {
    const response = await axios.get(`${GET_PERMISSIONID}${params}`, authTOKEN);
    const data = await response.data;
    return data === undefined ? null : data;
  } catch (err) {

    return rejectWithValue(params)
  }

})

export const removePermission = createAsyncThunk(
  'permissionManagement/permission/removePermission',
  async (val) => {

    const authTOKEN = {
      headers: {
        'Content-type': 'application/json',
        Authorization: localStorage.getItem('jwt_access_token'),
      }
    };

    const permissionId = val.id;
    const response = await axios.delete(`${DELETE_PERMISSION}${permissionId}`, authTOKEN);
    return response
  }
);

export const updatePermission = createAsyncThunk(
  'permissionManagement/permission/updatePermission',
  async (permissionData, { dispatch, getState }) => {
    const { permission } = getState().permissionsManagement;

    const authTOKEN = {
      headers: {
        'Content-type': 'application/json',
        Authorization: localStorage.getItem('jwt_access_token'),
      }
    };
    const response = await axios.put(`${UPDATE_PERMISSION}${permission.id}`, permissionData, authTOKEN);
    return response
  }
)

export const savePermission = createAsyncThunk(
  'permissionManagement/permission/savePermission',
  async (permissionData, { dispatch, getState }) => {
    console.log(permissionData)
    const authTOKEN = {
      headers: {
        'Content-type': 'application/json',
        Authorization: localStorage.getItem('jwt_access_token'),
      }
    };
    const response = await axios.post(`${CREATE_PERMISSION}`, permissionData, authTOKEN)
    return response
  }
)

const permissionSlice = createSlice({
  name: 'permissionManagement/permission',
  initialState: null,
  reducers: {
    resetPermission: () => null,
    newPermission: {
      reducer: (state, action) => action.payload,
      prepare: event => ({
        payload: {
          id: null,
          name: ""
        }
      })
    }
  },
  extraReducers: {
    [getPermission.fulfilled]: (state, action) => action.payload,
    [savePermission.fulfilled]: (state, action) => action.payload,
    [removePermission.fulfilled]: (state, action) => action.payload,
    [updatePermission.fulfilled]: (state, action) => action.payload
  }
})


export const { newPermission, resetPermission } = permissionSlice.actions;

export default permissionSlice.reducer;