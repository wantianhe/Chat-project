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
  console.log(this.value1);
  console.log(this.value2);
  
   let postData = this.$qs.stringify({
   'token' : this.value1,
   });
    this.$axios({
    method: 'post',
    url:'/loginWithToken',
    data:postData
    }).then(res => {
	console.log(res);
    if(res.data["code"]== 0) {
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

  window.sessionStorage.setItem("RID",this.value1);
  window.sessionStorage.setItem("UID",this.value2);
  this.$router.push('/talk');

  },
  open() {
  var _this = this;
  this.$axios.get('/loginWithoutToken')
  .then(res=>{
     console.log(res.data["code"]);
     if(res.data["code"]== 0) {
	   window.sessionStorage.setItem("RID",res.data["token"]);
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
  window.sessionStorage.setItem("UID",value);
  _this.$router.push('/talk');
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
