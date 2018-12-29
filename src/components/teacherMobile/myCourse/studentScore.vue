<template>
  <div class="root" @click="closeMenu" id="root">
    <div class="head">
      <span><Icon type="ios-arrow-back" size="large" @click="back"/></span>
      <span style="width:85%">学生成绩</span>
      <OCMenu></OCMenu>
    </div>
    <div class="main">
      <down-menu></down-menu>
      <div style="height: auto;width: 100%;border-left:2px solid #96c864;border-right:2px solid #96c864;">
      <el-table class="table" :data="tableData" :show-header=false max-height="1000%">
        <el-table-column align="center">
          <template slot-scope="scope">
            <p style="color: green;font-size: 120%">📌  {{scope.row.round}}</p>
          </template>
        </el-table-column>
        <el-table-column type="expand">
          <template slot-scope="scope">
            <div class="expand">
              <el-table class="table" :data="scope.row.group" :show-header=false>
                <el-table-column prop="number"></el-table-column>
                <el-table-column>
                  <template slot-scope="scope">
                    <p>{{scope.row.totalScore}}分</p>
                  </template>
                </el-table-column>
                <el-table-column type="expand">
                  <template slot-scope="scope">
                    <div class="expand">
                      <div class="expand-div" v-for="item in scope.row.seminar">
                        <div style="height: 30%;width:100%;font-size:120%;text-align: center;color:black">{{item.seminarName}}</div>
                        <div style="height: 40%;width: 100%;text-align: center">
                            <div style="width: 100%;color: #000;">💻展示：<input style="color:green;width: 15%;height: 40%;border:1px solid #aaaaaa;padding-left: 1%" v-model="item.showScore"></input></div>
                            <div style="width: 100%;color: #000;">🙋‍♂️提问：<input style="color:green;width: 15%;height: 40%;border:1px solid #aaaaaa;padding-left: 1%" v-model="item.askScore"></input></div>
                          <div style="width: 100%;color: #000;">📜书面报告：<input style="color:green;width: 15%;height: 40%;border:1px solid #aaaaaa;padding-left: 1%" v-model="item.reportScore"></input></div>
                        </div>
                        <div style="width: 100%;height: 30%;text-align: center"><button class="button">修改成绩</button></div>
                      </div>
                    </div>
                  </template>
                </el-table-column>
              </el-table>
              <div></div>
            </div>
          </template>
        </el-table-column>
      </el-table>
      </div>
      <!--<div class="foot">-->
        <!--<button class="foot-button" disabled>导出成绩</button>-->
      <!--</div>-->
    </div>
  </div>
</template>

<script>
    export default {
        name: "studentScore",
      data(){
          return{
            tableData:[{
              round:'第一轮',
              group:[{
                number:'2-3',
                totalScore:'5.0',
                seminar:[{
                  seminarName:'用例分析',
                  reportScore:'5.0',
                  askScore:'5.0',
                  showScore:'5.0',
                },
                  {
                    seminarName:'界面原型',
                    reportScore:'0',
                    askScore:'0',
                    showScore:'0',
                  }]
              },
                {
                  number:'2-1',
                  totalScore:'4.0',
                  seminar:[{
                    seminarName:'用例分析',
                    reportScore:'0',
                    askScore:'0',
                    showScore:'0',
                  },
                    {
                      seminarName:'界面原型',
                      reportScore:'4.0',
                      askScore:'4.0',
                      showScore:'4.0',
                    }]
                }]
            },
              {
                round:'第二轮',
                group:[{
                  number:'2-3',
                  totalScore:'5.0',
                  seminar:[{
                    seminarName:'用例分析',
                    reportScore:'5.0',
                    askScore:'5.0',
                    showScore:'5.0',
                  },
                    {
                      seminarName:'界面原型',
                      reportScore:'0',
                      askScore:'0',
                      showScore:'0',
                    }]
                },
                  {
                    number:'2-1',
                    totalScore:'4.0',
                    seminar:[{
                      seminarName:'用例分析',
                      reportScore:'0',
                      askScore:'0',
                      showScore:'0',
                    },
                      {
                        seminarName:'界面原型',
                        reportScore:'4.0',
                        askScore:'4.0',
                        showScore:'4.0',
                      }]
                  }]
              }]
          }
      },
      methods:{
        closeMenu: function () {
          const menu = document.getElementById("show");
          if (document.getElementById("show").style.display === "block") {
            if (!menu.contains(event.target)) document.getElementById("show").style.display = "none";
          }
        },
        hei:function() {
          let Height = window.innerHeight;
          document.getElementById("root").style.height = Height + "px";
        },
        back:function(){
          this.$router.go(-1);
        }
      },
      mounted() {
          this.hei();
      }
    }
</script>

<style scoped>
  .head{
    text-align: center;
    background: #f8f8f8;
    width:100%;
    height: 8%;
    border:1px solid transparent;
    font-family:思源黑体;
    font-size: 160%;
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
  }
  .expand{
    height: 100%;
    width: 100%;
  }
  .table{
    width: 96%;
    margin-left: 2%;
  }
  .expand-div{
    background: #fcfff2;
    width: 100%;
    height: 100%;
    border-top: 1px solid #aaaaaa;
    border-bottom: 1px solid #aaaaaa;
  }
  .button{
    width: 40%;
    background: #fff;
    border: 1px green solid;
    color: green;
    border-radius: 2px;
    margin-bottom: 3%;
  }
  .foot{
    height: 8%;
    position: fixed;
    bottom: 0;
    width: 100%;
    z-index:9999;
  }
  .foot-button{
    width: 100%;
    height: 100%;
    background: #96c864;
    border: transparent;
    color:#fff;
    border-radius: 5px;
    font-size:150%;
  }
</style>
