<template>
  <van-skeleton title avatar :row="3" :loading="props.loading" v-for="team in props.teamList">
    <van-card :desc="team.description" :title="team.name"
      thumb="https://p0.ssl.img.360kuai.com/dmfd/158_88_75/t010c7886f7ec2501d9.webp?size=500x364">
      <template #tags>
        <van-tag plain type="danger" style="margin-right: 8px; margin-top: 8px">
          {{ TeamStatusEnum[team.status] }}
        </van-tag>
      </template>
      <template #bottom>
        <div>
          {{ `队伍人数: ${team.hasJoinNum}/${team.maxNum}` }}
        </div>
        <div v-if="team.expireTime">
          {{ '过期时间: ' + team.expireTime }}
        </div>
        <div>
          {{ '创建时间: ' + team.createTime }}
        </div>
      </template>
      <template #footer>
        <van-button v-if="team.userId !== user?.id && !team.hasJoin" size="small" type="primary" @click="preJoinTeam(team)">加入队伍</van-button>
        <van-button v-if="team.userId === user?.id" size="small" type="primary"
          @click="toUpdateTeam(team.id)">更新队伍</van-button>
          <van-button v-if="team.userId !== user?.id && team.hasJoin" size="small" type="primary" @click="doQuitTeam(team.id)">退出队伍</van-button>
          <van-button v-if="team.userId === user?.id" size="small" type="primary" @click="doDeleteTeam(team.id)">解散队伍</van-button>
      </template>
    </van-card>
  </van-skeleton>
  <van-dialog v-model:show="showPasswordDialog" title="请输入密码" show-cancel-button @confirm="doJoinTeam" @cancel="doJoinCancel">
      <van-field v-model="password" placeholder="请输入密码"/>
    </van-dialog>
</template>

<script setup lang="ts">
import { TeamType } from "../models/team";
import { TeamStatusEnum } from "../constans/team";
import myAxios from "../plugins/myAxios";
import { showSuccessToast, showFailToast, Dialog } from "vant";
import { ref, onMounted } from "vue";
import { getCurrentUser } from "../services/user"
import { useRouter } from 'vue-router';

// const vanDialog = Dialog.Component;

const router = useRouter();

const user = ref();

const showPasswordDialog = ref<boolean>(false);
const joinTeamId = ref();
const password = ref();
interface TeamCardListProps {
  loading: boolean;
  teamList: TeamType[];
}

const props = withDefaults(defineProps<TeamCardListProps>(), {
  loading: false,
  // @ts-ignore
  teamList: [] as TeamType[],
});

/**
 * 加入队伍
 */
const preJoinTeam = async (team: TeamType) => {
  joinTeamId.value = team.id;
  if(team.status === 0){
    doJoinTeam();
  }else{
    showPasswordDialog.value = true;
  }
}

/**
 * 输入密码
 */
 const doJoinTeam = async () => {
  if (!joinTeamId.value) {
    return;
  }
  const res = await myAxios.post('/team/join', {
    teamId: joinTeamId.value,
    password: password.value
  })
  if (res.code === 0 && res.data != null) {
    showSuccessToast('加入成功');
  } else {
    showFailToast('加入失败' + (res.description ? `，${res.description}` : ''));
  }
  isClickRefresh()
  doJoinCancel()
}

 /**
  * 取消密码加入
  */
const doJoinCancel = () => {
  joinTeamId.value = null;
  password.value = '';
}

/**
 * 退出队伍
 * @param id
 */
 const doQuitTeam = async (id: number) => {
  const res = await myAxios.post('/team/quit', {
    teamId: id,
    userId: user.id
  });
  if (res?.code === 0) {
    showSuccessToast('操作成功');
  } else {
    showFailToast('操作失败' + (res.description ? `，${res.description}` : ''));
  }
  isClickRefresh()
}

/**
 * 解散队伍
 * @param id
 */
const doDeleteTeam = async (id: number) => {
  const res = await myAxios.post('/team/delete', {
    teamId: id
  });
  if (res?.code === 0) {
    showSuccessToast('操作成功');
  } else {
    showFailToast('操作失败' + (res.description ? `，${res.description}` : ''));
  }
}

onMounted(async () => {
  user.value = await getCurrentUser();
})

const toUpdateTeam = (id: number) => {
  router.push({
    path: '/team/update',
    query: {
      teamId: id
    }
  })
}


	// 使用 defineEmits 声明事件（也就是父级页面上添加的 @监听事件）
	const emits = defineEmits(['isClickRefresh'])
	const isClickRefresh = () => {
		emits('isClickRefresh', true) // 根据需求参数，可带可不带
	}

</script>

<style scoped></style>
