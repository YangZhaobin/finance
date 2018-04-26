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
                type: 'industry',
                tabList: [{
                    name: '人民网',
                    link: 'industry',
                    from: 'people'
                }, {
                    name: '中国财经信息网',
                    link: 'industry',
                    from: 'prcfe'
                }, {
                    name: '同花顺财经',
                    link: 'industry',
                    from: 'new10jqka'
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
