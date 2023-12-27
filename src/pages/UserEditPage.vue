<template>
  <van-form @submit="onSubmit">
    <van-cell-group inset>
      <van-field v-model="editUser.currentValue" :name="editUser.editKey" :label="editUser.editName"
        :placeholder="`请输入${editUser.editName}`" />
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
import { ref, onMounted } from "vue";
import { showSuccessToast, showFailToast } from "vant";
import myAxios from "../plugins/myAxios";
import { getCurrentUser } from "../services/user";

const user = ref();
//调接口获取用户数据
onMounted(async () => {
  user.value = await getCurrentUser();
})

// 本路由信息和参数
const route = useRoute();
// 本路由实例
const router = useRouter();

// 从路由中获取传递的参数
const editUser = ref({
  editKey: route.query.editKey,
  editName: route.query.editName,
  currentValue: route.query.currentValue
})

const onSubmit = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    showFailToast('用户未登录');
    return;
  }
  console.log(currentUser, '当前用户')

  const res = await myAxios.post('/user/update', {

    "id": currentUser.id,
    [editUser.value.editKey as string]: editUser.value.currentValue,

  })
  // 判断code码
  if (res.code === 0 && res.data != null) {
    showSuccessToast('修改成功');
    // 跳回修改信息页
    router.back();
  } else {
    showFailToast('修改错误');
  }

}


</script>


<style scoped></style>