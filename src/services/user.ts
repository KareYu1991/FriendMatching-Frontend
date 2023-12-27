import myAxios from "../plugins/myAxios";
import { setCurrentUserState } from "../states/user";

// 导出getCurrentUser方法
export const getCurrentUser = async () => {
    // 因为不需要参数，只需要获取返回值即可
    const res = await myAxios.get('/user/current');
    // 返回的code是200
    if (res.code === 0) {
        // 往用户状态里存一份
        setCurrentUserState(res.data);
        return res.data;
    }
    return null;
}

