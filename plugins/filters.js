import Vue from 'vue';

Vue.filter ('currency', value => {
  if (!value) return '0';
  return parseFloat(value).toFixed(0).replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1,");
  });
