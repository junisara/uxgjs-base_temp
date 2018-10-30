<template>
    <div class="row justify-content-center">

      <div v-if="account" class="col-10 order-popup">
        <h1>주문 하기</h1>

          <div v-if="typeof(formError) !== 'undefined'" v-html="formError" v-bind:class="{ 'alert alert-danger': formError }" ></div>
         <!-- 주문 성공 시 메시지 -->
        <div v-if="step == 1" class="message alert alert-primary">
          <div v-if="typeof(formSuccess) !== 'undefined'" v-html="formSuccess"></div>
          <ul class="payment-info">
            <li class="bankname"> 은행명 : <span>{{payment.bank.name}}</span></li>
            <li class="account-number"> 계좌번호 : <span>{{payment.bank.accountNumber}}</span></li>
            <li class="depositor"> 예금주 : <span>{{payment.bank.depositor}}</span></li>
          </ul>
        </div>
        <div v-if="step == 2" class="message alert alert-danger">
          <div v-html="formSuccess"></div>
        </div>

        <!-- 주문 화면 -->
        <div class="card flex-md-row mb-5 shadow-sm h-md-250">
          <img class="card-img-left flex-auto d-none d-md-block" alt="Thumbnail" style="width: 150px; height: 200px;" v-show="itemImage" :src="itemImage" data-holder-rendered="true">
          <div class="card-body d-flex flex-column align-items-start">
            <strong class="d-inline-block mb-2 code">{{itemCode}}</strong>
            <h3 class="my-0 pt-0">
              <a class="text-dark" href="#">{{itemTitle}}</a>
            </h3>
            <div class="mb-1 mt-4 text-muted price">원가 <span>{{itemPrice | currency}}</span>원 <small>(할인 {{itemDiscount}}%)</small></div>
             <p class="card-text mb-auto final-price">최종가격 <span>{{itemFinalPrice | currency}}</span>원</p>
          </div>
        </div>

          <form>
            <div class="form-group row justify-content-center">
              <label for="tistoryId" class="col-sm-2 col-form-label">티스토리 아이디</label>
              <div class="col-sm-10">
                <input type="text" class="form-control" :class="{ 'form-control-plaintext': step }" :readonly="step ? true : false" id="tistoryId" name="tistoryId" v-model="tistoryId" placeholder="티스토리 아이디를 입력하세요" v-validate="'alpha_dash'" data-vv-as="티스토리 아이디">
                <div class="error" v-if="errors.has('tistoryId')">※ {{ errors.first('tistoryId') }}</div>
              </div>
            </div>
            <div class="form-group row justify-content-center">
              <label for="tistoryWebsite" class="col-sm-2 col-form-label">사용할 블로그 주소</label>
              <div class="col-sm-10">
                <input type="text" class="form-control" :class="{ 'form-control-plaintext': step }" :readonly="step ? true : false" id="tistoryWebsite" name="tistoryWebsite" v-model="tistoryWebsite" placeholder="사용할 블로그 주소를 입력하세요" v-validate="'url'" data-vv-as="사용할 블로그 주소">
                <div class="error" v-if="errors.has('tistoryWebsite')">※ {{ errors.first('tistoryWebsite') }}</div>
              </div>
            </div>
          </form>

        <div class="text-center btn-wrap">
          <button @click="orderAdd" v-if="!step" class="btn btn-danger btn-lg mr-2"><i class="xi-won"></i> 주문하기</button>
          <button @click="$router.replace($route.query.redirect || '/')" class="btn btn-outline-secondary btn-lg">{{ !step ? '취소':'닫기'}}</button>
        </div>



        <div class="row justify-content-center">
          <div class="col-12">
            <LicenseText />
          </div>
        </div>

      </div>


      <!-- 로그인 요청 화면 -->
      <div v-else class="col-10 order-popup">
        <h1 class="title">로그인 해주세요</h1>
        <div class="alert alert-primary text-center">
            주문을 하기전에 로그인을 먼저 해야 합니다.


             <div class="btn-wrap mt-5 mb-2">
              <nuxt-link class="btn btn-primary mr-2" to="/account/login" title="로그인">로그인</nuxt-link>
              <button @click="$router.replace($route.query.redirect || '/')" class="btn btn-outline-secondary">닫기</button>
            </div>
        </div>


          <div class="form-group member-join mt-3 text-center">
            아직 회원가입을 하지 않은경우 <nuxt-link :to="{ path: '/account/login', params: { windowSignup: true }}"  title="회원가입"><b>회원가입</b></nuxt-link> 을 먼저해주세요.
          </div>

      </div>

    </div>
</template>

<script>
import Vue from 'vue';
import siteConfig from '~/★uxgjs-base-admin/site.config'
import { mapState, mapActions } from 'vuex';
import LicenseText from '~/components/LicenseText';
import VeeValidate from 'vee-validate';
import ko from 'vee-validate/dist/locale/ko.js';
Vue.use(VeeValidate, {
  locale: 'ko',
  dictionary: {
    ko
  }
});

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
    '$route': 'itemDetail($route.params.id)'
  },

  computed: {
    ...mapState([
      'account',
    ]),
    ...mapState({
      item: state => state.items.itemDetail
    }),

    payment: function () {
    return siteConfig.payment;
    },

    itemId ()         {if(this.item) return this.item.id },
    itemCode ()       {if(this.item) return this.item.code },
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

  data() {
    return {
      formError: null,
      formSuccess: null,
      order: null,
      step: null,
      tistoryId: null,
      tistoryWebsite: null,
    }
  },

  methods: {
    ...mapActions({
      itemDetail: 'items/itemDetail' // this.increment()을 this.$store.dispatch('increment')에 매핑
    }),

    EmailSignupButton () {
      console.log('sdfdfdfd');

      this.$router.push('/account/login')

    },

    resetFormMessages() {
      this.formSuccess = this.formError = ''
    },

    orderAdd() {
      console.log('dasdsadsadasdas');

       if (!this.tistoryId) {this.formError = '티스토리 아이디를 입력해야 합니다.'; return;}
        this.$validator.validateAll();
      if (this.errors.any()) {
        alert('잘못입력한 부분이 있습니다. 수정후 다시 등록하세요')
        return
      }

      this.order = {
        accountEmail: this.account.email,
        userId: this.account.uid,
        itemId: this.item.id,
        account: this.account,
        item: this.item,
        skinDownloadCnt: 0,
        step: 1, // 1: 주문, 2: 확인

        tistoryId: this.tistoryId,
        tistoryWebsite: this.tistoryWebsite,

        createDate:new Date(),
        modifyDate:new Date()
      }
      this.$store.dispatch('orders/orderAdd', this.order)
      .then((formSuccess) => {

        if ( formSuccess ) {
          this.step = 1
          this.formSuccess = "감사합니다. 주문이 접수 되었습니다. <br>아래의 계좌로 입금을 해주세요.<br>입금을 확인하면 <a href='/orders'>구매리스트</a>에서 다운로드를 받을 수 있습니다."
        } else {
          this.step = 2
          this.formSuccess = "이미 주문한 내역이 있습니다. <a href='/orders' style='font-weight:700'>구매리스트</a>에서 확인해 보세요 "
        }
      })
      .catch((err) => {
          this.formError = '등록에 실패하였습니다. 1'
          console.error(err)
        })
        this.resetFormMessages();
    },

  }
}
</script>

<style lang="scss" scoped>
  form {
    margin-bottom: 3rem;
  }
  .message {
    a {
      font-weight: 600;
      color: $theme-color-main;
    }
    .payment-info {
      margin: 1rem 0;
      background: #fff;
      padding-top: 0.5rem;
      padding-bottom: 0.5rem;
      border-radius: 0.5rem;
      span {
        color: $theme-color-accent;
        font-weight: bold;
      }
    }
  }

  .code {
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
  .error {
    color: $danger;
    font-size: 1rem;
  }

</style>
