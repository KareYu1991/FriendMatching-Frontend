<template>
  <div id="teamAddPage">
    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <van-field v-model="addTeamData.name" name="name" label="队伍名" placeholder="请输入队伍名"
          :rules="[{ required: true, message: '请输入队伍名' }]" />
        <van-field v-model="addTeamData.description" rows="4" autosize label="队伍描述" type="textarea"
          placeholder="请输入队伍描述" />
        <van-field is-link readonly name="datetimePicker" label="过期时间" :placeholder="addTeamData.expireTime ?? '点击选择过期时间'"
          @click="showPicker = true" />
        <van-popup v-model:show="showPicker" position="bottom">
          <van-datetime-picker v-model="addTeamData.expireTime" @confirm="showPicker = false" type="datetime"
            title="请选择过期时间" :min-date="minDate" />
        </van-popup>
        <van-field name="radio" label="队伍状态">
          <template #input>
            <van-radio-group v-model="addTeamData.status" direction="horizontal">
              <van-radio name="0">公开</van-radio>
              <van-radio name="1">私有</van-radio>
              <van-radio name="2">加密</van-radio>
            </van-radio-group>
          </template>
        </van-field>
        <van-field v-if="Number(addTeamData.status) === 2" v-model="addTeamData.password" type="password" name="password"
          label="密码" placeholder="请输入队伍密码" :rules="[{ required: true, message: '请填写密码' }]" />
      </van-cell-group>
      <div style="margin: 16px;">
        <van-button round block type="primary" native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script setup lang="ts">

import { useRoute, useRouter } from "vue-router";
import { ref, onMounted } from "vue";
import myAxios from "../plugins/myAxios";
import moment from 'moment';
import { showFailToast, showSuccessToast } from "vant";

const route = useRoute();

const router = useRouter();


// 日期展示器
const showPicker = ref(false);
// 当前时间
const minDate = new Date();

// 需要用户填写的表单数据 对象扩展
const addTeamData = ref({})

const teamId = route.query.teamId;

onMounted(async () => {
  console.log("teamId", teamId)
  const res = await myAxios.get("/team/get", {
    params: {
      id: teamId
    }
  });
  console.log("res", res)
  if (res.code === 0 && res.data !== null) {
    addTeamData.value = res?.data;
  } else {
    showFailToast('获取队伍失败，请刷新重试');
  }
})

// 提交
const onSubmit = async () => {
  const postData = {
    // 传递addTeamData对象的多个参数
    // ...addTeamData.value,
    status: Number(addTeamData.value.status),
    description: addTeamData.value.description,
    expireTime: addTeamData.value.expireTime,
    id: teamId,
    name: addTeamData.value.name,
    password: addTeamData.value.password,
  }
  const res = await myAxios.post("/team/update", postData);
  if (res?.code === 0 && res.data) {
    showSuccessToast('修改成功');
    router.push({
      path: '/team',
      replace: true,
    });
  } else {
    showFailToast('修改失败');
  }
}

const onConfirm = () => {
  showPicker.value = false;
};
</script>

<style scoped>
#teamPage {}
</style>