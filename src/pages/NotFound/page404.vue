<template>
  <div class="page404">
    <div class="i404">
      <img src="../../../static/i404.png"/>
      <p>您的访问页面可能被删除或者不存在</p>
      <a href="/">返回首页</a>
    </div>
    <div class="sign">
      <img src="../../../static/sign.png" />
    </div>
  </div>
</template>

<script>
export default {
  name: "page404",
  mounted () {
  }
}
</script>

<style>
  .page404 {
    width: 100%;
    height: 100%;
    background: url("../../../static/bg404.jpg") no-repeat;
    background-size: cover;
    overflow: hidden;
  }
  .page404 > div {
    width: 50%;
    height: 100%;
  }
  .page404 .i404 {
    float: left;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .page404 .i404 img {
    width: 500px;
    height: 200px;
    margin-top: -100px;
  }
  .page404 .i404 p {
    font-size: 20px;
    color: #3d95ff;
    margin-top: 2px;
  }
  .page404 .i404 a {
    display: block;
    width: 150px;
    height: 50px;
    color: #ffffff;
    background: #56a9ff;
    margin-top: 35px;
    line-height: 50px;
    text-align: center;
    border-radius: 50px;
    font-size: 18px;
  }
  .page404 .sign {
    float: right;
  }
  .page404 .sign img {
    width: 600px;
    margin-top: 50px;
    margin-left: 50px;
  }
</style>
