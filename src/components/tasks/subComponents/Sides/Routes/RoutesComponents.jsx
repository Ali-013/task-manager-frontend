import { NavLink } from "react-router-dom";
import propTypes from "prop-types";

function RoutesComponents({ icon, route, page }){
    const activeStyles = {
        color: 'var(--primary-background-color)', 
        backgroundColor: 'var(--active-background-color)',
        textDecoration: 'none',
        display: 'flex',
        fontSize: 'var(--tertiary-font-size)',
        marginLeft: '10%',
        gap: '12px',
        padding: '8px 12px',
        marginBottom: '12px',
        width: '80%',
        fontFamily: 'var(--primary-font-family)',
        fontWeight: '400'
    };
    
    const inactiveStyles = {
        textDecoration: 'none',
        display: 'flex',
        fontSize: 'var(--tertiary-font-size)',
        marginLeft: '10%',
        gap: '12px',
        padding: '8px 12px',
        marginBottom: '12px',
        width: '80%',
        color: 'var( --quaternary-font-color)',
        fontFamily: 'var(--primary-font-family)',
        fontWeight: '400'
    };
    
    return (
            <NavLink 
                className='tasks-page-route'
                to={ page }
                style={({ isActive }) => (isActive ? activeStyles : inactiveStyles)}
            >
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <img src={icon} alt='route-icon' />
                </div>
                <div className='tasks-page-route-name'>
                    { route }
                </div>
            </NavLink>

        
    )
};

RoutesComponents.propTypes = {
    icon: propTypes.string.isRequired,
    route: propTypes.string.isRequired,
    page: propTypes.string.isRequired
}

export default RoutesComponents;