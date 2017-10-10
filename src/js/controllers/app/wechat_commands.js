let model
class WechatCommands extends Basic {

  constructor() {
    super({
    	vue:{
    		data:{
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
          },
        }
    	}
    })

    model = this
    this.init()
  }

  init() {
    this.register(['addCommand', 'setCommand', 'editCommand', 'getCommands', 'deleteCommand'])
    this.getCommands(0)
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
        wraper: '.tab-pane'
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
}

Core.expose('app', 'wechat_commands', WechatCommands)
