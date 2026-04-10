// import axios from "axios"

// const api = axios.create({
//     baseURL: "/api",
//     withCredentials: true,
//     headers: {
//         "Content-Type": "application/json"
//     }
// })

// export default api;


import axios from "axios"

const isServer = typeof window === "undefined";

const api = axios.create({
    baseURL: isServer ? "https://ancart.vercel.app/api" : "/api",
    withCredentials: true,
    headers: {
        "Content-Type": "application/json"
    }
})

export default api;
