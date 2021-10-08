module.exports = function (moduleName, pageName) {
  const moduleStr = moduleName.toLowerCase()
  const pageStr = pageName.toLowerCase()
  
  return `<template>
  <el-dialog
    :visible.sync="visible"
    :close-on-click-modal="false"
    :title="type === 'create' ? '创建' : '编辑'"
    width="700px"
    @close="resetForm"
  >
    <!-- 表单 -->
    <el-form
      ref="form"
      v-loading="itemLoading"
      :model="formData"
      :rules="formRules"
      label-width="100px"
      size="medium"
    >
      <el-form-item label="标题" prop="title">
        <el-input v-model="formData.title" />
      </el-form-item>
    </el-form>

    <!-- footer -->
    <div slot="footer">
      <el-button
        size="medium"
        @click="visible = false"
      >
        取 消
      </el-button>
      <template v-if="type === 'create'">
        <el-button
          size="medium"
          type="primary"
          :loading="submitLoading"
          @click="submitForm"
        >
          创 建
        </el-button>
      </template>
      <template v-if="type === 'update'">
        <el-button
          size="medium"
          type="primary"
          :loading="submitLoading"
          @click="submitForm"
        >
          保 存
        </el-button>
      </template>
    </div>
  </el-dialog>
</template>

<script>
import { fetchItem, createItem, updateItem } from '@/api/${moduleStr}/${pageStr}'

export default {
  name: 'Editor',
  data() {
    return {
      visible: false,
      type: 'create', // create 创建， update 编辑
      formData: this.defaultForm(),
      formRules: {
        title: [
          { required: true, message: '请输入标题', trigger: 'change' }
        ]
      },
      submitLoading: false,
      itemData: null,
      itemLoading: false
    }
  },
  methods: {
    // 默认表单
    defaultForm() {
      return {
        title: ''
      }
    },
    // 重置表单
    resetForm() {
      this.formData = this.defaultForm()
      this.$nextTick(() => {
        this.$refs['form'].clearValidate()
      })
    },
    // 显示弹窗
    async open(item) {
      this.visible = true
      if (item) {
        this.type = 'update'
        await this.getItem(item.id)
        const formData = {}
        for (const key in this.formData) {
          if (this.itemData[key] !== undefined) {
            formData[key] = this.itemData[key]
          }
        }
        this.formData = { ...this.formData, ...formData }
      } else {
        this.type = 'create'
      }
    },
    // 获取单个详情
    async getItem(id) {
      this.itemLoading = true
      try {
        const res = await fetchItem(id)
        this.itemData = res.data
      } catch (error) {
        console.log(error)
      } finally {
        this.itemLoading = false
      }
    },
    // 提交表单
    submitForm() {
      if (this.submitLoading) { return }
      this.$refs['form'].validate((valid) => {
        if (valid) {
          if (this.type === 'create') {
            this.handleCreate()
          } else {
            this.handleUpdate()
          }
        }
      })
    },
    // 创建
    async handleCreate() {
      this.submitLoading = true
      try {
        await createItem(this.formData)
        this.visible = false
        this.$emit('change')
        this.$message.success('创建成功')
      } catch (error) {
        console.log(error)
      } finally {
        this.submitLoading = false
      }
    },
    // 更新
    async handleUpdate() {
      this.submitLoading = true
      try {
        await updateItem(this.itemData.id, this.formData)
        this.visible = false
        this.$emit('change')
        this.$message.success('保存成功')
      } catch (error) {
        console.log(error)
      } finally {
        this.submitLoading = false
      }
    }
  }
}
</script>
`
}