let model
class WechatLogs extends Basic {

  constructor() {
    super({
    	vue:{
    		data:{
          logs:[],
          currentLog:{}
        }
    	}
    })

    model = this
    this.init()
  }

  init() {
    this.register([ 'getLogs', 'showLog'])
    this.getLogs(0)
  }

  getLogs(skip) {
    API.get('classes/name/wx_logs', {
      'order':'-id',
      'limit': model.mvvm.pagesize,
      'skip': skip
    }, (data) => {
      API.pagination(data.count, {
        skip: skip,
        wraper: '.tab-pane'
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

}

Core.expose('app', 'wechat_logs', WechatLogs)
