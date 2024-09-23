import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import useRefreshToken from "../../hooks/useRefreshToken";
import useAuth from "../../hooks/useAuth";
import LoadingPage from "../loadingpage/LoadingPage";

const PersistLogin = () => {
    const [isLoading, setIsLoading] = useState(true)
    const refresh = useRefreshToken();
    const { auth } = useAuth();

    useEffect(() => {
        const verifyRefreshToken = async () => {
            try {
                await refresh();

            } catch (err) {

            } finally {
                setIsLoading(false)
            }
        }

        !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false)
    }, [])
    useEffect(() => {

    }, [isLoading])

    return (
        <>
            {isLoading
                ? <LoadingPage />
                : <Outlet />
            }
        </>
    )
}

export default PersistLogin