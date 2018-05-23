<template>
    <div class="container">
         <el-header></el-header> 
         <div class="content">
            <div class="nav">
                <el-nav></el-nav>
            </div>
            <div class="product">
                <div class="detail-wrapper" v-loading="artical.loading">
                    <el-row>
                        <el-button
                            :disabled="!user.username"
                            :type="artical.isCollected ? 'danger' : ''"
                            icon="el-icon-star-off"
                            @click="collectArticle"
                            circle>
                        </el-button>
                    </el-row>
                    <h3 class="title-content">{{ artical.title }}</h3>
                    <div class="detail-content">
                        <ul class="detail-list">
                            <li class="detail-list__item">
                                <span class="detail-list__item-label">时间：</span>
                                <span class="detail-list__item-content" v-html="artical.published_at"></span>
                            </li>
                            <li class="detail-list__item">
                                <span class="detail-list__item-label">来源：</span>
                                <span class="detail-list__item-content" v-html="artical.from"></span>
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
import { mapState } from 'vuex';
require('@css/tab.less');
require('@css/detail.less');
const urlConfig = require('@/api/urlConfig');
export default {
    data() {
        return {
            NOTIFICATION_DURATION_TIME: 3000,
            artical: {
                id: '',
                loading: false,
                title: '',
                published_at: '',
                from: '',
                content: '',
                isCollected: false
            }
        };
    },
    mounted() {
        this.artical.id = this.$route.params.id || 'AccsLrrwbEGtudfIowvg';
        this.getArticalById(urlConfig.articalDetail(this.artical.id));
    },
    computed: {
        ...mapState(
            [
                'user'
            ]
        )
    },
    watch: {
        '$route'() {
            this.artical.id = this.$route.params.id || 'AccsLrrwbEGtudfIowvg';
            this.getArticalById(urlConfig.articalDetail(this.artical.id));
        },
        'user'() {
            if (this.user.username) {
                this.getArticalById(urlConfig.articalDetail(this.artical.id));
            }
        }
    },
    methods: {
        getArticalById(url) {
            this.artical.loading = true;
            this.axios.get(url)
            .then(data => data.data)
            .then(data => {
                if (!data.title) {
                    this.showErrorMessage('文章获取错误');
                }
                this.artical.title = data.title;
                this.artical.published_at = data.published_at;
                this.artical.from = data.from;
                this.artical.content = data.content;
                this.artical.isCollected = data.isCollected;
            })
            .catch(() => {
                this.showErrorMessage('文章获取错误');
                this.artical = {
                    id: '',
                    loading: false,
                    title: '',
                    published_at: '',
                    from: '',
                    content: '',
                    isCollected: false
                };
            })
            .finally(() => {
                this.artical.loading = false;
            });
        },
        collectArticle() {
            if (!this.user.username) {
                return;
            }
            if (this.artical.isCollected) {
                this.deleteCollection();
            } else {
                this.addCollection();
            }
        },
        addCollection() {
            let params = {
                username: this.user.username,
                artical_id: this.artical.id
            };
            this.axios.post(urlConfig.userCollectionAdd(), params)
            .then(data => data.data)
            .then(data => {
                if (data.code === 200) {
                    this.showSuccessNotify('收藏成功');
                    this.artical.isCollected = true;
                } else {
                    this.showErrorMessage('收藏失败');
                }
            })
            .catch((err) => {
                this.showErrorMessage('收藏失败1 ' + err);
            });
        },
        deleteCollection() {
            let params = {
                username: this.user.username,
                artical_id: this.artical.id
            };
            this.axios.post(urlConfig.userCollectionDelete(), params)
            .then(data => data.data)
            .then(data => {
                if (data.code === 200) {
                    this.showSuccessNotify('取消收藏成功');
                    this.artical.isCollected = false;
                } else {
                    this.showErrorMessage('取消收藏失败');
                }
            })
            .catch((err) => {
                this.showErrorMessage('取消收藏失败 ' + err);
            });
        },
        showErrorMessage(msg) {
            this.$message.error(msg);
        },
        showSuccessNotify(msg) {
            this.$notify({
                title: msg,
                type: 'success',
                duration: this.NOTIFICATION_DURATION_TIME
            });
        }
    }
};
</script>
<style lang="less" scoped>
    .el-row {
        text-align: right;
        padding-right: 20px;
    }
</style>
