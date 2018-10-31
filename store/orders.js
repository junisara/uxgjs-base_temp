import firebase, { AUTH, DB, STORAGE } from '@/services/fireinit.js';

export const state = () => ({
  orders: null
});

export const mutations = {
  setOrdersList(state, orders) {
    state.orders = orders;
  },
  setDeleteOrder(state, order) {
    state.orders.splice(state.orders.indexOf(order), 1)
  }
};

export const actions = {

  ordersList({ commit }) {
    AUTH.onAuthStateChanged((user) => {
      if (user) {
        DB.collection("orders").where("userId", "==", user.uid).get().then(querySnapshot => {
          const orders = querySnapshot.docs.map(doc =>
            Object.assign({ id: doc.id }, doc.data())
          );
          return commit('setOrdersList', orders);
        });
      }
    })
  },

  orderAdd({ commit }, order) {
    return new Promise((resolve, reject) => {
      DB.collection("orders")
      .where("userId", "==", order.userId)
      .where("itemId", "==", order.itemId)
      .get().then(querySnapshot => {
        if(querySnapshot.empty) {
          // 기존에 없을 경우는 새로이 등록
          DB.collection('orders').add( order ).then((docRef) => {
            // id를 항목으로 저장
            DB.collection('orders').doc(docRef.id).update({id: docRef.id})
            resolve(true)
          });
        } else {
          // 기존에 있을 경우는 패스~
          resolve(false); // 기존에 등록되어 있다면 등록하지 않음
        }
      });
    })
  },


  orderItemFile({ commit }, itemId) {
    return new Promise((resolve, reject) => {
    AUTH.onAuthStateChanged((user) => {
      // 로그인된 사용자인지 확인
      DB.collection("orders").where("accountEmail", "==", user.email).where("itemId", "==", itemId)
      .get().then(querySnapshot => {
        // 로그인한 사용자 중 해당 제품을 구매한 사용자 인지 확인
        if(!querySnapshot.empty) {
          const orderId         = querySnapshot.docs[0].id;
          const skinDownloadCnt = querySnapshot.docs[0].data().skinDownloadCnt ? querySnapshot.docs[0].data().skinDownloadCnt : 0;
          //구매자인 경우 다운로드 URL 전달함
          DB.collection("items").doc(itemId).get().then(item => {
            // OrderDB에 다운로드 카운트 작성
            resolve(item.data().skinFile)
            DB.collection('orders').doc(orderId).update({skinDownloadCnt: skinDownloadCnt + 1 });
          });
          } else {
            resolve(false)
          }
        })
      })
    })
  },


  orderDelete({ commit }, order) {
    DB.collection('orders').doc(order.id).delete().then(() => {
      return commit('setDeleteOrder', order);
    });
  },



};
