let model

class Type extends Basic {
  constructor() {
    super({
      vue:{
        data:{
          types: [],
          currentAppType: 'add',
          currentApp:{
            id:0,
            app_id:'',
            app_key:'',
            name:'',
            type_poi_app_types:1,
            desc:'',
          }
        }
      }
    })

    model = this
    this.init()
  }

  init() {
    this.register(['getAppList', 'getAppType', 'addApp', 'editApp', 'setApp', 'deleteApp'])
    this.getAppList()
    // this.getAppType()
  }

  getAppList() {
    API.get('classes/name/statistic_type', {
      order:'-createdAt'
    }, (data) => {
      model.mvvm.$set('types', data.item)
    }, (err) => {
      Core.alert('danger', err)
    })
  }

  addApp() {
    let tempApp = model.mvvm.currentApp
    API.post('classes/name/statistic_type', tempApp, (data) => {
      model.getAppList()
      Core.alert('success', '添加成功')
    }, (err) => {
      Core.alert('danger', err)
    })
  }

  setApp() {
    let tempApp = model.mvvm.currentApp
    API.put('classes/name/statistic_type/id/' + tempApp.id, tempApp, (data) => {
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
      API.delete('classes/name/statistic_type/id/' + app.id, {}, (data) => {
        model.getAppList()
        Core.alert('success', '删除成功')
      }, (err) => {
        Core.alert('danger', err)
      })
    } else {

    }
  }
}

Core.expose('statistics', 'type', Type)