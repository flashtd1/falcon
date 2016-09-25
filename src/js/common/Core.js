window.Core = {
  expose: (controller, action, myClass) => {
    if(!window.FALCON) { window.FALCON = {}}
    if(!window.FALCON[controller]) {window.FALCON[controller] = {}}
      window.FALCON[controller][action] = myClass
  },

  /**
   * 弹出提示框
   * @param  {string} typ 消息类型：success, info, warning, danger
   * @param  {string} msg 消息内容
   * @param  {object} position 位置 top-center  top-left  top-right 
   */
  alert: (typ, msg, position = 'top-center')=> {
    let delay =  3000
    let top = 10
    let box = $('<div class="alert alert-' + typ + ' alert-tip alert-' + position + '" role="alert" ><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>' + msg + '</div>')
    $('body').append(box)
    box.animate({top: top}, ()=> {
      setTimeout(()=> {
        box.remove()
      }, delay)
    })
  },
}