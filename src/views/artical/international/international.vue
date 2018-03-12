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
                type: 'international',
                tabList: [{
                    name: '新浪财经',
                    link: 'international',
                    from: 'sina'
                }, {
                    name: '腾信财经',
                    link: 'international',
                    from: 'tencent'
                }, {
                    name: '网易新闻',
                    link: 'international',
                    from: 'netease'
                }, {
                    name: '人民网',
                    link: 'international',
                    from: 'people'
                }, {
                    name: '华尔街见闻',
                    link: 'international',
                    from: 'wallstreet'
                }, {
                    name: '中国财经信息网',
                    link: 'international',
                    from: 'prcfe'
                }]
            };
        },
        watch: {
            '$route'(to, from) {
                let f = to.params.from;
                this.tabList = this.tabList.map(item => {
                    item.isActive = (item.from === f);
                    return item;
                });
            }
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
