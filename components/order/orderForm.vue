<template>
    <div class="container">
      <div v-if="account" class="order-popup">
        <h1 class="title">주문 하기</h1>
        <div v-if="step" class="message alert alert-primary">
          <div v-if="step == 1">
            감사합니다. 주문이 접수 되었습니다. <br>
            아래의 계좌로 입금을 해주세요.<br>
            입금을 확인하면 <a href="/orders">구매리스트</a>에서 다운로드를 받을 수 있습니다.
            </div>
          <div v-if="step == 2">

          </div>
          <ul class="payment-info">
            <li class="bankname"> 은행명 : <span>{{payment.bank.name}}</span></li>
            <li class="account-number"> 계좌번호 : <span>{{payment.bank.accountNumber}}</span></li>
            <li class="depositor"> 예금주 : <span>{{payment.bank.depositor}}</span></li>
          </ul>
        </div>

        <div class="item-wrap">
          <img class="img" v-show="item.image" :src="item.image" alt="썸네일">
          <div class="order-body">
            <h5 class="title">{{item.title}}</h5>
            <p class="desc">{{item.desc}}</p>
            <p class="price">원가 <span>{{item.price}}</span>원 <small>(할인 <span>{{item.price}}%</span>)</small> </p>
            <h2 class="final-price">최종가격 <span>{{item.finalPrice}}</span>원</h2>
          </div>
        </div>

        <div class="btn-wrap">
          <button @click="orderAdd" v-if="!step" class="btn btn-primary mr-2">주문하기</button>
          <button @click="$emit('close')" class="btn btn-outline-primary">{{ !step ? '취소':'닫기'}}</button>
        </div>
      </div>

      <div v-else class="order-popup">
        <h1 class="title">로그인 해주세요</h1>
        <div class="alert alert-primary text-center">

            주문을 하기전에 로그인을 먼저 해야 합니다.

             <div class="btn-wrap">
              <router-link class="btn btn-primary mr-2" to="/account/login" title="로그인">로그인</router-link>
              <button @click="$emit('close')" class="btn btn-outline-primary">닫기</button>
            </div>

        </div>
      </div>

    </div>
</template>


<script>
import { mapState, mapActions} from 'vuex';
import siteConfig from '~/★uxgjs-base-admin/site.config'

export default {
  name: 'OrderForm',

  mounted() {
    // this.ordersList(this.account);
    // this.loginCheck(this.account);
  },

  computed: {
    ...mapState([
      'account'
    ]),
    payment: function () {
      return siteConfig.payment;
    }
  },

  data() {
    return {
      order: null,
      step: null
      // noticeMessage: null,
    }
  },

  props : [
      'item',
  ],

  methods : {
    loginCheck () {

    //  if(!this.account) {

    //  }

    },

    orderAdd(){
      this.order = {
        accountEmail: this.account.email,
        itemId: this.item.id,
        account: this.account,
        item: this.item,
        step: 1, // 1: 주문, 2: 확인
        createDate:new Date(),
        modifyDate:new Date()
      }
      this.$store.dispatch('ordersAdmin/orderAdd', this.order)
      .then(() => {
        this.step = 1
        // this.noticeMessage = "주문이 되었습니다. "
      })
    }
  },
}
</script>

<style lang="scss">
.order-popup {
    width: 100%;
    max-width: 64rem;
    padding: 1.5rem;
    margin: auto;
    .message {
      a {
        font-weight: 600;
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
    h1.title {
      color:$gray-900;
      text-align: center;
      margin-bottom: 2rem;
    }
    .item-wrap {
      padding-top: 1.5rem;
      padding-bottom: 1.5rem;
      border-top: 1px solid $gray-300;
      border-bottom: 1px solid $gray-300;
      img {
        float: left;
        max-width: 10rem;
        max-height: 10rem;
        margin-right: 2rem;
        margin-bottom: 2rem;
      }
      .title {
        color: $gray-900;
      }
      .final-price {
        margin-bottom: 1rem;
      }
    }
    .btn-wrap {
      margin-top: 2rem;
      margin-bottom: 3rem;
      text-align: center;
    }
}
</style>
