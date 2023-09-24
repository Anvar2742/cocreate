import {
    createContext,
    useState,
    ReactNode,
    Dispatch,
    SetStateAction,
} from "react";

interface IAuth {
    auth: any;
    setAuth: Dispatch<SetStateAction<{}>>;
}

const AuthContext = createContext<IAuth>({
    auth: undefined,
    setAuth: function (value: SetStateAction<{}>): void {
        throw new Error("Function not implemented.");
    },
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [auth, setAuth] = useState({});

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
