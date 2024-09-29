import { useEffect } from 'react';
import GreenDot from "src/assets/Ellipse green.svg";
import OrangeDot from "src/assets/Ellipse orange.svg";
import RedDot from "src/assets/Ellipse red.svg";
import PriorityComponents from "src/components/defaultcomps/subComponents/Sides/subComponents/Priority/PriorityComponents";
import { useResponsive } from 'src/constants/media_queries';

function Priority({ burgerMenuClicked }){
    const {
        isAdaptableScreen,
        isSmallerScreen,
        expandBar,
        isMobileScreen,
        isMicroScreen,
    } = useResponsive();

    useEffect(() => {
    console.log('burgerMenuClicked inside priority.jsx', burgerMenuClicked);
    }, [burgerMenuClicked]);
    

    return (
        <div className='tasks-page-priority-div' style={{display: (isMicroScreen && !burgerMenuClicked && !expandBar) && 'none'}}>
            { ((expandBar && burgerMenuClicked) || (isMicroScreen && burgerMenuClicked))  && (<div className='priority-header'>Priority</div>)}
            <PriorityComponents url={"/tasks/high"} Dot={RedDot} PriorityLevel='High' TasksAtPriorityLevel='7' burgerMenuClicked={burgerMenuClicked} />
            <PriorityComponents url={"/tasks/medium"} Dot={OrangeDot} PriorityLevel='Medium' TasksAtPriorityLevel='7' burgerMenuClicked={burgerMenuClicked} />
            <PriorityComponents url={"/tasks/low"} Dot={GreenDot} PriorityLevel='Low' TasksAtPriorityLevel='7' burgerMenuClicked={burgerMenuClicked} />
            

        </div>

    )
}

export default Priority;