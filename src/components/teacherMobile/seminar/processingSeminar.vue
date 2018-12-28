<template>
  <div class="root" @click="closeMenu">
    <div class="head1">
      <span><Icon type="ios-arrow-back" size="large"/></span>
      <span style="width:85%">{{name}}-讨论课</span>
      <OCMenu></OCMenu>
    </div>

    <div class="main">
      <down-menu></down-menu>
      <div class="head2">
        <span style="width:70%;margin-left: 15%">{{seminar}}</span>
        <span style="height: 25px;width:15%"><img src="../../../assets/pause.jpg" style="width:25px;height: 25px" @click="pauseDialogVisible=true"></span>
      </div>
      <div class="main1">
        <span style="width:70%;letter-spacing:1px;">展示时间：{{showTime}}，被提问时间：{{askTime}}</span>
        <span style="margin-right: 5%;">已有{{askTimes}}位同学提问</span>
      </div>
      <div class="main2">
        <div style="width: 25%;height: 100%;background: #fff">
          <div class="group1" @click="switchGroup(1)">{{showGroup[0].num}}</div>
          <div class="group2" @click="switchGroup(2)">{{showGroup[1].num}}</div>
          <div class="group1" @click="switchGroup(3)">{{showGroup[2].num}}</div>
          <div class="group2" @click="switchGroup(4)">{{showGroup[3].num}}</div>
          <div class="group2" @click="switchGroup(5)">{{showGroup[4].num}}</div>
          <div class="group2" @click="switchGroup(6)">{{showGroup[5].num}}</div>
        </div>
        <div style="width: 55%;height: 100%;display: flex;align-items: center;justify-content: center;flex-direction: column">
          <div class="score">{{currentType==1?"展示分数":"提问分数"}}</div>
          <div class="score-input"><input class="input" placeholder="输入成绩" v-model="currentType==1?showGroup[chooseShowing].score:askGroup[chooseAsking].score"></input></div>
        </div>
        <div style="width: 20%;height: 100%;background: #fff;">
          <div class="asking" @click="switchAsk(1)" id="ask0">{{askGroup[0].group}}  {{askGroup[0].name}}</div>
          <div class="asking" @click="switchAsk(2)" id="ask1">{{askGroup[1].group}}  {{askGroup[1].name}}</div>
          <div class="asking" @click="switchAsk(3)" id="ask2">{{askGroup[2].group}}  {{askGroup[2].name}}</div>
          <div class="asking" @click="switchAsk(4)" id="ask3">{{askGroup[3].group}}  {{askGroup[3].name}}</div>
          <div class="asking" @click="switchAsk(5)" id="ask4">{{askGroup[4].group}}  {{askGroup[4].name}}</div>
          <div class="asking" @click="switchAsk(6)" id="ask5">{{askGroup[5].group}}  {{askGroup[5].name}}</div>
          <div class="asking" @click="switchAsk(7)" id="ask6">{{askGroup[6].group}}  {{askGroup[6].name}}</div>
          <div class="asking" @click="switchAsk(8)" id="ask7">{{askGroup[7].group}}  {{askGroup[7].name}}</div>
          <div class="asking" @click="switchAsk(9)" id="ask8">{{askGroup[8].group}}  {{askGroup[8].name}}</div>
          <div class="asking" @click="switchAsk(10)" id="ask9">{{askGroup[9].group}}  {{askGroup[9].name}}</div>
        </div>
      </div>
      <div class="main3">
        <button class="button1"><span>{{currentType==1?"抽取提问":"下个提问"}}</span></button>
        <button class="button2" @click="nextShow"><span>下组展示</span></button>
      </div>
    </div>
    <el-dialog :visible.sync="pauseDialogVisible" :show-close="false" top="40%" width="60%" center>
      <div slot="title" style="color:red">
        <Icon type="md-information-circle" size="35"/>
      </div>
      <div style="text-align: center;font-size: 2vmax;color: #000;">
        <p>确认暂停</p>
        <p>{{name}}</p>
        <p>{{seminar}}讨论课</p>
      </div>
      <div slot="footer">
        <button class="textButton" onclick="window.location.href='../../seminar/MTpauseSeminar'">确认</button>
        <button class="textButton" @click="pauseDialogVisible=false">取消</button>
      </div>
    </el-dialog>

    <el-dialog :visible.sync="endDialogVisible" :show-close="false" top="40%" width="60%" center>
      <div slot="title" style="color:red">
        <Icon type="md-information-circle" size="35"/>
      </div>
      <div style="text-align:center;font-size: 2vmax;color: #000;">
        <p>讨论课已结束</p>
        <p>请设置书面报告截止时间</p>
        <DatePicker type="datetime" placeholder="选择日期和时间" style="width: 100%;margin-top: 5%" size="small"></DatePicker>
      </div>
      <div slot="footer">
        <button class="textButton" @click="confirmEnd(1)">确认</button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "processingSeminar",
    data() {
      return {
        name:'OOAD',
        seminar:'业务流程分析',
        //当前类型(提问/展示) 1表示展示 0表示提问
        currentType:'1',

        //当前展示时间
        showTime:'5:00',
        //被提问的时间
        askTime:'1:00',
        //被提问的次数
        askTimes:'1',

        //展示的小组
        showGroup:[{
          order:'1',
          num:'1-2',
          score:'1',
        },
          {
            order:'2',
            num: '1-4',
            score: '2',
          },
          {
            order:'3',
            num: '1-3 ▶',
            score: '3',
          },
          {
            order:'4',
            num: '1-5',
            score: '4',
          },
          {
            order:'5',
            num: '1-1',
            score: '5',
          },
          {
            order:'6',
            num: '1-6',
            score: '6',
          }],

        //提问的人
        askGroup:[{
          group:'1-1',
          name:'燕小六',
          score:'3',
        },
          {
            group:'1-2',
            name:'赵四',
            score:'2',
          },
          {
            group:'1-4',
            name:'钱六',
            score:'1',
          },
          {
            group:'2-3',
            name:'王楞奇',
            score:'4',
          },
          {
            group:'',
            name:'',
            score:'',
          },
          {
            group:'',
            name:'',
            score:'',
          },
          {
            group:'',
            name:'',
            score:'',
          },
          {
            group:'',
            name:'',
            score:'',
          },
          {
            group:'',
            name:'',
            score:'',
          },
          {
            group:'',
            name:'',
            score:'',
          }],
        chooseShowing:2,
        chooseAsking:0,
        pauseDialogVisible:false,
        endDialogVisible:false,
      }
    },
    methods:{
      confirmEnd:function(id){
        this.$router.push({
          name:'teacherMobileSeminarEnd',
          params:{id}
        })
      },
      closeMenu: function () {
        const menu = document.getElementById("show");
        if (document.getElementById("show").style.display === "block") {
          if (!menu.contains(event.target)) document.getElementById("show").style.display = "none";
        }
      },
      switchGroup:function(id){
        let _this=this;
        _this.$data.currentType=1;
        _this.$data.showGroup[_this.$data.chooseShowing].num=_this.$data.showGroup[_this.$data.chooseShowing].num.substring(0,3);
        _this.$data.chooseShowing=id-1;
        _this.$data.showGroup[_this.$data.chooseShowing].num+=" ▶";
        document.getElementById("ask"+_this.$data.chooseAsking).style.color = "black";
      },
      switchAsk:function(id) {
        let _this = this;
        _this.$data.currentType = 0;
        document.getElementById("ask"+_this.$data.chooseAsking).style.color = "black";
        _this.$data.chooseAsking=id-1;
        document.getElementById("ask"+_this.$data.chooseAsking).style.color = "red"
      },
      nextShow:function(){
        let _this=this;
        if(_this.$data.chooseShowing!==5){
          _this.$data.currentType=1;
          _this.$data.showGroup[_this.$data.chooseShowing].num=_this.$data.showGroup[_this.$data.chooseShowing].num.substring(0,3);
          _this.$data.chooseShowing=_this.$data.chooseShowing+1;
          _this.$data.showGroup[_this.$data.chooseShowing].num+=" ▶";
          document.getElementById("ask"+_this.$data.chooseAsking).style.color = "black";
        }
        else{
          _this.$data.endDialogVisible=true;
        }
      }
    },
    created(){
    }
  }
</script>

<style scoped>
  .head1{
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
  .head2{
    text-align: center;
    background: #fff;
    width:100%;
    height: 10%;
    font-size: 2vmax;
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
    background: #f2f2f2;
  }
  .main{
    height: 84%;
    width:100%;
    background: #f2f2f2;
  }
  .main1{
    height: 7%;
    width:100%;
    display: flex;
    /*实现垂直居中*/
    align-items: center;
    font-size:1.5vmax;
    margin-left: 3%;
    color:#0B710A;
  }
  .main2{
    height: 57%;
    width:100%;
    display: flex;
    /*实现垂直居中*/
    align-items: center;
    /*实现水平居中*/
    justify-content: center;
  }
  .main3{
    height: 36%;
    width:100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .score{
    font-size: 3vmax;
  }
  .score-input{
    width:80%;
    height:50%;
    border: #BBBBBB solid 1px;
    margin-bottom:5%;
    margin-top:15%;
    background: #FFFFFF;
  }
  .input{
    background-color:#FFFFFF;
    border: #BBBBBB solid 1px;
    height:60%;
    width:60%;
    margin-top: 15%;
    margin-left: 10%;
    font-size: 8vmax;
    text-align: center;
  }
  .button1 {
    display: inline-block;
    background-color: #96c864;
    border: none;
    color: #FFFFFF;
    text-align: center;
    font-size: 2vmax;
    /*padding: 20px;*/
    height: 20%;
    width: 50%;
    margin-top: 3%;
    border-radius:6px
  }
  .button2 {
    display: inline-block;
    background-color: #ffffff;
    border: solid 1px #BBBBBB;
    color: #96C864;
    text-align: center;
    font-size: 2vmax;
    /*padding: 20px;*/
    height: 20%;
    width: 50%;
    margin-top: 3%;
    border-radius:6px
  }
  .input::-webkit-input-placeholder, textarea::-webkit-input-placeholder { /* WebKit*/
    color:#CCCCCC;
    font-size:2vmax;
    padding: 5%;
  }
  .group1{
    font-size: 2vmax;
    height: 16%;
    width: 100%;
    display: flex;
    /*实现垂直居中*/
    align-items: center;
    /*实现水平居中*/
    justify-content: center;
  }
  .group2{
    font-size: 2vmax;
    height: 17%;
    width: 100%;
    display: flex;
    /*实现垂直居中*/
    align-items: center;
    /*实现水平居中*/
    justify-content: center;
  }
  .asking{
    height:10%;
    width:100%;
    font-size:1.5vmax;
    display: flex;
    align-items: center;
    margin-left: 5%;
    border-bottom:1px solid #f2f2f2;
    font-weight: bold;
    color:black;
  }
  .textButton{
    border: 0px;
    background: #fff;
    font-size:2vmax;
    color:#259B24;
    width: 30%;
  }
</style>
