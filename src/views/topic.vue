<template>
  <div class="content">
    <div class="title">
        {{topic.title}}
    </div>
    <div class="change">
        <p>•发布于{{ topic.last_reply_at | formatTime }}•作者{{ topic.author.loginname }}•{{ topic.visit_count }}次浏览•最后一次编辑是{{ topic.last_reply_at | formatTime }}•来自{{ topic.tab | source }}</p>
    </div>
    <div v-html="topic.content" class="main"></div>
    
    <div class="reply">
        <p>{{ topic.replies.length }}回复</p>
        <ul class="reply-list">
            <li v-for="(reply,index) in replies">
                <div class="reply-main">
                    <div class="reply-pic"><img :src="reply.author.avatar_url"/></div>
                    <div class="reply-msg">
                        <p><span class="reply-user">{{ reply.author.loginname}}</span>
                        <a>{{ index+1 }}楼•{{ reply.create_at | formatTime }}</a>
                        <span v-if="reply.reply_id" class="author-tag">作者</span></p>
                        <p v-html="reply.content" class="reply-content"></p>
                    </div>
                </div>
                <span class="ups">赞{{ reply.ups.length }}</span>
            </li>
        </ul>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      topic: {},
      replies:[]
    }
  },
  created () {
    this.axios.get('/topic/' + this.$route.params.id).then(res => {
      this.topic = res.data.data
      this.replies = res.data.data.replies
      console.log(this.topic)
    })
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
    },
    source (value) {
        if(value == 'share'){
            return '分享'
        }else if(value == 'ask'){
            return '问答'
        }else if(value == 'job'){
            return '招聘'
        }else{
            return '其他'
        }
    }
  },
}
</script>

<style>
    *{
        padding: 0;
        margin: 0;
        font-size: 14px;
        color: #333;
    }
    .main p {
    display: block;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    }
    a {
        color: #08c;
    }
    li{
        font-size: 14px;
        display: list-item;
        text-align: -webkit-match-parent;
    }
    /* ul,li{
        list-style: none;
    } */
    img{
        max-width: 100%;
    }
    .content{
        background: white;
        width:787px;
        padding: 10px;
        margin: 50px;
        overflow: hidden;
    }
    .content .title{
        width: 75%;
        font-size: 22px;
        font-weight: bolder;
    }
    .content .change>p{
        font-size: 12px;
        color: #838383;

        padding: 10px 0;
    }
    .content .main{
        padding: 10px;
        border-top: 1px solid #e5e5e5;
        color: #333;
    }
    
    .content .reply{
        padding: 10px;
        
        /* width: 100%; */
    }
    .content .reply .reply-list>li{
        border-top: 1px solid #f0f0f0;
        /* height: 60px; */
        padding: 10px 0;
        display: flex;
        width: 100%;
        justify-content: space-between;
    }
    .content .reply .reply-list>li .reply-main{
        display: flex;
        align-items: center;
    }
    .content .reply .reply-list>li .reply-main .reply-pic{
        width: 32px;
        height: 32px;
        border-radius: 3px;
        overflow: hidden;
    }
    .content .reply .reply-list>li .reply-main .reply-pic>img{
        width:100%;
        height: 100%;
    }
    .content .reply .reply-list>li .reply-main .reply-msg{
        display: flex;
        flex-flow: column wrap;
        justify-content: flex-start;
        align-content: flex-start;
        align-items: flex-start;
        padding-left: 5px;
    }
    .content .reply .reply-list>li .reply-main .reply-msg .author-tag{
        color: white;
        background-color: #6ba44e;
        padding: 0 1px;
        text-align: center;
    }
    .content .reply .reply-list>li .reply-main .reply-msg .reply-content{
        text-indent: 10px;
    }
</style>
