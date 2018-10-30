<template>
<div>
  <button type="button" class="btn btn-warning btn-lg btn-block mt-2"  v-if="!windowEmailLogin && !windowEmailSignup" v-on:click.prevent="EmailLoginButton"><i class='xi-mail'></i> 이메일로 로그인</button>

    <transition name="email" mode="out-in">
    <div id="email-login" class="email-login" v-if="windowEmailLogin && !windowEmailSignup" key="login">

      <form class="form-login" v-on:submit.prevent="login">
        <h1 class="h3 my-3 font-weight-normal">로그인</h1>

        <label for="email" class="sr-only">이메일 주소</label>
        <input type="email" id="email" name="email" class="form-control" v-bind:class="{ 'is-danger': invalidEmail }" placeholder="이메일 주소" required autofocus v-model="email" v-validate="'required|email'" data-vv-as="이메일">
        <div class="alert alert-danger mt-1" v-if="errors.has('email')">{{ errors.first('email') }}</div>

        <label for="password" class="sr-only">비밀번호</label>
        <input type="password" id="password" name="password" class="form-control mt-1" v-bind:class="{ 'is-danger': invalidPassword }" placeholder="비밀번호" required v-model="password" v-validate="'required'" data-vv-as="비밀번호">
        <div class="alert alert-danger mt-1" v-if="errors.has('password')">{{ errors.first('password') }}</div>
        <!-- <div class="checkbox mb-3">
          <label>
            <input type="checkbox" value="remember-me"> Remember me
          </label>
        </div> -->

        <div v-if="formError.length > 0" v-text="formErrorKr" class="message alert alert-danger"></div>

        <div class="form-group member-join mt-3">
          <small>아직 회원가입을 하지 않은경우 <a href="#" @click.prevent="EmailSignupButton()"> 회원가입 </a>을 먼저해주세요.</small>
        </div>

        <div class="btn-wrap text-center mt-5">
          <button class="btn btn-primary" type="submit">로그인</button>
          <button class="btn btn-outline-primary" @click="close()" >닫기</button>
        </div>
      </form>
    </div>

    <div id="email-signup" class="email-signup" v-if="!windowEmailLogin && windowEmailSignup">
      <form class="form-signin" v-on:submit.prevent="signup">
        <h1 class="h3 my-3 font-weight-normal">회원가입</h1>

        <label for="email" class="sr-only">이메일 주소</label>
        <input type="email" id="email" name="email"  class="form-control" v-bind:class="{ 'is-danger': invalidEmail }" placeholder="이메일 주소" autofocus v-model="email"  v-validate="'required|email'" data-vv-as="이메일">
        <div class="alert alert-danger mt-1" v-if="errors.has('email')">{{ errors.first('email') }}</div>

        <label for="password" class="sr-only">비밀번호</label>
        <input type="password" id="password" name="password" class="form-control mt-1" v-bind:class="{ 'is-danger': invalidPassword }" placeholder="비밀번호" v-model="password"  v-validate="'required|min:6'" data-vv-as="비밀번호">
        <div class="alert alert-danger mt-1" v-if="errors.has('password')">{{ errors.first('password') }}</div>

        <label for="rePassword" class="sr-only">비밀번호 확인</label>
        <input type="password" id="rePassword" name="rePassword" class="form-control mt-1" v-bind:class="{ 'is-danger': invalidPassword }" placeholder="비밀번호 확인" v-on:keyup="signPasswordCheck" v-model="rePassword">
        <div class="alert alert-danger mt-1" v-if="rePasswordError">{{ rePasswordError }}</div>

        <div v-if="formError.length > 0" v-text="formErrorKr" class="message alert alert-danger"></div>

        <div class="form-group member-login mt-3">
          <small>이미 회원가입을 하신 경우 <a href="#" @click.prevent="EmailLoginButton('in')"> 로그인 </a>만 하면 됩니다.</small>
        </div>

        <div class="btn-wrap text-center mt-5">
          <button class="btn btn-primary" type="submit">회원가입</button>
          <button class="btn btn-outline-primary" @click.prevent="close()" >닫기</button>
        </div>
      </form>
    </div>
    </transition>


</div>
</template>

<script>
import Vue from 'vue';
import VeeValidate from 'vee-validate';
import ko from 'vee-validate/dist/locale/ko.js';
Vue.use(VeeValidate, {
  locale: 'ko',
  dictionary: {
    ko
  }
});


export default {
  name: 'EmailLogin',

  props: ['parentData'],

  data() {
    return {
      windowEmailLogin: false,
      windowEmailSignup: false,
      email: '',
      password: '',
      rePassword: '',
      rePasswordError: '',
      formError: '',
    }
  },

  // mounted() {
  //   this.signUpCheck();
  // },

  computed: {

    invalidEmail () {
      return false // !this.email.includes('@')
    },
    invalidPassword () {
      return false // !this.password.length > 12
    },

    formErrorKr () {
        if (this.formError === "There is no user record corresponding to this identifier. The user may have been deleted.") {
          return "회원가입이 되어 있지 않아요 ^^ 아이디가 잘못된 것이 아니면 회원가입을 먼저 해주세요~"
        }

    }


  },

  watch: {
      parentData: function(newVal, oldVal) { // watch it
        console.log('Prop changed: ', newVal, ' | was: ', oldVal)
        if( newVal ) {
          this.EmailSignupButton ();
        }

      }
  },

  methods: {

    // signUpCheck() {
    //   console.log('parentData :', this.parentData);

    //   if( this.parentData ) {
    //    EmailSignupButton ();
    //   }
    // },

    EmailLoginButton (yn) {
      this.windowEmailLogin = true;
      this.windowEmailSignup = false;
      this.$emit('emailLogin', yn)
    },

    EmailSignupButton (yn) {
      this.windowEmailLogin = false;
      this.windowEmailSignup = true;
      this.$emit('emailLogin', yn)
    },

    signPasswordCheck() {
      return this.rePasswordError = this.password !== this.rePassword ? "위의 비밀번호와 달라요." : "";
    },

    login () {
      this.formError = ''
      this.$store.dispatch('userLogin', {
        email: this.email,
        password: this.password
      })
      .then((result) => {

        console.log('result :', result);

        this.$router.replace(this.$route.query.redirect || '/')
        // this.$router.push('/')
      })
      .catch((error) => {
        console.log('error' , error)
        this.formError = error.message
        // this.formError = "로그인에 실패하였습니다."
      })
    },

    signup () {
      this.formError = ''
      this.$store.dispatch('userCreate', {
        email: this.email,
        password: this.password
      })
      .then(() => {
        this.$router.replace(this.$route.query.redirect || '/')
        // this.$router.push('/')
      })
      .catch((error) => {
        console.log(error)
        this.formError = error.message
      })
    },

    close() {
      console.log('formError', this.formError);

      this.windowEmailLogin = false;
      this.windowEmailSignup = false;
      this.$emit('emailLogin')
    }
  }
}
</script>

<style lang="scss" scoped>
  small a {
    font-size: 140%;
    font-weight: 700;
    color: $theme-color-accent
  }

  .email-enter {
    opacity: 0;
    transform :translatex(100px);
  }
  .email-enter-to {
    opacity: 1;
    transform :translatex(0px);
  }
  .email-leave {
    opacity: 1;
    transform :translatex(0px);
  }
  .email-leave-to {
    opacity: 0;
    transform :translatex(-100px);
  }
  .email-enter-active,
  .email-leave-active {
    transition: opacity, transform 200ms ease-out;
  }
</style>
