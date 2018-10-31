<template>
<div class="container-fluid">
  <div class="row">
    <div class="col">
      <ul class="nav justify-content-center">
        <li class="nav-item">
          <router-link class="nav-link active" to="/manage/order">주문</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/manage/items">아이템</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/manage/member">회원</router-link>
        </li>
      </ul>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'SubMenu'

}
</script>
