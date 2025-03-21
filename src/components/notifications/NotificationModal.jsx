import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded';
import {
    Box,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Typography,
    useMediaQuery,
    useTheme
} from "@mui/material";
import { styled } from "@mui/system";

const IconContainer = styled("div")`
    svg {
      width: 70px;
      height: 70px;
      stroke-width: 2;
    }
  `;

function NotificationModal({
    open,
    onOkay,
    onCancel,
    title,
    titleInfo,
    message,
    icon,
    primaryButtonText,
    pirmaryButtonColor,
    secondaryButtonColor,
    secondaryButtonText,
    notificationType,
    iconType,
    backgroundImage,
    buttonText,
    buttonColor,
}) {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
    console.log(backgroundImage);
    const primaryColor = notificationType === 'DELETE' ? 'error' : 'info';
    console.log(title, message, titleInfo)
    return (
        <Box>
            <Dialog
                PaperProps={{
                    sx: {
                        borderRadius: "16px",
                        position: "fixed",
                        maxWidth: "609px",
                        width: "100%",
                        height: '378px',
                        boxShadow: "0 7px 23px 0 rgba(0, 0, 0, 0.05)",
                        paddingTop: "24px",
                        display: "flex",
                        flexDirection: "column",
                        gap: '12px',
                        alignItems: "center",
                        justifyContent: "space-between",
                        backgroundImage: `url(${backgroundImage})`,
                        backgroundSize: "contain",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center center",
                        zIndex: '9999999999'
                    },
                }}
                disableEscapeKeyDown={true}
                open={open}
                maxWidth={"731px"}
            >
                <IconContainer sx={{ display: 'flex', justifyContent: 'center' }} mt={1}>
                    {iconType ? (iconType === 'WARNING' ? <WarningAmberRoundedIcon color={'warning'} /> : <WarningAmberRoundedIcon />) : <img src={icon} />}
                </IconContainer>
                <DialogTitle mb={-1} sx={{ textAlign: "center", }}>
                    <Typography variant="h3" fontWeight={600} sx={{ fontSize: '20px', lineHeight: '28px' }} color="#495057">
                        {title}
                        <Box style={{ color: '#495057', lineHeight: '28px' }}>{titleInfo}</Box>
                    </Typography>
                </DialogTitle>
                <DialogContent mb={2} mt={3} sx={{ textAlign: "center", padding: '0px', alignItems: 'center', justifyContent: 'center', width: '490px' }}>
                    <Typography variant="body2" fontWeight={400} style={{ lineHeight: '24px', textAlign: "center", }} color="#9CA3AF">
                        {message}
                    </Typography>
                </DialogContent>
                {/* <Box mt={6}></Box> */}
                <DialogActions mt={6} mb={-6} sx={{ display: "flex", gap: '24px', justifyContent: "center", width: '100%', height: '90px', borderTop: '1px solid #D1D5DB' }}>
                    {(notificationType && (notificationType === 'DELETE' || notificationType === 'UPDATE')) &&
                        <div variant='outlined' className='filter-button' style={{ borderRadius: '28px', width: '100px', height: '40px', textTransform: 'capitalize' }} size="medium" mb={4} mt={3} onClick={onCancel} color="info">
                            {secondaryButtonText ? secondaryButtonText : 'Cancel'}
                        </div>
                    }
                    <div variant='contained' className='primary-button' style={{ borderRadius: '28px', textTransform: 'none', width: notificationType && (notificationType === 'DELETE' || notificationType === 'UPDATE') ? '100px' : '250px', height: '40px', backgroundColor: notificationType && notificationType === 'DELETE' && '#EF4444', fontFamily: 'var(--primary-font-family)' }} size="medium" mb={4} mt={3} onClick={onOkay} color={primaryColor}>
                        {primaryButtonText}
                    </div>

                </DialogActions>
            </Dialog>
        </Box>
    );
}

export default NotificationModal;
