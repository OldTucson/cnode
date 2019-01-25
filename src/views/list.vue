<template>
  <ul>
    <li class="topic" v-for="(topic, index) in topics" :key="index">
      <div class="avatar">
        <img width="32" height="32" :src="topic.author.avatar_url" alt="">
      </div>
      <div class="topic-body">
        <div>
          <router-link :to="'/topic/' + topic.id" tag="h3" class="title">{{topic.title}}</router-link>
          <div class="topic-count">
            <span>{{topic.reply_count}}</span> / <span>{{topic.visit_count}}</span>
          </div>
          
        </div>
        <div class="time">{{topic.last_reply_at | formatTime}}</div>
      </div>
    </li>
  </ul>
</template>

<script>
/* 
  过滤器中的value就是添加过滤器位置的对应的值
*/
export default {
  data () {
    return {
      topics: []
    }
  },
  filters: {
    formatTime (value) {
    //   console.log(value)
      // return 1
      const d = new Date(value)
      const time = Math.floor((Date.now() - d.getTime()) / 1000)

      const arr = ['年', '月', '周', '天', '小时', '分钟', '秒']
      const arrn = [3600 * 24 * 365, 3600 * 24 * 30, 3600 * 24 * 7, 3600 * 24, 3600, 60, 1]

      for (let i = 0; i < arrn.length; i++) {
        const t = Math.floor((time / arrn[i]))
        if (t != 0) {
          return t + arr[i] + '前'
        }
      }
    }
  },  
  watch: {
    '$route': {
      handler (to) {
        // to就是路由对象，获取路由对象中的动态路由参数
        // 数据请求
        this.axios.get('/topics', {
          params: {
            limit: 10,
            tab: to.params.tab
          }
        }).then(res => {
          this.topics = res.data.data
        })
      },
      immediate: true
    }
  }
}
</script>

<style>
  .topic {
    display: flex;
    align-items: center;
    padding: 10px;
  }
  .avatar {
    flex-shrink: 0;
    /* margin-right: 5px; */
  }

  .topic-body {
    margin: 0 5px;
    display: flex;
    flex: 1;
    justify-content: space-between;
  }
  .time {
    flex-shrink: 0;
  }
  .title {
    font-weight: normal;
    font-size: 16px;
  }
  .topic-count {
    font-size: 12px;
  }
  .topic-count span:first-child {
    color: #9e78c0;
  }
</style>
