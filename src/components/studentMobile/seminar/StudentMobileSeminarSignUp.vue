<template>
  <div class="root">
    <div class="header">
      <student-mobile-header :title="title"></student-mobile-header>
    </div>
    <div class="main">
      <CellGroup>
        <div v-for="(pre,index) in allPres" :key="pre.preOrder" style="display: flex;height:8vmax;align-items: center;" :class="{shade:index%2==0}"  >
          <Cell>
            <span class="span1" slot="default">
               第{{pre.preOrder}}组
            </span>
          </Cell>

          <div style="margin:0 auto">
            <Cell>
              <span class="span2" v-if="pre.teamId" slot="default">
                {{pre.teamNumber}}
              </span>
              <Button class="button" v-else slot="default" @click="signUp(pre.preOrder)">
                点击报名
              </Button>
            </Cell>
          </div>

          <Cell style="visibility: hidden">
            <span class="span1" slot="default">
               第{{pre.preOrder}}组
            </span>
          </Cell>
        </div>
      </CellGroup>
    </div>
  </div>
</template>

<script>
    import StudentMobileHeader from "../common/StudentMobileHeader";
    export default {
        name: "StudentSeminarMobileSignUp",
      components: {StudentMobileHeader},
      data(){
          return{
            title:this.$route.query.courseName+'-'+"讨论课",
            maxTeam:this.$route.query.maxTeam,
            pres:[],
            getTeamListUrl:`attendance`,
            signUpUrl:`attendance`,
          }
        },
      created(){
        this.getTeamList(this.getTeamListUrl,{cClassId:this.$route.query.classId,seminarId:this.$route.query.seminarId})
      },
      methods:{
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
                    preOrder:presentation.teamOrder
                  }

                  pres.push(pre)

                })

                this.pres = pres


              })
              .catch(err=>{

              })
          },
          signUp(preOrder){
            let param = {
              classId:parseInt(this.$route.query.classId),
              seminarId:parseInt(this.$route.query.seminarId),
              teamId:parseInt(this.$route.query.teamId),
              teamOrder:preOrder
            }
            this.$http.post(this.signUpUrl,param)
              .then(res=>{
                this.$Message.success('报名成功')
                this.$router.go(-1)
              })
              .then(err=>{

              })
          }
      },
      computed:{
          allPres:function () {
            let all = []
            this.pres.forEach(pre=>{
              all[pre.preOrder-1] = pre
            })
            for (let i =0 ;i<this.maxTeam;i++){
              if (!all[i]){
                let pre = {
                  teamId:null,
                  teamNumber:null,
                  teamName:null,
                  preOrder:i+1}
                all[i]=pre
              }
            }
            return all
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
  .list div{
    padding-top: 4%;
    padding-bottom: 4%;
  }
  .shade{
    background-color:#f8f8f9;
  }
  .span1{
    font-family:思源黑体;
    font-size:3vmax;
    margin-left: 2%;
    color: black;
    width: 21%;
  }
  .span2{
    font-family:思源黑体;
    font-size:2.5vmax;
    color: black;
    width: 66%;
  }
    .button{
      font-size:2.5vmax;
      color: black;
      background-color:white;
    }
</style>
