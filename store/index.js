import firebase, { AUTH, DB, STORAGE, GoogleProvider } from '@/services/fireinit.js';

export const strict = false;

function createNewAccount(user) {
  return new Promise((resolve, reject) => {
    DB.collection('accounts').doc("`${user.uid}`").get()
    .then(doc => {
        if (doc.exists) {
          resolve(); // 기존에 등록되어 있다면 등록하지 않음
        } else {
          DB.collection('accounts').doc(`${user.uid}`).set({
              uid: user.uid,
              displayName: user.displayName || user.email.split('@')[0], // use part of the email as a username
              email: user.email,
              image: user.newImage || '/images/default-profile.svg',
              createDate: new Date(),
              modifyDate: new Date()
            }).then(() => resolve())
            .catch(error => {
              console.error('Error writing document: ', error);
              reject(error);
            });
        }
      })
      .catch(function(error) {
        console.log('Error getting document:', error);
        reject(error);
      });
  });
}

export const state = () => ({
  user: null,
  account: null,
  isAdmin: null
});

export const getters = {
  isAuthenticated(state) {
    return !!state.user;
  },
  getIsAdmin(state) {
    return state.isAdmin;
  }
};

export const mutations = {
  setUser(state, user) {
    state.user = user;
    this.dispatch('setAccountRef', state.user.uid);
    this.dispatch('setIsAdmin', state.user.uid);
    return;
  },
  setAccount(state, account) {
    state.account = account;
  },
  setIsAdmin(state, adminYn) {
    state.isAdmin = adminYn;
  },
  resetUser(state) {
    state.user = {};
    state.account = null;
    state.isAdmin = null;
  }
};

export const actions = {

  setAccountRef({ commit }, userId) {
    DB.collection('accounts').doc(`${userId}`).get().then(doc => {
        if (doc.exists) {
          return commit('setAccount', doc.data());
        } else {
           return console.log('회원가입이 되어 있지 않습니다. 회원가입을 먼저 해주세요.');
        }
      })
      .catch((error) => {
        return console.log('Error getting document:', error);
      });
  },

  setIsAdmin({ commit }, userId) {
    DB.collection('isAdmin').doc('adminId').get()
      .then(doc => {
        if (doc.data().adminNumber === userId) {
          var isAdmin = true;
        } else {
          var isAdmin = false;
        }
        return commit('setIsAdmin', isAdmin);
      });
  },

  userGoogleLogin({ commit }) {
    AUTH.useDeviceLanguage();
    GoogleProvider.addScope('https://www.googleapis.com/auth/plus.login');
    GoogleProvider.setCustomParameters({
      login_hint: 'user@example.com'
    });
    return AUTH.signInWithPopup(GoogleProvider)
      .then(result => {
        createNewAccount({
          newImage: result.additionalUserInfo.profile.picture, // just use their existing user image to start
          ...result.user
        }).then(() => {
          return commit('setUser', result.user);
        });
      })
      .catch(error => {
        console.log(error);
      });
  },

  userCreate({ commit }, account) {
    return AUTH.createUserWithEmailAndPassword(account.email, account.password)
      .then(result => {
        createNewAccount({
          // newImage: result.additionalUserInfo.profile.picture, // just use their existing user image to start
          ...result.user
        }).then(() => {
          return commit('setUser', result.user);
        })
      });
  },

  userLogin({ commit }, account) {
    return AUTH.signInWithEmailAndPassword(account.email, account.password)
      .then(result => {
        return commit('setUser', result.user);
      });
  },

  userUpdate({ state, commit }, newData) {
    DB.collection('accounts').doc(`${state.user.uid}`)
    .update({
        displayName: newData.displayName,
        modifyDate: new Date()
      })
      .then(()=>{
        return commit('setUser', state.user);
      });
  },

  userUpdateImage({ state, commit }, imageFile) {
    const ref = STORAGE.ref().child(`accounts/profile/${state.user.uid}`);
    ref.put(imageFile).then((snapshot) => {
      snapshot.ref.getDownloadURL().then((downloadURL) => {
        // console.log('File available at', downloadURL);
        DB.collection('accounts').doc(`${state.user.uid}`).update({image: downloadURL})
        .then(()=>{
          return commit('setUser', state.user);
        });
      });
    })
  },

  userLogout({ commit }) {
    return AUTH.signOut().then(() => {
      return commit('resetUser');
    });
  },

  userDelete({ commit }) {
    var user = AUTH.currentUser;
    DB.collection('accounts').doc(user.uid).delete().then(function() {
      user.delete().then(() => {
        return commit('resetUser')
      });
    }).catch(function(error) {
      return console.error("Error removing document 2: ", error);
    });
  },


};


