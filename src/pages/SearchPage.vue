<template>
    <form action="/">
        <van-search v-model="searchText" show-action placeholder="请输入搜索关键词" @search="onSearch" @cancel="onCancel" />
    </form>
    <van-divider content-position="left">已选标签</van-divider>
    <div v-if="activeIds.length === 0">请选择标签</div>

    <van-row gutter="16" style="padding: 0 16px">
        <van-col v-for="tag in activeIds">
            <van-tag :show="show" closeable size="small" type="primary" @close="doclose(tag)">
                {{ tag }}
            </van-tag>
        </van-col>
    </van-row>
    <van-divider content-position="left">未选标签</van-divider>

    <van-tree-select v-model:active-id="activeIds" v-model:main-active-index="activeIndex" :items="tagList" />

    <div>
        <van-button type="primary" size="large" @click="toSearchPage">搜索</van-button>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const searchText = ref('');

const show = ref(true);

const originTagList = [
    {
        text: '测试标签一',
        children: [
            { text: 'java', id: 'java' },
            { text: 'c++', id: 'c++' },
            { text: '面', id: '面', disabled: true },
        ],
    },
    {
        text: '江苏',
        children: [
            { text: '南京', id: 4 },
            { text: '无锡', id: 5 },
            { text: '徐州', id: 6 },
        ],
    }
];


let tagList = ref(originTagList);
/**
 * 搜索过滤操作
 */
const onSearch = (val) => {
    tagList.value = originTagList.map(parentTag => {
        const tempChildren = [...parentTag.children];
        const tempParentTag = { ...parentTag };
        tempParentTag.children = tempChildren.filter(item => item.text.includes(searchText.value))
        return tempParentTag;
    })
};

//取消  清空
const onCancel = () => {
    searchText.value = '';
    tagList.value = originTagList;
};

const activeIds = ref([]);
const activeIndex = ref(0);

const doclose = (tag) => {
    activeIds.value = activeIds.value.filter(item => { return item !== tag; })
};

const toSearchPage = () => {
    router.push({
        path: '/searchPage',
        query: {
            tags: activeIds.value
        }
    });
}

</script>

<style scoped></style>