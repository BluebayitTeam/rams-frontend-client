import { useEffect, useState } from 'react';

const useSessionStorage = (key = '') => {
    const [state, setstate] = useState(sessionStorage.getItem(key))

    useEffect(() => {
        window.addEventListener('storage', (e) => {
            if (e.storageArea === sessionStorage) {
                alert('change');
            }
            // else, event is localStorage, ignore it
        });

        return () => {
            window.removeEventListener('storage', () => null)
        }
    }, [])

    return state
}

export default useSessionStorage
