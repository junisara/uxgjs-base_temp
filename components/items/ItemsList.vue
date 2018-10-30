<template>
<div class="row itemList" v-cloak>
  <div class="col-sm-6 col-md-4 col-md-3 my-3" v-for="(item, index) in filterItems" :key="index">
    <div class="card">
      <div class="jsImgSizeSame">
        <img class="card-img-top" v-show="item.image" :src="item.image" alt="썸네일">
        </div>
        <div class="card-body">

          <router-link :to="{ path: '/item/' + item.id }" class="card-title">{{ item.title }}</router-link>
          <p class="card-text desc">{{item.desc}}</p>
          <p class="card-text text-center mb-0 price">원가 <span>{{item.price | currency}}</span>원 <small>(할인 <span>{{item.discount}}%</span>)</small> </p>
          <h3 class="text-center mt-0 final-price">최종가격 <span>{{item.finalPrice | currency}}</span>원</h3>

          <div class="container btn-wrap">
            <div class="row">
              <div class="col-sm">
                <a v-if="item.sampleUrl" :href="item.sampleUrl" target="_blank" class="btn btn-outline-primary btn-sm btn-block"><i class="xi-eye-o"></i> 샘플보기</a>
                <a v-else :href="sampleSkinUrl + item.code + '/' + sampleSkinindex" target="_blank" class="btn btn-outline-primary btn-sm btn-block"><i class="xi-eye-o"></i> 샘플보기</a>
              </div>
              <div class="col-sm">
                <router-link :to="{ path: '/item/' + item.id }" class="btn btn-outline-primary btn-sm btn-block">자세히보기</router-link>
              </div>
              <div class="col-sm">
                <router-link :to="{ path: '/orders/' + item.id }" class="btn btn-primary btn-block"><i class="xi-basket"></i> 구매하기</router-link>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import siteConfig from '~/★uxgjs-base-admin/site.config'

export default {
  name: 'ItemsList',

  created () {
    this.itemList();
  },
  // mounted() {
  //   this.itemList();
  // },

  computed: {
    ...mapState({
      items: state => state.items.items
    }),

    sampleSkinUrl: function () {
      return siteConfig.skinPath.sampleSkinUrl;
    },
    sampleSkinindex: function () {
      return siteConfig.skinPath.sampleSkinindex;
    },

    filterItems: function () {
      var itemsTotal = [];
      if (this.items) {
        this.items.forEach((el) => {
          if (!el.deactivate) {
            itemsTotal.push(el);
          }
        })
        return itemsTotal;
      }
    }
  },

  methods: {
    ...mapActions({
      itemList: 'items/itemList' // this.increment()을 this.$store.dispatch('increment')에 매핑
    }),
  },
}
</script>

<style lang="scss" scoped>
.card-title {
  font-size: 1.4rem;
  font-weight: 500;
}

.jsImgSizeSame {
  max-height: 13rem;
  overflow: hidden;
}

.price {
  margin-bottom: 0.5rem;

  span {
    color: $gray-900;
  }

  small span {
    color: $theme-color-accent;
  }
}

.final-price {
  margin-bottom: 2.5rem;
  color: $gray-900;

  span {
    font-size: 120%;
    color: $theme-color-main;
  }
}

.card-body {
  .card-title {
    @include ellipsis(2);
    height: 6.4em;
  }

  .desc {
    @include ellipsis(2);
    height: 6.4em;
  }
}

.btn-wrap {
  .col-sm {
    margin-top: 0.5rem
  }
}
</style>
