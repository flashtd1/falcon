let model

class Index extends Basic {
  constructor() {
    super({
      vue:{
        data:{
          apps: [],
          app_types: [],
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
    this.register(['transTypeName','getAppList', 'getAppType', 'addApp', 'editApp', 'setApp', 'deleteApp'])
    this.getAppList()
    this.getAppType()
  }

  transTypeName(id) {
    if(model.mvvm.app_types) {
      let result = model.mvvm.app_types.filter((item) => {
        return item.id == id
      })[0]

      if(result) {
        return result.name
      } else {
        return id
      }
    } else {
      return id
    }
  }

  getAppType() {
    API.get('classes/name/app_types', {}, (data) => {
      model.mvvm.$set('app_types', data.item)
    }, (err) => {

    })
  }

  getAppList() {
    API.get('classes/name/apps', {}, (data) => {
      model.mvvm.$set('apps', data.item)
    }, (err) => {

    })
  }

  addApp() {
    let tempApp = model.mvvm.currentApp
    API.post('classes/name/apps', tempApp, (data) => {
      model.getAppList()
    }, (err) => {

    })
  }

  setApp() {
    let tempApp = model.mvvm.currentApp
    API.put('classes/name/apps/id/' + tempApp.id, tempApp, (data) => {
      model.getAppList()
    }, (err) => {

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
      API.delete('classes/name/apps/id/' + app.id, {}, (data) => {
        model.getAppList()
      }, (err) => {

      })
    } else {

    }
  }
}

Core.expose('app', 'index', Index)