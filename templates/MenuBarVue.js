module.exports = function () {
  return `<template>
  <div class="g-filter-container">
    <el-form
      inline
      label-suffix=":"
      size="mini"
      @submit.native.prevent
    >
      <el-form-item label="标题">
        <el-input
          v-model="filterForm.title"
          clearable
          @keyup.enter.native="handleFilter"
        />
      </el-form-item>
      <el-form-item label="状态">
        <el-select
          v-model="filterForm.status"
          clearable
          placeholder="请选择"
        >
          <el-option
            v-for="item in statusOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button
          icon="el-icon-search"
          type="primary"
          :loading="filterLoading"
          @click="handleFilter"
        >
          搜索
        </el-button>
      </el-form-item>
      <el-form-item>
        <el-button
          icon="el-icon-plus"
          type="primary"
          @click="handleCreate"
        >
          添加
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { debounce } from 'throttle-debounce'

export default {
  name: 'MenuBar',
  props: {
    filterLoading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      filterForm: {
        title: '',
        status: ''
      },
      statusOptions: [
        { label: '进行中', value: 'pending' },
        { label: '成功', value: 'success' },
        { label: '已取消', value: 'cancel' }
      ]
    }
  },
  methods: {
    // 搜索
    handleFilter: debounce(500, true, function() {
      this.$emit('filter', this.filterForm)
    }),
    // 创建
    handleCreate() {
      this.$emit('create')
    }
  }
}
</script>
`
}