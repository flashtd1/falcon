let model
class Wechat extends Basic {

  constructor() {
    super({
    	vue:{
    		data:{
          config:{},
          users:[],
          commands:[],
          currentCommandType: 'add',
          currentCommand:{
            id:0,
            name:'',
            type:'text',
            description:'',
            return_type:'text',
            content:''
          }
        }
    	}
    })

    model = this
    this.init()
  }

  init() {
    this.register([ 'setConfig' ,'getConfig',
      'addCommand', 'setCommand', 'editCommand', 'getCommands', 'deleteCommand',
    ])
    this.getCommands()
    this.getConfig()
  }

  getConfig() {
    API.get('classes/name/config/id/1', {}, (data) => {
      model.mvvm.$set('config', data)
    }, (err) => {

    })
  }

  setConfig() {

    API.put('classes/name/config/id/1', {
      welcome:model.mvvm.config.welcome
    }, (data) => {
      Core.alert('success', '修改配置成功')
    }, (err) => {

    })
  }

  addCommand() {
    API.post('classes/name/command', model.mvvm.currentCommand, (data) => {
      model.getCommands()
    }, (err) => {

    })
  }

  setCommand() {
    API.put('classes/name/command/id/' + model.mvvm.currentCommand.id, model.mvvm.currentCommand, (data) => {
      model.getCommands()
    }, (err) => {

    })
  }

  editCommand(command) {
    if(command) {
      model.mvvm.currentCommandType = 'edit'
      model.mvvm.$set('currentCommand', command)
    } else {
      model.mvvm.currentCommandType = 'add'
      model.mvvm.$set('currentCommand', {})
    }
  }

  getCommands() {
    API.get('classes/name/command', {}, (data) => {
      model.mvvm.$set('commands', data.item)
    }, (err) => {

    })
  }

  deleteCommand(command) {
    if(confirm('是否确定要删除 ' + command.name + ' 这条命令')) {
      API.delete('classes/name/command/id/' + command.id, {}, (data) => {
        model.getCommands()
      }, (err) => {

      })
    } else {

    }
  }

}

Core.expose('app', 'wechat', Wechat)
