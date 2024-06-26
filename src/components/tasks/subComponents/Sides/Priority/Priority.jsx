import PriorityComponents from "src/components/tasks/subComponents/Sides/Priority/PriorityComponents";
import RedDot from "src/assets/Ellipse red.svg";
import OrangeDot from "src/assets/Ellipse orange.svg";
import GreenDot from "src/assets/Ellipse green.svg";

function Priority(){
    return (
        <div className='tasks-page-priority-div'>
            <div className='priority-header'>Priority</div>
            <PriorityComponents Dot={RedDot} PriorityLevel='High' TasksAtPriorityLevel='7'  />
            <PriorityComponents Dot={OrangeDot} PriorityLevel='Medium' TasksAtPriorityLevel='7'  />
            <PriorityComponents Dot={GreenDot} PriorityLevel='Low' TasksAtPriorityLevel='7'  />
            

        </div>

    )
};

export default Priority;