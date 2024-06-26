import Logo from "src/components/tasks/subComponents/Sides/Logo";
import Routes from "src/components/tasks/subComponents/Sides/Routes/Routes";
import Priority from "src/components/tasks/subComponents/Sides/Priority/Priority";

function Sides(){
    return (
        <div className='tasks-page-side'>
            <Logo />
            <Routes />
            <Priority />
        </div>
    )
}

export default Sides;