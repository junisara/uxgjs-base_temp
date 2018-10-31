<template>

    <div name="join-out" id="join-out" class="mb-5">
      <div class="card text-center" style="min-height:300px">
        <h5 class="card-header">정말 회원탈퇴를 하시렵니까?</h5>
        <div class="card-body">
          <p class="card-text">
            회원탈퇴를 할 경우 회원정보가 모두 제거 되고 <br>
            기존에 구매했던 내역들은 확인할 수 없게 됩니다.
          </p>
          <div class="mt-5">
            <input type="checkbox" class="form-check-input" id="agree" v-model="agree">
            <label class="form-check-label" for="agree">위의 내용에 동의합니다.</label>
          </div>
        </div>
        <div class="card-footer text-muted">
          <button type="button" class="btn  mr-1" :class="[ agree ? 'btn-danger' : 'btn-outline-danger']" :disabled="!agree" v-on:click="joinOut">회원탈퇴</button>
          <button type="button" class="btn btn-outline-primary" @click="$emit('close')" >취소</button>
        </div>
      </div>
    </div>

</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'AccountJoinOut',

   data () {
    return {
      agree: false
    }
  },

  methods: {
    ...mapActions([  // store에 작성된 func를 불러옴
      'userDelete'
    ]),

    joinOut() {
      this.userDelete().then(() => {
          this.$router.push('/');
        })
        .catch((error) => {
          console.log(error)
        })
    },




  }
}
</script>
