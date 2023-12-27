<template>
  <!-- <van-button class="add-button" icon="plus" type="primary" @click="toAddTeam"></van-button> -->
  <div id="teamPage">
    <van-search v-model="searchText" placeholder="搜索队伍" @search="onSearch" />
    <team-card-list :teamList="teamList" />
    <van-empty v-if="teamList?.length < 1" description="数据为空"/>
  </div>
</template>

<script setup lang="ts">

import {useRouter} from "vue-router";
import TeamCardList from "../components/TeamCardList.vue";
import {onMounted, ref,onBeforeMount} from "vue";
import myAxios from "../plugins/myAxios";
import { showSuccessToast, showFailToast } from "vant";
import {getCurrentUser} from "../services/user";

const router = useRouter();
const searchText = ref('');

// 跳转到加入队伍页
const toAddTeam = () => {
  router.push({
    path: "/team/add"
  })
}

const thisUserId = ref();

const teamList = ref([]);

/**
 * 搜索队伍
 * @param val
 * @returns {Promise<void>}
 */
const listTeam = async (val = '') => {
  console.log("user",thisUserId.value.id)
  const res = await myAxios.get("/team/list/page", {
    params: {
      searchText: val,
      pageSize: 8,
      pageNum: 1,
      userId: thisUserId.value.id,
      allSee: 1
    },
  });
  if (res.code === 0 && res.data !== null) {
        teamList.value = res?.data?.records;
    } else {
    showFailToast('加载队伍失败，请刷新重试');
  }
}

// 页面加载时只触发一次
onMounted( async () => {
  thisUserId.value = await getCurrentUser();
  listTeam();
})


const onSearch = (val) => {
  listTeam(val);
};

</script>

<style scoped>
#teamPage {

}
</style>