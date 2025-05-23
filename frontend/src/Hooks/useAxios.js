import { axiosPrivate } from "../Api/axios";
import { useEffect } from "react";

const useAxios = () => {
    //const refresh = useRefreshToken();
    //const { auth } = useAuth();

    useEffect(() => {

        const requestIntercept = axiosPrivate.interceptors.request.use(
            config => {
                if (!config.headers['Authorization']) {
                    config.headers['Authorization'] = `Bearer ${localStorage.token}`;
                }
                return config;
            }, (error) => Promise.reject(error)
        );

        /*const responseIntercept = axiosPrivate.interceptors.response.use(
            response => response,
            async (error) => {
                const prevRequest = error?.config;
                if (error?.response?.status === 403 && !prevRequest?.sent) {
                    prevRequest.sent = true;
                    const newAccessToken = await refresh();
                    prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                    return axiosPrivate(prevRequest);
                }
                return Promise.reject(error);
            }
        );*/

        return () => {
            axiosPrivate.interceptors.request.eject(requestIntercept);
            //axiosPrivate.interceptors.response.eject(responseIntercept);
        }
    }, [localStorage.token]);

    return axiosPrivate;
}

export default useAxios;