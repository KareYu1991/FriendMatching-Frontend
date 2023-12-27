<template>
  <van-search v-model="searchText" show-action placeholder="请输入搜索关键词" @search="onSearch" @cancel="onCancel" />
  <van-tabs v-model:active="activeName" @change="onTabchange">
    <van-tab title="公开" name="public"></van-tab>
    <van-tab title="加密" name="private"></van-tab>
  </van-tabs>

  <team-card-list :team-list="teamList" v-if="refresh.showRefresh" @isClickRefresh="isClickRefresh" />
  <van-button class="add-button" icon="plus" type="primary" @click="toAddTeam"></van-button>
  <van-empty v-if="!teamList || teamList.length < 1" description="搜索结果为空" />
</template>

<script setup lang="ts">
import { onMounted, ref, reactive, nextTick } from 'vue';
import { useRoute, useRouter } from "vue-router";
import myAxios from '../plugins/myAxios';
import { showSuccessToast, showFailToast } from "vant";
import TeamCardList from "../components/TeamCardList.vue";



const route = useRoute();
const router = useRouter();
const searchText = ref('');
const teamList = ref([]);
const activeName = ref('public');

let refresh = reactive({ showRefresh: true })

/**
 * 搜索队伍
 * @param val
 * @returns {Promise<void>}
 */
const listTeam = async (val = '', status = 0) => {
  const res = await myAxios.get("/team/list/page", {
    params: {
      searchText: val,
      pageSize: 8,
      pageNum: 1,
      status
    },
  });
  if (res.code === 0 && res.data !== null) {
    teamList.value = res?.data?.records;
  } else {
    showFailToast('加载队伍失败，请刷新重试');
  }
}

// 挂载阶段调取接口
onMounted(async () => listTeam());


/**
 * 搜索过滤操作
 */
const onSearch = async (val) => {
  listTeam(val)
};

/**
 * 搜索清空
 */
const onCancel = async () => {
  listTeam()
};

const toAddTeam = () => {
  router.push({
    path: '/team/add'
  })
}

const onTabchange = (name) => {
  if (name === "public") {
    listTeam(searchText.value, 0)
  } else {
    listTeam(searchText.value, 2)
  }
}

const isClickRefresh = () => { // 有参数就把()换成参数(自定义)名称，下面调用
  refresh.showRefresh = false
  nextTick(() => {
    refresh.showRefresh = true
  })
  // todo 完成后刷新列表
  activeName.value = 'public'
  listTeam()
}


</script>

<style scoped></style>