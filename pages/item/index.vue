<template>
<section>
  <!-- <div class="jumbotron">
    <div class="container">
      <h1 class="display-3">UX공작소</h1>
      <p>UX공작소에서 제작한 다양한 스킨의 샘플을 미리보기 할 수 있습니다. </p>
    </div>

  </div> -->
  <ItemsList />
</section>
</template>

<script>
import ItemsList from '~/components/items/ItemsList.vue'

export default {

  components: {
    ItemsList,
  },

  mounted() {
    // this.orderFormPopup();
    $(".jumbotron").show();
    this.moveJumbotron();
  },
  beforeDestroy() {
    $(".jumbotron").hide();
  },
  methods: {
    moveJumbotron() {
      if ($(".jumbotron").length == 1) {
        $(".jumbotron").insertAfter(".header")
      } else if ($(".jumbotron").length > 1) {
        $("main .jumbotron").hide();
      };
    }
  }

}
</script>

<style lang="scss" scoped>
.jumbotron {
  display: block;
  margin-top: -1rem;
  background: url('~assets/images/background-tree.jpg') no-repeat center center fixed;
  background-size: cover;
  height: 100%;
  overflow: hidden;

  h1 {
    font-weight: 400;
    color: #fff;
    text-shadow: 2px 2px 8px #666;
  }

  p {
    color: #fff;
    text-align: center;
    font-size: 1.4rem;
  }
}
</style>
