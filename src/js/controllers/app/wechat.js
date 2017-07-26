let model
class Wechat extends Basic {

  constructor() {
    super({
    	vue:{
    		data:{
          config:{},
          users:[],
          logs:[],
          currentLog:{},
          commands:[],
          currentCommandType: 'add',
          currentCommand:{
            id:0,
            name:'',
            type:'normal',
            description:'',
            return_type:'text',
            source_data: 'static',
            api_url:'',
            content:'',
            news:{
              title:'',
              desc:'',
              picurl:'',
              url:''
            }
          }
        }
    	}
    })

    model = this
    this.init()
  }

  init() {
    this.register([ 'setConfig' ,'getConfig',
      'getUsers', 'getLogs', 'showLog',
      'addCommand', 'setCommand', 'editCommand', 'getCommands', 'deleteCommand',
    ])
    this.getCommands(0)
    this.getConfig()
    this.getUsers(0)
    this.getLogs(0)
  }

  getConfig() {
    API.get('classes/name/config/id/1', {}, (data) => {
      model.mvvm.$set('config', data)
    }, (err) => {

    })
  }

  setConfig() {

    API.put('classes/name/config/id/1', {
      admin_id:model.mvvm.config.admin_id,
      email:model.mvvm.config.email,
      welcome:model.mvvm.config.welcome
    }, (data) => {
      Core.alert('success', '修改配置成功')
    }, (err) => {

    })
  }

  getUsers(pages) {
    API.get('classes/name/user', {
      'limit': model.mvvm.pagesize,
      'skip': pages
    }, (data) => {
      API.pagination(data.count, {
        page: pages,
        wraper: '#users'
      }, (event, p) => {
        model.getUsers(p)
      })
      model.mvvm.$set('users', data.item)
    }, (err) => {

    })
  }

  getLogs(pages) {
    API.get('classes/name/wx_logs', {
      'order':'-id',
      'limit': model.mvvm.pagesize,
      'skip': pages
    }, (data) => {
      API.pagination(data.count, {
        page: pages,
        wraper: '#logs'
      }, (event, p) => {
        model.getLogs(p)
      })
      model.mvvm.$set('logs', data.item)
    }, (err) => {
      
    })
  }

  showLog(log) {
    log.postObj = JSON.stringify(JSON.parse(log.postObj), null, 2)
    log.returnObj = JSON.stringify(JSON.parse(log.returnObj), null, 2)

    model.mvvm.currentLog = log
  }

  addCommand() {

    let tempCommand = model.mvvm.currentCommand
    if(tempCommand.return_type == 'news')
      tempCommand.content = JSON.stringify(tempCommand.news)

    API.post('classes/name/command', tempCommand, (data) => {
      model.getCommands(0)
    }, (err) => {

    })
  }


  setCommand() {

    let tempCommand = model.mvvm.currentCommand
    if(tempCommand.return_type == 'news')
      tempCommand.content = JSON.stringify(tempCommand.news)

    API.put('classes/name/command/id/' + tempCommand.id, tempCommand, (data) => {
      model.getCommands(0)
    }, (err) => {

    })
  }

  editCommand(command) {
    if(command) {
      model.mvvm.currentCommandType = 'edit'
      if(command.return_type == 'news')
        command.news = JSON.parse(command.content)
      model.mvvm.$set('currentCommand', command)
    } else {
      model.mvvm.currentCommandType = 'add'
      model.mvvm.$set('currentCommand', {})
    }
  }

  getCommands(pages) {
    API.get('classes/name/command', {
      'limit': model.mvvm.pagesize,
      'skip': pages
    }, (data) => {
      API.pagination(data.count, {
        page: pages,
        wraper: '#command'
      }, (event, p) => {
        model.getCommands(p)
      })
      model.mvvm.$set('commands', data.item)
    }, (err) => {

    })
  }

  deleteCommand(command) {
    if(confirm('是否确定要删除 ' + command.name + ' 这条命令')) {
      API.delete('classes/name/command/id/' + command.id, {}, (data) => {
        model.getCommands(0)
      }, (err) => {

      })
    } else {

    }
  }

}

Core.expose('app', 'wechat', Wechat)
