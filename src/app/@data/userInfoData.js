function userInfoData() {

    const userId = localStorage.getItem("user_id")

    const authToken = {
        headers: {
            "Content-type": "application/json",
            Authorization: localStorage.getItem("jwt_access_token"),
        },
    };

    const displayName = localStorage.getItem("user_name")

    const userEmail = localStorage.getItem("user_email")

    const userRole = localStorage.getItem("user_role")

    const userImage = localStorage.getItem("user_image")

    return { userId, authToken, displayName, userEmail, userRole, userImage }
}

export default userInfoData
