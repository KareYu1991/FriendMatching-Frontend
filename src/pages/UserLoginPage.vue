<template>
  <van-form @submit="onSubmit">
    <van-cell-group inset>
      <van-field v-model="userAccount" name="userAccount" label="账号" placeholder="请输入账号"
        :rules="[{ required: true, message: '请填写用户名' }]" />
      <van-field v-model="userPassword" type="password" name="userPassword" label="密码" placeholder="请输入密码"
        :rules="[{ required: true, message: '请填写密码' }]" />
    </van-cell-group>
    <div style="margin: 16px;">
      <van-button round block type="primary" native-type="submit">
        提交
      </van-button>
    </div>
  </van-form>
</template>
<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { ref } from "vue";
import { showSuccessToast, showFailToast } from "vant";
import myAxios from "../plugins/myAxios";

const userAccount = ref('');
const userPassword = ref('');

// 本路由信息和参数
const route = useRoute();
const router = useRouter();

const onSubmit = async () => {
  const res = await myAxios.post('/user/login', {
    userAccount: userAccount.value,
    userPassword: userPassword.value,
  })
  // 判断code码
  if (res.code === 0 && res.data !== null) {
    showSuccessToast('登录成功');
    // 重定向跳回修改信息页
    const redirectUrl = route.query?.redirect as string ?? '/';
    // router.replace('/')
    window.location.href = redirectUrl;
  } else {
    showFailToast('登录错误');
  }
}
</script>


<style scoped></style>