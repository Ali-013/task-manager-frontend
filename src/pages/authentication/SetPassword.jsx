
import signUpFrame from 'src/assets/Frame 3289.svg';
import AuthenticationPages from 'src/components/authentication/Authentication';
import { Screen } from "src/constants/constants";

function SetPassword() {
    return (
        <div>
            <AuthenticationPages currentScreen={Screen.SET_PASS} pictureURL={signUpFrame} />
        </div>
    )
}

export default SetPassword;
