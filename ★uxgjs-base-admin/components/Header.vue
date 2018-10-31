<template>
<div class="header d-flex align-items-center justify-content-between py-2 px-md-4 mb-3 bg-white border-bottom shadow-sm">
  <nuxt-link to="/" class="p-2 mr-md-auto" ><h5 class="my-0 font-weight-normal">UX공작소</h5></nuxt-link>
  <nav class="p-2 ">
    <nuxt-link to="/" class="p-2 text-dark" data-toggle="tooltip" data-placement="bottom" title="집으로"><i class="xi-home-o xi-x"></i></nuxt-link>
    <nuxt-link to="/account/login" v-if="!account"  data-toggle="tooltip" data-placement="bottom" title="로그인"><i class="xi-user-o xi-x"></i></nuxt-link>
    <nuxt-link to="/account" v-if="account" data-toggle="tooltip" data-placement="bottom" title="개인화면"><img v-bind:src="account.image" width="26" height="26" v-bind:alt="imageAlt" ></nuxt-link>
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
.header .logo>i {
  vertical-align: -25%;
  color: $theme-color-main;
}

nav>a {
  padding: 0.5rem;
}
</style>
