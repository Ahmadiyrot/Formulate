import axios from '../api/axios.js'
import useAuth from './useAuth';

const useRefreshToken = () => {
    const { setAuth } = useAuth();
    const refresh = async () => {
        const response = await axios.get('/refresh', {
            withCredentials: true
        });
        setAuth(prev => {
            console.log(JSON.stringify(prev))
            console.log(response.data.accessToken)
            return { userName: response.data.userName, token: response.data.accessToken, userInfo: response.data.userInfo }
        })
        return response.data.accessToken
    }
    return refresh;
}

export default useRefreshToken