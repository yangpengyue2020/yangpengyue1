const Mock = require('mockjs');

Mock.mock('/api/login','post',function(config){
  console.log(config)
  const {user,psw} = JSON.parse(config.body);
  console.log(user,psw)
  if(user == 'admin'&& psw == '123456'){
    return {
      status:200,
      message:"success",
      data:{
        token:"11111111"
      }
    }
  }else{
    return {
      status:200,
      message:"fail",
      data:{
        message:"用户名或账户错误"
      }
    }
  }

  
})
export default Mock