import FuseUtils from '@fuse/utils';
import { createSelector } from '@reduxjs/toolkit';
import { apiService as api } from 'app/store/apiService';
import jsonToFormData from 'src/app/@helpers/jsonToFormData';

import { CREATE_DEVICE_IP, DELETE_DEVICE_IP, GET_DEVICE_IPID, GET_DEVICE_IPS, UPDATE_DEVICE_IP } from 'src/app/constant/constants';
import DeviceModel from './device/models/DeviceModel';
import { selectSearchText } from './store/searchTextSlice';

export const addTagTypes = ['devices'];
const DeviceApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      getDevices: build.query({
        query: ({ page, size, searchKey }) => ({
          url: GET_DEVICE_IPS,
          params: { page, size, searchKey },
        }),
        providesTags: ['devices'],
      }),
      deleteDevices: build.mutation({
        query: (deviceIds) => ({
          url: DELETE_DEVICE_MULTIPLE,
          method: 'DELETE',
          data: { ids: deviceIds },
        }),
        invalidatesTags: ['devices'],
      }),
      getDevice: build.query({
        query: (deviceId) => ({
          url: `${GET_DEVICE_IPID}${deviceId}`,
        }),
        providesTags: ['devices'],
      }),
      createDevice: build.mutation({
        query: (newDevice) => ({
          url: CREATE_DEVICE_IP,
          method: 'POST',
          data: jsonToFormData(DeviceModel(newDevice)),
        }),
        invalidatesTags: ['devices'],
      }),
      updateDevice: build.mutation({
        query: (device) => ({
          url: `${UPDATE_DEVICE_IP}${device.id}`,
          method: 'PUT',
          data: jsonToFormData(device),
        }),
        invalidatesTags: ['devices'],
      }),
      deleteDevice: build.mutation({
        query: (deviceId) => ({
          url: `${DELETE_DEVICE_IP}${deviceId}`,
          method: 'DELETE',
        }),
        invalidatesTags: ['devices'],
      }),
    }),
    overrideExisting: false,
  });
export default DeviceApi;
export const {
  useGetDevicesQuery,
  useDeleteDevicesMutation,
  useGetDeviceQuery,
  useUpdateDeviceMutation,
  useDeleteDeviceMutation,

  useCreateDeviceMutation,
} = DeviceApi;

export const selectFilteredDevices = (devices) =>
  createSelector([selectSearchText], (searchText) => {
    if (searchText?.length === 0) {
      return devices;
    }

    return FuseUtils.filterArrayByString(devices, searchText);
  });
