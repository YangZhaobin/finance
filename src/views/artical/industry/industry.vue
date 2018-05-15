<template>
    <div>
        <common-template
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
                type: 'industry'
            };
        },
        watch: {
        },
        mounted() {
        },
        methods: {
        }
    };
</script>
<style lang="less" scoped>
</style>