<template>
<div>
  <div class="" v-if="account" v-cloak>
    <h1>구매 리스트</h1>
    <OrdersList :account="account" />
  </div>
</div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import OrdersList from '~/components/order/OrdersList.vue'

export default {
  components: {
    OrdersList
  },
  computed: {
    ...mapState([
      'account'
    ]),
  },
}
</script>

<style lang="scss" scoped>

</style>
