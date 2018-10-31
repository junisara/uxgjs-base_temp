import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

var config = {
  apiKey: 'AIzaSyB_mquCBz_1ZOumHwz3aY-WcQwnqbxa9IQ',
  authDomain: 'uxgjs-juni.firebaseapp.com',
  databaseURL: 'https://uxgjs-juni.firebaseio.com',
  projectId: 'uxgjs-juni',
  storageBucket: 'uxgjs-juni.appspot.com',
  messagingSenderId: '1060684662751'

}

!firebase.apps.length ? firebase.initializeApp(config) : ''
export const GoogleProvider = new firebase.auth.GoogleAuthProvider()
export const AUTH = firebase.auth()
export const DB = firebase.firestore()
export const STORAGE = firebase.storage()
export default firebase

DB.settings({timestampsInSnapshots : true})
