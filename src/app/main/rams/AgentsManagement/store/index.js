import { combineReducers } from '@reduxjs/toolkit';
import agent from './agentSlice';
import agents from './agentsSlice';

const reducer = combineReducers({
    agent,
    agents,
});

export default reducer;