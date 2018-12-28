<template>
  <div class="root">
    <div class="header">
      <student-mobile-header :title="title"></student-mobile-header>
    </div>
    <div class="main">

      <div class="intro">
        <div class="intro-title">
          课程简介:
        </div>
        <div class="intro-content">
          {{course.intro}}
        </div>
      </div>

      <Divider/>

      <div class="score">
        <div class="score-title">成绩计算规则
        </div>
        <div class="score-content">
          <div>
            课堂展示:{{course.presentationPercentage}}
          </div>
          <div>
            课堂提问:{{course.questionPercentage}}
          </div>
          <div>
            书面报告:{{course.reportPercentage}}
          </div>
        </div>
      </div>
      <div class="time" title="组队开始时间" extra="2018.10.11 12:00">
          <span slot="default" class="time-title">
            组队开始时间
          </span>
          <span slot="extra" class="time-content">
            {{course.teamStartTime}}
          </span>
      </div>
      <div class="time" title="组队截止时间" extra="2018.11.11 12:00">
          <span slot="default" class="time-title">
            组队截止时间
          </span>
          <span slot="extra" class="time-content">
            {{course.teamEndTime}}
          </span>
      </div>

      <Divider/>

      <router-link :to="{name:'StudentMobileCourseTeamLimit',query:{courseId:this.$route.query.courseId,courseName:this.$route.query.courseName}}">
        <div class="limit">
          <span class="limit-title">
            组队要求
          </span>
          <span class="limit-content">
            <img src="../../../assets/arrow.png" style="width: 2vmax;height: 2vmax">
          </span>
        </div>
      </router-link>

    </div>
  </div>
</template>

<script>
    import StudentMobileHeader from "../common/StudentMobileHeader";
    export default {
        name: "StudentMobileCourseInfo",
      components: {StudentMobileHeader},
      data(){
          return{
            title:this.$route.query.courseName,
            course:{
              id:'',
              name:'',
              intro:'',
              presentationPercentage:'',
              questionPercentage:'',
              reportPercentage:'',
              teamStartTime:'',
              teamEndTime:'',
              courseMemberLimitStrategy:'',
              conflictCourses:'',
              shareSeminar:'',
              shareTeam:''
            }
          }
      },
      created(){
          this.getCourseInfo(`/course/${this.$route.query.courseId}`,{})
      },
      methods:{
          getCourseInfo:function(url,params){
            this.$http.get(url,params)
              .then(res=>{
                this.course = res.data
              })
          }
      }
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
  .intro{
    height: 20%;
    padding-top: 2%;
    display: block;
    margin:  1%;
  }
  .intro-title{
    font-family:思源黑体;
    font-size:3vmax;
    margin-left: 2%;
  }
  .intro-content{
    margin-top: 2%;
    margin-left: 2%;
    font-family:思源黑体;
    font-size:2vmax;
  }
  .score{
    height: 20%;
    display: flex;
    padding-bottom: 6%;
    margin:  1%;
  }
  .score-title{
    width: 40%;
    margin-left: 2%;
    font-family:思源黑体;
    font-size:3vmax;
  }
  .score-content{
    position: absolute;
    right: 2vmax;
    font-family:思源黑体;
    font-size:2vmax;
  }
  .time-title{
    width: 40%;
    margin-left: 2%;
    font-family:思源黑体;
    font-size:3vmax;
  }
  .time-content{
    position: absolute;
    margin-top:1vmax;
    right: 2vmax;
    font-family:思源黑体;
    font-size:2vmax;
  }
  .time{
    height: 7%;
    display: flex;
    margin:  1%;
  }
  .limit-title{
    width: 40%;
    margin-left: 2%;
    font-family:思源黑体;
    font-size:3vmax;
    color: black;
  }
  .limit-content{
    position: absolute;
    margin-top:1vmax;
    right: 2vmax;
    font-family:思源黑体;
    font-size:2vmax;
  }
  .limit{
    height: 7%;
    display: flex;
    margin-top: 3%;
  }
</style>
