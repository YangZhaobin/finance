<template>
    <div>
        <common-template
            :tabList="tabList"
            :type="type">
        </common-template>
    </div>
</template>
<script>
    import CommonTemplate from '@/views/artical/CommonTemplate.vue';
    export default {
        components: { CommonTemplate },
        data() {
            return {
                tabList: [{
                    name: '腾信财经',
                    link: 'hongguan',
                    from: 'tencent'
                }, {
                    name: '网易新闻',
                    link: 'hongguan',
                    from: 'netease'
                }, {
                    name: '人民网',
                    link: 'hongguan',
                    from: 'people'
                }, {
                    name: '华尔街见闻',
                    link: 'hongguan',
                    from: 'wallstreet'
                }, {
                    name: '中国财经信息网',
                    link: 'hongguan',
                    from: 'prcfe'
                }],
                type: 'hongguan'
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
