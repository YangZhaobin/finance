<template>
    <div class="container">
         <el-header></el-header> 
         <div class="content">
            <div class="nav">
                <el-nav></el-nav>
            </div>
            <div class="product">
                <div class="finance-tab">
                    <span v-for="tab in tabList"
                            :key="tab.name">
                        <span v-if="tab.isActive" class="tab active">{{ tab.name }}</span>
                        <router-link v-else class="tab" :to="{ name: tab.link }">{{ tab.name }}</router-link>
                    </span>
                </div>
                <div class="finance-separate"></div>
                <artical-table
                    :urlFormatter="articalUrlFormatter">    
                </artical-table>  
            </div>
        </div>
    </div>
</template>
<script>
import ArticalTable from '@/components/ArticalTable.vue';
require('@css/tab.less');
require('@css/table.less');
export default {
    name: 'CommonTemplate',
    components: { ArticalTable },
    props: {
        tabList: {
            type: Array,
            default: () => []
        },
        articalUrlFormatter: {
            type: Function,
            default: () => ''
        }
    },
    data: function() {
        return {
        };
    },
    mounted() {
    },
    method: {
        articalUrlFormatter: this.articalUrlFormatter
    }
};
</script>
<style lang="less" scoped>

</style>
