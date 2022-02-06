import { combineReducers } from '@reduxjs/toolkit';
import receiptVoucher from './receiptVoucherSlice';
import receiptVouchers from './receiptVouchersSlice';

const reducer = combineReducers({
	receiptVoucher,
	receiptVouchers
});

export default reducer;
