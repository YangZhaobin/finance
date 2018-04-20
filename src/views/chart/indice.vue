<template>
    <div class="container">
         <el-header></el-header> 
         <div class="content">
            <div class="nav">
                <el-nav></el-nav>
            </div>
            <div class="product">
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
                            prop="prod_name"
                            label="名称">
                            <template slot-scope="scope">
                                {{ scope.row.prod_name }}
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="preclose_px"
                            label="昨收">
                            <template slot-scope="scope">
                                {{ scope.row.preclose_px.toFixed(4) }}
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="open_px"
                            label="今开">
                            <template slot-scope="scope">
                                {{ scope.row.open_px.toFixed(4) }}
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="high_px"
                            label="最高">
                            <template slot-scope="scope">
                                {{ scope.row.high_px }}
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="low_px"
                            label="最低">
                            <template slot-scope="scope">
                                {{ scope.row.low_px }}
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="last_px"
                            label="最新">
                            <template slot-scope="scope">
                                {{ scope.row.last_px }}
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="px_change"
                            label="变化">
                            <template slot-scope="scope">
                                <span
                                    :class="{ 'lt': scope.row.px_change < 0, 'gt': scope.row.px_change > 0 }">
                                    <i :class="{ 'el-icon-caret-bottom': scope.row.px_change < 0, 'el-icon-caret-top': scope.row.px_change > 0 }"></i>
                                    {{ scope.row.px_change.toFixed(4) }}
                                </span>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="px_change_rate"
                            label="变化率">
                            <template slot-scope="scope">
                                <span
                                    :class="{ 'lt': scope.row.px_change_rate < 0, 'gt': scope.row.px_change_rate > 0 }">
                                    {{ scope.row.px_change_rate.toFixed(2) + '%' }}
                                </span>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="px_echart"
                            width="200"
                            header-align="center"
                            class-name="echart"
                            label="趋势">
                        </el-table-column>
                    </el-table>
                    <div class="pagination-wrapper">
                        <el-pagination
                            class="artical-pagination"
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            :page-sizes="[10, 20, 50, 100]"
                            :current-page="page.currentPage"
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
    const echarts = require('echarts');
    export default {
        data: function() {
            return {
                type: 'indice',
                url: 'http://forexdata.wallstreetcn.com/real_list',
                fields: [
                    'prod_name',
                    'preclose_px',
                    'open_px',
                    'high_px',
                    'low_px',
                    'update_time',
                    'last_px',
                    'px_change',
                    'px_change_rate',
                    'price_precision',
                    'market_type',
                    'trade_status'
                ],
                interval: {
                    intervalList: [],
                    INTERVAL_TIME: 5000
                },
                page: {
                    currentPage: 1,
                    pageSize: 10
                },
                table: {
                    tableData: [],
                    isEmptyTable: true,
                    tableDataCount: 0
                },
                chart: {
                    dataList: [],
                    maxDataLength: 50,
                    option: {
                        tooltip: {
                            show: true,
                            trigger: 'item'
                        },
                        grid: {
                            left: 0,
                            right: 0,
                            top: 0,
                            bottom: 0
                        },
                        xAxis: {
                            show: false,
                            type: 'category',
                            boundaryGap: false
                        },
                        yAxis: {
                            scale: true,
                            show: false,
                            type: 'value'
                        },
                        series: [{
                            data: [],
                            symbol: 'none',
                            type: 'line',
                            itemStyle: {
                                normal: {
                                    color: 'rgba(64, 158, 255, 0.5)',
                                    lineStyle: {
                                        color: 'rgba(64, 158, 255, 0.5)'
                                    }
                                }
                            },
                            areaStyle: {
                                color: 'rgba(64, 158, 255, 0.3)'
                            }
                        }]
                    }
                },
                loading: false
            };
        },
        mounted() {
            this.getTableData();
            let intervalId = this.pollData();
            this.interval.intervalList.push(intervalId);
        },
        destroyed() {
            this.stopPoll();
        },
        methods: {
            handleSizeChange(val) {
                this.page.pageSize = val;
                this.page.currentPage = 1;
            },
            handleCurrentChange(val) {
                this.page.currentPage = val;
                this.getTableData();
                let intervalId = this.pollData();
                this.interval.intervalList.push(intervalId);
            },
            getTableData() {
                let params = {
                    fields: this.fields.join(','),
                    type: this.type,
                    page: this.page.currentPage,
                    limit: this.page.pageSize
                };
                this.axios.get(this.url, {
                    params: params
                })
                .then(data => data.data)
                .then(data => {
                    if (data.code === 200) {
                        data = data.data;
                        this.table.tableDataCount = data.count || 0;
                        this.table.tableData = this.analyseData(data.snapshot);
                        this.setEChart();
                    } else {
                        this.table.tableData = [];
                        this.showErrorMessage('数据获取错误');
                        this.stopPoll();
                    }
                })
                .catch(() => {
                    this.table.tableData = [];
                    this.showErrorMessage('数据获取错误');
                    this.stopPoll();
                })
                .finally(() => {
                    this.table.isEmptyTable = (this.table.tableData.length === 0);
                });
            },
            pollData() {
                this.stopPoll();
                return window.setInterval(this.getTableData, this.interval.INTERVAL_TIME);
            },
            stopPoll() {
                this.interval.intervalList.forEach((item) => {
                    window.clearInterval(item);
                });
            },
            analyseData(data) {
                let { data_arrs, fields } = data;
                let d = [];
                data_arrs.forEach((item, index) => {
                    let obj = {};
                    let arr = [];
                    for (let key in item) {
                        if (Array.isArray(item[key])) {
                            arr = item[key];
                        }
                    }
                    fields.forEach((field, i) => {
                        obj[field] = arr[i];
                        if (field === 'last_px') {
                            if (!this.chart.dataList[index]) {
                                this.chart.dataList[index] = [];
                            }
                            this.chart.dataList[index].push(arr[i]);
                            if (this.chart.dataList[index].length > this.chart.maxDataLength) {
                                this.chart.dataList[index].shift();
                            }
                        }
                    });
                    d.push(obj);
                });
                return d;
            },
            setEChart() {
                let charts = Array.prototype.slice.call(document.getElementsByClassName('echart'));
                charts.shift();
                charts.forEach((echart, index) => {
                    let chart = echarts.init(echart);
                    let option = this.chart.option;
                    option.series[0].data = this.chart.dataList[index];
                    chart.setOption(option);
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
<style lang="less">
    .pagination-wrapper {
        margin-top: 20px;

        text-align: center;

        & > .artical-pagination {
            display: inline-block;
        }
    }
    .el-table {
        .el-table__row td {
            height: 130px !important;
        }
        .gt {
            color: #ff5959;
        }
        .lt {
            color: #3cbc98;
        }
    }

</style>
