<template>
    <div class="delete-wrapper">
        <el-dialog
            :title="title"
            class="del-dialog"
            :class="customClass"
            :close-on-click-modal="false"
            :visible.sync="visible"
            size="tiny">
            <span v-if="!isSlot" class="deldialog-content"><i class="iconfont icon-wenjianshangchuanicon-shangchuanshibai"></i> {{promptText}} </span>
            <slot v-else></slot>
            <span slot="footer" class="dialog-footer">
                <el-button @click="clickCancel">取 消</el-button>
                <el-button type="danger" :disabled="isDelError" :loading="isDeleteLoading" @click="delSelectedDataComfirm">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
export default {
    name: 'DeleteDialog',
    props: {
        customClass: String,
        // delete url， 删除逻辑由业务组件内部控制
        urlFormatter: {
            type: Function,
            default: () => ''
        },
        // dialog title
        title: {
            type: String,
            default: '删除'
        },
        // 弹框中的内容是否使用slot
        isSlot: {
            type: Boolean,
            default: false
        },
        // 弹框中的内容不使用slot时的提示信息
        promptText: {
            type: String,
            default: '您确定要删除选中的项吗？'
        },
        // 要删除的目标行
        deleteTargetRows: {
            type: Array,
            default: () => []
        },
        // 要展示的错误信息
        delErrorMessage: {
            type: String,
            default: '未知服务错误'
        }
    },
    data() {
        return {
            // 使用 v-if 在外层控制弹框的出现和消失， 保持visible为true
            visible: true,
            // 删除是否出现错误
            isDelError: false,
            // 删除Loading状态
            isDeleteLoading: false
        };
    },
    watch: {
        // 点击’x‘时会默认改变visible的值， 监听visible的变化，由外层的 onClose 事件控制弹框的消失
        visible(newData, oldData) {
            if (!newData) {
                this.$emit('onClose');
            }
        }
    },
    methods: {
        // 确认删除
        delSelectedDataComfirm() {
            // 存储删除失败的项的id
            let deleteErrorItems = [];
            // 存储删除失败的项的完整信息
            let deleteErrorItemsInfo = [];
            if (this.isDeleteLoading) {
                return;
            }
            this.isDeleteLoading = true;
            // 在删除前触发 beforeDelete
            this.$emit('beforeDelete');
            let delFuncs = this.deleteTargetRows.map((ele, index, arr) => {
                return this.axios.post(this.urlFormatter(ele.id, ele))
                    .then(data => data.data)
                    .then(data => {
                        if (data.code !== 200 && data.code !== 204) {
                            deleteErrorItems.push(ele.id);
                            data.name = ele.name;
                            deleteErrorItemsInfo.push(data);
                        }
                    })
                    .catch(() => {
                        deleteErrorItems.push(ele);
                        deleteErrorItemsInfo.push({
                            code: -1,
                            name: ele.name
                        });
                    });
            });
            this.axios.all(delFuncs)
            .then(this.axios.spread((...response) => {
                // 在有删除错误发生时触发事件 afterHasError,  参数： 错误item的id  错误item的info (code: name)
                if (deleteErrorItems.length > 0) {
                    this.isDelError = true;
                    this.$emit('onError', deleteErrorItems, deleteErrorItemsInfo);
                } else {
                    // 在错误全部成功时触发 onClose onSuccess
                    this.$emit('onClose');
                    this.$emit('onSuccess');
                }
            }))
            .finally(() => {
                this.isDeleteLoading = false;
                // 在错误完成时触发 onEnd
                this.$emit('onEnd');
            });
        },
        clickCancel() {
            // 点击取消触发 onClose 事件
            this.$emit('onClose');
        }
    }
};
</script>
<style lang="less">
.delete-wrapper {
    .del-dialog {
        .el-dialog__body {
            text-align: center;
        }
        .icon-wenjianshangchuanicon-shangchuanshibai {
            display: inline-block;
            margin-right: 15px;
            vertical-align: middle;
            color: #ff6459;
            font-size: 36px;
        }
        .deldialog-content {
            line-height: 95px;
        }
    }
}
</style>

