<template>
  <div class="root">
    <div class="header">
      <student-mobile-header :title="title"></student-mobile-header>
    </div>
    <div class="main">


      <div style="display: flex;height:8vmax;width: 100%;justify-content:center">

        <div style="width: 35%;justify-content: center;text-align: center">
          <span class="span1" style="font-size:2.3vmax;color: red;">第{{presentIndex+1}}组展示中</span>
        </div>

        <div style="width:30%;display:block;justify-content: center;text-align: center">
          <span class="span2" style="font-size: 4vmax" >{{this.$route.query.seminarTopic}}</span>
        </div>

        <div style="width:35%;justify-content: center;text-align: center">
          <span class="span1" style="font-size:2vmax;">已有
            <span style="font-size: 3vmax;color: green">
              {{questionNumber}}
            </span>
            同学提问</span>
        </div>
      </div>

        <div v-for="(pre,index) in allPres" style="display: flex;height:8vmax;width: 100%;justify-content:center" :key="pre.preOrder" :class="{shade:index%2==0}">

          <div style="width: 30%;justify-content: center;text-align: center">
            <span class="span1">第{{index+1}}组</span>
          </div>

          <div style="width:40%;display:block;justify-content: center;text-align: center">
            <span class="span2">{{pre.teamNumber}}</span>
          </div>

          <div  style="width:30%;visibility: hidden;justify-content: center;text-align: center">
            <span class="span1">第{{index+1}}组</span>
          </div>

        </div>
    </div>
    <div class="footer">
      <Button class="button" style="width: 50%">Q&A</Button>
    </div>
  </div>
</template>

<script>
    import SockJS from  'sockjs-client';
    import  Stomp from 'stompjs';
    import StudentMobileHeader from "../common/StudentMobileHeader";
    import ThreePartCell from "../common/threePartCell";
    export default {
        name: "StudentMobileSeminarPresenting",
      components: {ThreePartCell, StudentMobileHeader},
      data(){
        return{
          title:this.$route.query.courseName+'-'+"讨论课",
          pres:[],
          questionNumber:1,
          getTeamListUrl:`attendance`,
          stompClient:'',
          presentIndex:0,
          timer:'',
        }
      },
      created(){
        this.getTeamList(this.getTeamListUrl,{cClassId:this.$route.query.classId,seminarId:this.$route.query.seminarId})
      },
      mounted(){
        this.initWebSocket();
      },
      beforeDestroy: function () {
        // 页面离开时断开连接,清除定时器
        this.disconnect();
        clearInterval(this.timer);
      },
      methods:{
        initWebSocket() {
          this.connection();
          let that= this;
          // 断开重连机制,尝试发送消息,捕获异常发生时重连
          this.timer = setInterval(() => {
            try {
              that.stompClient.send("test");
            } catch (err) {
              console.log("断线了: " + err);
              that.connection();
            }
          }, 5000);
        },
        connection() {
          // 建立连接对象
          let socket = new SockJS('http://siwv3n.natappfree.cc/rbs-websocket');
          // 获取STOMP子协议的客户端对象

          this.stompClient = Stomp.over(socket);

          // 定义客户端的认证信息,按需求配置
          let headers = {
            'Access-Control-Allow-Origin':'*',
            'Authorization':'Bearer' +localStorage.token
          }

          // 向服务器发起websocket连接
          this.stompClient.connect(headers,() => {

            //监听下一组
            this.stompClient.subscribe(`/topic/client/class/${this.$route.query.classId}/seminar/${this.$route.query.classId}/nextTeam`, (msg) => {
              console.log('下一组')
              console.log(msg);
            },headers);

            //监听抽取提问
            this.stompClient.subscribe(`/topic/client/class/${this.$route.query.classId}/seminar/${this.$route.query.classId}/pickQuestion`, (msg) => {
              console.log('抽取提问')
              console.log(msg);
            },headers);

            //发送学生提问
            // this.stompClient.send(``,
            //   headers,
            //   JSON.stringify({sender: '',chatType: 'JOIN'}),
            // )   //用户加入接口
          }, (err) => {
            // 连接发生错误时的处理函数
            console.log('失败')
            console.log(err);
          });
         },
        disconnect() {
          if (this.stompClient) {
            this.stompClient.disconnect();
          }
        },  // 断开连接
        getTeamList:function (url,params) {
          this.$http.get(url,{params:params})
            .then((res)=>{

              let datas = res.data

              let pres = []

              datas.forEach(presentation=>{
                let pre = {
                  teamId:presentation.teamBaseInfoVO.id,
                  teamNumber:presentation.teamBaseInfoVO.teamSerials,
                  teamName:presentation.teamBaseInfoVO.teamName,
                  preOrder:presentation.teamOrder,
                  isPresent:presentation.present,
                }

                pres.push(pre)

              })

              this.pres = pres


            })
            .catch(err=>{

            })
        },
      },
      computed:{
        allPres:function () {
          let all = []
          this.pres.forEach(pre=>{
            all[pre.preOrder-1] = pre
          })

          var r = all.filter(function (s) {
            return !(s==null);
          });

          let presentIndex=0;

          for (let pre in r){
            if (pre.isPresent==1){
              presentIndex+=1;
            }
          }

          this.presentIndex=presentIndex

          return r
        }
      },
    }
</script>

<style scoped>
  .header{
    text-align: center;
    background: #96C864;
    width:100%;
    height: 8%;
    border:1px solid transparent;
    font-family:思源黑体;
    font-size: 2.5vmax;
    color:#000;
    letter-spacing:1px;
    display: flex;
    /*实现垂直居中*/
    align-items: center;
    /*实现水平居中*/
    justify-content: center;
  }
  .root {
    height: 100%;
    width: 100%;
    background: #fff;
  }
  .main{
    /*margin-top: 8%;*/
    height: 92%;
    width: 100%;
    background: #fff;
  }
  .shade{
    background-color:#f8f8f9;
  }
  .footer{
    text-align: center;
    position:fixed;
    width:100%;
    bottom: 8vmax
  }
  .span1{
    text-align: center;
    font-family:思源黑体;
    font-size:3vmax;
    color: black;
    width: 100%;
    line-height: 8vmax;
  }
  .span2{
    font-family:思源黑体;
    font-size:2.5vmax;
    color: black;
    text-align: center;
    line-height: 8vmax;
  }
  .button{
    display: inline-block;
    background-color: #96C864;
    border: none;
    color: #FFFFFF;
    text-align: center;
    font-size: 2.5vmax;
    /*padding: 20px;*/
    height: 5vmax;
    width: 30%;
  }
</style>
