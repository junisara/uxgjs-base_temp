import firebase, { AUTH, DB, STORAGE } from '@/services/fireinit.js';

export const state = () => ({
  items: null,
  itemDetail: null
});

export const mutations = {
  setListItems(state, items) {
    state.items = items;
  },
  setItemDetail(state, item) {
    state.itemDetail = item;
  },
  setAddItem(state, item) {
    state.items.unshift(item);
  },
  setUpdateItem(state, {beforeEditItem, modifyItem} ) {
    state.items.splice(state.items.indexOf(beforeEditItem), 1, modifyItem)
  },
  setDeleteItem(state, item) {
    state.items.splice(state.items.indexOf(item), 1)
  }
};

export const actions = {

  itemList({ commit }) {
    DB.collection('items').orderBy("modifyDate", "desc").get().then(querySnapshot => {
        const items = querySnapshot.docs.map(doc =>
          Object.assign({ id: doc.id }, doc.data())
        );
        return commit('setListItems', items);
      });
  },

  itemDetail({ commit },itemId) {
    return new Promise((resolve, reject) => {
      DB.collection('items').doc(itemId).get().then(doc => {
        if (doc.exists) {
          commit('setItemDetail', doc.data());
          resolve()
        } else {
          console.log("No such document!");
          reject()
        }
      }).catch(function(error) {
        console.log("Error getting document:", error);
        reject(error)
      });
    })

  },

  itemAdd({ commit }, item) {
    return new Promise((resolve, reject) => {
      DB.collection('items').add( item ).then((docRef) => {
        commit('setAddItem', item);
        resolve(docRef.id)
      });
    })
  },

  itemUpdate( {commit}, editItem ) {
    return new Promise((resolve, reject) => {
      DB.collection('items').doc(editItem.beforeEditItem.id).set( editItem.modifyItem ).then(() => {
        commit('setUpdateItem', {beforeEditItem:editItem.beforeEditItem, modifyItem:editItem.modifyItem});
        resolve(editItem.beforeEditItem.id)
      });
    })
  },

  itemDelete({ commit }, item) {
    DB.collection('items').doc(item.id).delete().then(() => {
        return commit('setDeleteItem', item);
      });
  },

  uploadImage ({ commit }, {id, imageFile}) {
    return new Promise((resolve, reject) => {
      const ref = STORAGE.ref().child(`items/${id}/${imageFile.name}`)
      ref.put(imageFile).then((snapshot) => {
        snapshot.ref.getDownloadURL().then((downloadURL) => {
            return DB.collection('items').doc(id).update({image: downloadURL});
          });
      })
      .then(() => resolve())
      .catch((err) => {
        console.error(err)
        reject()
      })
    })
  },

  uploadSkinFile ({ commit }, {id, skinFile}) {
    return new Promise((resolve, reject) => {
      const ref = STORAGE.ref().child(`items/${id}/${skinFile.name}`)
      ref.put(skinFile).then((snapshot) => {
        snapshot.ref.getDownloadURL().then((downloadURL) => {
            return DB.collection('items').doc(id).update({skinFile: downloadURL});
          });
      })
      .then(() => resolve())
      .catch((err) => {
        console.error(err)
        reject()
      })
    })
  }


};
