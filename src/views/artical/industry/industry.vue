<template>
    <div>
        <common-template
            :tabList="tabList"
            :articalUrlFormatter="articalUrlFormatter">
        </common-template>
    </div>
</template>
<script>
    import CommonTemplate from '@/views/artical/CommonTemplate.vue';

    export default {
        components: { CommonTemplate },
        data() {
            return {
                type: 'industry',
                tabList: [{
                    name: '人民网',
                    link: 'industry',
                    from: 'people'
                }, {
                    name: '腾讯财经',
                    link: 'industry',
                    from: 'tencent'
                }, {
                    name: '华尔街见闻',
                    link: 'industry',
                    from: 'wallstreet'
                }]
            };
        },
        mounted() {
            let from = this.$route.params.from;
            this.tabList = this.tabList.map(item => {
                item.isActive = (item.from === from);
                return item;
            });
        },
        methods: {
            articalUrlFormatter() {
                return '';
            }
        }
    };
</script>
<style lang="less" scoped>

</style>
