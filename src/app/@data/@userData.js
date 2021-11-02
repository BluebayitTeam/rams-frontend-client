


export const userId = localStorage.getItem("user_id")

export const authToken = {
    headers: {
        "Content-type": "application/json",
        Authorization: localStorage.getItem("jwt_token"),
    },
};

export const displayName = localStorage.getItem("user_name")

export const userEmail = localStorage.getItem("user_email")

export const userRole = localStorage.getItem("user_role")

export const userImage = localStorage.getItem("user_image")




// localStorage.removeItem("jwt_token")
// localStorage.removeItem("user_id")
// localStorage.removeItem("user_email")
// localStorage.removeItem("user_name")
// localStorage.removeItem("user_role")