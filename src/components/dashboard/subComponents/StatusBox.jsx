import { useResponsive } from 'src/constants/media_queries';

const StatusBox = ({ img, statusCount, statusName }) => {
    const {
        isSmallScreen,
        onWholeScreen,
        isMicroScreen,
    } = useResponsive();
    return (
        <div style={
            {display: 'flex', 
            flexDirection: 'column', 
            gap: '15px', 
            justifyContent: 'center', 
            alignItems: 'center',
                height: isSmallScreen ? '100px' : '140px',
            width: '254px',
            border: '1px solid var(--light-border-color)',
            borderRadius: '12px',
            backgroundColor: 'white'}}>

                <div>
                    <img src={img} />
                </div>
                <div style={{
                    fontFamily: 'var(--primary-font-family)',
                    fontWeight: '600',
                fontSize: isSmallScreen ? '18px' : '24px',
                    color: 'var(--secondary-font-color)'

                }}>
                    {statusCount}
                </div>
            {!isSmallScreen && <div style={{
                    fontWeight: '500',
                    fontFamily: 'var(--primary-font-family)',
                    fontSize: '20px',
                    color: 'var(--quaternary-font-color)'
                }}>
                    {statusName}
            </div>}
        </div>
    )
}

export default StatusBox;