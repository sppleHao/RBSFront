<template>
  <div id="show" class="box1">
    <em class="box2"></em>
    <em class="box3"></em>
    <div class="item1">
      <img src="../../../../assets/news.png" class="img" @click="enterUpcomings(id)"/>待办</div>
    <div class="item1">
      <img src="../../../../assets/personal data.png" class="img" @click="enterPersonal(id)"/>个人页</div>
    <div class="item2" @click="enterSeminar(id)">
      <img src="../../../../assets/Trophy.png" class="img"/>讨论课</div>
  </div>
</template>

<script>
    export default {
      name: "downMenu",
      data() {
        return {
          id: '24320162202918'
        }
      },
      methods: {
        enterUpcomings: function (id) {

        },
        enterPersonal: function (id) {

        },
        enterSeminar: function (id) {
          this.$router.push({
            name: 'teacherMobileSeminar',
            params: {id}
          })
        },
      }
    }
</script>

<style scoped>
  .box1 {
    background: #fff;
    position: absolute;
    margin-top: 1%;
    margin-left: 69%;
    width: 30%;
    height: 20%;
    border: 1px solid #D3CFD4;
    display: none
  }
  .box2 {
    display: block;
    border-width: 10px;
    position: absolute;
    bottom: 100%;
    left: 75%;
    border-style: solid;
    border-color: transparent transparent #D3CFD4
  }
  .box3 {
    display: block;
    border-width: 9px;
    position: absolute;
    bottom: 99%;
    left: 76%;
    border-style: solid;
    border-color: transparent transparent #fff
  }
  .item1 {
    font-family: 思源黑体;
    font-size: 2vmax;
    color: #0B710A;
    width: 100%;
    height: 33%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .item2 {
    font-family: 思源黑体;
    font-size: 2vmax;
    color: #0B710A;
    width: 100%;
    height: 34%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .img {
    height: 50%;
    margin-right: 5%
  }
</style>
