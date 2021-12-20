import { useEffect, useState } from "react"

function useUserInfo() {

    const [userId, setUserId] = useState(localStorage.getItem("user_id"))
    const [authToken, setAuthToken] = useState({
        headers: {
            "Content-type": "application/json",
            Authorization: localStorage.getItem("jwt_access_token"),
        }
    })
    const [userName, setUserName] = useState(localStorage.getItem("user_name"))
    const [userEmail, setUserEmail] = useState(localStorage.getItem("user_email"))
    const [userRole, setUserRole] = useState(localStorage.getItem("user_role"))
    const [userImage, setUserImage] = useState(localStorage.getItem("user_image"))


    useEffect(() => {
        window.addEventListener("storage", () => {
            setUserId(localStorage.getItem("user_id"))
            setAuthToken({
                headers: {
                    "Content-type": "application/json",
                    Authorization: localStorage.getItem("jwt_access_token"),
                }
            })
            setUserName(localStorage.getItem("user_name"))
            setUserEmail(localStorage.getItem("user_email"))
            setUserRole(localStorage.getItem("user_role"))
            setUserImage(localStorage.getItem("user_image"))
        })

        return () => {
            window.removeEventListener('storage', () => null)
        }
    }, [])


    return { userId, authToken, userName, userEmail, userRole, userImage }
}

export default useUserInfo
