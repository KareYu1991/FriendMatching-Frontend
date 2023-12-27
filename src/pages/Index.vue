<template>
    <van-cell center title="标题">
        <template #right-icon>
            <van-switch v-model="isMatchMode" />
        </template>
    </van-cell>

    <user-card-list :user-list="userList" :loading="loading" />
    <van-empty v-if="!userList || userList.length < 1" description="搜索结果为空" />
</template>

<script setup lang="ts">
import { onMounted, ref, watchEffect } from 'vue';
import { useRoute } from "vue-router";
import myAxios from '../plugins/myAxios';
import { showSuccessToast, showFailToast } from "vant";
import UserCardList from "../components/UserCardList.vue";


const route = useRoute();
const { tags } = route.query;

const userList = ref([]);

// 开关常量
const isMatchMode = ref<Boolean>(false);
const loading = ref(true);

// 挂载阶段调取接口
// onMounted(async () => {
//     loadData();
// }
// );



const loadData = async () => {
    let userListData;
    loading.value = true;
    if (isMatchMode.value) {
        userListData = await myAxios.get('/user/match', {
            params: {
                num: 10
            },
        }).then(function (response) {
            return response?.data;
        }).catch(function (error) {
            showFailToast('请求失败', error);
        })
    } else {
        userListData = await myAxios.get('/user/recommend', {
            params: {
                pageSize: 8,
                pageNum: 1
            },
        }).then(function (response) {
            return response?.data?.records;
        }).catch(function (error) {
            showFailToast('请求失败', error);
        })
    }

    if (userListData) {
        userListData.forEach(user => {
            if (user.tags) {
                user.tags = JSON.parse(user.tags);
            }
        })
        userList.value = userListData;
    }
    loading.value = false;

}

watchEffect(() => {
    loadData();
})

</script>

<style scoped></style>