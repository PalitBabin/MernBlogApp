import { createContext, useState } from "react";
import  PropTypes  from "prop-types";
export const DataContext = createContext(null); 

const DataProvider = ({children})=>{
    const [account,setAccount] = useState({name:'',username:''});
    return(
        <DataContext.Provider value={{
            account,
            setAccount
        }}>
            {children}
        </DataContext.Provider>
    )
}

DataProvider.propTypes={
children:PropTypes.node,
}

export default DataProvider;