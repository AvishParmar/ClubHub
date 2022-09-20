import { createContext, useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import api from '../api'
import AuthContext from '../auth'

// THIS IS THE CONTEXT WE'LL USE TO SHARE OUR STORE
export const GlobalStoreContext = createContext({});

// THESE ARE ALL THE TYPES OF UPDATES TO OUR GLOBAL
// DATA STORE STATE THAT CAN BE PROCESSED
export const GlobalStoreActionType = {

    ADD_NEW_TRANSACTION: "ADD_NEW_TRANSACTION",
    DELETE_TRANSACTION: "DELETE_TRANSACTION",
    UPDATE_TRANSACTION: "UPDATE_TRANSACTION",
    GET_TRANSACTION: "GET_TRANSACTION",
}


// WITH THIS WE'RE MAKING OUR GLOBAL DATA STORE
// AVAILABLE TO THE REST OF THE APPLICATION
function GlobalStoreContextProvider(props) {
    
    const [store, setStore] = useState({
        transactionPairs: [],
        currentOrganization: null,
    });
    const history = useHistory();
    
    
    const { auth } = useContext(AuthContext);

    // HERE'S THE DATA STORE'S REDUCER, IT MUST
    // HANDLE EVERY TYPE OF STATE CHANGE
    const storeReducer = (action) => {
        const { type, payload } = action;
        switch (type) {
            
            case GlobalStoreActionType.ADD_NEW_TRANSACTION: {
                return setStore({
                    
                });
            }
           
            case GlobalStoreActionType.DELETE_TRANSACTION: {
                return setStore({
                    
                })
            }
            
            case GlobalStoreActionType.UPDATE_TRANSACTION: {
                return setStore({
                    
                })
            }
            // GET ALL THE LISTS SO WE CAN PRESENT THEM
            case GlobalStoreActionType.GET_TRANSACTION: {
                return setStore({
                    
                });
            }
            
            default:
                return store;
        }
    }

    

    return (
        <GlobalStoreContext.Provider value={{
            store
        }}>
        
            {props.children}
        </GlobalStoreContext.Provider>
    );
}

export default GlobalStoreContext;
export { GlobalStoreContextProvider };