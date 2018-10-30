<template>
<div>
  <div class="row mb-2" v-if="account" v-cloak>
    <div class="col">
      <div class="card flex-md-row mb-4 shadow-sm h-md-250">
        <img v-bind:src="account.image" width="160" height="160" class="card-img-right flex-auto" data-holder-rendered="true" />
        <div class="card-body d-flex flex-column align-items-start">
          <h3 class="mb-0">이름 : {{account.displayName}}</h3>
          <p class="card-text mb-auto">이메일 : {{account.email}}</p>
          <p class="card-text mb-auto">등록일 : {{account.createDate.seconds | moment("YYYY-MM-DD HH:mm:ss")}}</p>
        </div>
      </div>
    </div>
  </div>

  <div class="row mb-2" v-if="account" v-cloak>
    <div class="col">
      <div class="mt-4 text-center">
        <button type="button" class="btn btn-danger mr-2" v-on:click="logOut">로그아웃</button>
      </div>
    </div>
  </div>

</div>
</template>

<script>
import Vue from 'vue';
import vueMoment from 'vue-moment';
import { mapState, mapActions } from 'vuex'
Vue.use(vueMoment);

export default {
  computed: {
    ...mapState([
      'account',
      'isAdmin'
    ]),
  },

  methods: {
    ...mapActions([ // store에 작성된 func를 불러옴
      'userLogout'
    ]),

    logOut() {
      this.userLogout().then(() => {
          this.$router.push('/')
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
