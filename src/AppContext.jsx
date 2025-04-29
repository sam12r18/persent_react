// ServerContext.js
import React, {createContext, useContext} from 'react';

const ServerContext = createContext({
    serverAddress: 'https://presence-absence.liara.run/api/',
});

export const ServerProvider = ({children}) => {
    return (
        <ServerContext.Provider value={ServerContext}>
            {children}
        </ServerContext.Provider>
    );
};

export const useServer = () => useContext(ServerContext);
