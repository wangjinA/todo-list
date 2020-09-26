<template>
  <div class="hello">
    <input type="text" v-model="content" id="input" @keyup.enter="add">
    <!-- <div class="list-container">
      <h4>待完成</h4>
      
      <h4>已完成</h4>
    </div> -->
    <div class="module-wrap">
      <div v-for="(moduleItem, index) in moduleList" :key="index" :class="`module-item module-item${index+1}`">
        <div class="module-title">
          <div>{{moduleItem.title}}</div>
          <span>+</span>
        </div>
        <ul class="module-list">
          <template v-for="(item, i) in list">
            <li :key="i" v-if="item.status === index">
              <div class="ml-content">
                <span style="color:#9a8c8c;">{{i+1}}. </span>
                {{item.content}}
              </div>
              <div>
                <span>{{item.name}}</span>
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
export default {
  name: 'HelloWorld',
  data() {
    return {
      moduleList: [{
        title: '待完成',
      }, {
        title: '已完成',
      },{
        title: '-',
      }, {
        title: '-',
      }],
      list: [{
        id: 1,
        name: '小汪',
        content: '文件服务对接',
        createTime: '09-26',
        overTime: '09-27',
        status: 0, // 0 待完成 1 已完成
      }, {
        id: 1,
        name: '小汪',
        content: '首页修改',
        createTime: '09-26',
        overTime: '09-27',
        status: 1, // 0 待完成 1 已完成
      }],
      content: ''
    }
  },
  methods: {
    add() {
      this.list.unshift({
        name: '小汪',
        content: this.content,
        createTime: new Date().toLocaleDateString(),
        status: 0
      })
    }
  }
}
</script>

<style lang="less" scoped>
.hello{
  // width: 800px;
  // padding: 30px;
  // position: fixed;
  // left: 0;
  // right: 0;
  // margin: auto;
  width: 100vw;
  height: 100vh;
  padding: 10vh 10vw;
  .module-wrap{
    display: grid;
    grid-template: repeat(2, 1fr) ~'/' repeat(2, 1fr);
    height: 100%;
    .module-item{
      padding: 20px;
      .module-list{
        list-style: none;
        li{
          display: flex;
          padding: 10px;
          align-items: baseline;
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
      .module-title{
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
  .list-container{
    padding: 10px 0;
  }
  #input{
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