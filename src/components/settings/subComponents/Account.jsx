import { useSelector } from "react-redux";
import { useResponsive } from 'src/constants/media_queries';
import { capitalizeFirstLetter } from "src/utils/basicUtils";

const Account = () => {
    const { isMicroScreen } = useResponsive();
    const user = useSelector(state => state.auth?.user);
    const svgData = user?.avatar?.data;

    const formatUserName = () => {
        if (user) {
            let fullName = `${user?.firstName} ${user?.lastName}`;

            fullName = fullName
                .split(' ')
                .map(name => capitalizeFirstLetter(name))
                .join(' ');

            if (fullName.length > 12) {
                fullName = fullName.slice(0, 12) + '...';
            }

            return fullName;
        }

        return '';
    };

    return (
        <div className='account-page-content'>

            <div className="account-profile-div">
                <div className="account-profile-text">
                    <div className="account-profile-header">
                        Your Avatar
                    </div>

                    <div className="account-profile-para">
                        This will display on your profile.
                    </div>
                </div>

                <div className="account-profile-picture">
                    <img
                        style={{
                            borderRadius: '50px',
                            border: '1px solid var(--primary-background-color)',
                            padding: '1px'
                        }}
                        src={`data:image/svg+xml;utf8,${encodeURIComponent(svgData)}`}
                        alt="User Avatar"
                        width="50"
                        height="50"
                    />
                </div>
            </div>

            <div className="end-line"></div>

            <div className="account-details-div">

                <div className="account-details-username">
                    {!isMicroScreen && (
                        <div className="account-details-text">
                            Username
                        </div>
                    )}

                    <div
                        className="account-details-display"
                        style={{ width: isMicroScreen && '95%' }}
                    >
                        <div className="account-username-text">
                            Name
                        </div>

                        <div
                            className="account-box"
                            style={{ width: isMicroScreen && '100%' }}
                        >
                            {formatUserName()}
                        </div>
                    </div>
                </div>

                <div className="account-details-email">
                    {!isMicroScreen && (
                        <div className="account-details-text">
                            Email
                        </div>
                    )}

                    <div
                        className="account-details-display"
                        style={{ width: isMicroScreen && '95%' }}
                    >
                        <div className="account-email-text">
                            Email
                        </div>

                        <div
                            className="account-box"
                            style={{ width: isMicroScreen && '100%' }}
                        >
                            {user?.email}
                        </div>
                    </div>
                </div>

            </div>

        </div>
    );
};

export { Account };
