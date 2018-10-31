<template>
<button type="button" class="btn btn-primary btn-lg btn-block" v-on:click.prevent="GoogleLogin"><i class='xi-google'></i> 구글로 로그인</button>
</template>

<script>
export default {
  name: 'GoogleLogin',

  methods: {
    GoogleLogin() {
      this.$store.dispatch('userGoogleLogin')
      .then(()=>{
        this.$router.replace(this.$route.query.redirect || '/')
      })
    }
  }
}
</script>
