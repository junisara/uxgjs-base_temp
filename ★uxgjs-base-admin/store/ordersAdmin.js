import firebase, { AUTH, DB, STORAGE } from '@/services/fireinit.js';

export const state = () => ({
  orders: null
});

export const mutations = {
  setOrdersList(state, orders) {
    state.orders = orders;
  },
  setOrdersAdd(state, order) {
    state.orders.unshift(order);
  },
  setDeleteOrder(state, order) {
    state.orders.splice(state.orders.indexOf(order), 1);
  }
};

export const actions = {
  ordersList({ commit }, isAdmin) {
    AUTH.onAuthStateChanged((user) => {
      if ( isAdmin ) {
        DB.collection("orders").get().then(querySnapshot => {
          const orders = querySnapshot.docs.map(doc =>
            Object.assign({ id: doc.id }, doc.data())
          );
          return commit('setOrdersList', orders);
        });
      }
    })
  },

  orderStepChange({ dispatch }, order ) {
    AUTH.onAuthStateChanged((user) => {
      DB.collection('orders').doc(order.id).update({step:  order.step});
      dispatch('ordersList', 'true' );
    })
  },

  orderDelete({ commit }, order) {
    DB.collection('orders').doc(order.id).delete().then(() => {
      return commit('setDeleteOrder', order);
    });
  }

};
