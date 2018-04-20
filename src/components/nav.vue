<template>
    <div class="nav-block">
        <div class="nav-block__nav-title">
            {{navTitle}}
        </div>
        <div>
            <ul class="nav-block__nav-list" v-for="routeItem in routeList" :key="routeItem.path">
                <li class="nav-block__nav-subtitle">
                    {{ routeItem.meta.nameCn }}
                </li>
                <li class="nav-block__nav-item" v-for="item in routeItem.children.filter(child => !child.meta.notShowNav)" :key="item.path">
                    <a class="nav-block__link" v-if="item.meta.outlink" :href="item.meta.outlink" target="_blank">
                        <i class="iconfont icon-kongzhitai-cedaohang-xuanzhongtiaoicon nav-background"></i>
                        <i v-if="item.meta.icon" class="iconfont nav-icon" :class="item.meta.icon"></i>{{item.meta.nameCn}}
                    </a>
                    <router-link :to="to(item)" class="nav-block__link" v-else>
                        <i class="iconfont icon-kongzhitai-cedaohang-xuanzhongtiaoicon nav-background"></i>
                        <i v-if="item.meta.icon" class="iconfont nav-icon" :class="item.meta.icon"></i>{{item.meta.nameCn}}
                    </router-link>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
    import routes from '../router/index';
    export default {
        name: 'ElNav',
        data() {
            return {
                navTitle: '',
                routeList: []
            };
        },
        methods: {
            to(item) {
                if (item.replacePath) {
                    return item.replacePath;
                } else {
                    return {
                        name: item.name
                    };
                }
            }
        },
        mounted() {
            let route = this.$route;

            this.routeList = routes.filter(item => item.showNav);

            if (route.matched && route.matched.length > 0) {
                let {meta = {}} = route.matched[0];
                this.navTitle = meta.nameCn;
                document.title = meta.title;
            }
        }
    };
</script>
<style lang="less" scoped>
    .nav-block{
        width:100%;
        
        
        box-shadow:2px 0 5px 0 rgba(20,37,66,0.04);

        .nav-block__nav-title{
            height: 50px;

            text-align: center;
            font-size:18px;
            color:#ffffff;
            letter-spacing:0;
            line-height: 50px;

            border-bottom: 1px solid #333C51;
        }
        .nav-block__nav-subtitle{
            height: 40px;

            text-align: center;
            font-size: 16px;
            color:#90979e;
            letter-spacing:0;
            line-height: 40px;

            border-bottom: 1px solid #333C51;
        }
        .nav-block__nav-list{
            border-bottom: 1px solid #333C51;
        }
        .nav-block__nav-item{
            height: 50px;

            text-align: left;
            font-size:14px;
            
            letter-spacing:0;
            line-height: 50px;
        }
        .nav-block__link{
            position: relative;
            display: block;
            padding-left: 24px;

            color:#90979e;

            .iconfont.nav-icon{
                margin-right: 15px;
            }
            .nav-background{
                position: absolute;
                top: 0px;
                left: 0;
                display: none;

                font-size: 30px;
                color: #1188ff;
            }
        }
        .nav-block__link.router-link-active{
            background:#3A4560;
            color: #ffffff;
            box-shadow:2px 0 5px 0 rgba(20,37,66,0.04);
            position: relative;

            .nav-background{
                display: block;
            }

            // &:before{
            //     content: ' ';
            //     position: absolute;
            //     top: 10px;
            //     left: 0;

            //     display: block;
            //     width: 5px;
            //     height: 40px;

            //     background: #1188ff;
            // }
        }
    }
</style>