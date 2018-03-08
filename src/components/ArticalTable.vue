<template>
    <div>
        <el-table
            v-loading="table.tableLoading"
            element-loading-text="拼命加载中"
            show-overflow-tooltip
            :data="table.tableData"
            stripe
            :class="{ 'table-empty-back': isEmptyTable }"
            style="width: 100%">
            <el-table-column
                width="80px"
                type="index">
            </el-table-column>
            <el-table-column
                prop="title"
                label="文章标题">
                <template slot-scope="scope">
                    <router-link :to="{ name: scope.row.link }">
                        {{ scope.row.title }}
                    </router-link>
                </template>
            </el-table-column>
        </el-table>
        <div class="pagination-wrapper">
            <el-pagination
                class="artical-pagination"
                small
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
</template>

<script>
export default {
    name: 'ArticalTable',
    props: {
        urlFormatter: {
            type: Function,
            default: () => ''
        }
    },
    data() {
        return {
            data: {
                path: '',
                from: this.$route.params.from,
                NOTIFICATION_DURATION_TIME: 3000
            },

            page: {
                pageSize: 10,
                currentPage: 1
            },

            table: {
                tableLoading: false,
                tableData: [],
                tableDataCount: 0
            }
        };
    },
    watch: {
        '$route': 'getTableData'
    },
    computed: {
        isEmptyTable() {
            return this.table.tableDataCount === 0;
        }
    },
    mounted() {
        this.getTableData();
    },
    methods: {
        handleSizeChange(val) {
            this.page.pageSize = val;
            this.redirectPage();
        },
        handleCurrentChange(val) {
            this.redirectPage(val);
            this.page.currentPage = val;
        },
        redirectPage(pageNum) {
            if (!pageNum || pageNum === this.page.currentPage) {
                this.getTableData();
            } else {
                this.$router.push({
                    name: this.data.path,
                    params: {
                        from: this.data.from
                    },
                    query: {
                        page: pageNum
                    }
                });
            }
        },
        getTableData() {
            this.table.tableLoading = true;

            if (!this.$route.query.page) {
                this.page.currentPage = 1;
            } else {
                this.page.currentPage = parseInt(this.$route.query.page);
            }
            // let params = {
            //     limit: this.page.pageSize,
            //     offset: (this.page.currentPage - 1) * this.page.pageSize
            // };

            this.table.tableData = [{
                title: 'this is a title1',
                link: 'industry'
            }, {
                title: 'this is a title2',
                link: 'industry'
            }, {
                title: 'this is a title3',
                link: 'industry'
            }, {
                title: 'this is a title4',
                link: 'industry'
            }, {
                title: 'this is a title5',
                link: 'industry'
            }, {
                title: 'this is a title6',
                link: 'industry'
            }, {
                title: 'this is a title7',
                link: 'industry'
            }];
            this.table.tableLoading = false;
            // this.axios.get(this.urlFormatter(), {
            //     params: params
            // })
            // .then(data => data.data)
            // .then(data => {
            //     if (data.code === 200) {
            //         this.table.tableDataCount = data.count || 0;
            //         this.table.tableData = data.ret;
            //     } else {
            //         this.table.tableData = [];
            //         this.showErrorMessage(data.err);
            //     }
            // })
            // .catch(() => {
            //     this.table.tableData = [];
            //     this.showErrorMessage('磁盘快照数据获取错误');
            // })
            // .finally(() => {
            //     this.table.tableLoading = false;
            // });
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

