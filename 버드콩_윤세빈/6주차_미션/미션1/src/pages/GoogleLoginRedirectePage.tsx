import  { useEffect } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage';
import { LOCAL_STORAGE_KEY } from '../constants/key';

const GoogleLoginRedirectePage = () => {
    const {setItem: setAccessToken} = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
    const {setItem: setRefreshToken} = useLocalStorage(LOCAL_STORAGE_KEY.refreshToken);

    useEffect(() =>{
        const urlParams: URLSearchParams = new URLSearchParams(window.location.search);
        const accessToken = urlParams.get(LOCAL_STORAGE_KEY.accessToken);
        const refreshToken = urlParams.get(LOCAL_STORAGE_KEY.refreshToken);

        if(accessToken){
            setAccessToken(accessToken);
            setRefreshToken(refreshToken);
            window.location.href = "/my";
        }
    },[setAccessToken,setRefreshToken]);

  return (
    <div>
      구글리다이렉트화면
    </div>
  )
}

export default GoogleLoginRedirectePage
