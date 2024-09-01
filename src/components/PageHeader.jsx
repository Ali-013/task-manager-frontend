import { useSelector } from 'react-redux';
import { useResponsive } from 'src/constants/media_queries';
import { useState } from 'react';
import { useEffect } from 'react';
import plus from 'src/assets/plus.svg';




function PageHeader({ handleOpen, total, text, object, filterDiv}){
    // const [metaData, setMetaData] = useState([]);
    // const specificValue = useSelector(state => state);
    // useEffect(() => {
    //     console.log('state:', specificValue);
    // }, []);
    const accentColor = useSelector((state) => state.appearance.color)

    const {
        isBp2,
        isBp3,
        isBp4,
        isBp5,
        isBp7,
        isAdaptableScreen,
        onWholeScreen,
        isBp6,
        isBp8,
    } = useResponsive();

    return (
    <div className='task-page-top'>
        <div className="task-page-top-header" style={{ marginLeft: (onWholeScreen && isAdaptableScreen) ? '16px' : !isAdaptableScreen ? '10px' : '' }}>
            <div className='all-tasks' style={{ fontSize: !isAdaptableScreen && '20px' }}>
                { text } 
            </div>
            <div className="number-of-tasks" style={{ fontSize: !isAdaptableScreen && '20px' }}>
                ({total})
            </div>
        </div>
        { !onWholeScreen && (<div style={{display: 'flex', gap: '20px'}}>
            { (filterDiv && !onWholeScreen) && (<div>{filterDiv}</div>)}
            <a className='primary-button' onClick={handleOpen} style={{ backgroundColor: accentColor === 'pink'
                        ? 'var(--pink-accent-color)'
                        : accentColor === 'green'
                        ? 'var(--green-accent-color)'
                        : accentColor === 'orange'
                        ? 'var(--orange-accent-color)'
                        : 'var(--primary-background-color)'}}>
                    <div style={{ display: 'flex', gap: '6px' }}>
                        <img src={plus} alt='plus-sign' className='plus-sign' /> <div style={{ fontSize: '16px' }}>Add {object}</div>
                    </div>
            </a>
        </div>)}
    </div>
    )
}

export default PageHeader;