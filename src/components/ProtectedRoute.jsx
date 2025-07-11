import useTokens from "@/api/useTokens";
import { useEffect, useState } from "react";
import Unauthorized from "@/pages/public/Unauthorized";
import useApiCall from "@/api/useApiCall";

export default function ProtectedRoute({ children }) {

    const [isTokenValid, setIsTokenValid] = useState(false);
    const { validateToken } = useTokens();
    const { token } = useApiCall();

    async function verifyToken() {

        const { tokenValid } = await validateToken({ token });
        setIsTokenValid(tokenValid);

    }

    useEffect(() => {

        verifyToken();

    }, [token]);

    return (
        <>
            {
                (isTokenValid) ?
                    children
                    :
                    <Unauthorized />
            }
        </>
    );

}