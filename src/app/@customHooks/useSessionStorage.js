import { useEffect, useState } from 'react';

const useSessionStorage = (key = '') => {
	const [state, setState] = useState(sessionStorage.getItem(key));

	useEffect(() => {
		const resetSessionStorage = () => {
			setState(sessionStorage.getItem(key));
			console.log('sessionStorageFire', key);
		};

		//reset when storage is changed
		window.addEventListener('storage', resetSessionStorage);

		//unsubscribe event listener when this hook unmount
		return () => window.removeEventListener('storage', resetSessionStorage);
	}, []);

	return state;
};

export default useSessionStorage;
