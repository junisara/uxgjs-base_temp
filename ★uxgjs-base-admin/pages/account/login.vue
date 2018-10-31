<template>
<div class="login-wrap">
  <div class="text-center">
    <h1 class="">로그인하세요</h1>
    <div class="">
      <GoogleLogin />
    </div>
  </div>
</div>
</template>

<script>
import { mapState } from 'vuex'
import GoogleLogin from '~/components/account/GoogleLogin.vue'

export default {
  components: {
    GoogleLogin
  },

  watch: {
    // firebase is sometimes slow so we need to account for
    // the user getting authenticated late in the game...
    user(to, from) {
      this.$router.push('/')
    }
  },

  computed: mapState([
    'user'
  ])
}
</script>

<style lang="scss">
.login-wrap {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: auto;
}
</style>
