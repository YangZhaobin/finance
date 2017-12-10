<template>
    <div>
        <el-table
            v-loading="tableLoading"
            element-loading-text="拼命加载中"
            show-overflow-tooltip
            :data="tableData"
            stripe
            style="width: 100%">
            <el-table-column
                prop="title"
                label="文章标题">
                <template slot-scope="scope">
                    <router-link :to="{ name: 'comment' }">
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
                :current-page="currentPage"
                :page-sizes="[10, 20, 50, 100]"
                :page-size="pageSize"
                layout="prev, pager, next, sizes, total"
                :total="dataCount">
            </el-pagination>
        </div>
    </div>
</template>

<script>
export default {
    name: 'PeopleTable',
    props: {
        tableLoading: {
            type: Boolean,
            default: false
        },
        tableData: {
            type: Array,
            default: () => []
        },
        dataCount: {
            type: Number,
            default: 0
        }
    },
    data() {
        return {
            pageSize: 10,
            currentPage: 1
        }
    },
    methods: {
        handleSizeChange(val) {
            this.pageSize = val;
            // this.redirectPage();
        },
        handleCurrentChange(val) {
            this.redirectPage(val);
            this.currentPage = val;
        },
    }
}
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

