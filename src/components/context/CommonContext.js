import { createContext, useReducer } from "react";

const INITIAL_STATE = {
    toggle_sidebar:true
};

export const CommonContext = createContext();
export const CommonContextProvider = ({children}) => {          
    const commonReducer = (state,action) =>{
        console.log("reducer Commmon context state", state,action.type);
        switch (action.type) {
            case 'toggle_sidebar':
                return {
                    ...state,
                    toggle_sidebar: !state["toggle_sidebar"]
                };    
            
            default:
                return state;
        }
    };
    const [state,dispatch] = useReducer(commonReducer,INITIAL_STATE);
    return (
        <CommonContext.Provider value={{data:state, dispatch}} >
            {children}
        </CommonContext.Provider>
    );
};