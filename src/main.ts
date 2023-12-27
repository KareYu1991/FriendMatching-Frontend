import { createApp } from 'vue'
import App from './App.vue'
import Vant from 'vant';
import 'vant/lib/index.css';
import '../global.css';

import * as VueRouter from 'vue-router';
import routes from './config/router';

const app = createApp(App);
// 注册完成后，在模板中通过 <van-button> 或 <VanButton> 标签来使用按钮组件

const router = VueRouter.createRouter({
    // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
    // history: VueRouter.createWebHashHistory(),
    history: VueRouter.createWebHistory(),
    routes, // `routes: routes` 的缩写
})

app.use(Vant);
app.use(router);

app.mount('#app')

