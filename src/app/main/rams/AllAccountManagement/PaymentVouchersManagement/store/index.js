import { combineReducers } from '@reduxjs/toolkit';
import paymentVoucher from './paymentVoucherSlice';
import paymentVouchers from './paymentVouchersSlice';

const reducer = combineReducers({
	paymentVoucher,
	paymentVouchers
});

export default reducer;
