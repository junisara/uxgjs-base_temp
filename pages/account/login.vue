<template>
<div class="login-wrap">
  <div class="text-center">
    <h1 class="" v-if="windowEmail">로그인하세요</h1>
    <div class="" >
      <GoogleLogin v-if="windowEmail" />
      <EmailLogin :parentData="windowSignup" v-on:emailLogin="windowEmailToggle" />
    </div>
     <div class="form-group member-join mt-3">
        <small>아직 회원가입을 하지 않은경우 <a href="#" @click.prevent="EmailSignupButton()"> 회원가입 </a>을 먼저해주세요.</small>
      </div>
  </div>
</div>
</template>

<script>
import { mapState } from 'vuex'
import GoogleLogin from '~/components/account/GoogleLogin.vue'
import EmailLogin from '~/components/account/EmailLogin.vue'

export default {
  components: {
    GoogleLogin,
    EmailLogin
  },

  watch: {
    // firebase is sometimes slow so we need to account for
    // the user getting authenticated late in the game...
    user(to, from) {
      // this.$router.replace(this.$route.query.redirect || '/')
      // this.$router.push('/')
    }
  },

  data() {
    return {
      windowEmail: true,
      windowSignup: this.$route.params.windowSignup ? this.$route.params.windowSignup : false
    }
  },


  computed: mapState([
    'user'
  ]),

  methods: {
    windowEmailToggle (yn) {
      if (yn !== 'in') this.windowEmail = !this.windowEmail;
      if (yn !== 'in') this.windowSignup = false;
    },

    EmailSignupButton() {
      this.windowSignup ='true'
      console.log('dasdasdasd', this.windowSignup);

    }
  }
}
</script>

<style lang="scss">
.login-wrap {
  width: 100%;
  max-width: 420px;
  padding: 15px;
  margin: auto;
}
</style>
