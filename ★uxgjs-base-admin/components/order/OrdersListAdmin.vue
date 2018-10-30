<template>
<div class="row" v-cloak>
  <div class="table-responsive">
    <table class="table ">
      <thead>
        <tr>
          <th scope="col" class="d-none d-md-table-cell"><span @click="sortKeyChange('index')">번호</span> <span @click="sortBy()"><i :class="{' xi-caret-up-min': reverse==1, 'xi-caret-down-min': reverse==-1 }"/></span></th>
          <th scope="col" class="d-none d-md-table-cell">썸네일</th>
          <th scope="col"><span @click="sortKeyChange('title')">(제품코드) 제품명</span> <span @click="sortBy()"><i :class="{' xi-caret-up-min': reverse==1, 'xi-caret-down-min': reverse==-1 }"/></span></th>
          <th scope="col"><span @click="sortKeyChange('finalPrice')">구매가격</span> <span @click="sortBy()"><i :class="{' xi-caret-up-min': reverse==1, 'xi-caret-down-min': reverse==-1 }"/></span></th>
          <th scope="col"><span @click="sortKeyChange('createDate')">주문일</span> <span @click="sortBy()"><i :class="{' xi-caret-up-min': reverse==1, 'xi-caret-down-min': reverse==-1 }"/></span></th>
          <th scope="col"><span @click="sortKeyChange('createDate')">주문자</span> <span @click="sortBy()"><i :class="{' xi-caret-up-min': reverse==1, 'xi-caret-down-min': reverse==-1 }"/></span></th>
          <th scope="col"><span @click="sortKeyChange('step')">상태</span> <span @click="sortBy()"><i :class="{' xi-caret-up-min': reverse==1, 'xi-caret-down-min': reverse==-1 }"/></span></th>
          <th scope="col">상태변경</th>
          <th scope="col">삭제</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(order, index) in sortedOrderList" :key="order.id">
          <th scope="row">{{index + 1}}</th>
          <td><img class="item-img" v-show="order.image" :src="order.image" alt="썸네일"></td>
          <td class="title">
            <div class="small">{{order.code}}</div>{{order.title}}
            <small>{{ order.skinDownloadCnt }}</small>
          </td>
          <td class="price text-nowrap">
            <div class="small">가격 : {{order.price}} <span>({{order.discount}}%)</span></div>
            최종가격 : {{order.finalPrice}}
          </td>
          <td>{{ order.createDate | moment("YYYY-MM-DD HH:mm:ss") }}</td>
          <td class="account">
            <div class="small">{{order.accountEmail}}</div>{{order.accountName}}
          </td>
          <td>
            <select v-model.number="order.step" @change="orderStepChange(order, order.step)">
                <option disabled value="">단계변경</option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
              </select>
          </td>
          <td>
            <div v-if="order.step == 1" class="text-center p-2 bg-primary text-white">입금확인</div>
            <button v-else-if="order.step == 2" @click="fileDownload(order.id)" class="btn btn-link">다운로드</button>
            <span v-else>이건~</span>
          </td>

          <td class="text-center text-nowrap">
            <button @click="delOrderModal(order)" class="btn btn-link">삭제</button>
          </td>

        </tr>
      </tbody>
    </table>
  </div>

  <div v-if="showModal">
    <transition name="modal">
      <div class="modal-mask">
        <div class="modal-wrapper">
          <div class="modal-container">
            <div class="modal-body" v-html="noticeMessage"> </div>
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
Vue.use(vueMoment);

export default {
  name: 'OrdersListAdmin',

  mounted() {
    this.ordersListAdmin(this.isAdmin)
  },

  data() {
    return {
      sortKey: 'createDate',
      reverse: 1,
      noticeMessage: null,
      showModal: false,
      modalVal: ''
    }
  },

  watch: {
    // 'orders.step': 'sortedOrderList($route.params.id)'
  },

  computed: {
    ...mapState({
      orders: state => state.ordersAdmin.orders,
    }),
    ...mapState([
      'isAdmin'
    ]),
    sortedOrderList: function () {
      var ordersTotal = [];

      if (this.orders) {
        this.orders.forEach((el, idx) => {
          const orders = {};
          orders.id = el.id;
          orders.image = el.item.image;
          orders.code = el.item.code;
          orders.title = el.item.title;
          orders.finalPrice = el.item.finalPrice;
          orders.createDate = el.createDate.seconds;
          orders.accountName = el.account.displayName;
          orders.accountEmail = el.account.email;
          orders.step = el.step;
          ordersTotal.push(orders);
        })

        if (this.sortKey) {
          ordersTotal = ordersTotal.slice().sort((a, b) => {
            a = a[this.sortKey]
            b = b[this.sortKey]
            return (a === b ? 0 : a > b ? 1 : -1) * this.reverse
          })
        }
        return ordersTotal;
      }
    }

  },

  methods: {
    ...mapActions({
      ordersListAdmin: 'ordersAdmin/ordersList' // this.increment()을 this.$store.dispatch('increment')에 매핑
    }),

    orderStepChange(order, step) {
      this.$store.dispatch('ordersAdmin/orderStepChange', order, order.step)
    },

    confirmDeposit(order) {
      this.$store.dispatch('ordersAdmin/orderStepChange', order)
        .then(() => {

        })
    },

    sortBy() {
      this.reverse = this.reverse === 1 ? -1 : 1;
    },
    sortKeyChange(sortKey) {
      this.sortKey = sortKey;
    },

    delOrderModal(order) {
      this.showModal = true;
      this.modalVal = order;
      this.noticeMessage = order.step == 1 ? "아직 입금 전~ <br>한번 삭제하면 돌이킬 수 없다" : "입금은 됐다~  <br>한번 삭제하면 돌이킬 수 없다"
    },

    delOrder() {
      this.showModal = false;
      this.$store.dispatch('ordersAdmin/orderDelete', this.modalVal).then(() => {
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

  &.account {
    font-weight: 600;
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
