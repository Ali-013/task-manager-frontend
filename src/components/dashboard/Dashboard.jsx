import { useSelector } from 'react-redux';
import blueTick from 'src/assets/blue-tick-circle.svg';
import clock from 'src/assets/clock.svg';
import greenTick from 'src/assets/green-tick-circle.svg';
import total from 'src/assets/total.svg';
import 'src/components/dashboard/subComponents/dashboard.css';
import TwoLevelPieChart from 'src/components/dashboard/subComponents/PieChart.jsx';
import StatusBox from 'src/components/dashboard/subComponents/StatusBox';
import MainDiv from "src/components/maindiv/maindiv";
import { capitalizeFirstLetter, formatLocalDateTime } from 'src/utils/basicUtils';
import CustomBarChart from './subComponents/BarChart';
// import MuiPieChart from './subComponents/MuiPieChart';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import BottomBar from 'src/components/BottomBar/BottomBar';
import BottomButtons from "src/components/BottomButtons";
import { useResponsive } from 'src/constants/media_queries';
import { fetchDashboardData } from "src/store/thunks/dashboardThunk.js";


function Dashboard() {
    const timeFormat = useSelector((state) => state.format.timeFormat)
    const dateFormat = useSelector((state) => state.format.dateFormat);
    const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const [currentTime, setCurrentTime] = useState(formatLocalDateTime(new Date().toISOString(), userTimeZone, timeFormat, dateFormat));
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [filterOpen, setFilterOpen] = useState(false);
    const handleFilterOpen = () => setFilterOpen(true);
    const handleFilterClose = () => setFilterOpen(false);
    const user = useSelector(state => state.auth?.user);
    const dispatch = useDispatch();
    const totalCountData = useSelector((state) => state.chartsData?.graphData?.statusGraph);
    const loaded = useSelector((state) => state.chartsData.loaded);
    const {
        isAdaptableScreen,
        isSmallScreen,
        isSmallerScreen,
        onWholeScreen,
        isMicroScreen,
    } = useResponsive();
    console.log('here is the total count', totalCountData)

    const formatUserName = () => {
        if (user) {
            let firstName = `${user?.firstName}`;

            firstName = firstName.split(' ').map(name => capitalizeFirstLetter(name)).join(' ');

            

            return firstName;
        }
        return '';
    }



    useEffect(() => {
        // Fetch task counts on component mount
        if (!loaded) {
            dispatch(fetchDashboardData());
        }
    }, [dispatch]);
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(formatLocalDateTime(new Date().toISOString(), userTimeZone, timeFormat, dateFormat));
        }, 1000);

        return () => clearInterval(interval);
    }, []);
    return (
        <MainDiv>
            <div style={{ width: '100%' }}>
                <div className="dashboard-header">
                    <div className="dashboard-header-text">
                        <div className="dashboard-welcome">Welcome {formatUserName()}!</div>
                        <div className="dashboard-date">{currentTime}</div>
                    </div>
                </div>
                <div className = 'status-boxes-div'>
                    <StatusBox img={clock} statusCount={totalCountData['PENDING']} statusName='Pending' />
                    <StatusBox img={blueTick} statusCount={totalCountData['IN_PROGRESS']} statusName='In Progress' />
                    <StatusBox img={greenTick} statusCount={totalCountData['COMPLETED']} statusName='Completed' />
                    <StatusBox img={total} statusCount={totalCountData['NOT_STARTED']} statusName='Not Started' />
                </div>
                <div className='chart-and-pinned-div' style={{ display: 'flex', flexDirection: isSmallScreen ? 'column' : 'row' }}>
                    <div className='bar-chart-div' style={{ width: isSmallScreen ? '100%' : 680, borderRadius: isSmallScreen ? '0px' : '12px' }}>
                        <div style ={{
                            fontFamily: 'var(--primary-font-family)',
                            color: 'var(--secondary-font-color)',
                            fontSize: '22px',
                            fontWeight: '600',
                            marginLeft: '11px'
                        }}>
                            Weekly Priorities
                        </div>
                        <div style={{marginTop: '45px'}} >
                            <CustomBarChart 
                           
                            />
                           
                        </div>
                    </div>
                    <div className="pie-chart-div" style={{ width: isSmallScreen ? '100%' : 403, borderRadius: isSmallScreen ? '0px' : '12px' }}>
                    <div style ={{
                            fontFamily: 'var(--primary-font-family)',
                            color: 'var(--secondary-font-color)',

                            fontSize: '22px',
                            fontWeight: '600',
                            marginLeft: '11px',
                        }}>
                        Priorities by Status
                        </div>
                        <div>
                            <TwoLevelPieChart />
                            <div style={{display: 'flex', width: '100%', justifyContent: 'center', gap: '20px',  marginLeft: '4px'}}>
                                <div style={{display: 'flex',  alignItems: 'center', gap: '5px'}}>
                                    <div style={{height: '4px', width: '20px', backgroundColor: '#EF4444'}}></div>
                                    <div style={{fontFamily: 'var(--primary-font-family)', color: 'var(--secondary-font-color)'}}>High</div>
                                </div>
                                <div style={{display: 'flex',  alignItems: 'center', gap: '5px'}}>
                                    <div style={{height: '4px', width: '20px', backgroundColor: '#F59E0B'}}></div>
                                    <div style={{fontFamily: 'var(--primary-font-family)', color: 'var(--secondary-font-color)'}}>Medium</div>
                                </div>
                                <div style={{display: 'flex',  alignItems: 'center', gap: '5px'}}>
                                    <div style={{height: '4px', width: '20px', backgroundColor: '#1FDE43'}}></div>
                                    <div style={{fontFamily: 'var(--primary-font-family)', color: 'var(--secondary-font-color)'}}>Low</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <BottomButtons handleOpen={handleOpen} handleFilterOpen={handleFilterOpen} />
            {(!isAdaptableScreen && !isMicroScreen) && <BottomBar handleOpen={handleOpen} handleFilterOpen={handleFilterOpen} />}
        </MainDiv>
    )
}

export default Dashboard;