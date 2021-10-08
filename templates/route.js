module.exports = function (moduleName, pageName) {
  const moduleStr = moduleName.toLowerCase()
  const moduleStrUp = moduleStr.slice(0, 1).toUpperCase() + moduleStr.slice(1)
  const pageStr = pageName.toLowerCase()
  const pageStrUp = pageStr.slice(0, 1).toUpperCase() + pageStr.slice(1)
  
  return `import Layout from '@/layout'

const ${moduleStrUp}Router = {
  name: '${moduleStrUp}',
  path: '/${moduleStr}',
  redirect: '/${moduleStr}/${pageStr}',
  component: Layout,
  meta: {
    title: '${moduleStrUp}',
    icon: 'el-icon-folder-opened'
  },
  children: [
    {
      path: '${pageStr}',
      name: '${moduleStrUp}${pageStrUp}',
      component: () => import('@/views/${moduleStr}/${pageStr}/index'),
      meta: { title: '${pageStr}' }
    }
  ]
}

export default ${moduleStrUp}Router
`
}