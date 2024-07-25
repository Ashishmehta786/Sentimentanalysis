import { createContext, useEffect, useLayoutEffect, useState } from "react";
import { useContext } from "react";
import axios from "axios"
const Logincontext = createContext();
export const uselogin = () => {
    const login = useContext(Logincontext)
    return login
}
const LoginProvider = (props) => {
    const [logged, setlogged] = useState(false);
    const [user, setuser] = useState(null)
    useLayoutEffect(() => { 
        const login = async () => {
            try {
                const res = await axios.get("http://localhost:8080/api/users/logged", { withCredentials: true });
                console.log(res);

                if (res.data.data.msg.trim() !== "") {
                    setuser(res.data.data.user_)
                    setlogged(true);
                    console.log("Value of logged outside useEffect", logged);
                }
            } catch (error) {
                console.error("Error fetching login status:", error);
            }
        };

        return async () => await login()

    }, []);


    return (
        <Logincontext.Provider value={logged}>
            {props.children}
        </Logincontext.Provider>)
}


export { LoginProvider, Logincontext }