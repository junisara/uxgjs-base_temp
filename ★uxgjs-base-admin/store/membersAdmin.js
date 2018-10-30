import firebase, { AUTH, DB, STORAGE } from '@/services/fireinit.js';

export const state = () => ({
  members: null
});

export const mutations = {
  setMemberList(state, members) {
    state.members = members;
  },
};

export const actions = {
  memberList({ commit }, isAdmin) {
    AUTH.onAuthStateChanged((user) => {
      if ( isAdmin ) {
        DB.collection("accounts").get().then(querySnapshot => {
          const members = querySnapshot.docs.map(doc =>
            Object.assign({ id: doc.id }, doc.data())
          );
          return commit('setMemberList', members);
        });
      }
    })
  },

};
