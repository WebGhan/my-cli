const route = require('./route')
const api = require('./api')
const indexVue = require('./indexVue')
const componentsIndex = require('./componentsIndex')
const MenuBarVue = require('./MenuBarVue')
const EditorVue = require('./EditorVue')

module.exports = {
  routeGenerate: route,
  apiGenerate: api,
  indexVueGenerate: indexVue,
  componentsIndexGenerate: componentsIndex,
  menuBarVueGenerate: MenuBarVue,
  editorVueGenerate: EditorVue
}