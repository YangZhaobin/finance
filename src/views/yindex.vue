<template>
    <div class="container">
         <el-header></el-header> 
         <div class="content">
            <div class="nav">
                <el-nav></el-nav>
            </div>
            <div class="product">
                <div id="test"></div>
            </div>
        </div>
    </div>
</template>
<script>
    require('@css/tab.less');
    require('@css/detail.less');
    const echarts = require('echarts');
    export default {
        data: function() {
            return {
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
                        show: false,
                        scale: true,
                        type: 'value'
                    },
                    series: [{
                        data: [
                            90.3032,
                            90.2946,
                            90.2971,
                            90.2968,
                            90.3016,
                            90.2996,
                            90.3149,
                            90.3124,
                            90.3116,
                            90.3151
                        ],
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
            };
        },
        mounted() {
            this.test();
        },
        methods: {
            test() {
                let test = document.getElementById('test');
                let chart = echarts.init(test);
                let option = this.option;
                chart.setOption(option);
            }
        }
    };
</script>
<style lang="less">
    #test {
        height: 400px;
        width: 600px;
    }
</style>
