<template>
    <div class="container">
         <el-header></el-header> 
         <div class="content">
            <div class="nav">
                <el-nav></el-nav>
            </div>
            <div class="product">
                <div class="detail-wrapper" v-loading="artical.loading">
                    <h3 class="title-content">{{ artical.title }}</h3>
                    <div class="detail-content">
                        <ul class="detail-list">
                            <li class="detail-list__item">
                                <span class="detail-list__item-label">时间：</span>
                                <span class="detail-list__item-content">{{ artical.published_at }}</span>
                            </li>
                            <li class="detail-list__item">
                                <span class="detail-list__item-label">来源：</span>
                                <span class="detail-list__item-content">{{ artical.from }}</span>
                            </li>
                            <li class="detail-list__item">
                                <span class="detail-list__item-label"></span>
                                <span class="detail-list__item-content" v-html="artical.content"></span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
require('@css/tab.less');
require('@css/detail.less');
const urlConfig = require('@/api/urlConfig');
export default {
    data() {
        return {
            artical: {
                id: '',
                loading: false,
                title: '',
                published_at: '',
                from: '',
                content: ''
            }
        };
    },
    mounted() {
        this.artical.id = this.$route.params.id || 'AccsLrrwbEGtudfIowvg';
        this.getArticalById(urlConfig.articalDetail(this.artical.id));
    },
    methods: {
        getArticalById(url) {
            this.artical.loading = true;
            this.axios.get(url)
            .then(data => data.data)
            .then(data => {
                this.artical.title = data.title;
                this.artical.published_at = data.published_at;
                this.artical.from = data.from;
                this.artical.content = data.content;
            })
            .catch(() => {
                this.table.tableData = [];
                this.showErrorMessage('文章获取错误');
                this.artical = {
                    id: '',
                    loading: false,
                    title: '',
                    published_at: '',
                    from: '',
                    content: ''
                };
            })
            .finally(() => {
                this.artical.loading = false;
            });
        },
        showErrorMessage(msg) {
            this.$message.error(msg);
        }
    }
};
</script>
<style lang="less" scoped>

</style>
