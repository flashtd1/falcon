let mermaidAPI = require('mermaid').mermaidAPI
let model

class Flowstep extends Basic {
  constructor() {
    super({
      vue:{
        data:{
          steps: [],
          commands: [],
          currentStepType: 'add',
          currentStep:{
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
    this.register(['cb', 'getStep', 'addStep', 'editStep', 'setStep', 'deleteStep', 'calcFlowScript', 'getCommands', 'getCommandById'])
    this.getStep()
    this.getCommands()

    // 初始化绘图插件
    mermaidAPI.initialize({
      startOnLoad: true,
    })
    mermaidAPI.render('mermaidxx','', model.cb)
  }

  getStep() {
    API.get('classes/name/flow_step', {
      where:JSON.stringify({
        flow_poi_flow: model.mvvm.params.id
      })
    }, (data) => {
      model.mvvm.$set('steps', data.item)
      model.calcFlowScript()
    }, (err) => {
      Core.alert('danger', err)
    })
  }

  addStep() {
    let tempStep = model.mvvm.currentStep
    tempStep.flow_poi_flow = model.mvvm.params.id
    API.post('classes/name/flow_step', tempStep, (data) => {
      model.getStep()
      Core.alert('success', '添加成功')
    }, (err) => {
      Core.alert('danger', err)
    })
  }

  setStep() {
    let tempStep = model.mvvm.currentStep
    API.put('classes/name/flow_step/id/' + tempStep.id, tempStep, (data) => {
      model.getStep()
      Core.alert('success', '修改成功')
    }, (err) => {
      Core.alert('danger', err)
    })
  }

  editStep(step) {
    if(step) {
      model.mvvm.currentStepType = 'edit'
      model.mvvm.$set('currentStep', step)
    } else {
      model.mvvm.currentStepType = 'add'
      model.mvvm.$set('currentStep', {})
    }
  }

  deleteStep(step) {
    if(confirm('是否确定要删除 ' + step.name + ' 这条流程节点')) {
      API.delete('classes/name/flow_step/id/' + step.id, {}, (data) => {
        model.getStep()
        Core.alert('success', '删除成功')
      }, (err) => {
        Core.alert('danger', err)
      })
    } else {

    }
  }

  getCommands(skip) {
    API.get('classes/name/command', {
      'limit': 1000,
      'skip': skip
    }, (data) => {
      model.mvvm.$set('commands', data.item)
    }, (error) => {
      Core.alert('error', error.message)

    })
  }

  getCommandById(id) {
    return model.mvvm.commands.filter((command) => {
      return command.id == id
    })[0]
  }

  calcFlowScript() {
    let script = 'graph TB'
    let startNode
    model.mvvm.steps.map((step) => {
      if(step.typcd == 'start') {
        startNode = step
      }
      script += `\n ${$.trim(step.name)} --> ${$.trim(step.next_node)}`
    })
    if(startNode) {
      script += `\n style ${$.trim(startNode.name)} fill:green;`
    }
    $('#scriptc').val(script)
    // 渲染新脚本前必须删除原来的元素，否则插入失败
    $('#mermaidxx').remove()
    mermaidAPI.render('mermaidxx',script)
    $('#mermaidxx').appendTo($('#scriptc').parent())
  }

  cb(svgGraph) {
    console.log(svgGraph)
    console.log($('#mermaidxx'))
    $('#mermaidxx').html(svgGraph)
  }
}

Core.expose('app', 'flowstep', Flowstep)