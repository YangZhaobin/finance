<template>
    <div class="container">
         <el-header></el-header> 
         <div class="content">
            <div class="nav">
                <el-nav></el-nav>
            </div>
            <div class="product">
                <div class="finance-tab">
                    <span v-for="tab in tabList"
                            :key="tab.name">
                        <span v-if="tab.isActive" class="tab active">{{ tab.name }}</span>
                        <router-link v-else class="tab" :to="{ name: tab.link, params: { from: tab.from }}">{{ tab.name }}</router-link>
                    </span>
                </div>
                <div class="finance-separate"></div>
                <artical-table
                    :tabList="tabList"
                    :type="type">    
                </artical-table>  
            </div>
        </div>
    </div>
</template>
<script>
import ArticalTable from '@/components/ArticalTable.vue';
const urlConfig = require('@/api/urlConfig');
require('@css/tab.less');
require('@css/table.less');
export default {
    name: 'CommonTemplate',
    components: { ArticalTable },
    props: {
        type: String
    },
    data() {
        return {
            webInfos: [],
            tabList: []
        };
    },
    mounted() {
        if (!this.webInfos.length) {
            this.getWebsiteInfos();
        }
    },
    watch: {
        '$route'(to, from) {
            let f = to.params.from;
            this.tabList = this.tabList.map(item => {
                item.isActive = (item.from === f);
                return item;
            });
        }
    },
    methods: {
        getWebsiteInfos() {
            this.axios.get(urlConfig.websiteInfos())
                .then(data => data.data)
                .then(data => {
                    this.webInfos = data;
                    this.getWebsiteTabs();
                })
                .catch(() => {
                    this.showErrorMessage('数据获取错误');
                });
        },
        getWebsiteTabs() {
            let params = {
                type: this.type
            };
            this.axios.get(urlConfig.websiteTags(), {
                params
            })
            .then(data => data.data)
            .then(data => {
                this.tabList = data.map((item) => {
                    let id = item.website_id;
                    for (let i = 0, len = this.webInfos.length; i < len; i++) {
                        let item = this.webInfos[i];
                        if (item['id'] === id) {
                            return {
                                name: item.description,
                                link: this.type,
                                from: item.name
                            };
                        }
                    }
                });
                if (!this.$route.params.from) {
                    this.$route.params.from = this.tabList[0]['from'];
                }
                let f = this.$route.params.from;
                this.tabList = this.tabList.map(item => {
                    item.isActive = (item.from === f);
                    return item;
                });
            })
            .catch(() => {
                this.showErrorMessage('数据获取错误1');
            });
        },

        showErrorMessage(msg) {
            this.$message({
                message: msg,
                type: 'error'
            });
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

</style>
