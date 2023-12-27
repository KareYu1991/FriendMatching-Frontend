/**
 * 队伍类别
 * ？号是指属性可有可无
 */
export type TeamType = {
    id: number;
    name: string;
    description: string;
    maxNum: number;
    expireTime: Date;
    userId:number;
    status: number;
    password?: string;
    isDelete?: number;
    createTime: Date;
    hasJoinNum?: number;
    hasJoin?: boolean;
};