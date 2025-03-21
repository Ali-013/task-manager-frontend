import { Box } from "@mui/material";
import dayjs from "dayjs";
import debounce from "lodash.debounce";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import BottomButtons from "src/components/BottomButtons";
import MainDiv from "src/components/maindiv/maindiv";
import PageHeader from "src/components/PageHeader";
import "src/components/tasks/sub_components/tasks.css";
import TaskTable from "src/components/tasks/sub_components/TaskTable";
import { errorToast } from "src/components/toasters/toast.js";
import { useResponsive } from "src/constants/media_queries";
import { deferredTasks_t_obj, importantTasks_t_obj, urgentTasks_t_obj } from "src/constants/translationObj";
import { setHighPriorityTasks } from "src/store/slices/highPrioritySlice.js";
import { setLowPriorityTasks } from "src/store/slices/lowPrioritySlice.js";
import { setMediumPriorityTasks } from "src/store/slices/mediumPrioritySLice.js";
import { getPriorityTasksThunk } from "src/store/thunks/taskThunks";

function PriorityTasks({ priority }) {
    const lang = useSelector((state) => state.format.language);

    const [open, setOpen] = useState(false);
    const [page, setPage] = useState(0);
    const [limit, setLimit] = useState(5);
    const [search, setSearch] = useState("");
    const handleOpen = () => setOpen(true);
    const dispatch = useDispatch();
    const location = useLocation();
    const pathname = location.pathname;
    const priorityTasks = useSelector((state) => state.priorityTask);
    const highPriorityTasks = useSelector((state) => state.highPriorityTasks);
    const mediumPriorityTasks = useSelector((state) => state.mediumPriorityTasks);
    const lowPriorityTasks = useSelector((state) => state.lowPriorityTasks);

    const [skeletonLoader, setSkeletonLoader] = useState(false);
    const [filterOpen, setFilterOpen] = useState(false);
    const handleFilterOpen = () => setFilterOpen(true);
    const privateKey = localStorage.getItem("privateKey");
    console.log("priorityTasks in the component", priorityTasks);
    const [priorityTaskEdit, setPriorityTaskEdit] = useState(true);
    const handlePriorityTaskEdit = () => {
        setPriorityTaskEdit(false);
    };

    const handleReverseTaskEdit = () => {
        setPriorityTaskEdit(true);
    };

    const handleAddTaskOpen = () => {
        handleReverseTaskEdit();
        handleOpen();
    };

    const [taskDetailsToEdit, setTaskDetailsToEdit] = useState({
        taskTitle: "",
        dueDate: dayjs(),
        priority: "HIGH",
        status: "NOT_STARTED",
        taskDescription: "",
    });

    const getTasks = async (priority, page, limit) => {
        try {
            setSkeletonLoader(true);
            const params = { page, limit, search, priority };
            console.log('issue params aree...', params);
            const response = await dispatch(getPriorityTasksThunk(params)).unwrap();
            console.log('issue response is...', response);

            switch (priority) {
                case "HIGH":
                    dispatch(setHighPriorityTasks({ data: response, loaded: true }));
                    break;
                case "MEDIUM":
                    dispatch(setMediumPriorityTasks({ data: response, loaded: true }));
                    break;
                case "LOW":
                    dispatch(setLowPriorityTasks({ data: response, loaded: true }));
                    break;
                default:
                    break;
            }
            console.log(`Fetched ${priority} tasks:`, response);
        } catch (err) {
            errorToast("Something went wrong", "getTask-pages-error");
            console.log("Error fetching tasks:", err);
        } finally {
            setSkeletonLoader(false);
        }
    };
    const getAllTasks = async (page, limit) => {
        console.log("Inside all task comp")


        await getTasks(priority, page, limit);
    };

    const debouncedGetAllTasks = useCallback(
        debounce((page, limit) => {
           
            getAllTasks(page, limit);
        }, 300),
        [page, limit, pathname]
    );

    useEffect(() => {
        if (priority === "HIGH" && !highPriorityTasks.loaded) {
            getAllTasks("HIGH")
        } else if (priority === "MEDIUM" && !mediumPriorityTasks.loaded) {
            getAllTasks("MEDIUM")

        } else if (priority === "LOW" && !lowPriorityTasks.loaded) {
            getAllTasks("LOW")

        } else {
            return
        }
    }, [page, limit]);

    const intervalRef = useRef(null);
    let tasksT = priority === "HIGH" ? highPriorityTasks?.highPriorityTasks : priority === "MEDIUM" ? mediumPriorityTasks?.mediumPriorityTasks : priority === "MEDIUM" ? lowPriorityTasks?.lowPriorityTasks : [];
    // useEffect(() => {

    //     intervalRef.current = setInterval(() => {
    //         const today = dayjs();
    //         tasksT.forEach(task => {
    //             const dueDate = dayjs(task.dueDate);
    //             const minutesUntilDueDate = dueDate.diff(today, 'minutes');

    //             // Check if the due date is within the last 10 minutes
    //             if (minutesUntilDueDate < 0 &&
    //                 task.status !== 'PENDING' && task.status !== 'COMPLETED') {
    //                 console.log("Inside the loggginggggggggggg inner");
    //                 if (priority === "HIGH") {
    //                     dispatch(updateHighStatus({ taskId: task._id, newStatus: 'PENDING' }));
    //                 } else if (priority === "MEDIUM") {
    //                     dispatch(updateMediumStatus({ taskId: task._id, newStatus: 'PENDING' }));
    //                 } else if (priority === "LOW") {
    //                     dispatch(updateLowStatus({ taskId: task._id, newStatus: 'PENDING' }));
    //                 }
    //             }
    //         });
    //     }, 60000); // Run every 1 minute (60 * 1000 milliseconds)

    //     return () => clearInterval(intervalRef.current); // Clear interval on unmount
    // }, [tasksT]);

    const { onWholeScreen } = useResponsive();
    return (
        <div className='task-page-div'>
            <MainDiv>
                <div className='task-page' style={{ width: onWholeScreen && "98%" }}>
                    <PageHeader
                        handleOpen={handleAddTaskOpen}
                        handleReverseTaskEdit={handleReverseTaskEdit}
                        showAdd={false}
                        titleHead={
                            priority == "HIGH"
                                ? urgentTasks_t_obj[lang]
                                : priority == "MEDIUM"
                                    ? importantTasks_t_obj[lang]
                                    : deferredTasks_t_obj[lang]
                        }
                        total={priority == "HIGH" ? highPriorityTasks.highPriorityMetaData.total : 
                            priority == "MEDIUM" ? mediumPriorityTasks.mediumPriorityMetaData.total :
                            priority == "LOW" ? lowPriorityTasks.lowPriorityMetaData.total : null
                        }
                    />
                    <div></div>
                    <Box mt={3} mb={4}>
                        <TaskTable
                            priority={true}
                            priorityType={priority}
                            handleOpen={handleAddTaskOpen}
                            handleTaskEdit={handlePriorityTaskEdit}
                            setTaskDetailsToEdit={setTaskDetailsToEdit}
                            handleReverseTaskEdit={handleReverseTaskEdit}
                            debouncedGetAllTasks={debouncedGetAllTasks}
                            tasks={
                                priority == "HIGH"
                                    ? highPriorityTasks.highPriorityTasks
                                    : priority == "LOW"
                                        ? lowPriorityTasks.lowPriorityTasks
                                        : mediumPriorityTasks.mediumPriorityTasks
                            }
                            limit={limit}
                            privateKey={privateKey}
                            page={priority === 'HIGH' ? highPriorityTasks.highPriorityMetaData.page : priority === 'LOW' ? lowPriorityTasks.lowPriorityMetaData.page : mediumPriorityTasks.mediumPriorityMetaData.page}
                            setLimit={setLimit}
                            setPage={setPage}
                            getAllTasks={getAllTasks}
                            hasNextPage={priority === 'HIGH' ? highPriorityTasks.highPriorityMetaData.hasNextPage : priority === 'LOW' ? lowPriorityTasks.lowPriorityMetaData.hasNextPage : mediumPriorityTasks.mediumPriorityMetaData.hasNextPage}
                            hasPreviousPage={priority === 'HIGH' ? highPriorityTasks.highPriorityMetaData.hasPrevPage : priority === 'LOW' ? lowPriorityTasks.lowPriorityMetaData.hasPrevPage : mediumPriorityTasks.mediumPriorityMetaData.hasPrevPage}
                            nextPage={priority === 'HIGH' ? highPriorityTasks.highPriorityMetaData.nextPage : priority === 'LOW' ? lowPriorityTasks.lowPriorityMetaData.nextPage : mediumPriorityTasks.mediumPriorityMetaData.nextPage}
                            metaData={priority === 'HIGH' ? highPriorityTasks.highPriorityMetaData : priority === 'LOW' ? lowPriorityTasks.lowPriorityMetaData : mediumPriorityTasks.mediumPriorityMetaData}
                            previousPage={priority === 'HIGH' ? highPriorityTasks.highPriorityMetaData.previousPage : priority === 'LOW' ? lowPriorityTasks.lowPriorityMetaData.previousPage : mediumPriorityTasks.mediumPriorityMetaData.previousPage}
                            totalPages={priority === 'LOW' ? highPriorityTasks.highPriorityMetaData.totalPages : priority === 'LOW' ? lowPriorityTasks.lowPriorityMetaData.totalPages : mediumPriorityTasks.mediumPriorityMetaData.totalPages}
                            skeletonLoader={skeletonLoader}
                        />
                    </Box>
                </div>
                <BottomButtons
                    handleOpen={handleOpen}
                    handleFilterOpen={handleFilterOpen}
                />
            </MainDiv>
        </div>
    );
}

export default PriorityTasks;
