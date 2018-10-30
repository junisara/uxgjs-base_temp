<template>
  <div class="itemDetail" v-cloak>
    <div class="row">
      <div class="col-md-2 col-sm-12  d-none d-lg-block">
      <nuxt-link to="/" class="rounded-circle back-btn" ><i class="xi xi-angle-left-thin xi-3x"></i></nuxt-link>
      </div>

      <div class="col-md-4 col-sm-12">
        <div class="jsImgSizeSame">
          <img class="card-img-top" v-show="itemImage" :src="itemImage" alt="썸네일">
        </div>
      </div>

      <div class="col-md-6 col-sm-12 pt-5">
        <h4 class="card-text my-1 code">{{itemCode}}</h4>
        <h3 class="card-title mt-0">{{itemTitle}}</h3>
        <p class="card-text desc">{{itemDesc}}</p>
        <p class="card-text mb-0 mt-5 price">원가 <span>{{itemPrice | currency}}</span>원 <small>(할인 {{itemDiscount}}%)</small> </p>
        <div class="mb-5 final-price">최종가격 <span>{{itemFinalPrice | currency}}</span>원</div>

          <a v-if="sampleUrl" :href="sampleUrl" target="_blank" class="btn btn-outline-primary mr-2"><i class="xi-eye-o"></i> 샘플보기</a>
          <a v-else :href="sampleSkinUrl + itemCode + '/' + sampleSkinindex" target="_blank" class="btn btn-outline-primary mr-2"><i class="xi-eye-o"></i> 샘플보기</a>

        <router-link :to="{ path: '/orders/' + itemId }" class="btn btn-primary"><i class="xi-basket"></i> 구매하기</router-link>
        <!-- <button @click="showOrderFormPopup(item)" class="btn btn-primary"><i class="xi-basket"></i> 구매하기</button> -->
      </div>
    </div>

    <div class="row justify-content-center">
      <div class="col-10">
        <LicenseText />
      </div>
    </div>
    
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import LicenseText from '~/components/LicenseText';
import siteConfig from '~/★uxgjs-base-admin/site.config'

export default {
  components: {
    LicenseText
  },
  created() {
    this.itemDetail( this.$route.params.id )
  },
  // mounted() {
  //   this.itemDetail( this.$route.params.id )
  // },

  watch: {
    // 라우터 객체를 감시하고 있다가 fetchData() 함수를 호출한다
    '$route': 'itemDetail($route.params.id)'
  },

 computed: {
    ...mapState({
      item: state => state.items.itemDetail
    }),

   itemId ()         {if(this.item) return this.item.id },
   itemCode ()       {if(this.item) return this.item.code },
   sampleUrl ()      {if(this.item) return this.item.sampleUrl },
   itemTitle ()      {if(this.item) return this.item.title },
   itemDesc ()       {if(this.item) return this.item.desc },
   itemPrice ()      {if(this.item) return this.item.price },
   itemDiscount ()   {if(this.item) return this.item.discount },
   itemFinalPrice () {if(this.item) return this.item.finalPrice },
   itemImage ()      {if(this.item) return this.item.image },

    sampleSkinUrl: function () {
      return siteConfig.skinPath.sampleSkinUrl;
    },
    sampleSkinindex: function () {
      return siteConfig.skinPath.sampleSkinindex;
    },
 },

  methods: {
    ...mapActions({
      itemDetail: 'items/itemDetail' // this.increment()을 this.$store.dispatch('increment')에 매핑
    }),
  }
}
</script>

<style lang="scss" scoped>

  .itemDetail {
    margin-top:3rem;
  }
  .back-btn {
    display: flex;
    align-items: center;
    justify-content: space-around;
    position: absolute;
    top: calc(50% - 40px);
    left: calc(50% - 40px);
    background: $gray-200;
    width: 5rem;
    height: 5rem;
    color:#fff;
  }
  .code {
    font-size: 1rem;
    color: $theme-color-main
  }
  .price {
    span {
      color: #000;
    }
    small {
      color:$theme-color-accent;
    }
  }
  .final-price {
    font-weight: 100;
    font-size: 2.6rem;
    color: $gray-900;
    span {
      color: $theme-color-main;
    }
  }



</style>
