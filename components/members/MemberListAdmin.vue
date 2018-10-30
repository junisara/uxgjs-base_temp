<template>
  <div class="row" v-cloak>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">번호</th>
          <th scope="col">썸네일</th>
          <th scope="col">아이디</th>
          <th scope="col">이름</th>
          <th scope="col">이메일</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(member, index) in sortedMemberList" :key="member.id">
          <th scope="row">{{index + 1}}</th>
          <td><img class="item-img" v-show="member.image" :src="member.image" alt="썸네일"></td>
          <td>{{member.id}}</td>
          <td>{{member.displayName}}</td>
          <td>{{member.email}}</td>
          <!-- <td>{{member.createDate | moment("YYYY-MM-DD HH:mm:ss") }}</td> -->
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import Vue from 'vue';
import vueMoment from 'vue-moment';
import { mapState, mapActions} from 'vuex';
Vue.use(vueMoment);

export default {
  name: 'MemberListAdmin',

  mounted() {
    this.memberListAdmin(this.isAdmin)
  },

  props : [
      'isAdmin',
  ],

  data() {
    return {
      sortKey: '',
      memberCnt: ''
    }
  },

  computed: {
    ...mapState({
      members: state => state.membersAdmin.members,
    }),

     sortedMemberList: function () {
      var membersTotal = [];
      var sortKey = this.sortKey ? this.sortKey : "createDate"
      // var order = this.sortOrders[sortKey] || 1

      if( this.members && !this.memberCnt) {
        this.members.forEach((el, idx) => {
          const members = {};
          members.id          = el.id;
          members.displayName = el.displayName;
          members.email       = el.email;
          members.image       = el.image;
          membersTotal.push(members);
        })

          // this.orderCnt = '1';

          // if (sortKey) {
          //   ordersTotal = ordersTotal.slice().sort((a, b) => {
          //     a = a[sortKey]
          //     b = b[sortKey]
          //     // return (a === b ? 0 : a > b ? 1 : -1) * order
          //     return (a === b ? 0 : a > b ? 1 : -1)
          //   })
          // }
          return membersTotal;
      }
    }

  },

  methods: {
    ...mapActions({
      memberListAdmin: 'membersAdmin/memberList' // this.increment()을 this.$store.dispatch('increment')에 매핑
    }),
  }
}
</script>


<style>
.item-img {
  width: 2rem;
  max-width: 2rem;
}
</style>
