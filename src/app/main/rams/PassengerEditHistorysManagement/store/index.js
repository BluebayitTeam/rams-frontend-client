import { combineReducers } from '@reduxjs/toolkit';
import passengerEditHistorys from './passengerEditHistorysSlice';
import medicalEditHistorys from './medicalEditHistorysSlice';
import flightEditHistorys from './flightEditHistorysSlice';
import manpowerEditHistorys from './manpowerEditHistorysSlice';
import trainingEditHistorys from './trainingEditHistorysSlice';
import embassyEditHistorys from './embassyEditHistorysSlice';
import musanedOkalaEditHistorys from './musanedOkalaEditHistorysSlice';
import mofaEditHistorys from './mofaEditHistorysSlice';
import officeWorkEditHistorys from './officeWorkEditHistorysSlice';

const reducer = combineReducers({

    passengerEditHistorys,
    manpowerEditHistorys,
    medicalEditHistorys,
    flightEditHistorys,
    trainingEditHistorys,
    embassyEditHistorys,
    mofaEditHistorys,
    musanedOkalaEditHistorys,
    officeWorkEditHistorys
});

export default reducer;