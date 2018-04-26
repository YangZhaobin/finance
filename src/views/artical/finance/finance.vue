<template>
    <div>
        <common-template
            :type="type"
            :tabList="tabList">
        </common-template>
    </div>
</template>
<script>
    import CommonTemplate from '@/views/artical/CommonTemplate.vue';

    export default {
        components: { CommonTemplate },
        data() {
            return {
                type: 'finance',
                tabList: [{
                    name: '腾信财经',
                    link: 'finance',
                    from: 'tencent'
                }, {
                    name: '人民网',
                    link: 'finance',
                    from: 'people'
                }, {
                    name: '中国财经信息网',
                    link: 'finance',
                    from: 'prcfe'
                }, {
                    name: '同花顺财经',
                    link: 'finance',
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
