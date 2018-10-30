<template>
<form @submit.prevent="itemAddUpdate" class="edit-item-form">

  <h3 class="mb-3">아이템 등록</h3>

  <div class="row">
    <div class="col-md-6 mb-3">
      <input type="text" class="form-control" id="code" name="code" v-model="item.code" placeholder="제품코드" v-validate="'alpha_dash'"  data-vv-as="제품코드" >
      <div class="error" v-if="errors.has('code')">{{ errors.first('code') }}</div>
    </div>
    <div class="col-md-6 mb-3">
      <input type="text" class="form-control" id="title" v-model="item.title" placeholder="제품명">
      <div class="error" v-if="errors.has('title')">{{ errors.first('title') }}</div>
    </div>
  </div>

  <div class="row">
    <div class="col-md-6 mb-3">
      <input type="text" class="form-control" id="price" name="price" v-model="item.price" placeholder="가격" v-validate="'numeric'" data-vv-as="가격" >
      <div class="error" v-if="errors.has('price')">{{ errors.first('price') }}</div>
    </div>
    <div class="col-md-6 mb-3 input-group">
      <input type="text" class="form-control" id="discount" name="discount" v-model="item.discount" placeholder="할인율" v-validate="'max_value:100'"  data-vv-as="할인율">
        <div class="input-group-append">
          <span class="input-group-text">%</span>
        </div>
      <div class="error w-100" v-if="errors.has('discount')">{{ errors.first('discount') }}</div>
    </div>
  </div>
  <div class="row">
    <div class="col-md-12 mb-3">
      <input type="text" class="form-control" id="sampleUrl" name="sampleUrl" v-model="item.sampleUrl" placeholder="샘플 URL" v-validate="'url'" data-vv-as="샘플URL" >
      <div class="error" v-if="errors.has('sampleUrl')">{{ errors.first('sampleUrl') }}</div>
    </div>
  </div>

    <div class="form-group">
      <textarea class="form-control" id="desc" v-model="item.desc" placeholder="설명" rows="3"></textarea>
    </div>


  <div class="row">
    <div class="col-md-6 mb-3">
      <div class="form-group">
        <label for="exampleFormControlFile1">썸네일 이미지</label>
        <input type="file" class="form-control-file" id="itemImage" accept="image/*" ref="fileInputImg">
      </div>
    </div>
    <div class="col-md-6 mb-3">
      <div class="form-group">
        <label for="exampleFormControlFile1">스킨 파일</label>
        <input type="file" class="form-control-file" id="itemSkinFile" accept="application/zip" ref="fileInputSkin">
      </div>

    </div>
  </div>

  <div class="form-group">
    <div class="alert alert-danger"  v-show="formError" v-text="formError"></div>
    <div class="alert alert-success" v-show="formSuccess" v-text="formSuccess"></div>
  </div>


  <div class="row">
    <div class="col-md-9 mb-3">
      <div class="form-group form-check">
        <input type="checkbox" class="form-check-input" id="deactivate" v-model="item.deactivate" >
        <label class="form-check-label" for="deactivate">비활성</label>
      </div>
    </div>
    <div class="col-md-3 text-right mb-3 ">
      <button type="submit" class="btn btn-primary btn-block">{{item.id ? '수정' : '등록'}}</button>
    </div>
  </div>

</form>
</template>

<script>
// import { mapState, mapActions } from 'vuex'
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
  name: 'EditItemForm',

  props: ['item', 'beforeEditItem'],

  data() {
    return {
      // deactivate: false,
      formError: null,
      formSuccess: null,
      newItem: null,
      sampleUrl: null,
      code: null,
      title: null,
      price: null,
      discount: null,
      desc: null
    }
  },

  computed: {
    // deactivate: () => { return this.item.deactivate ? this.item.deactivate : false }

  },

  // mounted() {
  //   console.log('this.edit :', this.edit);
  // },

  methods: {
    resetFormMessages() {
      this.formSuccess = this.formError = ''
    },

    itemAddUpdate() {
      if (!this.item.code || !this.item.title || !this.item.price) return;
        this.$validator.validateAll()
      if (this.errors.any()) {
        alert('잘못입력한 부분이 있습니다. 수정후 다시 등록하세요')
        return
      }
      this.newItem = {
        code: this.item.code,
        title: this.item.title,
        price: this.item.price,
        discount: this.item.discount,
        finalPrice: Math.round((this.item.price * (100 - this.item.discount) / 100) / 1000) * 1000,
        sampleUrl: this.item.sampleUrl ? this.item.sampleUrl : '',
        desc: this.item.desc,
        deactivate: this.item.deactivate,
        createDate: this.item.createDate ? this.item.createDate : new Date(),
        modifyDate: new Date()
      }

      if(this.item.id) {
        // 업데이트 이면...
        this.newItem.id = this.item.id;
        this.newItem.image = this.item.image ? this.item.image : '';
        this.newItem.skinFile = this.item.skinFile ? this.item.skinFile : '';
        this.itemUpdate(this.beforeEditItem, this.newItem);
      } else {
        // 신규등록 이면....
        this.itemAdd(this.newItem);
      }
    },

    itemAdd( newItem ) {
      this.$store.dispatch('itemsAdmin/itemAdd', newItem )
        .then((id) => {
          if (this.$refs.fileInputImg.files[0]) {
            this.uploadImage(id);
          }
          if (this.$refs.fileInputSkin.files[0]) {
            this.uploadSkinFile(id);
          }
          this.item.code = '';
          this.item.title = '';
          this.item.price = '';
          this.item.discount = '';
          this.item.sampleUrl = '';
          this.item.desc = '';
          this.item.deactivate = true;
        })
        .catch((err) => {
          this.formError = '등록에 실패하였습니다. 1'
          console.error(err)
        })
    },

    itemUpdate( beforeEditItem, modifyItem ) {
      this.$store.dispatch('itemsAdmin/itemUpdate', {beforeEditItem, modifyItem })
        .then((id) => {
          if (this.$refs.fileInputImg.files[0]) {
            this.uploadImage(id);
          }
          if (this.$refs.fileInputSkin.files[0]) {
            this.uploadSkinFile(id);
          } else {
            this.formSuccess = '등록 하였습니다.'
          }
          this.item.code = '';
          this.item.title = '';
          this.item.price = '';
          this.item.discount = '';
          this.item.sampleUrl = '';
          this.item.desc = '';
          this.item.deactivate = true;
        })
        .catch((err) => {
          this.formError = '등록에 실패하였습니다. 2'
          console.error(err)
        })
    },

    uploadImage(id) {
      this.resetFormMessages();
      const imageFile = this.$refs.fileInputImg.files[0];
      this.$store.dispatch('itemsAdmin/uploadImage', {id,imageFile})
        .then(() => {
          this.formSuccess = '등록 및 이미지를 업로드 하였습니다.'
          this.$refs.fileInputImg.value = null
        })
        .catch((err) => {
          this.formError = '등록하였으나 이미지 업로드에는 실패하였습니다.'
          console.error(err)
        })
    },

    uploadSkinFile(id) {
      const skinFile = this.$refs.fileInputSkin.files[0];
      this.$store.dispatch('itemsAdmin/uploadSkinFile', {id,skinFile})
        .then(() => {
          this.formSuccess = '등록을 완료 하였습니다.'
          this.$refs.fileInputSkin.value = null
        })
        .catch((err) => {
          this.formError = '등록하였으나 스킨파일 업로드에는 실패하였습니다.'
          console.error(err)
        })
    }
  },

}
</script>


<style lang="scss">
.edit-item-form {
  margin-bottom: 1.5rem;
  padding: 1.5rem;
  background: $gray-200;
}
</style>
