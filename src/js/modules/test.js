

const request = () => {
  $.ajax({
    url:'http://192.168.1.109/openapi/api/1.0/classes/users',
    method:'GET',
    type:'json',
    headers:{
      'X-Requested-With':null,
      'X-F-Key':'123',
      'X-F-Id':'123'
    },
    success:function(json){
      console.log(json)
    }
  })  
  
}

export default {

  request:request
}
