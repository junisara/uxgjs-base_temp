<template>
  <div class="row itemList" v-cloak>
    <div class="col-sm-6 col-md-4 col-md-3 my-3" v-for="item in filterItems" :key="item.id">
      <div class="card">
        <div class="jsImgSizeSame">
          <img class="card-img-top" v-show="item.image" :src="item.image" alt="썸네일">
        </div>
        <div class="card-body">
          <h5 class="card-title">{{item.title}}</h5>
          <p class="card-text desc">{{item.desc}}</p>
          <p class="card-text text-center price">원가 <span>{{item.price}}</span>원 <small>(할인 <span>{{item.price}}%</span>)</small> </p>
          <h2 class="text-center final-price">최종가격 <span>{{item.finalPrice}}</span>원</h2>
          <!-- <a  href="/aaa/skin.html" target="_blank" class="btn btn-primary">샘플보기</a> -->
          <a :href="sampleSkinUrl + item.code + '/' + sampleSkinindex" target="_blank" class="btn btn-outline-primary float-left">샘플보기</a>
          <button @click="$emit('popEvent',item)" class="btn btn-primary float-right">구매하기</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'ItemsList',

  mounted() {
    this.itemList();
    // this.$nextTick(function () {
    //   // 모든 화면이 렌더링된 후 실행합니다.
    //   this.imageResize();
    // })
  },

  data() {
    return {
      sampleSkinUrl: '/',
      sampleSkinindex: 'index.html',
    }
  },

  computed: {
    ...mapState({
      items: state => state.items.items
    }),

    filterItems: function () {
      var itemsTotal = [];
      if( this.items ) {
        this.items.forEach((el) => {
          if( !el.deactivate ) {
             itemsTotal.push(el);
          }
        })

        return itemsTotal;
      }
    }
  },

  methods: {
    ...mapActions({
      itemList: 'itemsAdmin/itemList' // this.increment()을 this.$store.dispatch('increment')에 매핑
    }),

    // imageResize() {
    //   console.log('index 1 :');
    //   // index(리스트)에 나오는 .jsImgSizeSame로 감싸여 있는 이미지의 크기와 위치를 자동조정
    //   $('.itemList .jsImgSizeSame').each(function(index) {

    //     console.log('index :', index);

    //     $(this).children('img').one("load", function() {
    //       }).each(function() {
    //         this.imageSizeSame($(this).parent(), 0.7);
    //         });


    //   });
    // }
  },





}
</script>

<style lang="scss">
.jsImgSizeSame {
  max-height:13rem;
  overflow: hidden;
}
.price {
  margin-bottom: 0.5rem;
  span {
    color: $gray-900;
  }
  small span {
    color:$theme-color-accent;
  }
}
.final-price {
  margin-bottom: 2.5rem;
  color: $gray-900;
  span {
    font-size: 120%;
    color: $red;
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

</style>


