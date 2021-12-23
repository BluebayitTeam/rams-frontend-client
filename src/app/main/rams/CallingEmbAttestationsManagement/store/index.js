import { combineReducers } from '@reduxjs/toolkit';
import callingEmbAttestation from './callingEmbAttestationSlice';

const reducer = combineReducers({
    callingEmbAttestation,
});

export default reducer;