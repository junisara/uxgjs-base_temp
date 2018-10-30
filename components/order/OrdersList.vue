<template>
<div v-cloak>
  <div v-if="noticeMessage" v-html="noticeMessage" class="alert alert-danger" role="alert"></div>
  <div class="table-responsive">
    <table class="table ">
      <thead>
        <tr>
          <th scope="col" class="d-none d-md-table-cell">번호</th>
          <th scope="col" class="d-none d-md-table-cell">썸네일</th>
          <th scope="col">(제품코드) 제품명</th>
          <th scope="col" @click="sortBy('finalPrice')">구매가격</th>
          <th scope="col" class="d-none d-md-table-cell" @click="sortBy('createDate')">주문일</th>
          <th scope="col" class="d-none d-md-table-cell">다운로드</th>
          <th scope="col">상태</th>
          <th scope="col">삭제</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(order, index) in sortedOrderList" :key="order.id">
          <th class="d-none d-md-table-cell" scope="row">{{index + 1}}</th>
          <td class="d-none d-md-table-cell"><img class="item-img" v-show="order.image" :src="order.image" alt="썸네일"></td>
          <td class="title">
            <div class="small">{{order.code}}</div>
            {{order.title}}
          </td>
          <td class="price text-nowrap">
            <div class="small">가격 : {{order.price | currency}} <span>({{order.discount}}%)</span></div>
            최종가격 : {{order.finalPrice | currency}}
          </td>
          <td class="d-none d-md-table-cell text-center">{{ order.createDate | moment("YYYY-MM-DD HH:mm:ss") }}</td>
          <td class="d-none d-md-table-cell text-center">{{ order.skinDownloadCnt }}</td>
          
          <td class="text-center text-nowrap">
            <mark v-if="order.step === 1" class="text-danger">입금대기</mark>
            <button v-else-if="order.step === 2" @click="fileDownload(order.itemId)" class="btn btn-success btn-block">최신버전 다운로드</button>
            <span v-else>이건~</span>
             <ul v-if="order.skinFiles && order.skinFiles !== null && typeof order.skinFiles === 'object'" class="skin-files">
              <li v-for="(value, key) in order.skinFiles" :key="key">
                <a :href="value" v-text="key"></a>               
              </li>
            </ul>
          </td>

          <td class="text-center text-nowrap">
            <button v-if="order.step === 1" @click="delOrderModal(order)" class="btn btn-link">삭제</button>

          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="alert alert-primary w-100 mt-5 " role="alert">
    ※ <strong>입금대기</strong> : 주문만 접수된 상태 입니다. 입금이 확인되기 전까지의 상태예요 ^^<br>
      ※ <strong>다운로드</strong> : 입금이 확인되면 <mark>다운로드</mark>상태로 변경이 되고 다운로드 할 수 있어요.
  </div>
  <div class="alert alert-info w-100 mt-1 d-flex justify-content-start " role="alert" v-if="sortedOrderList">
    <ul class="payment mb-0">
      <li class="bankname"> 은행명 : <span>{{payment.bank.name}}</span></li>
      <li class="account-number"> 계좌번호 : <span>{{payment.bank.accountNumber}}</span></li>
      <li class="depositor"> 예금주 : <span>{{payment.bank.depositor}}</span></li>
    </ul>
    <!-- <ul class="payment mb-0">
          <li class="bankname"> <span>{{payment.naverpay.name}}</span></li>
          <li class="account-number"> ID : <span>{{payment.naverpay.accountNumber}}</span></li>
          <li class="depositor"> 예금주 : <span>{{payment.naverpay.depositor}}</span></li>
        </ul> -->
  </div>

  <div v-if="showModal">
    <transition name="modal">
      <div class="modal-mask">
        <div class="modal-wrapper">
          <div class="modal-container">
            <div class="modal-body">
              삭제하면 복구가 되지 않아요~ <br>
                그래도 삭제하실 건가요?
            </div>
              <div class="modal-footer">
                <button class="btn btn-light mr-5" @click="showModal=false">안할께요. </button>
                <button class="btn btn-danger" @click="delOrder">네! 삭제하겠습니다. </button>
              </div>

            </div>
          </div>
        </div>
    </transition>
  </div>

</div>
</template>

<script>
import Vue from 'vue';
import vueMoment from 'vue-moment';
import { mapState, mapActions } from 'vuex';
import siteConfig from '~/★uxgjs-base-admin/site.config'

Vue.use(vueMoment);

export default {
  name: 'OrdersList',

  mounted() {
    this.ordersList()
    this.itemsList()

    
  },

  props: [
    'isAdmin',
  ],

  data() {
    return {
      sortKey: 'createDate',
      desc: -1,
      noticeMessage: null,
      showModal: false,
      modalVal: ''
    }
  },

  computed: {
    ...mapState({
      orders: state => state.orders.orders,
      items: state => state.items.items
    }),

    payment: function () {
      return siteConfig.payment;
    },
    contactus: function () {
      return siteConfig.contactus;
    },

    sortedOrderList: function () {
      var ordersTotal = [];
      // var sortKey = this.sortKey ? this.sortKey : "createDate"
      // var order = this.sortOrders[sortKey] || 1
      if (this.orders && !this.orderCnt) {
        this.orders.forEach((el, idx) => {
          const orders = {};
          orders.id = el.id;
          orders.itemId = el.item.id;
          orders.image = el.item.image;
          orders.code = el.item.code;
          orders.title = el.item.title;
          orders.price = el.item.price;
          orders.discount = el.item.discount;
          orders.finalPrice = el.item.finalPrice;
          orders.createDate = el.createDate.seconds;
          orders.skinDownloadCnt = el.skinDownloadCnt;
          orders.step = el.step;
          orders.skinFiles = this.getSkinFiles(el.item.id);
          ordersTotal.push(orders);
        })

        if (this.sortKey) {
          ordersTotal = ordersTotal.slice().sort((a, b) => {
            a = a[this.sortKey]
            b = b[this.sortKey]
            return (a === b ? 0 : a > b ? 1 : -1) * this.desc
          })
        }

        // this.orderCnt = '1';

        // if (sortKey) {
        //   ordersTotal = ordersTotal.slice().sort((a, b) => {
        //     a = a[sortKey]
        //     b = b[sortKey]
        //     // return (a === b ? 0 : a > b ? 1 : -1) * order
        //     return (a === b ? 0 : a > b ? 1 : -1)
        //   })
        // }
        return ordersTotal;
      }
    }

  },

  methods: {
    ...mapActions({
      ordersList: 'orders/ordersList', // this.increment()을 this.$store.dispatch('increment')에 매핑
      itemsList: 'items/itemList' // this.increment()을 this.$store.dispatch('increment')에 매핑
    }),

    fileDownload(itemId) {
      this.$store.dispatch('orders/orderItemFile', itemId)
        .then((fileurl) => {
          if (fileurl) {
            window.location.assign(fileurl);
          } else {
            this.noticeMessage = "정상적으로 구매 후 다운로드가 가능합니다. 구매했으나 다운로드가 되지 않는 경우 관리자에게 <a href='mailto:{{contactus.email}}'>이메일</a>  로 문의 바랍니다."
          }
        })
    },

    getSkinFiles(itemId) {
      var skinFiles = this.items.filter(function (item) { return item.id == itemId });

      
      
      return skinFiles[0].skinFile;
    },

    delOrderModal(order) {
      this.showModal = true;
      this.modalVal = order;
    },

    delOrder() {
      this.showModal = false;
      this.$store.dispatch('orders/orderDelete', this.modalVal).then(() => {
        this.modalVal = '';
      })
    }
  }
}
</script>

<style lang="scss" scoped>
table th {
  text-align: center;
  white-space: nowrap
}

.item-img {
  width: 3.5rem;
  max-height: 3rem;
}

td {
  &.title {
    font-weight: 600;
  }

  &.price {
    font-weight: 600;
    text-align: right;
  }

  .small {
    font-size: 0.75rem;
    font-weight: normal;
    margin-bottom: 0.5rem;

    span {
      color: $theme-color-main
    }
  }
}

mark {
  width: 100%;
  padding: 0.1rem 0.3rem;
  margin: 0 0.3rem;
  font-weight: 500;
}

.payment li>span {
  font-weight: 600;
  color: $theme-color-main;
}

.skin-files {
  font-size: 0.75rem;
  margin-top: 0.5rem;
  padding-left: 1rem;
  li {
    text-align: left;
  }
}



.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  max-width: 640px;
  min-width: 300px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-body {
  margin: 20px 0;
  text-align: center;
  font-size: 1.2rem;
  font-weight: 700;
}

.modal-footer {
  font-weight: 600;
  justify-content: center;
}
</style>
