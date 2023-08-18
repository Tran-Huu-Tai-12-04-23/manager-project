import { Tooltip } from '@mui/material';
import { forwardRef, useEffect, useState } from 'react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { MdOutlineEditCalendar } from 'react-icons/md';
import { DragDropContext, Droppable } from '@hello-pangea/dnd';
import { useSelector, useDispatch } from 'react-redux';

import { v4 as uuid } from 'uuid';

import Util from '../Util';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { taskAction } from '../Store/taskSlice';
import { projectAction } from '../Store/projectSlice';
import DayOfWeek from '../Component/DayOfWeek';

import Service from '../Service';
import { dateAction } from '../Store/dateCalender';

const months = [
    'Tháng 1',
    'Tháng 2',
    'Tháng 3',
    'Tháng 4',
    'Tháng 5',
    'Tháng 6',
    'Tháng 7',
    'Tháng 8',
    'Tháng 9',
    'Tháng 10',
    'Tháng 11',
    'Tháng 12',
];
const weekdays = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];

const Calendar = () => {
    const dispatch = useDispatch();
    const projects = useSelector((state) => state.reducer.projects);
    const dateCalender = useSelector((state) => state.reducer.dateCalender);
    const tasks = useSelector((state) => state.reducer.tasks);
    const [date, setDate] = useState(new Date());
    const [month, setMonth] = useState(date.getMonth());
    const [year, setYear] = useState(date.getFullYear());
    const [dateInWeek, setDateInWeek] = useState([]);
    const [dataChange, setDataChange] = useState(null);

    const handleChangeDateOfTask = async () => {
        if (dataChange) {
            const { taskId, newDate } = dataChange;

            if (taskId && newDate) {
                const data = {
                    taskId,
                    newDate,
                };

                const result = await Service.update('/task/update-date', data);

                if (result.status === true) {
                    console.log('Task updated successfully1');
                } else {
                    console.log(result);
                }
                setDataChange(null);
            }
        }
    };
    useEffect(() => {
        handleChangeDateOfTask();
    }, [dataChange]);

    const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
        <div ref={ref} onClick={onClick}>
            <MdOutlineEditCalendar className="example-custom-input hover:text-primary text-xl cursor-pointer mt-2"></MdOutlineEditCalendar>
        </div>
    ));

    useEffect(() => {
        const tasksList = [];
        if (Array.isArray(projects)) {
            projects.forEach((element) => {
                if (element && element.columns) {
                    const columns = element.columns;
                    columns.forEach((col) => {
                        if (col && col.tasks) {
                            col.tasks.forEach((task) => {
                                tasksList.push(task);
                            });
                        }
                    });
                }
            });
        }
        dispatch(taskAction.init({ tasks: tasksList }));
    }, [projects]);

    useEffect(() => {
        if (dateCalender) {
            setDate(new Date(dateCalender));
        }
    }, [dateCalender]);

    const onDragEnd = (result) => {
        const { res, dispatch, taskAction, tasks, dateInWeek, projectAction } = result;
        console.log({
            res,
            dispatch,
            taskAction,
            tasks,
            dateInWeek,
            projectAction,
        });
        const idTask = res.draggableId;

        const idSource = res.source?.droppableId;
        const idDes = res.destination?.droppableId;

        const indexSource = res.source?.index;
        const indexDes = res.destination?.index;
        if (idSource !== idDes && idDes && tasks) {
            const date = dateInWeek.find((d) => d.id === idDes);
            if (date) {
                dispatch(
                    taskAction.updateDate({
                        newDate: date.date.toISOString(),
                        id: idTask,
                    }),
                );
                setDataChange({
                    taskId: idTask,
                    newDate: date.date.toISOString(),
                });
            }
            // const taskDate = tasks.find((task) => task?.id === idTask).taskDate;
            // const day = parseInt(idDes?.split("-").pop(), 10); // Parse the day value to an integer
            // const newDate = new Date(taskDate);
            // newDate.setDate(day);

            // if (day && newDate) {
            //   dispatch(
            //     taskManagerAction.changeColTaskDate({
            //       idTask: idTask,
            //       newDate: newDate.toString(),
            //     })
            //   );
            // }
        } else {
            // if (indexDes) {
            //   dispatch(
            //     taskManagerAction.changeIndex({
            //       idTask: idTask,
            //       indexSource,
            //       indexDes,
            //     })
            //   );
            // }
        }
    };

    useEffect(() => {
        setDate(new Date());
        const recentDays = [];
        for (let i = 0; i < 7; i++) {
            const id = uuid();
            const day = new Date(date.getFullYear(), date.getMonth(), date.getDate() + i);
            recentDays.push({ date: day, id: id });
        }
        setDateInWeek(recentDays);
    }, [date]);

    const handlePrevWeek = () => {
        const newDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() - 7);
        setDate(newDate);
        setMonth(newDate.getMonth());
        setYear(newDate.getFullYear());
        dispatch(dateAction.changeDate({ newDate: newDate.toISOString() }));
    };

    const handleNextWeek = () => {
        const newDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 7);
        setDate(newDate);
        setMonth(newDate.getMonth());
        setYear(newDate.getFullYear());
    };

    return (
        <>
            <div
                className=""
                style={{
                    width: 'calc(100vw - 3.5rem)',
                }}
            >
                <div className="w-full  pl-4 border-b-1 border-solid border-blur-light dark:border-blur-dark">
                    <div className="w-full mb-1 flex justify-start flex-wrap items-center ">
                        <div
                            className="hover:bg-light-third h-8 hover:dark:bg-dark-third cursor-pointer bg-light-second dark:bg-dark-second text-sm rounded-md p-2 justify-center items-center flex "
                            onClick={handlePrevWeek}
                        >
                            <IoIosArrowBack></IoIosArrowBack>
                        </div>
                        <div className="text-sm h-8 bg-light-second dark:bg-dark-second ml-2 mr-2 rounded-md p-2 justify-center items-center flex">
                            {month + 1}
                        </div>
                        <div
                            className="hover:bg-light-third h-8 hover:dark:bg-dark-third cursor-pointer text-sm rounded-md p-2 justify-center items-center flex bg-light-second dark:bg-dark-second "
                            onClick={handleNextWeek}
                        >
                            <IoIosArrowForward></IoIosArrowForward>
                        </div>

                        <div className="ml-2 justify-start flex items-center">
                            <h5 className="text-sm font-family mr-2">{date?.toLocaleDateString()}</h5>
                            <DatePicker
                                selected={date}
                                onChange={(date) => {
                                    setDate(date);
                                }}
                                customInput={<ExampleCustomInput />}
                            />
                        </div>
                    </div>
                </div>

                <DragDropContext
                    onDragEnd={(res) =>
                        onDragEnd((res = { res, dispatch, taskAction, tasks, dateInWeek, projectAction }))
                    }
                >
                    <div className="w-full flex">
                        {Array.isArray(dateInWeek) &&
                            dateInWeek.map((d, index) => {
                                const day = d.date.getDate();
                                const weekday = weekdays[d.date.getDay()];
                                const checkSameDay = Util.compareDate(d.date, new Date());
                                return (
                                    <DayOfWeek
                                        key={index}
                                        day={day}
                                        weekday={weekday}
                                        checkSameDay={checkSameDay}
                                        date={d.date}
                                        id={d.id}
                                        year={year}
                                        tasks={tasks}
                                    ></DayOfWeek>
                                );
                            })}
                    </div>
                </DragDropContext>
            </div>
        </>
    );
};

export default Calendar;
