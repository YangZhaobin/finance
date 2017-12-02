<template>
    <div class="container">
         <el-header></el-header> 
         <div class="content">
            <div class="nav">
                <el-nav></el-nav>
            </div>
            <div class="product">
                <div class="finance-tab">
                    <span class="tab active">宏观</span>
                    <router-link class="tab" :to="{ name: 'finance' }">金融</router-link>
                    <router-link class="tab" :to="{ name: 'industry' }">产业</router-link>
                    <router-link class="tab" :to="{ name: 'comment' }">评论</router-link>
                    <router-link class="tab" :to="{ name: 'international' }">国际</router-link>
                </div>
                <div class="finance-separate"></div>
                <people-table
                    :tableData="tableData"
                    :dataCount="7"
                >    
                </people-table>    
            </div>
        </div>
    </div>
</template>
<script>
    require('../../../../css/tab.less');

    import PeopleTable from './PeopleTable.vue';

    export default {
        components: { PeopleTable },
        data: function() {
            return {
                tableData: [{
                    title: 'this is a title'
                }, {
                    title: 'this is a title'
                }, {
                    title: 'this is a title'
                }, {
                    title: 'this is a title'
                }, {
                    title: 'this is a title'
                }, {
                    title: 'this is a title'
                }, {
                    title: 'this is a title'
                }]
            };
        },
        mounted() {
        },
        method: {
        }
    };
</script>
<style lang="less" scoped>

</style>
