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

    let tempCommand = model.mvvm.currentCommand
    if(tempCommand.return_type == 'news')
      tempCommand.content = JSON.stringify(tempCommand.news)

    API.post('classes/name/command', tempCommand, (data) => {
      model.getCommands()
    }, (err) => {

    })
  }


  setCommand() {

    let tempCommand = model.mvvm.currentCommand
    if(tempCommand.return_type == 'news')
      tempCommand.content = JSON.stringify(tempCommand.news)

    API.put('classes/name/command/id/' + tempCommand.id, tempCommand, (data) => {
      model.getCommands()
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
