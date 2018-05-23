<template>
    <div class="container">
         <el-header></el-header> 
         <div class="content">
            <div class="nav">
                <el-nav></el-nav>
            </div>
            <div class="product">
                <div class="btn-box">
                    <el-button 
                        type="primary"
                        @click="multiDelete"
                        :disabled="table.multipleSelection.length === 0">
                        <i class="el-icon-delete"></i>
                        取消收藏
                    </el-button>
                </div>
                <div class="finance-separate"></div>
                <div>
                    <el-table
                        ref="multipleTable"
                        max-height="650"
                        :empty-text="table.emptyText"
                        v-loading="table.loading"
                        element-loading-text="拼命加载中"
                        show-overflow-tooltip
                        :data="table.tableData"
                        @selection-change="handleSelectionChange"
                        stripe
                        :class="{ 'table-empty-back': table.isEmptyTable }"
                        style="width: 100%">
                        <el-table-column
                            type="selection"
                            width="55">
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
                                {{ WEB_CONST_ARR[scope.row.website_id].cn }}
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
                     <el-dialog
                        :title="delDialog.title"
                        class="del-dialog"
                        :close-on-click-modal="false"
                        :visible.sync="delDialog.visible"
                        size="tiny">
                        <span class="deldialog-content">
                            <i class="danger el-icon-info"></i> 
                            {{delDialog.deletePromptText}}
                        </span>
                        <span slot="footer" class="dialog-footer">
                            <el-button @click="delDialog.visible = false">取 消</el-button>
                            <el-button type="danger" :loading="delDialog.isDeleteLoading" @click="delSelectedDataComfirm">确 定</el-button>
                        </span>
                    </el-dialog>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex';
import { WEB_CONST_ARR } from '@/const/webconst';
import DeleteDialog from '@/components/DeleteDialog.vue';
require('@css/tab.less');
require('@css/table.less');
const urlConfig = require('@/api/urlConfig');
export default {
    components: { DeleteDialog },
    data() {
        return {
            type: 'hot',
            tabList: [],
            searchWord: '',
            data: {
                path: 'collection',
                NOTIFICATION_DURATION_TIME: 3000
            },
            page: {
                pageSize: 10,
                currentPage: 1
            },
            WEB_CONST_ARR,
            table: {
                tableData: [],
                isEmptyTable: true,
                tableDataCount: 0,
                emptyText: '暂无数据',
                loading: false,
                multipleSelection: []
            },

            delDialog: {
                // 取消收藏
                visible: false,
                title: '取消收藏',
                deleteTargetRows: [],
                delErrorMessage: '',
                deletePromptText: '您确定要取消选中的收藏文章吗？'
            }
        };
    },
    mounted() {
        if (this.user.username) {
            this.table.emptyText = '暂无数据';
            this.redirectPage();
        } else {
            this.table.tableData = [];
            this.table.emptyText = '用户未登录';
            console.info(this.user);
        }
    },
    computed: {
        ...mapState(
            [
                'user'
            ]
        )
    },
    watch: {
        'user': 'getTableData',
        '$route': 'getTableData',
        ['delDialog.visible'](newVal, oldVal) {
            if (!newVal) {
                this.isDeleteLoading = false;
            }
        }
    },
    methods: {
        handleSelectionChange(val) {
            this.table.multipleSelection = val;
        },
        multiDelete() {
            this.delDialog.visible = true;
        },
        delSelectedDataComfirm() {
            if (this.delDialog.isDeleteLoading) {
                return;
            }
            this.delDialog.isDeleteLoading = true;
            let errorFlag = 0;
            let delFuncs = this.table.multipleSelection.map((ele, index, arr) => {
                let artical = this.table.multipleSelection[index];
                let params = {
                    username: this.user.username,
                    artical_id: artical.id
                };
                return this.axios.post(urlConfig.userCollectionDelete(), params)
                    .then(data => data.data)
                    .then(data => {
                        if (data.code !== 200) {
                            errorFlag = 1;
                        }
                    })
                    .catch(() => {
                        errorFlag = 1;
                    });
            });
            this.axios.all(delFuncs)
            .then(this.axios.spread((...response) => {
                if (errorFlag) {
                    this.showErrorMessage('部分取消收藏失败');
                } else {
                    this.showSuccessNotify('操作成功');
                }
            }))
            .finally(() => {
                this.getTableData();
                this.delDialog.isDeleteLoading = false;
                this.delDialog.visible = false;
            });
        },
        handleSizeChange(val) {
            this.page.pageSize = val;
            this.page.currentPage = 1;
        },
        handleCurrentChange(val) {
            this.page.currentPage = val;
        },
        redirectPage(pageNum) {
            if (!pageNum || pageNum === this.page.currentPage) {
                this.getTableData();
            } else {
                this.$router.push({
                    name: this.data.path,
                    query: {
                        page: pageNum
                    }
                });
            }
        },
        getTableData() {
            this.table.loading = true;

            if (!this.$route.query.page) {
                this.page.currentPage = 1;
            } else {
                this.page.currentPage = parseInt(this.$route.query.page);
            }

            let params = {
                username: this.user.username,
                limit: this.page.pageSize,
                offset: (this.page.currentPage - 1) * this.page.pageSize
            };
            this.axios.get(urlConfig.userCollectionList(), {
                params
            })
            .then(data => data.data)
            .then(data => {
                this.table.tableDataCount = data.count || 0;
                this.table.tableData = data.rows[0].articals;
            })
            .catch(() => {
                this.table.tableData = [];
                this.showErrorMessage('数据获取错误');
            })
            .finally(() => {
                this.table.isEmptyTable = (this.table.tableData.length === 0);
                this.table.loading = false;
            });
        },

        // delete code
        showErrorMessage(msg) {
            this.$message({
                message: msg,
                type: 'error'
            });
        },
        showWarningNotify(msg) {
            this.$notify({
                title: msg,
                type: 'warning',
                duration: this.data.NOTIFICATION_DURATION_TIME
            });
        },
        showSuccessNotify(msg) {
            this.$notify({
                title: msg,
                type: 'success',
                duration: this.data.NOTIFICATION_DURATION_TIME
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
    .input-with-search {
        position: absolute;
        right: 30px;
        bottom: 0;
        width: 300px;
    }
    .btn-box {
        margin-bottom: 15px;
        margin-top: 15px;
        font-size: 0;
        
        .el-button + .el-button, .el-button + .el-dropdown {
            margin-left: 10px;
        }
        .el-button i {
            margin-right: 7px;
        }
    }
    .del-dialog {
        .el-dialog__body {
            text-align: center;
        }
        i {
            display: inline-block;
            margin-right: 15px;
            vertical-align: middle;
            color: #ff6459;
            font-size: 36px;
        }
        .deldialog-content {
            line-height: 95px;
        }
    }
</style>
