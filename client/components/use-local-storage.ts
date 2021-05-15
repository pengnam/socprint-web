//Adapted from: https://bit.dev/giladshoham/react-hooks/use/use-local-storage/~code
import { useState, useEffect } from 'react';

const useLocalStorage = <T>(key: string, initialValue?: T): [T, (value: T) => void] => {
    const [state, setState] = useState<T>(() => {
        try {
            const localStorageValue = localStorage.getItem(key);
            if (typeof localStorageValue !== 'string') {
                localStorage.setItem(key, JSON.stringify(initialValue));
                return initialValue;
            } else {
                return JSON.parse(localStorageValue || 'null');
            }
        } catch {
            // If user is in private mode or has storage restriction
            // localStorage can throw. JSON.parse and JSON.stringify
            // cat throw, too.
            return initialValue;
        }
    });

    useEffect(() => {
        try {
            const serializedState = JSON.stringify(state);
            localStorage.setItem(key, serializedState);
        } catch {
            // If user is in private mode or has storage restriction
            // localStorage can throw. Also JSON.stringify can throw.
        }
    });

    return [state, setState];
};

export default useLocalStorage;
