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
    const [priority, setPriority] = useState('all')
    const [isEditing, setIsEditing] = useState(false)
    const [activeTask, setActiveTask] = useState(null)
    const [modalMode, setModalMode] = useState('')
    const [profileModal, setProfileModal] = useState(false)

    const getTasks = async () => {
        setLoading(true)
        if (!userId) return
        try {
            const response = await axios.get(`${serverUrl}/tasks`)
            setTasks(response.data.tasks)
        } catch (error) {
            userId && toast.error('Error getting tasks')
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
            userId && toast.error('Error getting task')
        } finally {
            setLoading(false)
        }
    }

    const createTask = async (task) => {
        setLoading(true)
        try {
            console.log(task, 'from context')
            const response = await axios.post(`${serverUrl}/task/create`, task)
            setTasks([...tasks, response.data]);
            toast.success('Task successfully created')
        } catch (error) {
            userId && toast.error('Error creating task')
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
            toast.success('Task successfully updated')
        } catch (error) {
            userId && toast.error('Error updating task')
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
            toast.success('Task successfully deleted')
        } catch (error) {
            userId && toast.error('Error deleting task')
        } finally {
            setLoading(false)
        }
    }

    const handleInput = (name) => (e) => {
        if (name === 'setTask') {
            setTask(e)
        } else {
            setTask({ ...task, [name]: e.target.value })
        }
    }

    const completedTasks = tasks.filter(task => task.completed)
    const activeTasks = tasks.filter(task => !task.completed)

    const openModalForAdd = () => {
        setModalMode("add");
        setIsEditing(true);
        setTask({});
    };

    const openModalForEdit = (task) => {
        setModalMode("edit");
        setIsEditing(true);
        setActiveTask(task);
    };

    const openProfileModal = () => {
        setProfileModal(true)
    }

    const closeModal = () => {
        setIsEditing(false)
        setProfileModal(false)
        setModalMode('')
        setActiveTask(null)
        setTask({})
    }

    useEffect(() => {
        getTasks()
    }, [userId])

    return (
        <TasksContext.Provider value={{
            tasks,
            task,
            loading,
            priority,
            isEditing,
            activeTask,
            modalMode,
            completedTasks,
            activeTasks,
            profileModal,
            openProfileModal,
            setIsEditing,
            setPriority,
            getTask,
            createTask,
            updateTask,
            deleteTask,
            handleInput,
            openModalForAdd,
            openModalForEdit,
            closeModal,
        }}>
            {children}
        </TasksContext.Provider>
    )
}

export const useTasks = () => {
    return useContext(TasksContext)
}