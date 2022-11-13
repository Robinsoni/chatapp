import { 
    createContext, 
    useContext, 
    useReducer 
} from "react";
import { AuthContext } from "./AuthContext";

const INITIAL_STATE = {
    chatId:null,
    user:{},
};
export const ChatContext = createContext();
export const ChatContextProvider = ({children}) => {
    const {currentUser} = useContext(AuthContext);
    const chatReducer = (state, action) => {
        switch (action.type) {
            case "user_change":
                return {
                    user:action.payload,
                    chatId: currentUser.uid > action.payload.uid
                    ?(currentUser.uid + action.payload.uid)
                    :(action.payload.uid + currentUser.uid),
                };
            default : return state;
        }
    };
    const [state,dispatch]  = useReducer(chatReducer,INITIAL_STATE);
    return (
        <ChatContext.Provider value ={{data:state,dispatch}} >
            {children}
        </ChatContext.Provider>
    );
};
