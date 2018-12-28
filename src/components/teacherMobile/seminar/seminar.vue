/*
讨论课主页面 右上角进入
*/

<template>
  <div class="root" @click="closeMenu">
    <div class="head">
      <span style="visibility: hidden"><Icon type="ios-arrow-back" size="large"/></span>
      <span style="width:85%">讨论课</span>
      <OCMenu></OCMenu>
    </div>
    <div class="main">
      <downMenu></downMenu>
      <div style="height: 90%;width:100%">
        <div>
          ooad
        </div>
        <div>
          j2ee
        </div>
      </div>
      <div style="height: 10%;width:100%">
        <button class="button" @click="enterSeminar(id)">进入讨论课</button>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
      name: "seminar",
      data() {
        return{
          id:'24320162202918'
        }
      },
      methods: {
        closeMenu:function(){
          const menu=document.getElementById("show");
          if(document.getElementById("show").style.display==="block"){
            if(!menu.contains(event.target)) document.getElementById("show").style.display="none";
          }
        },
        enterSeminar:function(id){
          this.$router.push({
            name:'teacherMobileProcessingSeminarHome',
            params:{id}
          })
        }
      }
    }
</script>

<style scoped>
  .head{
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
    text-align:center;
  }
  .button{
    height: 40%;
    width:35%;
    float:right;
    margin-right: 5%;
    background: red;
    border:0px;
    color:#fff;
    font-size:2vmax;
    border-radius: 5px;
  }
</style>
