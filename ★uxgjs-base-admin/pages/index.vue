<template>
<div v-if="isAdmin">
  <SubMenu />
</div>
<div v-else class="text-center">
  관리자만 볼수 있습니다.<br>
</div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import SubMenu from '~/components/SubMenu.vue';

export default {
  components: {
    SubMenu
  },
  computed: {
    ...mapState([
      'user',
      'isAdmin'
    ]),
  }
}
</script>

<style lang="scss" scoped>

</style>
