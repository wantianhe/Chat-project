<template>
    <div>



    <br>

    <br>
    <br>

    <el-input class= "hh" v-model="value1" placeholder="输入会议号"></el-input>
      <br>
      <el-input class= "hh" v-model="value2" placeholder="输入用户名"></el-input>
        <br>
        <br>
        <el-button type="primary" @click="submit">加入会议</el-button>
        <br>
        <br>
        <el-button type="primary" @click="open">点击快速创建会议</el-button>
    </div>
</template>
<script>
  export default {
  name :'login',
  data() {
  return {
  switch1: false,
  value1: '',
  value2: '',



  }
  },
  methods: {
  submit() {
  console.log(this.value1);  //所有控制台输出的都是调试时所用信息，以下皆是
  console.log(this.value2);
  
   let postData = this.$qs.stringify({
   'token' : this.value1,
   });
    this.$axios({           //用已有的会议号加入会议
    method: 'post',
    url:'/loginWithToken',
    data:postData
    }).then(res => {
	console.log(res);
    if(res.data["code"]== 0) {    //后端返回正确码
      this.$message({
      message: '加入会议成功',
      type:'success'
      });
    }else{
      this.$message.error('未知错误');
     }
    })
    .catch(failResponse=>{
      this.$message.error('网络错误');
    })

  window.sessionStorage.setItem("RID",this.value1);   //存储用户名
  window.sessionStorage.setItem("UID",this.value2);   //存储会议号
  this.$router.push('/talk');   //跳转到聊天界面

  },
  open() {
  var _this = this;
  this.$axios.get('/loginWithoutToken')  //从后端获取会议号
  .then(res=>{
     console.log(res.data["code"]);
     if(res.data["code"]== 0) {
	   window.sessionStorage.setItem("RID",res.data["token"]);  //把获得的会议号存储起来
	   }else {
		    this.$message.error('未知错误');
			}
			})
			.catch(failResponse=>{
			this.$message.error('网络错误');
			});
  this.$prompt('请输入用户名', '提示', {
  confirmButtonText: '确定',
  cancelButtonText: '取消',
  inputPattern: '',
  }).then(({ value }) => {
  this.$message({
  type: 'success',
  message: '你的用户名是: ' + value,
  });
  window.sessionStorage.setItem("UID",value);       //存储用户名
  _this.$router.push('/talk');               //跳转到聊天界面
  }).catch(() => {
  this.$message({
  type: 'info',
  message: '取消输入'
  });
  });


  }
  }
  }
</script>

<style scoped>   
   .hh{
     width: 200px
 },
 #app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  //margin-top: 60px;
  }
 
</style>
