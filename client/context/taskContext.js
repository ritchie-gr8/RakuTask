import {
    createContext, useContext, useEffect, useState
} from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useUserContext } from './userContext'

const TasksContext = createContext()

export const TasksProvider = ({ children }) => {

    const serverUrl = 'http://localhost:8000/api/v1'
    const router = useRouter()

    const userId = useUserContext().user._id

    const [tasks, setTasks] = useState([])
    const [loading, setLoading] = useState(false)
    const [task, setTask] = useState({})

    const getTasks = async () => {
        setLoading(true)
        try {
            const response = await axios.get(`${serverUrl}/tasks`)
            setTasks(response.data)
        } catch (error) {
            toast.error('Error getting tasks')
        } finally {
            setLoading(false)
        }
    }

    const getTask = async (taskId) => {
        setLoading(true)
        try {
            const response = await axios.get(`${serverUrl}/task/${taskId}`)
            setTask(response.data)
        } catch (error) {
            toast.error('Error getting task')
        } finally {
            setLoading(false)
        }
    }

    const createTask = async (task) => {
        setLoading(true)
        try {
            const response = await axios.post(`${serverUrl}/task/create`, task)
            setTasks([...tasks, response.data])
            getTasks()
        } catch (error) {
            toast.error('Error creating task')
        } finally {
            setLoading(false)
        }
    }

    const updateTask = async (task) => {
        setLoading(true)
        try {
            const response = await axios.patch(`${serverUrl}/task/${task._id}`, task)
            const newTasks = tasks.map((task) => {
                return task._id === response.data._id ? response.data : task
            })
            setTasks(newTasks)
        } catch (error) {
            toast.error('Error updating task')
        } finally {
            setLoading(false)
        }
    }

    const deleteTask = async (taskId) => {
        setLoading(true)
        try {
            await axios.delete(`${serverUrl}/task/${taskId}`)
            const newTasks = tasks.filter(task => task._id !== taskId)
            setTasks(newTasks)
        } catch (error) {
            toast.error('Error deleting task')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getTasks()
    }, [userId])

    return (
        <TasksContext.Provider value={{
            tasks,
            task,
            loading,
            getTask,
            createTask,
            updateTask,
            deleteTask,
        }}>
            {children}
        </TasksContext.Provider>
    )
}

export const useTasks = () => {
    return useContext(TasksContext)
}