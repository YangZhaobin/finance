<template>
    <div class="container">
         <el-header></el-header> 
         <div class="content">
            <div class="nav">
                <el-nav></el-nav>
            </div>
            <div class="product">
                <div class="finance-tab">
                    <router-link class="tab" :to="{ name: 'hongguan' }">国际</router-link>
                    <router-link class="tab" :to="{ name: 'finance' }">金融</router-link>
                    <router-link class="tab" :to="{ name: 'industry' }">产业</router-link>
                    <router-link class="tab" :to="{ name: 'comment' }">评论</router-link>
                    <span class="tab active">国际</span>
                </div>
                <div class="finance-separate"></div>
                
            </div>
        </div>
    </div>
</template>
<script>
    require('../../../../css/tab.less');
    export default {
        data: function() {
            return {
                key: 'Hello World!!!!!'
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
