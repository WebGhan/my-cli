module.exports = function (pageName) {
  const pageStr = pageName.toLowerCase()
 
  return `import request from '@/utils/request'

// 获取 列表
export function fetchList(params) {
  return request({
    url: '/${pageStr}/index',
    method: 'GET',
    params
  })
}

// 获取 项
export function fetchItem(id) {
  return request({
    url: \`/${pageStr}/\${id}\`,
    method: 'GET'
  })
}

// 创建 项
export function createItem(data) {
  return request({
    url: '/${pageStr}/store',
    method: 'POST',
    data
  })
}

// 更新 项
export function updateItem(id, data) {
  return request({
    url: \`/${pageStr}/\${id}\`,
    method: 'PUT',
    data
  })
}

// 删除 项
export function deleteItem(id) {
  return request({
    url: \`/${pageStr}/\${id}\`,
    method: 'DELETE'
  })
}
`
}