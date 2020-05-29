<template>
    <div>
    <el-card class="box-card">
  <div slot="header" class="clearfix">
 
    <span>会议号        {{outputn()}}</span>
    <el-button style="float: right; padding: 3px 0" type="danger" @click="submit1">退出聊天室</el-button>
  </div>
  <div v-for="o in 1" :key="o" class="text item" style="height : 300px ; overflow : auto">
    <p v-for="(item,i) in list">{{item}}</p >
  </div>
</el-card>
   <el-divider></el-divider>
     <el-input
  type="textarea" class = "hh"
  :rows="5"
  placeholder="请输入内容"
  v-model="textarea">
</el-input>
  <el-button type="primary" @click="submit">发送</el-button>
    </div>
</template>
<script>
  export default {
  name :'talk',
  mounted() {
    setInterval(()=>{
      this.$axios.get('/receive', {headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'},
	                                params:{"token" : window.sessionStorage.getItem("RID")}})
       .then(res=>{
           if(res.data["code"]== 0){
		      this.list = [];
			  let list1 = ["%20", "%3A", "%3F", "%21", "%2C", "%27", "%22"];
			  let list2 = [" ", ":", "?", "!", "," , "'", "\""];
		      console.log("dhjd");
		      for(let i = 0; i < res.data["data"].length;i++) {
			    res.data["data"][i]["time"] = this.replaceAll(res.data["data"][i]["time"],list1,list2);
				res.data["data"][i]["name"] = this.replaceAll(res.data["data"][i]["name"],list1,list2);				
				res.data["data"][i]["text"] = this.replaceAll(res.data["data"][i]["text"],list1,list2);
                this.list.push(res.data["data"][i]["time"] + " " + res.data["data"][i]["name"] + ":" + "\n" + res.data["data"][i]["text"]); 
			  }
           } else {
              this.$message.error('未知错误');
           }
        })
	},2000)
  },
  data() {
  return {

  list:[],
  switch1: false,
  textarea: ''
  }
  },
  methods: {
      gettime(){
        //var aData = new Date();
        //this.value =
        //aData.getFullYear() + "-" + (aData.getMonth() + 1) + "-" + aData.getDate()+ " " + aData.getHours() + ":" + aData.getMinutes() + ":" + aData.getSeconds();
		var time=new Date();
        var y=time.getFullYear();
        var m=time.getMonth()+1;
        var d=time.getDate();
        var h=time.getHours();
        var min=time.getMinutes();
        var s=time.getSeconds();
        m=m<10?(m="0"+m):m;
        d=d<10?(d="0"+d):d;
        h=h<10?(h="0"+h):h;
        min=min<10?(min="0"+min):min;
        s=s<10?(s="0"+s):s;return  y+"-"+m+"-"+d+" "+h+":"+min+":"+s; 
		this.value=s;
        console.log(this.value);
        return this.value
      },
	  submit() {
	    console.log(this.textarea);
		console.log(window.sessionStorage.getItem("RID"));
	    let postData = this.$qs.stringify({
        'token' : window.sessionStorage.getItem("RID"),
		'name' : window.sessionStorage.getItem("UID"),
		'text' : this.textarea,
		'time' : this.gettime()
        });
		this.$axios({
		    headers: {
               'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
            },
			method: 'post',
			url:'/send',
			data:postData
			}).then(res => {
			  if(res.data["code"]== 0) {
			    this.$message({
			    message: '发送成功',
			    type:'success'
		        });
		         }else{
			       this.$message.error('未知错误');
		          }
		       })
                .catch(failResponse=>{
                   this.$message.error('网络错误');
                })
	  },
      submit1(){
        console.log(this.textarea);
        this.$router.replace('/');
      },
     outputn(){
        var number=window.sessionStorage.getItem("RID");//获得Login页面的房间号
        return number
     },
     outputu(){
        var user=window.sessionStorage.getItem("UID");//获得Login页面的用户名
        return user
     },
	 replaceAll(str,a,b)  
     {  
       if(str!=null) {
         for(let i = 0; i < a.length ;i++)	   
           str = str.replace(new RegExp(a[i],"gm"),b[i]) 
		  }
        return str;  
     }  
    }
   }
</script>

<style scoped>
   .hh{
     width: 500px;
  height: 200px
 }

 .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 1250px;
  }

</style>
