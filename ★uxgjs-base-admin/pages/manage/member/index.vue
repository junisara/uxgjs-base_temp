<template>
  <div v-if="isAdmin">
    <SubMenu />

    <div class="one-half column centered"  v-cloak>
      <h1>회원 리스트</h1>
      <MemberListAdmin :isAdmin="isAdmin" />
    </div>
  </div>
  <div v-else>
    관리자만 볼수 있습니다. {{isAdmin}}
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import MemberListAdmin from '~/components/members/MemberListAdmin.vue'
import SubMenu from '~/components/SubMenu.vue';

export default {
  components: {
    MemberListAdmin,
    SubMenu
  },

  computed: {
    ...mapState([
      'user',
      'isAdmin'
    ])
  },

  methods: {
    ...mapActions({
    }),
  }
}
</script>

<style lang="scss" scoped>

</style>
