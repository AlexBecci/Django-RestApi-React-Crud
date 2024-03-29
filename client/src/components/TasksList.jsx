import React from 'react'
import { getAllTasks } from "../api/tasks.api";
import { useEffect, useState } from 'react';
import TaskCard from './TaskCard';

function TasksList() {
    const [tasks, setTasks] = useState([])

    useEffect(() => {
        async function loadTasks() {
            const res = await getAllTasks()
            console.log(res)
            setTasks(res.data)
        }

        loadTasks()
    }, [])


    return (
        <div>{tasks.map(task => (
            <TaskCard key={task.id} task={task} />
        ))}</div>
    )
}

export default TasksList