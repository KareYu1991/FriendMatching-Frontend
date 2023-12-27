import Index from '../pages/Index.vue';
import UserPage from '../pages/UserPage.vue';
import SearchPage from '../pages/SearchPage.vue';
import TeamPage from '../pages/TeamPage.vue';
import SearchResultPage from  '../pages/SearchResultPage.vue';
import UserEditPage from  '../pages/UserEditPage.vue';
import UseUpdatePage from  '../pages/UseUpdatePage.vue';
import UserLoginPage from  '../pages/UserLoginPage.vue';
import TeamAddPage from  '../pages/TeamAddPage.vue';
import TeamUpdatePage from  '../pages/TeamUpdatePage.vue';
import UserTeamJoinPage from  '../pages/UserTeamJoinPage.vue';
import UserTeamCreatePage from  '../pages/UserTeamCreatePage.vue';


const routes = [
  { path: '/', component: Index },
  { path: '/user', title: '个人信息', component: UserPage },
  { path: '/search', title: '搜索页面', component: SearchPage },
  { path: '/team', title: '队伍', component: TeamPage },
  { path: '/searchPage', title: '搜索详情', component: SearchResultPage },
  { path: '/user/update', title: '修改用户', component: UseUpdatePage },
  { path: '/user/edit', title: '修改用户属性', component: UserEditPage },
  { path: '/user/login', title: '用户登录', component: UserLoginPage },
  { path: '/team/add', title: '创建队伍', component: TeamAddPage },
  { path: '/team/update', title: '更新队伍', component: TeamUpdatePage },
  { path: '/user/team/create', title: '查看创建队伍', component: UserTeamCreatePage },
  { path: '/user/team/join', title: '查看加入队伍', component: UserTeamJoinPage },
]

export default routes;