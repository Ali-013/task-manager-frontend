
import { useState } from 'react';
import Priority from "src/components/defaultcomps/subComponents/Sides/subComponents/Priority/Priority";
import Routes from "src/components/defaultcomps/subComponents/Sides/subComponents/Routes/Routes";
import 'src/components/defaultcomps/subComponents/Sides/subComponents/sides.css';
import { useResponsive } from 'src/constants/media_queries';
import cross from 'src/assets/cross.svg';

function Sides({clickfunction, burgerMenuClicked, handleBurgerMenuClick }){
    const [hamburgerClicked, setHamburgerClicked] = useState(false);

    const {
        isAdaptableScreen,
        expandBar,
        isSmallerScreen,
        isMobileScreen,
        isMicroScreen,
    } = useResponsive();

    return (
        <div>
            { (isAdaptableScreen || isMicroScreen) && (<div className='tasks-page-side' style={{width: (isMicroScreen && burgerMenuClicked && !expandBar) ? '225px' 
            : ((expandBar && burgerMenuClicked) || (isMicroScreen && burgerMenuClicked)) ? '255px'
            : (isMicroScreen && !burgerMenuClicked && !expandBar) ? '0'
            : '50px',
            top: (isMicroScreen && burgerMenuClicked && !expandBar) && '0',
            zIndex: (isMicroScreen && burgerMenuClicked) && '999999999999'
             }}>
                { (isMicroScreen && burgerMenuClicked && !expandBar) && (
                    <div style={{height: '30px', width: '30px', backgroundColor: 'var(--active-background-color)', borderRadius: '50px', display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '20px', marginLeft: '80%', cursor: 'pointer'}}
                        onClick={handleBurgerMenuClick}>
                    <img src={ cross} alt='cross-sign' />
                    </div>)}
                <Routes clickfunction = {clickfunction} burgerMenuClicked={ burgerMenuClicked }/>
                <Priority burgerMenuClicked={ burgerMenuClicked } />
            </div>)}
        </div>
    )
}

export default Sides;