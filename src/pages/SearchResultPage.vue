<template>
    <user-card-list :user-list="userList" />
    <van-empty v-if="!userList || userList.length < 1" description="搜索结果为空" />
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute } from "vue-router";
import myAxios from '../plugins/myAxios';
import { Toast } from 'vant';
import UserCardList from "../components/UserCardList.vue";


const route = useRoute();
const { tags } = route.query;

import qs from 'qs';


// const mockUser = ref({
//     id: 931,
//     username: '沙鱼',
//     userAccount: 'shayu',
//     profile: '一条咸鱼',
//     gender: 0,
//     phone: '123456789101',
//     email: 'shayu-yusha@qq.com',
//     planetCode: '931',
//     avatarUrl: 'https://p4.img.360kuai.com/dmfd/165_90_75/t012a2f9211073e1f60.webp?size=165x90',
//     tags: ['java', 'emo', '打工中', 'emo', '打工中'],
//     createTime: new Date(),
// })


const userList = ref([]);


// 挂载阶段调取接口
onMounted(async () => {
    const userListData = await myAxios.get('/user/search/tags', {
        withCredentials: false,
        params: {
            tagNames: tags
        },
        paramsSerializer: {
            serialize: params => qs.stringify(params, { indices: false })
        }
    }).then(function (response) {
        console.log('请求成功', response);
        return response?.data;
    }).catch(function (error) {
        console.log('请求失败', error);
        Toast.fail('请求失败');
    })
    if (userListData) {
        userListData.forEach(user => {
            if (user.tags) {
                user.tags = JSON.parse(user.tags);
                // user.tags = JSON.parse(JSON.stringify(user.tags));
            }
        })
        userList.value = userListData;
    }

});

</script>

<style scoped></style>