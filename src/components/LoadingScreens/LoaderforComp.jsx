import PropTypes from "prop-types";
import { RingLoader } from "react-spinners";
const LoaderforComp = ({ showSpinner, blurBackground }) => {
    return (
        <>
            {showSpinner && (
                <>
                    <div
                        style={{
                            position: "fixed",
                            top: "45%",
                            left: "56%",
                            transform: "translate(-50%, -50%)",
                            zIndex: "10000",
                        }}
                    >
                        <RingLoader color="#3B8AFF" speedMultiplier={1.5} />
                    </div>
                    {blurBackground && (
                        <div
                            style={{
                                position: "fixed",
                                top: 0,
                                left: 0,
                                width: "100%",
                                height: "100%",
                                backgroundColor: "rgba(255, 255, 255, 0.4)",
                                zIndex: "99999",
                            }}
                        ></div>
                    )}
                </>
            )}
        </>
    );
};

export default LoaderforComp;

// Setting default values for the props of BasicLayout
LoaderforComp.defaultProps = {
    showSpinner: false,
    blurBackground: true,
};

// Typechecking props for the BasicLayout
LoaderforComp.propTypes = {
    showSpinner: PropTypes.bool,
    blurBackground: PropTypes.bool,
};
