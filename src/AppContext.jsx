// ServerContext.js
import React, {createContext, useContext} from 'react';

const ServerContext = createContext({
    serverAddress: 'http://127.0.0.1:8017/api/v1/',
});

export const ServerProvider = ({children}) => {
    return (
        <ServerContext.Provider value={ServerContext}>
            {children}
        </ServerContext.Provider>
    );
};

export const useServer = () => useContext(ServerContext);
