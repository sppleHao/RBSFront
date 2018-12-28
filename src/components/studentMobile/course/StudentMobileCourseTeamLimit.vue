<template>
  <div class="root">
    <div class="header">
      <student-mobile-header :title="title"></student-mobile-header>
    </div>
    <div class="main">
      <div class="base-require">
        <div class="base-require-title">
          组员基本要求:
        </div>
      </div>


      <div class="require">
        <div class="require-title">
          小组总人数（含组长）：
        </div>
        <div class="require-content">
          <div>
            {{course.courseMemberLimitStrategy.minMember}} - {{course.courseMemberLimitStrategy.maxMember}}
          </div>
        </div>
      </div>

      <div class="require">
        <div class="require-title">
          组内选修课程人数：
        </div>
      </div>


      <div class="require">
        <div class="require-title">
          选修课人数要求：
        </div>
        <div class="require-content">
          <div>
            {{course.courseMemberLimitStrategy.requireRule}}
          </div>
        </div>
      </div>

      <div class="comment">
        <span>
          均满足指选课人数达到需求
          满足其一指任意选课人数满足即可（多指冲突课程)
        </span>
      </div>

      <Divider />

      <div class="conflict">
        <div class="conflict-title">冲突课程</div>
      </div>
      <div class="conflict-content">
        <div v-for="conflictCourseId in course.conflictCourses">
          {{conflictCourseId}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import StudentMobileHeader from "../common/StudentMobileHeader";
  export default {
    name: "StudentMobileCourseTeamLimit",
    components: {StudentMobileHeader},
    data(){
      return{
        title:this.$route.query.courseName,
        course:{
          id:'',
          name:'',
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
    background: #f8f8f8;
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
    width: 96%;
    margin: 2%;
    background-color: white;
  }
  .base-require{
    height: 6vmax;
    padding-top: 2%;
    display: block;
    margin:  1%;
  }
  .base-require-title{
    font-family:思源黑体;
    font-size:3vmax;
    margin-left: 2%;
  }
  .require{
    height: 10%;
    display: flex;
    margin:  1%;
  }
  .require-title{
    width: 80%;
    margin-left: 2%;
    font-family:思源黑体;
    font-size:2.5vmax;
  }
  .require-content{
    position: absolute;
    margin-top: 1vmax;
    right: 2vmax;
    font-family:思源黑体;
    font-size:2vmax;
  }
  .comment{
    width: 80%;
    margin-left: 10%;
    font-family:思源黑体;
    font-size:2vmax;
    color: darkgray;
  }
  .conflict{
    display: flex;
    margin:  1%;
  }
  .conflict-title{
    width: 80%;
    margin-left: 2%;
    font-family:思源黑体;
    font-size:2.5vmax;
  }
  .conflict-content{
    position: absolute;
    margin-top: 1vmax;
    margin-left: 6%;
    font-family:思源黑体;
    font-size:2vmax;
  }
</style>
