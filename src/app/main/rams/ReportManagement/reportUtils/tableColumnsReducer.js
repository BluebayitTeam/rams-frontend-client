function tableColumnsReducer(state, action) {
	switch (action.type) {
		case 'show': {
			const newState = [...state];
			const targetIndex = newState.findIndex(i => i.id === action.id);
			newState[targetIndex] = { ...newState[targetIndex], show: true };
			return newState;
		}
		case 'hide': {
			const newState = [...state];
			const targetIndex = newState.findIndex(i => i.id === action.id);
			newState[targetIndex] = { ...newState[targetIndex], show: false };
			return newState;
		}
		case 'changLabel': {
			const newState = [...state];
			const targetIndex = newState.findIndex(i => i.id === action.id);
			newState[targetIndex] = { ...newState[targetIndex], label: action.value };
			return newState;
		}
		case 'dragAndDrop': {
			const newState = [...state];

			const dropperIndex = newState.findIndex(i => i.id == action.dropper);
			const draggerIndex = newState.findIndex(i => i.id == action.dragger);

			if (dropperIndex < draggerIndex) {
				newState.splice(dropperIndex, 0, newState[draggerIndex]);
				newState.splice(draggerIndex + 1, 1);
				return newState;
			} else if (dropperIndex > draggerIndex) {
				newState.splice(dropperIndex + 1, 0, newState[draggerIndex]);
				newState.splice(draggerIndex, 1);
				return newState;
			} else {
				return state;
			}
		}
		default:
			return state;
	}
}

export default tableColumnsReducer;
