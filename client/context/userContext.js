import axios from 'axios'
import { useRouter } from 'next/navigation'
import {
    createContext, useContext, useEffect, useState
} from 'react'
import toast from 'react-hot-toast'

const UserContext = createContext()

axios.defaults.withCredentials = true;

export const UserContextProvider = ({ children }) => {

    const serverUrl = 'https://rakutask.onrender.com/api/v1'
    const router = useRouter()

    const [user, setUser] = useState({})
    const [userState, setUserState] = useState({
        name: '',
        email: '',
        password: '',
    })
    const [loading, setLoading] = useState(false)
    const [allUsers, setAllUsers] = useState([])

    const userId = user._id

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
            setLoading(true)
            const res = await axios.post(`${serverUrl}/login`, {
                email: userState.email,
                password: userState.password
            }, {
                withCredentials: true
            })

            toast.success('Logged in successfully')
            resetUserState()
            await getUserDetails()
            router.push('/')
        } catch (error) {
            toast.error(error.response.data.message)
        } finally {
            setLoading(false)
        }
    }

    const logoutUser = async () => {
        try {
            const res = await axios.get(`${serverUrl}/logout`, {
                withCredentials: true
            })

            setUser({});
            toast.success('Logged out successfully')
            router.push('/login')
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }

    const getUserLoginStatus = async () => {
        let isLoggedIn = false
        try {
            setLoading(true)
            const res = await axios.get(`${serverUrl}/login-status`, {
                withCredentials: true
            })

            isLoggedIn = !!res.data

            if (!isLoggedIn) {
                router.push('/login')
            }
        } catch (error) {
            userId && console.error('Cannot get user login status')
        } finally {
            setLoading(false)
        }

        return isLoggedIn
    }

    const handleUserInput = (name) => e => {
        const val = e.target.value

        setUserState((prev) => ({
            ...prev,
            [name]: val
        }))
    }

    const getUserDetails = async () => {
        try {
            setLoading(true)
            const res = await axios.get(`${serverUrl}/user`, {
                withCredentials: true
            })

            setUser(prev => ({
                ...prev,
                ...res.data
            }))

        } catch (error) {
            userId && toast.error(error.response.data.message)
        } finally {
            setLoading(false)
        }
    }

    const updateUser = async (e, data) => {
        e.preventDefault()
        setLoading(true)

        try {
            const res = await axios.patch(`${serverUrl}/user`, data, {
                withCredentials: true
            })

            setUser(prev => ({
                ...prev,
                ...res.data
            }
            ))

            console.log(userState)

            toast.success('User successfully updated')
        } catch (error) {
            userId && toast.error('Error updating user')
        } finally {
            setLoading(false)
        }
    }

    const emailVerification = async () => {
        // TODO: handle too many request 
        setLoading(true)
        try {
            const res = await axios.post(`${serverUrl}/verify-email`, {}, {
                withCredentials: true
            })

            toast.success('Email verification is sent')
        } catch (error) {
            toast.error('Error sending verification email')
        } finally {
            setLoading(false)
        }
    }

    const verifyUser = async (token) => {
        setLoading(true);
        try {
            const res = await axios.post(
                `${serverUrl}/verify-user/${token}`,
                {},
                {
                    withCredentials: true,
                }
            );

            toast.success("Verified successfully");
            getUserDetails()
            router.push("/");
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            setLoading(false)
        }
    };

    const sendForgotPasswordEmail = async (email) => {
        setLoading(true);

        try {
            const res = await axios.post(
                `${serverUrl}/forgot-password`,
                {
                    email,
                },
                {
                    withCredentials: true,
                }
            );

            toast.success("Forgot password email sent successfully");
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            setLoading(false);
        }
    };


    const resetPassword = async (token, password) => {
        setLoading(true);

        try {
            const res = await axios.post(
                `${serverUrl}/reset-password/${token}`,
                {
                    password,
                },
                {
                    withCredentials: true,
                }
            );

            toast.success("Password reset successfully");
            router.push("/login");
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            setLoading(false);
        }
    };

    const changePassword = async (currentPassword, newPassword) => {
        setLoading(true);
        try {

            if (!currentPassword || !newPassword) {
                toast.error('Please enter passwords')
                return
            }

            const res = await axios.patch(
                `${serverUrl}/change-password`,
                { currentPassword, newPassword },
                {
                    withCredentials: true,
                }
            );

            toast.success("Password changed successfully");
        } catch (error) {
            toast.error(error.response.data.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };


    const resetUserState = () => {
        setUserState({
            name: '',
            email: '',
            password: '',
        })
    }

    // admin only
    const getAllUsers = async () => {
        setLoading(true);
        try {
            const res = await axios.get(
                `${serverUrl}/admin/users`,
                {},
                {
                    withCredentials: true,
                }
            );

            setAllUsers(res.data);
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            setLoading(false);
        }
    };

    const deleteUser = async (id) => {
        setLoading(true);
        try {
            const res = await axios.delete(
                `${serverUrl}/admin/users/${id}`,
                {},
                {
                    withCredentials: true,
                }
            );

            toast.success("User deleted successfully");
            getAllUsers();
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const getUserStatus = async () => {
            if (!user && userId) return
            const isLoggedIn = await getUserLoginStatus()
            if (isLoggedIn) {
                getUserDetails()
            }
        }
        getUserStatus()
    }, [])

    useEffect(() => {
        if (user.role === 'admin') {
            getAllUsers()
        }
    }, [user.role])

    return (
        <UserContext.Provider value={{
            registerUser,
            userState,
            handleUserInput,
            resetUserState,
            loginUser,
            logoutUser,
            getUserLoginStatus,
            user,
            updateUser,
            emailVerification,
            verifyUser,
            sendForgotPasswordEmail,
            resetPassword,
            changePassword,
            deleteUser,
            allUsers,
        }}>
            {children}
        </UserContext.Provider>
    )
}

export const useUserContext = () => {
    return useContext(UserContext)
}