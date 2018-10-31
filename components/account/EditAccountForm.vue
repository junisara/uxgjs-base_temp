<template>
  <form>
    <div class="form-group row">
      <label for="displayName" class="col-sm-2 col-form-label">별명</label>
      <div class="col-sm-10">
        <input v-model="newData.displayName" v-on:input="updateField('displayName')" type="text" class="form-control" id="displayName" placeholder="별명을 변경할 수 있어요">
      </div>
    </div>

    <div class="form-group row">
      <label for="profileImage" class="col-sm-2 col-form-label">프로필 사진</label>
      <div class="col-sm-10">
        <div class="input-group mb-3">
          <div class="custom-file">
            <input v-on:change="updateProfileImage" ref="fileInput" type="file" accept="image/*" class="custom-file-input" id="profileImage" >
            <label class="custom-file-label" for="profileImage">프로필 사진을 변경할 수 있어요</label>
          </div>
        </div>
      </div>
    </div>

    <div class="form-group">
          <div v-if="formSuccess.length > 0" v-text="formSuccess" class="alert alert-primary" role="alert"></div>
          <div  v-if="formError.length > 0" v-text="formError" class="alert alert-danger" role="alert"></div>
    </div>
  </form>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'EditAccountForm',

  computed: mapState([
    'user',
    'account'
  ]),
  data () {
    return {
      newData: {
        displayName: '',
        image: ''
      },
      debounceTimer: setTimeout(() => {}),
      formError: '',
      formSuccess: ''
    }
  },
  mounted () {
    this.newData.displayName = this.account.displayName
    this.newData.image = this.account.image
  },
  methods: {
    resetFormMessages () {
      this.formSuccess = this.formError = ''
    },

    updateField (key) {
      this.resetFormMessages();

      // clearTimeout(this.debounceTimer)
      // this.debounceTimer = setTimeout(() => {
        console.info('update field', key)
        this.$store.dispatch('userUpdate', this.newData)
          .then(() => {
            this.formSuccess = '별명이 잘 변경됬어요'
          })
          .catch((err) => {
            this.formError = '앗! 변경에 실패 했어요!! 뭔일이래!'
            console.error(err)
          })
      // }, 500)
    },

    updateProfileImage () {
      this.resetFormMessages()
      const file = this.$refs.fileInput.files[0]
      this.$store.dispatch('userUpdateImage', file)
      .then(() => {
        this.formSuccess = '프로필 사진이 잘~ 변경되었어요'
        // reset the form input
        this.$refs.fileInput.value = null
      })
      .catch((err) => {
        this.formError = '앗! 변경에 실패 했어요!! 뭔일이래!'
        console.error(err)
      })
    }

  }
}
</script>
