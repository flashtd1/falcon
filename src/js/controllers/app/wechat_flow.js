let model
class WechatFlow extends Basic {

  constructor() {
    super({
    	vue:{
    		data:{
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
          currentFlowType: 'add'
        }
    	}
    })

    model = this
    this.init()
  }

  init() {
    this.register(['addFlow', 'setFlow', 'editFlow', 'getFlow', 'deleteFlow'])
    this.getFlow(0)
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
        wraper: '.tab-pane'
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

Core.expose('app', 'wechat_flow', WechatFlow)
