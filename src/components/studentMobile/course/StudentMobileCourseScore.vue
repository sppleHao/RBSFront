<template>
  <div class="root">
    <div class="header">
      <student-mobile-header :title="title"></student-mobile-header>
    </div>
    <div class="main">
      <div class="scroll">

        <div  v-for="round in rounds" :key="round.roundOrder">
          <div class="title" @click="round.vis=!round.vis" >

            <img class="icon" src="../../../assets/book.png" />

            <span class="front">

            </span>

            <span class="center">
              第{{round.roundOrder}}轮
            </span>

            <img class="arrow" v-if="!round.vis" src="../../../assets/down-arrow.png" />
            <img class="arrow" v-else src="../../../assets/up-arrow.png">
          </div>

          <div class="content" v-if="round.vis">

            <div class="table" v-for="seminar in round.mySeminars" :key="seminar.seminarId">
              <div class="seminar-cell" @click="seminar.vis = !seminar.vis">
                <span class="seminar-cell-front">{{seminar.seminarSerial}}</span>
                <span class="seminar-cell-center">{{seminar.seminarTopic}}</span>
                <span class="seminar-cell-end">
                  <img class="arrow" v-if="!seminar.vis" src="../../../assets/down-arrow.png" />
                  <img class="arrow" v-else src="../../../assets/up-arrow.png">
                </span>
              </div>
              <div class="seminar-score" v-if="seminar.vis">
                <div class="score-cell">
                  <div class="part-score-cell">
                    展示:
                    <span class="part-score">
                      {{`5.0`}}
                    </span>
                  </div>
                  <div class="part-score-cell">
                    提问:
                    <span class="part-score">
                      {{`5.0`}}
                    </span>
                  </div>
                  <div class="part-score-cell">
                    书面报告
                    <span class="part-score">
                    {{`5.0`}}
                    </span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
    <div class="footer">
      <button type="success" class="button">导出成绩</button>
    </div>
  </div>
</template>

<script>
    import StudentMobileHeader from "../common/StudentMobileHeader";
    export default {
        name: "StudentMobileCourseScore",
      components: {StudentMobileHeader},
      data(){
        return{
          courseId:this.$route.query.courseId,
          courseName:this.$route.query.courseName,
          title:this.$route.query.courseName,
          rounds:'',
          getRoundsUrl:`course/${this.$route.query.courseId}/seminars`,
        }
      },
      created () {
        this.getRounds(this.getRoundsUrl,{});
      },
      methods:{
        getRounds:function (url,params) {
          this.$http.get(url,{params:{params}})
            .then(res=>{
              let datas = res.data.rounds

              let rounds =[]


              // all rounds in course
              datas.forEach((data)=>{
                //if empty
                if (!rounds[datas.roundSerial]){

                  let seminars = []

                  //all seminars in a round
                  data.seminarInfoVOS.forEach(seminar=>{

                    let s = {
                      seminarId:seminar.seminarId,
                      seminarTopic:seminar.seminarName,
                      seminarSerial:seminar.seminarSerial,
                      seminarVisible:seminar.visible,
                      vis:false
                    }

                    seminars.push(s)

                  })



                  let r = {
                    roundId:data.roundId,
                    roundOrder:data.roundSerial,
                    mySeminars:seminars,
                    vis:false,
                  }

                  rounds.push(r);
                }
              });


              this.rounds =  rounds;
            })
            .catch(err=>{

            })
        }
      }
    }
</script>

<style scoped>
  .header{
    text-align: center;
    background: #f8f8f9;
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
    background: #f2f2f2;
  }
  .main{
    /*margin-top: 8%;*/
    height: 89%;
    width: 100%;
  }
  .footer{
    position: absolute;
    text-align: center;
    width:100%;
    height: 7%;
    bottom: 0px
  }
  .title{
    height: 6vmax;
    display: flex;
    align-items: center;
    width:96%;
    font-size:3vmax;
    border-bottom: 1px #f2f6fc solid;
    background-color: white;
    margin-right: 2%;
    margin-left: 2%;
  }
  .center{
    width: 50%;
    word-wrap: break-word;
  }
  .front{
    margin-left: 5%;
    width: 30%;
  }
  .seminar-cell{
    height: 9vmax;
    display: flex;
    align-items: center;
    width:92%;
    font-size:2.4vmax;
    border-bottom: 1px #f2f6fc solid;
    background-color: #e8eaec;
    margin-right: 4%;
    margin-left: 4%;
  }
  .seminar-cell-center{
    width: 50%;
    word-wrap: break-word;
    text-align: center;
  }
  .seminar-cell-front{
    margin-left: 5%;
    width: 20%;
    text-align: center;
    color: green;
  }
  .seminar-cell-end{
    width: 30%;
    text-align: center;
  }
  .score-cell{
    height: 7vmax;
    display: flex;
    align-items: center;
    width:88%;
    font-size:2.4vmax;
    border-bottom: 1px #f2f6fc solid;
    background-color:#c5c8ce;
    margin-right: 6%;
    margin-left: 6%;
  }
  .icon{
    margin-left: 2%;
    left: 3vmax;
    width: 3vmax;
    height: 3vmax;
  }
  .arrow{
    right: 3vmax;
    width: 1.5vmax;
    height: 1.5vmax;
  }
  .scroll{
    max-height: 83vmax;
    overflow-y:scroll
  }
  .part-score-cell{
    width: 33%;text-align: center
  }
  .part-score{
    font-size: 2.5vmax;
    color: green;
  }
  .total-score{
    font-size: 3vmax;
    color: red;
  }
  .button{
    display: inline-block;
    background-color: #96C864;
    border: none;
    color: #FFFFFF;
    text-align: center;
    font-size: 3.1vmax;
    /*padding: 20px;*/
    width: 100%;
    height: 100%;
  }
</style>
