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
                    title: {
                        text: '折线图堆叠'
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data:['邮件营销']
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    toolbox: {
                        // feature: {
                        //     saveAsImage: {}
                        // }
                    },
                    xAxis: {
                        show: false,
                        type: 'category',
                        boundaryGap: false,
                        data: ['','','','','','','']
                    },
                    yAxis: {
                        show: false,
                        type: 'value'
                    },
                    series: [
                        {
                            name:'邮件营销',
                            type:'line',
                            stack: '总量',
                            data:[120, 132, 101, 134, 90, 230, 210]
                        }
                    ]
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
