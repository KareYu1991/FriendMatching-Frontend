<template>
  <!-- 导航栏 -->
  <van-nav-bar :title="title" left-text="返回" left-arrow @click-left="onClickLeft" @click-right="onClickRight">
    <template #right>
      <van-icon name="search" size="18" />
    </template>
  </van-nav-bar>

  <!-- 底部标签栏 -->
  <van-tabbar route>
    <!-- to 代表路由跳转 -->
    <van-tabbar-item to="/" icon="home-o" name="index">主页</van-tabbar-item>
    <van-tabbar-item to="/team" icon="friends-o" name="team">队伍</van-tabbar-item>
    <van-tabbar-item to="/user" icon="contact-o" name="user">个人</van-tabbar-item>
  </van-tabbar>


  <!-- 路由出口 -->
  <div id="content">
    <router-view />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from "vue-router";
import routes from '../config/router';
import { SkeletonTitle } from 'vant';
const router = useRouter();

const onClickRight = () => {
  router.push('/search')
}

const onClickLeft = () => {
  router.back();
}

/**
 * 路由标签切换
 */
const DEFAULT_TITLE = '伙伴匹配';
const title = ref(DEFAULT_TITLE)

router.beforeEach((to, from) => {
  const toPath = to.path;
  const route = routes.find((route)=>{
    return toPath == route.path;
  })
  title.value = route?.title ?? DEFAULT_TITLE;
})

</script>

<style scoped>
#content {
  padding-bottom: 50px;
}
</style>
