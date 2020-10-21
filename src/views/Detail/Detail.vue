<template>
  <div>
    <div class="detail">
      <div class="img">
        <img v-lazy="film.poster" />
      </div>
      <div class="introduction">
        <div class="col">
          <div class="film-name">
            <span class="name">{{ film.name }}</span>
            <span class="item">{{ film.filmType.name }}</span>
          </div>
          <div class="film-grade">
            <span class="grade">{{ film.grade }}</span>
            <span class="grade-text">分</span>
          </div>
        </div>

        <div class="film-category grey-text">{{ film.category }}</div>
        <div class="film-premiere-time grey-text">
          {{ film.premiereAt | parsePremiereAt }}上映
        </div>
        <div class="film-nation-runtime grey-text">
          {{ film.nation }}| {{ film.runtime }}分钟
        </div>
        <div class="test grey-text">
          {{ film.synopsis }}
        </div>
      </div>
      <div class="actors">
        <div class="actors-title-bar">
          <span class="actors-title-text">演职人员</span>
        </div>
        <Swiper :key="'actors_' + film.actors.length">
          <div
            v-for="(item, index) in film.actors"
            :key="index"
            class="swiper-slide"
          >
            <div class="lazy-image">
              <img v-lazy="item.avatarAddress" alt="" />
              <span class="actor-name">{{ item.name }}</span>
              <span class="actor-role">{{ item.role }}</span>
            </div>
          </div>
        </Swiper>
      </div>
      <div class="photos">
        <div class="photos-title-bar">
          <span class="photos-title-text">剧照</span>
        </div>
        <Swiper :key="'photos_' + film.photos.length">
          <div
            v-for="(key, obj) in film.photos"
            :key="obj"
            class="swiper-slide"
          >
            <div>
              <img v-lazy="key" alt="" />
            </div>
          </div>
        </Swiper>
      </div>
    </div>
  </div>
</template>
<script>
import moment from "moment";
import { moiveDetailData } from "@/api/api";
import Swiper from "@/components/Swiper";
export default {
  data() {
    return {
      film: { actors: [], filmType: [], photos: [] },
    };
  },
  async mounted() {
    let ret = await moiveDetailData(this.$route.params.filmId);
    this.film = ret.data.data.film;
  },
  filters: {
    parsePremiereAt: function (value) {
      return moment(value * 1000).format("YYYY-MM-DD");
    },
  },
  components: {
    Swiper,
  },
  created() {
    //发起通知，通知pp.vue组件移除底部菜单
    this.eventBus.$emit("footernav", false);
  },
  beforeDestroy() {
    // 发起通知，通知app.vue组件恢复底部菜单
    this.eventBus.$emit("footernav", true);
  },
  methods: {
    // 返回上一页
    goBack: function () {
      this.$router.go(-1);
    },
  },
};
</script>
<style lang="scss" scoped>
.detail {
  margin: 0;
  overflow-x: hidden;
  background-color: #f4f4f4;
  user-select: none;

  .introduction {
    padding: 15px;
    padding-top: 12px;
    background-color: #fff;
    .col {
      display: flex;
      align-items: center;
      .film-name {
        width: 256px;
        .name {
          color: #191a1b;
          font-size: 18px;
          height: 24px;
          line-height: 24px;
          margin-right: 7px;
        }
        .item {
          font-size: 9px;
          color: #fff;
          background-color: #d2d6dc;
          height: 14px;
          line-height: 14px;
          padding: 0 2px;
          border-radius: 2px;
          display: inline-block;
        }
      }
      .film-grade {
        width: calc(100% - 250px);
        text-align: right;
        color: #ffb232;
        .grade {
          font-size: 18px;
          font-style: italic;
        }
        .grade-text {
          font-size: 10px;
        }
      }
    }
    .grey-text {
      font-size: 13px;
      color: #797d82;
      margin-top: 4px;
    }
  }
  .actors {
    margin-top: 10px;
    background-color: #fff;
    .actors-title-bar {
      width: 100%;
      padding: 15px;
      span {
        display: block;
        text-align: center;
      }
      .actors-title-text {
        font-size: 16px;
        text-align: left;
        color: #191a1b;
      }
      .actor-name {
        display: inline-block;
        height: 22.5px;
        line-height: 22px;
      }
      .actor-role {
        font-size: 10px;
        color: #797d82;
      }
    }
    .swiper-slide {
      width: 85px;
      min-width: 85px;
      position: relative;
      margin-right: 10px;
      cursor: pointer;
      display: block;
      float: left;
      img {
        width: 80px;
        margin-left: 5px;
      }
      .lazy-image {
        span {
          padding-top: 10px;
          font-size: 12px;
          color: #191a1b;
          width: 85px;
          height: 18px;
          overflow: hidden;
        }
      }
    }
  }
  .photos {
    margin-top: 10px;
    margin-bottom: 60px;
    background-color: #fff;
    .photos-title-bar {
      width: 100%;
      padding: 15px;
      .actors-title-text {
        font-size: 16px;
        text-align: left;
        color: #191a1b;
        line-height: 22px;
      }
    }
    .swiper-slide {
      height: 115px;
      background: rgb(255, 255, 255);
      div {
        margin-right: 3px;
        width: 150px;
        height: 100px;
        position: relative;
        margin-right: 10px;
        overflow: hidden;
        img {
          width: 100%;
          position: absolute;
          top: 0;
        }
      }
    }
  }
  .img {
    width: 100%;
    height: 260px;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>