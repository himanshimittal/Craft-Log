import React, { createContext, useState } from 'react';

// Create context for each data
export const adddata = createContext();
export const updatedata = createContext();
export const deldata = createContext();

const ContextProvider = ({ children }) => {
  // Declare state for each context
  const [udata, setUdata] = useState("");
  const [updata, setUPdata] = useState("");
  const [dltdata, setDLTdata] = useState("");

  return (
    <adddata.Provider value={{ udata, setUdata }}>
      <updatedata.Provider value={{ updata, setUPdata }}>
        <deldata.Provider value={{ dltdata, setDLTdata }}>
          {children} {/* Children components will have access to the context values */}
        </deldata.Provider>
      </updatedata.Provider>
    </adddata.Provider>
  );
};

export default ContextProvider;
