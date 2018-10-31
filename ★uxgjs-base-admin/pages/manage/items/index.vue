<template>
<div class="item-wrap" v-if="isAdmin">

  <SubMenu />
<h1>아이템 등록/리스트</h1>
  <div class="" v-cloak>
    <EditItemForm :item="itemModifyData" :beforeEditItem="itemModifyData"/>
  </div>

  <section v-cloak>
    <table class="table table-sm">
      <colgroup>
        <col style="width: 10%;" />
        <col style="width: 30%;" />
        <col style="" />
        <col style="width: 10%;" />
        <col style="width: 10%;" />
        <col style="width: 5%;" />
        <col style="width: 5%;" />
        <col style="width: 5%;" />
      </colgroup>
      <thead>
        <tr class="text-center">
          <th scope="col">썸네일</th>
          <th scope="col">제품명</th>
          <th scope="col">내용</th>
          <th scope="col">가격</th>
          <th scope="col">최종가</th>
          <th scope="col">비활성</th>
          <th scope="col"></th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in items" :key="item.id" :class="{editing: item == beforeEditItem }">
          <td><img :src="item.image" class="thumbnails"/></td>
          <td>
            {{item.code}} <br>
             <input class="edit title" type="text" :readonly="!editing" @dblclick="editItem(item)" v-model="item.title" @blur="doneEdit(item)" @keyup.enter="doneEdit(item)" @keyup.esc="cancelEdit(item)"><br>
             {{currentPage}}/{{item.id}} <br>
             <hr>
            <ul v-if="item.skinFile && item.skinFile !== null && typeof item.skinFile === 'object'">
              <li v-for="(value, key) in item.skinFile" :key="key">
                <a :href="value" v-text="key"></a>
                <a v-on:click="skinFileDelete(item.id, key)" class="delKey float-right"> x </a>
              </li>
            </ul>


          </td>
          <td>
            <textarea class="edit desc" type="text" :readonly="!editing" @dblclick="editItem(item)" v-model="item.desc" @blur="doneEdit(item)" @keyup.enter="doneEdit(item)" @keyup.esc="cancelEdit(item)"></textarea>
          </td>
          <td>
            <input class="edit price" type="text" :readonly="!editing" @dblclick="editItem(item)" v-model="item.price" @blur="doneEdit(item)" @keyup.enter="doneEdit(item)" @keyup.esc="cancelEdit(item)"> <br>
            <input class="edit discount" type="text" :readonly="!editing" @dblclick="editItem(item)" v-model="item.discount" @blur="doneEdit(item)" @keyup.enter="doneEdit(item)" @keyup.esc="cancelEdit(item)">
          </td>
          <td class="finalPrice">{{item.finalPrice}}</td>
          <td>
            <button class="btn btn-sm mr-2" :class="{ 'btn-success': !item.deactivate }" @click="itemDeactivateToggle(item)">
              {{item.deactivate ? '비활성' : '활성'}}
            </button>
          </td>
          <td><button class="btn btn-outline-dark  btn-sm mr-2" @click="itemModify(item)">수정</button></td>
          <td><button class="btn btn-outline-dark  btn-sm mr-2" @click="itemDelete(item)">삭제</button></td>
        </tr>
      </tbody>
    </table>
  </section>
</div>
<div v-else>
  관리자만 볼수 있습니다.
</div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import EditItemForm from '~/components/items/EditItemForm.vue';
import SubMenu from '~/components/SubMenu.vue';
import siteConfig from '~/site.config'

export default {
  components: {
    EditItemForm,
    SubMenu
  },

  created() {
    this.itemList();
  },

  watch: {
    '$route': 'itemList'
  },

  computed: {
    ...mapState([
      'user',
      'isAdmin'
    ]),
    ...mapState({
      items: state => state.itemsAdmin.items,
    }),


  },

  data() {
    return {
      editing: false,
      beforeEditItem: null,
      itemModifyData: {deactivate:true},
      currentPage: 'https://'+ siteConfig.contactus.distHomepage + '/item'
    };
  },

  methods: {
    ...mapActions({
      itemList: 'itemsAdmin/itemList', // this.increment()을 this.$store.dispatch('increment')에 매핑
      getIsAdmin: 'isAdmin/getIsAdmin' // this.increment()을 this.$store.dispatch('increment')에 매핑
    }),

    editItem(item) {
      this.editing = true;
      this.beforeEditItem = item
    },

    cancelEdit(item) {
      this.editing = false
    },

    doneEdit(item) {
      if (!this.editing) return;
      this.editing    = false
      item.finalPrice = Math.round((item.price * (100 - item.discount) / 100) / 1000) * 1000
      this.$store.dispatch('itemsAdmin/itemUpdate', { beforeEditItem: this.beforeEditItem,modifyItem: item })
    },

    itemDelete(item) {
      this.$store.dispatch('itemsAdmin/itemDelete', item)
    },

    itemModify(item) {
        this.itemModifyData = item
    },

    itemDeactivateToggle(item) {
      this.beforeEditItem = item;
      item.deactivate = !item.deactivate;
      this.editing = true;
      this.doneEdit(item);
    },

    skinFileDelete(id, skinFileKey) {
      this.$store.dispatch('itemsAdmin/skinFileDelete', {id, skinFileKey})
      .then(()=> {
        alert("삭제 다~ 됬어요")
      })
    }
  },
};
</script>

<style lang="scss">
.item-wrap {
  padding-bottom: 1.5rem;
}
.editing {
  background: $theme-color-sub-200;
}
.thumbnails {
  max-width:5rem;
  max-height: 5rem;
}
th {
  white-space: nowrap;
}

td {
  input,
  textarea{
    width:100%;
    margin:0.1rem;
  }
  .price,
  .discount,
  &.finalPrice {
    text-align: right;
  }

  .edit {
    border: 0;
  }
  .delKey {
    cursor: pointer
  }
}



</style>
