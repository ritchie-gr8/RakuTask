import axios from 'axios'
import { useRouter } from 'next/navigation'
import {
    createContext, useContext, useEffect, useState
} from 'react'
import toast from 'react-hot-toast'

const UserContext = createContext()

export const UserContextProvider = ({ children }) => {

    const serverUrl = 'http://localhost:8000/api/v1'
    const router = useRouter()

    const [user, setUser] = useState({})
    const [userState, setUserState] = useState({
        name: '',
        email: '',
        password: '',
    })
    const [loading, setLoading] = useState(true)

    const registerUser = async (e) => {
        e.preventDefault()
        // TODO: add more effective form validation handler
        if (!userState.email.includes('@') || !userState.password || userState.password.length < 6) {
            toast.error('Please enter a valid email or password (at least 6 characthers)')
            return
        }

        try {
            const res = await axios.post(`${serverUrl}/register`, userState)
            toast.success('User successfully registered')
            resetUserState()

            router.push('/login')
        } catch (error) {
            // console.error('Error registering user:', error)
            toast.error(error.response.data.message)
        }
    }

    const loginUser = async (e) => {
        e.preventDefault()

        try {
            const res = await axios.post(`${serverUrl}/login`, {
                email: userState.email,
                password: userState.password
            }, {
                withCredentials: true
            })

            toast.success('Logged in successfully')
            resetUserState()
            router.push('/')
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }

    const logoutUser = async () => {
        try {
            const res = await axios.get(`${serverUrl}/logout`, {
                withCredentials: true
            })

            toast.success('Logged out successfully')
            router.push('/login')
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }

    const getUserLoginStatus = async () => {
        let isLoggedIn = false
        try {
            const res = await axios.get(`${serverUrl}/login-status`, {
                withCredentials: true
            })

            isLoggedIn = !!res.data
            setLoading(false)

            if (!isLoggedIn) {
                router.push('/login')
            }
        } catch (error) {
            console.error('Cannot get user login status')
        }

        console.log('status:', isLoggedIn)
        return isLoggedIn
    }

    const handleUserInput = (name) => e => {
        const val = e.target.value

        setUserState((prev) => ({
            ...prev,
            [name]: val
        }))
    }

    const resetUserState = () => {
        setUserState({
            name: '',
            email: '',
            password: '',
        })
    }

    useEffect(() => {
        getUserLoginStatus()
    }, [])

    return (
        <UserContext.Provider value={{
            registerUser,
            userState,
            handleUserInput,
            resetUserState,
            loginUser,
            logoutUser
        }}>
            {children}
        </UserContext.Provider>
    )
}

export const useUserContext = () => {
    return useContext(UserContext)
}