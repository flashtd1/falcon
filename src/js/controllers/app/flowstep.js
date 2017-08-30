let mermaidAPI = require('mermaid').mermaidAPI
let model

class Flowstep extends Basic {
  constructor() {
    super({
      vue:{
        data:{
          steps: [],
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
    this.register(['cb', 'bb', 'getStep', 'addStep', 'editStep', 'setStep', 'deleteStep', 'calcFlowScript'])
    this.getStep()

    // 初始化绘图插件
    mermaidAPI.initialize({
      startOnLoad: true,
    })
    mermaidAPI.render('mermaidxx','', model.cb)
  }

  getStep() {
    API.get('classes/name/flow_step', {
      where:JSON.stringify({
        flow_poi_flow:2
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
    tempStep.flow_poi_flow = 2
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

  calcFlowScript() {
    let script = 'graph TB'
    model.mvvm.steps.map((step) => {
      script += '\n' + step.name + ' --> ' + step.next_node
    })
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