<template>
  <div class="scroll" :style="{ height: height + 'px' }">
    <div class="list">
      <Loading v-if="loading"></Loading>
      <div
        class="item"
        v-for="(item, index) in list"
        @click="goDetail(item.filmId)"
        :key="index"
      >
        <div class="left">
          <img :src="item.poster" />
        </div>
        <div class="middle">
          <div>{{ item.name }}</div>
          <div>
            <span>观众评分</span>
            <span>{{ item.grade }}</span>
          </div>
          <div>主演：{{ item.actors | parseActors }}</div>
          <div v-if="type == 1">{{ item.nation }} | {{ item.runtime }}分钟</div>
        </div>
        <div class="right">
          <span v-if="type == 1">购票</span>
          <span v-else>预约</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
// loading的导入
import Loading from "@/components/Loading";
import { nowPlayingListData, comingSoonListData } from "@/api/api";
export default {
  data() {
    return {
      height: 0,
      bs: null,
      loading: true,
    };
  },
  props: ["list", "type"],
  components: {
    Loading,
  },
  created() {
    if (this.list.length > 0) {
      this.loading = false;
    }
  },
  filters: {
    parseActors: function (value) {
      let actors = "";
      value.forEach((element) => {
        actors += element.name + " ";
      });
      return actors;
    },
  },
  methods: {
    goDetail: function (filmId) {
      this.$router.push({ name: "detail", params: { filmId } });
    },
  },
  mounted() {
    // 获取可视高度
    this.height = document.documentElement.clientHeight - 100;
    this.$nextTick(() => {
      this.bs = new BScroll(".scroll", {
        // 激活上滑动的事件监听
        pullUpLoad: true,
        // 激活下滑的事件监听
        pullDownRefresh: true,
        // 默认情况下使用bs后，它会禁止浏览器的点击事件
        click: true,
      });
      // 上拉刷新
      this.bs.on("pullingUp", () => {
        console.log("上拉刷新");
        // 获取数据
        //本次pullup动作已经完成，继续准备下一次pullup
        this.bs.finishPullUp();
      });
      this.bs.on("pullingDown", () => {
        console.log("下拉刷新");
        // 获取数据
        //本次pulldown动作已经完成，继续准备下一次pulldown
        this.bs.finishPullDown();
      });
    });
  },
  beforeDestroy() {
    // 节约资源
    this.bs = null;
  },
};
</script>
<style lang="scss" scoped>
.list {
  margin-bottom: 50px;
  .item {
    margin-top: 15px;
    padding-bottom: 15px;
    display: flex;
    color: #797d82;
    font-size: 13px;
    border-bottom: 1px solid #ededed;

    .left {
      width: 77px;
      height: 100px;
      margin-left: 20px;
      img {
        width: 66px;
        height: 100%;
      }
    }

    .middle {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      width: 55%;

      div:nth-of-type(1) {
        color: #191a1b;
        font-size: 16px;
      }

      div:nth-of-type(3) {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }

    .right {
      width: 15%;
      display: flex;
      align-items: center;
      margin-right: 20px;

      span {
        border: 1px solid #ff5f16;
        background: white;
        color: #ff5f16;
        border-radius: 2px;
        height: 25px;
        line-height: 25px;
        font-size: 13px;
        width: 50px;
        text-align: center;
      }
    }
  }
}
</style>