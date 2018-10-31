<template>
<div class="login-wrap">
  <div class="text-center">
    <h1 class="" v-if="windowEmail">로그인하세요</h1>
    <div class="" >
      <GoogleLogin v-if="windowEmail" />
      <EmailLogin :parentData="windowSignup" v-on:emailLogin="windowCtrl" />
    </div>
     <div class="form-group member-join mt-3" >
        <span v-if="windowEmail">아직 회원가입을 하지 않은경우 <a href="#" @click.prevent="EmailSignupButton()"> 회원가입 </a>을 먼저해주세요.</span>
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

  data() {
    return {
      windowEmail: true,
      windowSignup: false
    }
  },


  computed: mapState([
    'user'
  ]),

  methods: {
    windowCtrl(loginJoin) {
      if (loginJoin == 'login') {
        this.windowEmail = true;
        this.windowSignup = false;
      } else if (loginJoin == 'login-in') {
        this.windowEmail = false;
        this.windowSignup = false;
      } else if (loginJoin == 'join') {
        this.windowEmail = false;
        this.windowSignup = true;
      } else {
        this.windowEmail = true;
        this.windowSignup = false;
      }
    },

    EmailSignupButton() {
      this.windowSignup = true
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
