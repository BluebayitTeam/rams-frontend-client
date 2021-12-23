import { useEffect, useState } from 'react';

const useSessionStorage = (key = '') => {
    const [state, setState] = useState(sessionStorage.getItem(key))

    useEffect(() => {
        window.addEventListener('storage', (event) => {
            setState(sessionStorage.getItem(key))
            console.log('sessionStorageFire', event)
        });

        return () => window.removeEventListener('storage', () => null)
    }, [])

    return state
}

export default useSessionStorage
