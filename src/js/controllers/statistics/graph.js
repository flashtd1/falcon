let model

class Graph extends Basic {
  constructor() {
    super({
      vue:{
        data:{
          graphs: [],
          currentAppType: 'add',
          currentApp:{
            id:0,
            name:'',
            inner:1,
            type: '',
            desc:'',
            open_id: '',
            config: {}
          }
        }
      }
    })

    model = this
    this.init()
  }

  init() {
    this.register(['transTypeName','getAppList', 'getAppType', 'addApp', 'editApp', 'setApp', 'deleteApp'])
    this.getAppList()
    // this.getAppType()
  }

  transTypeName(id) {
    return (id == 1) ? '内部' : '外部'
  }

  getAppType() {
    API.get('classes/name/app_types', {}, (data) => {
      model.mvvm.$set('app_types', data.item)
    }, (err) => {

    })
  }

  getAppList() {
    API.get('classes/name/statistic_graph', {
      order:'-createdAt'
    }, (data) => {
      model.mvvm.$set('graphs', data.item)
    }, (err) => {
      Core.alert('danger', err)
    })
  }

  addApp() {
    let tempApp = model.mvvm.currentApp
    API.post('classes/name/statistic_graph', tempApp, (data) => {
      model.getAppList()
      Core.alert('success', '添加成功')
    }, (err) => {
      Core.alert('danger', err)
    })
  }

  setApp() {
    let tempApp = model.mvvm.currentApp
    API.put('classes/name/statistic_graph/id/' + tempApp.id, tempApp, (data) => {
      model.getAppList()
      Core.alert('success', '修改成功')
    }, (err) => {
      Core.alert('danger', err)
    })
  }

  editApp(app) {
    if(app) {
      model.mvvm.currentAppType = 'edit'
      model.mvvm.$set('currentApp', app)
    } else {
      model.mvvm.currentAppType = 'add'
      model.mvvm.$set('currentApp', {})
    }
  }

  deleteApp(app) {
    if(confirm('是否确定要删除 ' + app.name + ' 这条应用')) {
      API.delete('classes/name/statistic_graph/id/' + app.id, {}, (data) => {
        model.getAppList()
        Core.alert('success', '删除成功')
      }, (err) => {
        Core.alert('danger', err)
      })
    } else {

    }
  }
}

Core.expose('statistics', 'graph', Graph)