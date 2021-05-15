import React, {useState, useEffect} from 'react';

function useStateWithLocalStorage(localStorageKey:string):[string, React.Dispatch<React.SetStateAction<string>>] {
    const [value, setValue] = useState(
        process.browser&&localStorage.getItem(localStorageKey) || ''
    );

    useEffect(() => {
        process.browser&&localStorage.setItem(localStorageKey, value);
    }, [value]);

    return [value, setValue];
};

export default useStateWithLocalStorage;