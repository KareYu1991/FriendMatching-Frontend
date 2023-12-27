import {UserType} from "../models/user";

// 封装用户，对应用户属性的数据类型
let currentUser: UserType;

// 设置用户
const setCurrentUserState = (user: UserType) => {
    currentUser = user;
}

// 获取用户
const getCurrentUserState = () : UserType => {
    return currentUser;
}

// 导出方法
export {
    setCurrentUserState,
    getCurrentUserState,
}