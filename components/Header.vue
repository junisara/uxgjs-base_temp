<template>
<div class="header d-flex align-items-center justify-content-between py-2 px-md-4 mb-3 bg-white border-bottom shadow-sm">
  <router-link class="p-2 mr-md-auto " to="/">
    <h5 class="logo font-weight-normal"><i class="xi-dashboard xi-x"></i> UX공작소</h5>
  </router-link>
  <nav class="p-2 ">
    <router-link class="p-2 text-dark" to="/" data-toggle="tooltip" data-placement="bottom" title="집으로"><i class="xi-home-o xi-x"></i></router-link>
    <router-link v-if="account" to="/orders"  data-toggle="tooltip" data-placement="bottom" title="구매리스트" class="p-2"><i class="xi-receipt xi-x"></i></router-link>
    <router-link v-if="!account" to="/account/login" data-toggle="tooltip" data-placement="bottom" title="로그인"><i class="xi-user-o xi-x"></i></router-link>
    <router-link v-if="account" to="/account" data-toggle="tooltip" data-placement="bottom" title="개인화면"><img v-bind:src="account.image" width="26" height="26" v-bind:alt="imageAlt" ></router-link>
  </nav>

</div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Header',

  computed: {
    ...mapState([
      'account'
    ]),
    imageAlt() {
      return `Profile image for ${this.account.displayName}`
    }
  }
}
</script>

<style lang="scss" scoped>
.header .logo {
  display: flex;
  align-items: center;
  > i {
    vertical-align: -25%;
    color: $theme-color-main;
  }
}

nav>a {
  padding: 0.5rem;
}
</style>
