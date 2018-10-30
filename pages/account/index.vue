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
        <div class="" v-if="editing" v-cloak>
          <h1>프로필 수정</h1>
          <EditAccountForm />
        </div>
        <div class="" v-if="joinOuting" v-cloak>
          <h1>회원 탈퇴</h1>
          <AccountJoinOut @close="closeCompont" />
        </div>

      <div class="mt-4 text-center">
        <button type="button" class="btn btn-primary mr-2" v-on:click="toggleEditForm">
          <span v-if="editing">완료</span>
          <span v-else>수정</span>
        </button>
        <button type="button" class="btn btn-danger mr-2" v-on:click="logOut">로그아웃</button>
        <button type="button" class="btn btn-light" v-on:click="toggleJoinOut">회원탈퇴</button>
      </div>

      </div>
    </div>

</div>
</template>

<script>
import Vue from 'vue';
import vueMoment from 'vue-moment';
import { mapState, mapActions } from 'vuex'
import EditAccountForm from '~/components/account/EditAccountForm.vue'
import AccountJoinOut from '~/components/account/AccountJoinOut.vue'
Vue.use(vueMoment);

export default {
  components: {
    EditAccountForm,
    AccountJoinOut
  },

  computed: {
    ...mapState([
      'account',
      'isAdmin'
    ]),
  },

  data () {
    return {
      editing: false,
      joinOuting: false
    }
  },

  methods: {
    ...mapActions([ // store에 작성된 func를 불러옴
      'userLogout'
    ]),

    toggleEditForm () {
      this.joinOuting = false
      this.editing = !this.editing
    },

    toggleJoinOut () {
      this.editing = false
      this.joinOuting = !this.joinOuting
    },

    logOut() {
      this.userLogout().then(() => {
          this.$router.push('/')
        })
        .catch((error) => {
          console.log(error)
        })
    },
    closeCompont() {
      console.log('dasdsadasdasdas');

      this.toggleJoinOut();
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
