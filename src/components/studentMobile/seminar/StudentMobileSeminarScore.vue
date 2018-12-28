<template>
  <div class="root">
    <div class="main">
      <div class="header">
        <student-mobile-header :title="title"></student-mobile-header>
      </div>
      <CellGroup class="top-list">
        <Cell class="white" title="主题" :extra="seminar.seminarTopic">
            <span class="span1" slot="default">
              主题
            </span>
          <span class="span1" slot="extra">
              {{seminar.seminarTopic}}
            </span>
        </Cell>

        <Cell class="gray">
            <span class="span1" slot="default">
              课次序号
            </span>
          <span class="span1" slot="extra">
              第{{seminar.seminarOrder}}次
            </span>
        </Cell>

        <div class="white" style="width:100%;display:flex">
          <div style="width: 30%;">
              <span class="span1" style="margin-left: 3vmax" slot="default">
                要求
              </span>
          </div>
          <div style="width: 70%;text-align: center;">
                <span class="span2" slot="extra">
                {{seminar.seminarIntro}}
              </span>
          </div>
        </div>

      </CellGroup>

      <CellGroup class="list">

        <Cell v-if="myTeamPresentation.isTeamSignUp&&team.class">
                <span class="span1" slot="default">
                  报名
                </span>
          <span class="span2" slot="extra">
                  {{this.team.class.className}}
                  第{{myTeamPresentation.myTeamPreOrder}}组
          </span>
        </Cell>

      </CellGroup>


      <div style="display: flex;height:8vmax;width: 100%;justify-content:center">
        <div style="width: 30%;justify-content: center;text-align: center">
          <span class="span1">PPT</span>
        </div>

        <div style="width:40%;display:block;justify-content: center;text-align: center">
          <span class="span2">{{pre.teamNumber}}</span>
        </div>

        <div  style="width:30%;visibility: hidden;justify-content: center;text-align: center">
          <span class="span1">第{{index+1}}组</span>
        </div>

      </div>

      <!--上传窗口-->
      <Modal
        v-model="uploadModal"
        :title="modalTitle">
        <div>
          <Upload ref="upload"
                  :before-upload="handleUpload"
                  :action="`http://192.168.0.101:8000/attendance/${myTeamPresentation.attendanceId}/ppt`">
            <Button icon="ios-cloud-upload-outline">选择文件</Button>
          </Upload>
          <div v-if="file !== null">
            文件名: {{ file.name }}
          </div>
          <div v-else>
            未选择任何文件
          </div>
        </div>
        <Button slot="footer" type="success" @click="upload" :loading="loadingStatus">{{ loadingStatus ? '上传中' : '点击上传' }}
        </Button>
      </Modal>
    </div>
    <div class="footer" v-if="myTeamPresentation.isTeamSignUp">
      <Button class="button" v-if="seminar.seminarState=='正在进行'" style="background-color: #EA4C4C;color: #FFFFFF;"  @click="enterSeminarPresenting">进入讨论课</Button>
      <Button class="button" v-if="seminar.seminarState!='已完成'" style="background-color: #F8F8F8 ;color:#96C864; border:#AAC882 1px solid; " @click="showModal('ppt')">提交PPT</Button>
      <Button class="button" v-if="seminar.seminarState=='已完成'" style="background-color: #F8F8F8 ;color:#96C864; border:#AAC882 1px solid; "  @click="showModal('report')">书面报告提交</Button>
    </div>
    <div class="footer" v-else>
      <Button class="button" v-if="seminar.seminarState=='未开始'" style="background-color: #96C864;color: #FFFFFF;"  @click="enterSeminarSignUp">报名</Button>
      <Button class="button" v-if="seminar.seminarState=='正在进行'" style="background-color: #EA4C4C;color: #FFFFFF;"  @click="enterSeminarPresenting">进入讨论课</Button>
    </div>
  </div>
</template>

<script>
  import StudentMobileHeader from "../common/StudentMobileHeader";
  export default {
    name: "StudentMobileSeminarScore",
    components: {StudentMobileHeader},
    data () {
      return {
        modalTitle:'',
        uploadModal: false,
        file: null,
        loadingStatus: false,
        title:this.$route.query.courseName+'-'+"讨论课",
        team:'',
        seminar:'',
        uploadFileType:'',
        myTeamPresentation:{
          isTeamSignUp:false,
          myTeamPreOrder:'',
          pptName:'',
          reportName:'',
          attendanceId:'',
        },
        getMyTeamUrl:`course/${this.$route.query.courseId}/team/mine`,
        getSeminarUrl:`seminar/${this.$route.query.seminarId}/class/`,
        getTeamSignUpStateUrl:`attendance`,
      }
    },
    created() {
      this.getMyTeam(this.getMyTeamUrl,{})
    },
    methods:{
      //todo 没组队不能访问
      getMyTeam:async function(url,params){
        await this.$http.get(url,{params})
          .then(res=>{

            let datas = res.data

            let cClass = {
              classId:datas.class.id,
              className:datas.class.name
            }

            let teamLeader = {
              studentId:datas.leader.id,
              account:datas.leader.account,
              userName:datas.leader.name
            }


            let teamMembers = []

            datas.members.forEach(member=>{
              let teamMember = {
                studentId:member.id,
                account:member.account,
                userName:member.name
              }
              teamMembers.push(teamMember)
            })

            let team = {
              teamNumber:datas.teamInfo.teamSerials,
              teamName:datas.teamInfo.teamName,
              teamId:datas.teamInfo.id,
              teamState:'invalid',
              teamLeader:teamLeader,
              teamMembers:teamMembers,
              class:cClass,
              teamState:'valid'
            }


            this.team = team
          })
          .catch((err)=>{
            console.log(err)
          })

        this.getSeminar(this.getSeminarUrl+this.team.class.classId,{})
      },
      getSeminar:async function (url,params) {

        await this.$http.get(url,{params:params})
          .then((res)=>{

            let datas = res.data

            let seminarState =null

            switch(datas.status){
              case 0: seminarState='未开始';break
              case 1: seminarState='正在进行';break
              case 2: seminarState='已完成';break
            }

            let responseData = {
              seminarId:datas.seminarId,
              roundOrder:datas.roundSerial,
              seminarTopic:datas.seminarTopic,
              seminarOrder:datas.seminarSerial,
              seminarIntro:datas.seminarIntro,
              // seminarState:"正在进行",
              seminarState:seminarState,
              signUpStartTime:datas.enrollStartTime,
              signUpEndTime:datas.enrollEndTime,
              maxTeam:6,//datas.maxTeam,
              reportDDL:''
            }

            this.seminar = responseData
          })
          .catch((err)=>{
            console.log(err)
          })

        this.getTeamSignUpState(this.getTeamSignUpStateUrl,
          {seminarId:this.seminar.seminarId,cClassId:this.team.class.classId})
      },
      //通过seminarId和classId查找所有的presentations，并筛选
      getTeamSignUpState:function (url,params) {
        this.$http.get(url,{params:params})
          .then((res)=>{

            let datas = res.data


            datas.forEach(presentation=>{
              let teamId = presentation.teamBaseInfoVO.id
              //如果报名了
              if (teamId==this.team.teamId){
                this.myTeamPresentation.isTeamSignUp = true
                this.myTeamPresentation.reportName = presentation.reportName
                this.myTeamPresentation.pptName = presentation.pptName
                this.myTeamPresentation.myTeamPreOrder = presentation.teamOrder
                this.myTeamPresentation.attendanceId = presentation.id
                this.seminar.reportDDL = presentation.reportDDL
              }
            })


          })
          .catch(err=>{

          })
      },
      enterPPTDownLoad:function(){
        this.$router.push({
          name:'StudentMobileSeminarPPTDownload',
          query:{
            courseName:this.$route.query.courseName,
            seminarId:this.seminar.seminarId,
            seminarTopic:this.seminar.seminarTopic,
            classId:this.team.class.classId,
            teamId:this.team.teamId,
            maxTeam:this.seminar.maxTeam
          }
        })
      },
      enterSeminarPresenting:function () {
        this.$router.push(
          {
            name:'StudentMobileSeminarPresenting',
            query:{
              courseName:this.$route.query.courseName,
              seminarId:this.seminar.seminarId,
              seminarTopic:this.seminar.seminarTopic,
              classId:this.team.class.classId,
              teamId:this.team.teamId
            }
          }
        )
      },
      enterSeminarSignUp:function(){
        this.$router.push(
          {
            name:'StudentMobileSeminarSignUp',
            query:{
              courseName:this.$route.query.courseName,
              seminarId:this.seminar.seminarId,
              seminarTopic:this.seminar.seminarTopic,
              classId:this.team.class.classId,
              teamId:this.team.teamId,
              maxTeam:this.seminar.maxTeam
            }
          }
        )
      },
      enterSeminarModify:function(){
        this.$router.push(
          {
            name:'StudentMobileSeminarCancelSignUp',
            query:{
              courseName:this.$route.query.courseName,
              seminarId:this.seminar.seminarId,
              seminarTopic:this.seminar.seminarTopic,
              classId:this.team.class.classId,
              teamId:this.team.teamId,
              attendanceId:this.myTeamPresentation.attendanceId,
              maxTeam:this.seminar.maxTeam
            }
          }
        )
      },
      showModal(type){
        this.uploadFileType = type

        if (type=='ppt'){
          this.modalTitle= 'PPT'
        }
        else if (type=='report') {
          this.modalTitle= '书面报告'
        }
        this.uploadModal=true
      },
      handleUpload (file) {
        this.file = file;
        return false;
      },
      upload () {
        this.loadingStatus = true;
        let formData = new FormData()

        formData.append('ppt',this.file)

        console.log(this.file)

        let config = {
          headers:{'Content-Type':'multipart/form-data'}
        };


        this.$http.post(`/attendance/${this.myTeamPresentation.attendanceId}/${this.uploadFileType}`,formData,config)
          .then(res=>{
            this.file = null;
            this.loadingStatus = false;
            this.$Message.success('上传成功!')
          })
          .catch(err=>{
            console.log(err)
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
    height: 90%;
    width: 100%;
    background: #fff;
  }
  .footer{
    width:100%;
    height: 10%;
  }
  .time{
    color: red;
    font-size: 2vmax;
  }
  .upload-title{
    font-family:思源黑体;
    font-size:2vmax;
    color: black;
  }
  .upload{
    font-family:思源黑体;
    font-size:2vmax;
    color: green;
  }
  .no-upload{
    font-family:思源黑体;
    font-size:2vmax;
    color: red;
  }

  .top-list div{
    padding-top: 4%;
    padding-bottom: 4%;
    height: 10%;
    display: flex;
    /*实现垂直居中*/
    align-items: center;
  }

  .list div{
    padding-top: 4%;
    padding-bottom: 4%;
    height: 10%;
    display: flex;
    /*实现垂直居中*/
    align-items: center;
  }

  .list div:nth-child(odd) {
    height: 10%;
    background: #F2F2F2;
    display: flex;
    /*实现垂直居中*/
    align-items: center;
  }


  .gray{
    height: 10%;
    background: #F2F2F2;
    display: flex;
    /*实现垂直居中*/
    align-items: center;
  }
  .white{
    height: 10%;
    display: flex;
    /*实现垂直居中*/
    align-items: center;
  }
  .span1{
    font-family:思源黑体;
    font-size:3vmax;
    margin-left: 6%;
    color: black;
  }
  .span2{
    font-family:思源黑体;
    font-size:2vmax;
    color: black;
    display: flex;
  }
  .button{
    display: inline-block;
    text-align: center;
    font-size: 2.5vmax;
    /*padding: 20px;*/
    height: 5vmax;
    width: 100%;
  }
</style>
