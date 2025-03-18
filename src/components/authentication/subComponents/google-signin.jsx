import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';



function GoogleSSO() {
    const navigate = useNavigate();
    const { googleLogin } = useAuth();

    const handleGoogleSuccess = async (credentialResponse) => {
        try {
            console.log('here are the google credentials', credentialResponse.credential)
            console.log("here is the credentials going", credentialResponse.credential)
            await googleLogin({ token: credentialResponse.credential })
            navigate('/tasks');
        } catch (error) {
            console.error('Google authentication error:', error);
        }
    };

    return (
        <div className='google-sso'>
            {/* <button className='google-sso-button'>
                <img src={GoogleLogo} alt='google logo' />
                Sign in with Google
            </button> */}
            <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={() => console.log('Login Failed')}
                useOneTap
                theme="filled_blue"
                text="continue_with"
                shape="rectangular"
            />
        </div>
    )
}

export default GoogleSSO;