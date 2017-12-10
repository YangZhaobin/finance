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
                <div class="detail-wrapper">
                    <h3>基本信息</h3>
                    <div class="detail-content">
                        <ul class="detail-list">
                            <li class="detail-list__item">
                                <span class="detail-list__item-label">磁盘名：</span>
                                <span class="detail-list__item-content">磁盘名</span>
                            </li>
                            <li class="detail-list__item">
                                <span class="detail-list__item-label">设备名称：</span>
                                <span class="detail-list__item-content">设备名称</span>
                            </li>
                            <li class="detail-list__item">
                                <span class="detail-list__item-label">挂载主机：</span>
                                <span class="detail-list__item-content">挂载主机</span>
                            </li>
                            <li class="detail-list__item">
                                <span class="detail-list__item-label">创建时间：</span>
                                <span class="detail-list__item-content">创建时间</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    require('@css/tab.less');
    require('@css/detail.less');
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
