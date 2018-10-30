<template>
  <div v-if="isAdmin">
      <SubMenu />
    <div class="one-half column centered"  v-cloak>
      <h1>주문 리스트</h1>
      <OrdersListAdmin :isAdmin="isAdmin" />
    </div>
  </div>
  <div v-else>
    관리자만 볼수 있습니다.
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import SubMenu from '~/components/SubMenu.vue';
import OrdersListAdmin from '~/components/order/OrdersListAdmin.vue'


export default {
  components: {
    OrdersListAdmin,
    SubMenu
  },

  computed: {
    ...mapState([
      'user',
      'isAdmin'
    ])
  },

  methods: {
    ...mapActions({
    }),
  }
}
</script>

<style lang="scss" scoped>

</style>
