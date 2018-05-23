<template>
     <div class="header-block">
        <div class="logo-block">
            <a href="/" class="logo-link">
                <img src="" class="logo-image"/>
            </a>
        </div>
        <div class="userinfo-block" @mouseenter="showUserDropdown = true;" @mouseleave="showUserDropdown = false;" >
            <div class="user-info">
                <div class="user-info-inner">
                    <label class="username">{{user.username ? user.username : '未登录'}}</label>
                    <i class="el-icon-caret-bottom"></i>
                </div>
            </div>
            <transition name="el-zoom-in-top">
                <div class="user-info-dropdown" v-if="showUserDropdown" >
                    <ul v-if="user.username">
                        <li class="dropdown-item">
                            <span class="userlink" @click="updateDialog.visible = true">
                                <i class="el-icon-edit"></i>
                                <span class="text">修改密码</span>
                            </span>
                        </li>
                        <li class="dropdown-item">
                            <a href="/collection" class="userlink">
                                <i class="el-icon-star-on"></i>
                                <span class="text">收藏列表</span>
                            </a>
                        </li>
                        <li class="dropdown-item">
                            <span class="userlink" @click="userLogout">
                                <i class="el-icon-circle-close-outline"></i>
                                <span class="text">退出</span>
                            </span>
                        </li>
                    </ul>
                    <ul v-else>
                        <li class="dropdown-item">
                            <span class="userlink" @click="loginDialog.visible = true">
                                <i class="el-icon-edit"></i>
                                <span class="text">登录</span>
                            </span>
                        </li>
                        <li class="dropdown-item">
                            <span class="userlink" @click="signupDialog.visible = true">
                                <i class="el-icon-star-on"></i>
                                <span class="text">注册</span>
                            </span>
                        </li>
                    </ul>
                </div>
            </transition>
        </div>

        <div>
            <el-dialog
                v-loading="loginDialog.loading"
                :modal="false"
                :title="loginDialog.title"
                :visible.sync="loginDialog.visible">
                <el-form :model="loginDialog.form" :rules="loginDialog.userLoginRules" ref="userLoginForm">
                    <el-form-item label="账 号" prop="username" :label-width="loginDialog.formLabelWidth">
                        <el-input :placeholder="usernameErrorMsg" v-model="loginDialog.form.username" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="密 码" prop="password" :label-width="loginDialog.formLabelWidth">
                        <el-input type="password" :placeholder="passwordErrorMsg" v-model="loginDialog.form.password" auto-complete="off"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="loginDialog.visible = false">取 消</el-button>
                    <el-button type="primary" @click="submitLoginForm('userLoginForm')">确 定</el-button>
                </div>
            </el-dialog>
            <el-dialog
                v-loading="signupDialog.loading"
                :modal="false"
                :title="signupDialog.title"
                :visible.sync="signupDialog.visible">
                <el-form :model="signupDialog.form" :rules="signupDialog.userSignupRules" ref="userSignupForm">
                    <el-form-item label="账   号" prop="username" :label-width="signupDialog.formLabelWidth">
                        <el-input :placeholder="usernameErrorMsg" v-model="signupDialog.form.username" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="密   码" prop="password" :label-width="signupDialog.formLabelWidth">
                        <el-input type="password" :placeholder="passwordErrorMsg" v-model="signupDialog.form.password" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="重复密码" prop="rpassword" :label-width="signupDialog.formLabelWidth">
                        <el-input type="password" :placeholder="passwordErrorMsg" v-model="signupDialog.form.rpassword" auto-complete="off"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="signupDialog.visible = false">取 消</el-button>
                    <el-button type="primary" @click="submitSignupForm('userSignupForm')">确 定</el-button>
                </div>
            </el-dialog>
            <el-dialog
                v-loading="updateDialog.loading"
                :modal="false"
                :title="updateDialog.title"
                :visible.sync="updateDialog.visible">
                <el-form :model="updateDialog.form" :rules="updateDialog.userUpdateRules" ref="userUpdateForm">
                    <el-form-item label="原密码" prop="opassword" :label-width="updateDialog.formLabelWidth">
                        <el-input type="password" :placeholder="passwordErrorMsg" v-model="updateDialog.form.opassword" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="新密码" prop="password" :label-width="updateDialog.formLabelWidth">
                        <el-input type="password" :placeholder="passwordErrorMsg" v-model="updateDialog.form.password" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="重复密码" prop="rpassword" :label-width="updateDialog.formLabelWidth">
                        <el-input type="password" :placeholder="passwordErrorMsg" v-model="updateDialog.form.rpassword" auto-complete="off"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="updateDialog.visible = false">取 消</el-button>
                    <el-button type="primary" @click="submitUpdateForm('userUpdateForm')">确 定</el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
const urlConfig = require('@/api/urlConfig');
const Tool = require('@/tool/index');

export default {
    name: 'ElHeader',
    data() {
        let checkUsername = (rule, value = '', callback) => {
            value = (value + '').trim();
            if (!value.match(/^[a-zA-Z][a-z0-9A-Z-]{5,11}$/)) {
                return callback(new Error(this.usernameErrorMsg));
            } else {
                callback();
            }
        };
        let checkPassword = (rule, value = '', callback) => {
            value = (value + '').trim();
            if (value.length < 6 || value.length > 11) {
                return callback(new Error(this.passwordErrorMsg));
            } else {
                callback();
            }
        };
        let checkRPassword = (rule, value = '', callback) => {
            value = (value + '').trim();
            if (value.length < 6 || value.length > 11) {
                return callback(new Error(this.passwordErrorMsg));
            } else if (this.signupDialog.form.password.trim() !== value) {
                return callback(new Error('两次密码不一致'));
            } else {
                callback();
            }
        };
        let checkRPassword1 = (rule, value = '', callback) => {
            value = (value + '').trim();
            if (value.length < 6 || value.length > 11) {
                return callback(new Error(this.passwordErrorMsg));
            } else if (this.updateDialog.form.password.trim() !== value) {
                return callback(new Error('两次密码不一致'));
            } else {
                callback();
            }
        };
        return {
            NOTIFICATION_DURATION_TIME: 3000,
            usernameErrorMsg: '以字母开头，仅包含字母、数字或中划线的6-11个字符',
            passwordErrorMsg: '请输入6-11个字符',
            loginDialog: {
                loading: false,
                title: '用户登录',
                visible: false,
                formLabelWidth: '80px',
                isSubmiting: false,
                form: {
                    username: '',
                    password: ''
                },
                userLoginRules: {
                    username: [
                        { validator: checkUsername, trigger: 'blur' }
                    ],
                    password: [
                        { validator: checkPassword, trigger: 'blur' }
                    ]
                }
            },
            signupDialog: {
                loading: false,
                title: '用户注册',
                visible: false,
                formLabelWidth: '80px',
                isSubmiting: false,
                form: {
                    username: '',
                    password: '',
                    rpassword: ''
                },
                userSignupRules: {
                    username: [
                        { validator: checkUsername, trigger: 'blur' }
                    ],
                    password: [
                        { validator: checkPassword, trigger: 'blur' }
                    ],
                    rpassword: [
                        { validator: checkRPassword, trigger: 'blur' }
                    ]
                }
            },
            updateDialog: {
                loading: false,
                title: '修改密码',
                visible: false,
                formLabelWidth: '80px',
                isSubmiting: false,
                form: {
                    opassword: '',
                    password: '',
                    rpassword: ''
                },
                userUpdateRules: {
                    opassword: [
                        { validator: checkPassword, trigger: 'blur' }
                    ],
                    password: [
                        { validator: checkPassword, trigger: 'blur' }
                    ],
                    rpassword: [
                        { validator: checkRPassword1, trigger: 'blur' }
                    ]
                }
            },
            showUserDropdown: false
        };
    },
    computed: {
        ...mapState(
            [
                'user'
            ]
        )
    },
    watch: {
        ['loginDialog.visible'](value) {
            if (!value) {
                this.loginDialog.form.password = '';
            }
        },
        ['signupDialog.visible'](value) {
            if (!value) {
                this.signupDialog.form = {
                    username: '',
                    password: '',
                    rpassword: ''
                };
            }
        },
        ['updateDialog.visible'](value) {
            if (!value) {
                this.updateDialog.form = {
                    opassword: '',
                    password: '',
                    rpassword: ''
                };
            }
        }
    },
    mounted() {
    },
    methods: {
        submitLoginForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    if (!this.isSubmiting) {
                        this.loginDialog.isSubmiting = true;
                        this.userLogin();
                    }
                } else {
                    return false;
                }
            });
        },
        submitSignupForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    if (!this.isSubmiting) {
                        this.signupDialog.isSubmiting = true;
                        this.userSignup();
                    }
                } else {
                    return false;
                }
            });
        },
        submitUpdateForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    if (!this.isSubmiting) {
                        this.updateDialog.isSubmiting = true;
                        this.userUpdate();
                    }
                } else {
                    return false;
                }
            });
        },
        userLogout() {
            Tool.Cookie.remove('financeCookieId');
            this.$store.dispatch('changeUserInfo', {});
        },
        userLogin() {
            let params = {
                username: this.loginDialog.form.username,
                password: this.loginDialog.form.password
            };
            this.loginDialog.loading = true;
            this.axios.post(urlConfig.userLogin(), this.trimForm(params))
            .then(data => data.data)
            .then(data => {
                if (data.code === 200) {
                    this.$store.dispatch('changeUserInfo', data.ret);
                    this.showSuccessNotify('登录成功');
                    this.loginDialog.visible = false;
                    Tool.Cookie.set('financeCookieId', data.ret.token, {
                        expires: 3
                    });
                } else {
                    this.showErrorMessage('登录失败, ' + data.err);
                }
            })
            .catch((err) => {
                this.showErrorMessage('登录失败, ' + err);
            })
            .finally(() => {
                this.loginDialog.loading = false;
                this.loginDialog.isSubmiting = false;
            });
        },
        userSignup() {
            let params = {
                username: this.signupDialog.form.username,
                password: this.signupDialog.form.password
            };
            this.signupDialog.loading = true;
            this.axios.post(urlConfig.userSignup(), this.trimForm(params))
            .then(data => data.data)
            .then(data => {
                if (data.code === 200) {
                    this.showSuccessNotify('注册成功, 请登录');
                } else {
                    this.showErrorMessage('注册失败');
                }
                this.signupDialog.visible = false;
            })
            .catch(() => {
                this.showErrorMessage('注册失败');
            })
            .finally(() => {
                this.signupDialog.loading = false;
                this.signupDialog.isSubmiting = false;
            });
        },
        userUpdate() {
            let params = {
                username: this.user.username,
                opassword: this.updateDialog.form.opassword,
                password: this.updateDialog.form.password
            };
            this.updateDialog.loading = true;
            this.axios.post(urlConfig.userUpdate(), this.trimForm(params))
            .then(data => data.data)
            .then(data => {
                if (data.code === 200) {
                    // this.$store.dispatch('changeUserInfo', data.ret);
                    this.showSuccessNotify('修改成功, 请重新登录 ');
                    this.userLogout();
                    this.updateDialog.visible = false;
                    this.loginDialog.visible = true;
                } else {
                    this.showErrorMessage('修改失败, ' + data.err);
                }
            })
            .catch((err) => {
                this.showErrorMessage('修改失败, ' + err);
            })
            .finally(() => {
                this.updateDialog.loading = false;
                this.updateDialog.isSubmiting = false;
            });
        },

        trimForm(formData) {
            for (let item in formData) {
                if (typeof formData[item] === 'string') {
                    formData[item] = formData[item].trim();
                }
            }
            return formData;
        },
        showErrorMessage(msg) {
            this.$message({
                message: msg,
                type: 'error'
            });
        },
        showSuccessNotify(msg) {
            this.$notify({
                title: msg,
                type: 'success',
                duration: this.NOTIFICATION_DURATION_TIME
            });
        }
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
        
        
        background:#ffffff;
    }
    .header-block-content{
        position: relative;
        z-index: 2;
        box-shadow:0 2px 4px 0 rgba(34,38,45,0.14);
    }
    .logo-block {
        width: 180px;
        height: 50px;
        float: left;
        
        background: #fafafc;
        
        border-right: 1px solid #dfe4ea;
        .logo-link{
            display: block;
            width: 100%;
            height: 100%;
            padding: 10px 35px;
        }
        .logo-imgage{
            width: 110px;
            height: 30px;
        }
    }
    .el-dropdown-link{
        .el-icon-caret-bottom{
            font-size: 8px;
        }
    }
    .userinfo-block {
        float: right;
        width: 170px;
        height: 50px;

        margin-right: 10px;
        font-size: 14px;
        color: #73889E;;
        letter-spacing: 0;
        text-align: right;
        cursor: pointer;

        &:hover{
            .user-info-inner {
                box-shadow: 0 0 4px 0 rgba(27,51,115,0.35);
                .user-dropdown-icon {
                    transform: rotate(180deg);
                }
            }
        }
    }
    .user-info{
        display: inline-block;
        height: 50px;
        width: 140px;
        line-height: 50px;
        color: #899eb3;
        cursor: pointer;

        position: relative;
        right: -4px;
        bottom: 0px;
        z-index: 2;
        box-shadow: none;
        background: #fff;
        padding-right: 0;
        overflow: hidden;
        
        text-align: right;

            &.none {
                text-align: center;
            }
        .username{
            display: inline-block;
            overflow: hidden;
            max-width: 100px;
            height: 100%;
            line-height: 58px;
            margin-right: 4px;
            
            font-size: 14px;
            vertical-align: middle;
            white-space: nowrap;
            text-overflow: ellipsis;
            cursor: pointer;
        }
        .user-dropdown-icon{
            display: inline-block;
            width: 20px;          
            height: 50px;

            vertical-align: middle;
            font-size: 20px;
            overflow: hidden;
            color: #D2DAE2;
        }
        .user-info-inner {
            position: absolute;
            left: 2px;
            right: 4px;
            bottom: -4px;
            top: -4px;

            font-size: 0;
            text-align: right;

            padding-right: 10px;
        }
    }
    .user-info-dropdown{
        cursor: pointer;
        width: 190px;
        text-align: left;
        background: #FFFFFF;
        padding: 5px 0;
        box-shadow: 0 0 4px 0 rgba(27,51,115,0.35);
        border-radius: 4px 0 4px 4px;
        position: relative;
        top: -6px;
        z-index: 1;
        .dropdown-item{
            height: 36px;
            line-height: 36px;
            padding: 0 15px;
            .userlink {
                display: inline-block;
                width: 100%;
                height: 100%;
                
                color: #73889E;
                .text {
                    color: #666666;
                    padding-left: 6px;
                }
            }
            &:hover{
                background: #F6F6F6;
                .userlink {
                    .text {
                        color: #333333;
                    }
                }
            }
        }
        
    }
    .arrearage{
        text-align: center;
        border: none;
        height: 30px;
        padding: 3px 16px;
    }
    .certify {
        font-size: 12px;
        line-height: 24px;
    }
</style>
<style lang="less">
    .header-block{
        .arrearage{
            .el-alert__content{
                height: 24px;
            }
            .el-alert__title{
                font-size: 12px;
            }
        }
    }
    
</style>

