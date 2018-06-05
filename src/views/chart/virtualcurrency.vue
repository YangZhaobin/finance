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
                        max-height="600"
                        v-loading="loading"
                        element-loading-text="拼命加载中"
                        show-overflow-tooltip
                        :data="table.tableData"
                        stripe
                        :class="{ 'table-empty-back': table.isEmptyTable, 'chart-table' : true }"
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
                        <el-table-column
                            prop="px_echarto"
                            width="50"
                            header-align="center"
                            label="">
                            <template slot-scope="scope">
                                <ul class="time-list">
                                   <li class="active" @click="getEChartContent($event, '1H', scope.row)">1H</li>
                                   <li @click="getEChartContent($event, '4H', scope.row)">4H</li>
                                   <li @click="getEChartContent($event, '1D', scope.row)">1D</li>
                                   <li @click="getEChartContent($event, '1W', scope.row)">1W</li>
                                   <li @click="getEChartContent($event, '1M', scope.row)">1M</li>
                                </ul>
                            </template>
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
    const _ = require('lodash');
    export default {
        data: function() {
            return {
                type: 'virtualcurrency',
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
                    INTERVAL_TIME: 2000
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
                    flag: 0,
                    chartList: [],
                    url: 'http://forexdata.wallstreetcn.com/kline',
                    fields: [
                        'close_px'
                    ],
                    candle_period: {
                        '1H': 5,
                        '4H': 7,
                        '1D': 8,
                        '1W': 10,
                        '1M': 11
                    },
                    maxDataLength: 50,
                    option: {
                        tooltip: {
                            trigger: 'axis',
                            formatter: ' {c} '
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
                            boundaryGap: false,
                            data: []
                        },
                        yAxis: {
                            scale: true,
                            show: false,
                            type: 'value'
                        },
                        seriesOrder: {
                            '1H': 0,
                            '4H': 1,
                            '1D': 2,
                            '1W': 3,
                            '1M': 4
                        },
                        series: [{
                            name: '1H',
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
            for (let i = 0; i <  this.chart.maxDataLength; i++) {
                this.chart.option.xAxis.data.push('');
            }
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
                this.chart.flag = 0;
                this.chart.chartList = [];
            },
            handleCurrentChange(val) {
                this.page.currentPage = val;
                this.chart.flag = 0;
                this.chart.chartList = [];
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
                        this.$nextTick(() => {
                            if (!this.chart.flag) {
                                this.setEChart();
                            }
                        });
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
                    let prod_code = '';
                    for (let key in item) {
                        if (Array.isArray(item[key])) {
                            arr = item[key];
                            prod_code = key;
                        }
                    }
                    fields.forEach((field, i) => {
                        obj[field] = arr[i];
                    });
                    obj['prod_code'] = prod_code;
                    obj['index'] = index;
                    d.push(obj);
                });
                return d;
            },
            setEChart() {
                this.chart.flag = 1;
                let charts = Array.prototype.slice.call(document.getElementsByClassName('echart'));
                charts.shift();
                charts.forEach((echart, index) => {
                    let chart = echarts.init(echart);
                    let option = _.cloneDeep(this.chart.option);
                    let prod_code = this.table.tableData[index]['prod_code'];
                    option['prod_code'] = prod_code;
                    chart.setOption(option);
                    this.chart.chartList.push(chart);
                    this.getEChartContent(null, '1H', this.table.tableData[index]);
                });
            },
            getEChartContent(evt, legend, row) {
                if (evt) {
                    let children = Array.prototype.slice.call(evt.target.parentNode.children);
                    children.forEach((child) => {
                        child.classList.remove('active');
                    });
                    evt.target.classList.add('active');
                }
                let chart = this.chart.chartList[row['index']];
                let option = chart.getOption();
                let prod_code = option['prod_code'];
                let params = {
                    prod_code,
                    candle_period: this.chart.candle_period[legend],
                    fields: this.chart.fields.join(','),
                    data_count: this.chart.maxDataLength
                };
                this.axios.get(this.chart.url, {
                    params
                })
                .then(data => data.data)
                .then(data => {
                    if (data.code === 200) {
                        data = data.data;
                        let dataList = data.candle[prod_code];
                        option.series[0].data = dataList.map((item) => {
                            return item[0];
                        });
                        chart.setOption(option);
                    }
                })
                .catch(() => {
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
        margin-bottom: 15px;

        text-align: center;

        & > .artical-pagination {
            display: inline-block;
        }
    }
    .chart-table.el-table {
        margin-top: 15px;
        .el-table__row td {
            height: 130px !important;
        }
        .gt {
            color: #ff5959;
        }
        .lt {
            color: #3cbc98;
        }
        .time-list {
            width: 30px;
            li {
                text-align: center;
                margin-bottom: 3px;
                font-size: 12px;
                border: 1px solid #ccc;
                border-radius: 2px;
                cursor: pointer;

                &:hover {
                    background: rgba(19, 120, 240, .1);
                    border-color: rgb(19, 120, 240);
                }
                &.active {
                    background: rgba(19, 120, 240, .1);
                    border-color: rgb(19, 120, 240);
                }
                &:last-child {
                    margin-bottom: 0px;
                }
            }
        }
    }

</style>
