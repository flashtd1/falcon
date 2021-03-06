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
          currentFlow:{
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
          },
          currentFlowType: 'add',
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
          },
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
      'addFlow', 'setFlow', 'editFlow', 'getFlow', 'deleteFlow',
    ])
    this.getCommands(0)
    this.getConfig()
    this.getUsers(0)
    this.getLogs(0)
    this.getFlow(0)

  }

  getConfig() {
    API.get('classes/name/config/id/1', {}, (data) => {
      model.mvvm.$set('config', data)
    }, (error) => {
      Core.alert('error', error.message)
    })
  }

  setConfig() {

    API.put('classes/name/config/id/1', {
      admin_id:model.mvvm.config.admin_id,
      email:model.mvvm.config.email,
      welcome:model.mvvm.config.welcome
    }, (data) => {
      Core.alert('success', '修改配置成功')
    }, (error) => {
      Core.alert('error', error.message)
    })
  }

  getUsers(skip) {
    API.get('classes/name/user', {
      'limit': model.mvvm.pagesize,
      'skip': skip
    }, (data) => {
      API.pagination(data.count, {
        skip: skip,
        wraper: '#users'
      }, (event, p, nskip) => {
        console.log(nskip)
        model.getUsers(nskip)
      })
      model.mvvm.$set('users', data.item)
    }, (error) => {
      Core.alert('error', error.message)

    })
  }

  getLogs(skip) {
    API.get('classes/name/wx_logs', {
      'order':'-id',
      'limit': model.mvvm.pagesize,
      'skip': skip
    }, (data) => {
      API.pagination(data.count, {
        skip: skip,
        wraper: '#logs'
      }, (event, p, nskip) => {
        model.getLogs(nskip)
      })
      model.mvvm.$set('logs', data.item)
    }, (error) => {
      Core.alert('error', error.message)
        
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
    }, (error) => {
      Core.alert('error', error.message)

    })
  }


  setCommand() {

    let tempCommand = model.mvvm.currentCommand
    if(tempCommand.return_type == 'news')
      tempCommand.content = JSON.stringify(tempCommand.news)

    API.put('classes/name/command/id/' + tempCommand.id, tempCommand, (data) => {
      model.getCommands(0)
    }, (error) => {
      Core.alert('error', error.message)
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

  getCommands(skip) {
    API.get('classes/name/command', {
      'limit': model.mvvm.pagesize,
      'skip': skip
    }, (data) => {
      API.pagination(data.count, {
        skip: skip,
        wraper: '#command'
      }, (event, p, nskip) => {
        model.getCommands(nskip)
      })
      model.mvvm.$set('commands', data.item)
    }, (error) => {
      Core.alert('error', error.message)

    })
  }

  deleteCommand(command) {
    if(confirm('是否确定要删除 ' + command.name + ' 这条命令')) {
      API.delete('classes/name/command/id/' + command.id, {}, (data) => {
        model.getCommands(0)
      }, (error) => {
        Core.alert('error', error.message)
      })
    } else {

    }
  }

  addFlow() {
    let tempFlow = model.mvvm.currentFlow
    if(tempFlow.return_type == 'news')
      tempFlow.content = JSON.stringify(tempFlow.news)

    API.post('classes/name/flow', tempFlow, (data) => {
      model.getFlow(0)
    }, (error) => {
      Core.alert('error', error.message)

    })
  }

  setFlow() {
    let tempFlow = model.mvvm.currentFlow
    if(tempFlow.return_type == 'news')
      tempFlow.content = JSON.stringify(tempFlow.news)
    API.put('classes/name/flow/id/' + tempFlow.id, tempFlow, (data) => {
      model.getFlow(0)
    }, (error) => {
      Core.alert('error', error.message)
    })
  }

  editFlow(flow) {
    if(flow) {
      model.mvvm.currentFlowType = 'edit'
      if(flow.return_type == 'news')
        flow.news = JSON.parse(flow.content)
      model.mvvm.$set('currentFlow', flow)
    } else {
      model.mvvm.currentFlowType = 'add'
      model.mvvm.$set('currentFlow', {})
    }
  }

  getFlow(skip) {
    API.get('classes/name/flow', {
      'limit': model.mvvm.pagesize,
      'skip': skip
    }, (data) => {
      API.pagination(data.count, {
        skip: skip,
        wraper: '#flow'
      }, (event, p, nskip) => {
        model.getFlow(nskip)
      })
      model.mvvm.$set('flows', data.item)
    }, (error) => {
      Core.alert('error', error.message)

    })
  }

  deleteFlow(flow) {
    if(confirm('是否确定要删除 ' + flow.name + ' 这条流程')) {
      API.delete('classes/name/flow/id/' + flow.id, {}, (data) => {
        model.getFlow(0)
      }, (error) => {
        Core.alert('error', error.message)
      })
    } else {

    }
  }

}

Core.expose('app', 'wechat', Wechat)
