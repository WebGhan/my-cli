module.exports = function (moduleName, pageName) {
  const moduleStr = moduleName.toLowerCase()
  const moduleStrUp = moduleStr.slice(0, 1).toUpperCase() + moduleStr.slice(1)
  const pageStr = pageName.toLowerCase()
  const pageStrUp = pageStr.slice(0, 1).toUpperCase() + pageStr.slice(1)
  
  return `<template>
  <div class="g-app-container-flex">
    <!-- 菜单栏 -->
    <MenuBar
      :filter-loading="listLoading"
      @filter="handleFilter"
      @create="openEditor(false)"
    />

    <!-- 列表 -->
    <el-table
      ref="table"
      v-loading="listLoading"
      :data="list"
      size="medium"
      height="auto"
      style="width: 100%;"
    >
      <el-table-column label="ID" prop="id" width="80" />
      <el-table-column label="字段1" prop="field-1" width="200" />
      <el-table-column label="字段2" prop="field-2" width="200" />
      <el-table-column label="字段3" prop="field-3" width="200" />

      <el-table-column label="操作" min-width="160" fixed="right">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="mini"
            @click="openEditor(scope.row)"
          >
            编辑
          </el-button>
          <el-button
            type="danger"
            size="mini"
            :loading="deleteLoading === scope.row.id"
            @click="handleDelete(scope.row.id)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 列表分页 -->
    <Pagination
      :total="listTotal"
      :page-size.sync="listQuery.limit"
      :current-page.sync="listQuery.page"
      @change="pageChange"
    />

    <!-- 编辑 -->
    <Editor
      ref="Editor"
      @change="getList"
    />
  </div>
</template>

<script>
import { fetchList, deleteItem } from '@/api/${moduleStr}/${pageStr}'
import { Editor, MenuBar } from './components'
import { Pagination } from '@/components'

export default {
  name: '${moduleStrUp + pageStrUp}',
  components: {
    Editor,
    MenuBar,
    Pagination
  },
  data() {
    return {
      list: [],
      listLoading: false,
      listTotal: 0,
      listQuery: {
        page: 1,
        limit: 20
      },
      deleteLoading: 0
    }
  },
  created() {
    this.getList()
  },
  methods: {
    // 打开编辑
    openEditor(item) {
      this.$refs['Editor'].open(item)
    },
    // 获取列表
    async getList() {
      this.listLoading = true
      try {
        const res = await fetchList(this.listQuery)
        this.list = res.data
        this.listTotal = res.meta.total
      } catch (error) {
        console.log(error)
      } finally {
        this.listLoading = false
      }
    },
    // 修改分页
    pageChange() {
      this.getList()
      this.$refs.table.bodyWrapper.scrollTop = 0
    },
    // 处理筛选
    handleFilter(filterForm) {
      this.listQuery = { ...this.listQuery, ...filterForm }
      this.listQuery.page = 1
      this.getList()
      this.$refs.table.bodyWrapper.scrollTop = 0
    },
    // 处理删除
    async handleDelete(id) {
      if (this.deleteLoading) { return }
      this.deleteLoading = id
      try {
        const confirm = await this.$confirm(
          '确定要删除吗?',
          '提示',
          { type: 'warning' }
        )
        if (confirm !== 'confirm') { return }
        await deleteItem(id)
        this.getList()
        this.$message.success('删除成功')
      } catch (error) {
        console.log(error)
      } finally {
        this.deleteLoading = 0
      }
    }
  }
}
</script>
`
}