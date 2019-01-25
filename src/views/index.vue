<template>
  <div class="box">
    <nav class="nav">
      <router-link to="/all">全部</router-link>
      <router-link to="/good">精华</router-link>
      <router-link to="/share">分享</router-link>
      <router-link to="/job">招聘</router-link>
      <router-link to="/ask">问答</router-link>
      
    </nav>
    <router-view></router-view>
  </div>
  
</template>

<script>
export default {

}
</script>

<style>
  .nav {
    padding: 10px;
    display: flex;
    height: 44px;
    margin-bottom: 10px;
  }
  .nav a{
    width: 100%;
    text-align: center;
    height: 44px;
    line-height: 44px;
    color: #333;
  }
  a.router-link-active {
    background: #80bd01;
    color: #fff;
  }
</style>
