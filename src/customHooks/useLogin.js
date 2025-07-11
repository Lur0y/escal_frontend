import { useState } from "react";
import useAuth from "@/customHooks/useAuth";

export default function useLogin() {

    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const { login } = useAuth();

    function handleChange(e) {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }

    function handleLogin(e) {
        e.preventDefault();
        login({ username: credentials.username, password: credentials.password, route: '/admin/panel' });
    }

    return { handleChange, handleLogin, credentials }

}