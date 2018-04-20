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
                        <span v-if="tab.isActive" class="tab active">{{ tab.word }}</span>
                        <router-link v-else class="tab" :to="{ name: tab.link, query: { word: tab.word }}">{{ tab.word }}</router-link>
                    </span>
                </div>
                <div class="finance-separate"></div>

                <div>
                    <el-table
                        v-loading="loading"
                        element-loading-text="拼命加载中"
                        show-overflow-tooltip
                        :data="table.tableData"
                        stripe
                        :class="{ 'table-empty-back': table.isEmptyTable }"
                        style="width: 100%">
                        <el-table-column
                            width="80px"
                            type="index">
                        </el-table-column>
                        <el-table-column
                            prop="title"
                            label="文章标题">
                            <template slot-scope="scope">
                                <router-link target="_blank" :to="{ name: 'content', params: { id: scope.row.id } }">
                                    {{ scope.row.title }}
                                </router-link>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="from"
                            width="200"
                            label="文章来源">
                            <template slot-scope="scope">
                                {{ scope.row.Website.name }}
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="pagination-wrapper">
                        <el-pagination
                            class="artical-pagination"
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            :current-page="page.currentPage"
                            :page-sizes="[10, 20, 50, 100]"
                            :page-size="page.pageSize"
                            layout="prev, pager, next, sizes, total"
                            :total="table.tableDataCount">
                        </el-pagination>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
require('@css/tab.less');
require('@css/table.less');
const urlConfig = require('@/api/urlConfig');
export default {
    data() {
        return {
            type: 'hot',
            tabList: [],
            data: {
                path: 'hot',
                word: this.$route.query.tag,
                NOTIFICATION_DURATION_TIME: 3000
            },
            page: {
                pageSize: 10,
                currentPage: 1
            },
            table: {
                tableData: [],
                isEmptyTable: true,
                tableDataCount: 0
            },
            loading: false
        };
    },
    watch: {
        '$route'(to, from) {
            let word = to.query.word;
            this.tabList = this.tabList.map(item => {
                item.isActive = (item.word === word);
                return item;
            });
            this.getTableData();
        }
    },
    mounted() {
        this.getAllTags();

        let word = this.$route.query.word;
        this.tabList = this.tabList.map(item => {
            item.isActive = (item.word === word);
            return item;
        });
    },
    methods: {
        handleSizeChange(val) {
            this.page.pageSize = val;
            this.page.currentPage = 1;
        },
        handleCurrentChange(val) {
            this.page.currentPage = val;
        },
        getAllTags() {
            this.axios.get(urlConfig.hotArticalTags())
                .then(data => data.data)
                .then(data => {
                    this.tabList = data;
                    let word = this.tabList[0].word;
                    this.$router.push({
                        name: this.data.path,
                        query: {
                            word
                        }
                    });
                    this.tabList = this.tabList.map(item => {
                        item.isActive = (item.word === word);
                        return item;
                    });
                    this.getTableData();
                })
                .catch(() => {
                    this.showErrorMessage('热点数据获取错误');
                })
                .finally(() => {
                    this.loading = false;
                });
        },
        getTableData() {
            this.loading = true;

            let word = '';
            if (!this.$route.query.word) {
                word = this.tabList[0].word;
                this.$router.push({
                    name: this.data.path,
                    query: {
                        word
                    }
                });
            } else {
                word = this.$route.query.word;
            }

            let params = {
                title: word,
                limit: this.page.pageSize,
                offset: (this.page.currentPage - 1) * this.page.pageSize
            };
            this.axios.get(urlConfig.articalListByTitle(), {
                params: params
            })
            .then(data => data.data)
            .then(data => {
                this.table.tableDataCount = data.count || 0;
                this.table.tableData = data.rows;
                this.table.isEmptyTable = false;
            })
            .catch(() => {
                this.table.tableData = [];
                this.showErrorMessage('数据获取错误');
            })
            .finally(() => {
                this.table.isEmptyTable = (this.table.tableData.length === 0);
                this.loading = false;
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
    .pagination-wrapper {
        margin-top: 20px;

        text-align: center;

        & > .artical-pagination {
            display: inline-block;
        }
    }
</style>
