import { GoogleLogin } from '@react-oauth/google';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';



function GoogleSSO() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { googleLogin } = useAuth();

    const handleGoogleSuccess = async (credentialResponse) => {
        try {
            console.log('here are the google credentials', credentialResponse.credential)
            // const response = await dispatch(googleSignUpThunk({ token: credentialResponse.credential }))
            console.log("here is the credentials going", credentialResponse.credential)
            await googleLogin({ token: credentialResponse.credential })

            // Store token in localStorage or secure storage
            // localStorage.setItem('token', data.access_token);

            // // Store user data or handle as needed
            // localStorage.setItem('user', JSON.stringify(data.user));

            // Redirect to dashboard or home page
            navigate('/tasks');
        } catch (error) {
            console.error('Google authentication error:', error);
            // Handle error appropriately
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