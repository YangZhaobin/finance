<template>
    <div>
        <el-table
            max-height="650"
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
                    <router-link target="_blank" :to="{ name: 'content', params: { id: scope.row.id } }">
                        {{ scope.row.title }}
                    </router-link>
                </template>
            </el-table-column>
            <el-table-column
                prop="time"
                width="200px"
                label="时间">
                 <template slot-scope="scope">
                    <span>
                        {{ scope.row.time }}
                    </span>
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
</template>

<script>
const urlConfig = require('@/api/urlConfig');
export default {
    name: 'ArticalTable',
    props: {
        type: String,
        tabList: {
            type: Array,
            default: () => []
        }
    },
    data() {
        return {
            website: '',
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
        '$route': 'getTableData',
        tabList(list) {
            if (list.length <= 0) {
                return;
            }
            if (!this.$route.params.from) {
                this.$route.params.from = this.tabList[0]['from'];
            }
            this.website = this.$route.params.from;
            this.getTableData();
        }
    },
    computed: {
        isEmptyTable() {
            return this.table.tableDataCount === 0;
        }
    },
    mounted() {
        if (this.tabList.length <= 0) {
            return;
        }
        if (!this.$route.params.from) {
            this.$route.params.from = this.tabList[0]['from'];
        }
        this.website = this.$route.params.from;
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
            this.website = this.$route.params.from;
            this.table.tableLoading = true;

            if (!this.$route.query.page) {
                this.page.currentPage = 1;
            } else {
                this.page.currentPage = parseInt(this.$route.query.page);
            }
            let params = {
                site: this.website,
                type: this.type,
                limit: this.page.pageSize,
                offset: (this.page.currentPage - 1) * this.page.pageSize
            };
            this.table.tableLoading = false;
            this.axios.get(urlConfig.articalListBySite(), {
                params: params
            })
            .then(data => data.data)
            .then(data => {
                this.table.tableDataCount = data.count || 0;
                this.table.tableData = data.rows;
            })
            .catch(() => {
                this.table.tableData = [];
                this.showErrorMessage('文章数据获取错误');
            })
            .finally(() => {
                this.table.tableLoading = false;
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

