<template>
  <div class="hy-todo-list" @click.self="currentItem = {}">
    <div class="thl-name-wrap">
      <input type="text" v-model="name" placeholder="请输入你的姓名">
    </div>
    <input type="text" v-model="content" id="htl-input" @keyup.enter="add(currentItem.status || 0)">
    <div class="htl-module-wrap">
      <div v-for="(moduleItem, index) in moduleList" :key="index"  :class="`htl-module-item htl-module-item${index+1}`">
        <div class="htl-module-title">
          <div>{{moduleItem.title}}</div>
          <span @click="add(index)">+</span>
        </div>
        <ul class="htl-module-list">
          <template v-for="(item, i) in list">
            <li :key="i" v-if="item.status === index" @click="itemHandler(item)" :class="currentItem.id==item.id && 'active'">
              <div class="ml-content">
                <span style="color:#9a8c8c;">{{i+1}}. </span>
                {{item.content}}
              </div>
              <div>
                <span class="margin-right: 10px;">{{item.name}}</span>
                <span class="ml-ct">{{item.createTime}}</span>
              </div>
            </li>
          </template>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import axios from './fetch'
export default {
  name: 'hy-todo-list',
  data() {
    return {
      name: localStorage.getItem('todoUserName') || '',
      content: '',
      moduleList: [{
        title: '待完成',
      }, {
        title: '已完成',
      },{
        title: '-',
      }, {
        title: '-',
      }],
      list: [],
      currentItem: {}
    }
  },
  watch: {
    name(name){
      localStorage.setItem('todoUserName', name)
    },
    currentItem: {
      deep: true,
      handler(item) {
        if(JSON.stringify(item) != '{}'){
          this.content = item.content
          this.name = item.name
        }else {
          this.content = item.content
        }
      }
    }
  },
  methods: {
    itemHandler(item) {
      if(this.currentItem.id === item.id){
        this.currentItem = {}
      }else {
        this.currentItem = item
      }
    },
    add(status = 0) {
      console.log(status);
      axios.$post('/api/addTodoList', {
        ...this.currentItem,
        name: this.name,
        content: this.content,
        status,
      }).then(res=>{
        if(res.status){
          this.content = ''
          this.f5()
          this.currentItem = {}
        }
      })
    },
    f5() {
      axios.$get('/api/getTodoList')
        .then(res=>{
          this.list = res.data
        })
    }
  },
  created() {
    this.f5()
  }
}
</script>

<style lang="less" scoped>
.hy-todo-list{
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  color: rgb(64, 64, 64);
  width: 100vw;
  height: 100vh;
  padding: 10vh 10vw;
  .thl-name-wrap{
    text-align: center;
    margin-bottom: 12px;
    input{
      border: 0;
      height: 35px;
      outline: 0;
      font-size: 16px;
      text-align: center;
    }
  }
  .htl-module-wrap{
    display: grid;
    grid-template: repeat(2, 1fr) ~'/' repeat(2, 1fr);
    height: 100%;
    .htl-module-item{
      padding: 20px;
      .htl-module-list{
        list-style: none;
        li{
          display: flex;
          padding: 10px;
          align-items: baseline;
          &.active,
          &:hover{
            background-color: var(--bgc);
            opacity: .9;
            cursor: pointer;
          }
          .ml-content{
            flex: 1;
            padding-right: 30px;
          }
          .ml-ct{
            margin-left: auto;
            flex-shrink: 0;
            color: #BCC3C5;
            font-size: 14px;
          }
        }
      }
      .htl-module-title{
        background-color: var(--bgc);
        color: var(--color);
        padding: 10px;
        display: flex;
        align-content: center;
        justify-content: space-between;
        cursor: pointer;
        span{
          font-size: 20px;
          font-weight: 700;
        }
      }
      &1{
        border-right: 1px solid #d9d9d9;
        --color: #F76333;
        --bgc: #FFEDE7;
      }
      &2{
        --color: #3FB6DA;
        --bgc: #D6F4FE;
      }
      &3{
        border-right: 1px solid #d9d9d9;
        border-top: 1px solid #d9d9d9;
        --color: #FEAE6A;
        --bgc: #FFEFCB;
      }
      &4{
        border-top: 1px solid #d9d9d9;
        --color: #89C557;
        --bgc: #EFD;
      }
    }
    
    
  }
  #htl-input{
    width: 100%;
    height: 40px;
    padding: 7px 10px;
    line-height: 26px;
    border: 1px solid #c0ccda;
    border-radius: 4px;
    transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  }
}
</style>
<style>
*{
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
</style>