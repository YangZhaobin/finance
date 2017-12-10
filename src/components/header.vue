<template>
     <div class="header-block">
        <div class="logo-block">
            <a href="/" class="logo-link">
                <img src="http://www.mtyun.com/media/img/console/logo.png" class="logo-image"/>
            </a>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ElHeader',
    data() {
        return {

        };
    }
};
</script>

<style lang="less" scoped>
    .header-block {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 10;

        height:50px;
        box-shadow:0 2px 4px 0 rgba(34,38,45,0.14);
        
        background:#ffffff;
    }
    .logo-block {
        width: 180px;
        height: 50px;
        float: left;
        
        background: #fafafc;
        
        border-right: 1px solid #dfe4ea;
        .logo-link {
            display: block;
            width: 100%;
            height: 100%;
            padding: 10px 35px;
        }
        .logo-image {
            width: 110px;
            height: 30px;
        }
    }
</style>

