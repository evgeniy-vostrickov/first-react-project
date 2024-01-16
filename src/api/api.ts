import axios from 'axios'

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        "API-KEY": "13e78b54-d1b3-44cb-8a01-41ced9460c11"
    }
})

//Использование Enum в TypeScript
export enum ResultCodesEnum {
    Success = 0,
    Error = 1
}


export const profileAPI = {
    setUserProfile(id: number) {
        return instance.get(`profile/` + id)
            .then(response => response.data)
    },
    getStatusUser(id: number) {
        return instance.get(`profile/status/` + id)
            .then(response => response.data)
    },
    setStatusUser(status: string) {
        return instance.put(`profile/status/`, { status: status })
            .then(response => response.data)
    },
    savePhoto(photoFile: any) {
        const formData = new FormData();
        formData.append("image", photoFile);

        return instance.put(`profile/photo/`, formData, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.data)
    }
}
export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 5) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => response.data)
    },

    follow(id: number) {
        return instance.post(`follow/${id}`)
            .then(response => response.data)
    },

    unfollow(id: number) {
        return instance.delete(`follow/${id}`)
            .then(response => response.data)
    }
}


//Пример типизации запроса к серверу
type AuthUserType = {
    data: {
        id: number
        email: string
        login: string
    }
    resultCode: ResultCodesEnum
    messages: Array<string>
}
type LoginMeResponseType = {
    data: {
        userId: number
    }
    resultCode: ResultCodesEnum
    messages: Array<string>
}
export const authAPI = {
    authUser() {
        return instance.get<AuthUserType>(`auth/me`)
            .then(response => response.data)
    },
    login(email: string, password: string, rememberMe: boolean) {
        return instance.post<LoginMeResponseType>(`auth/login`, { email, password, rememberMe })
            .then(response => response.data)
    },
    logout() {
        return instance.delete(`auth/login`)
            .then(response => response.data);
    }
}

// authAPI.authUser().then(res => res.data.email)