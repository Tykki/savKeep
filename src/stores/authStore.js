import {
    getAuth,
    onAuthStateChanged,
    GoogleAuthProvider,
    signInWithPopup,
    createUserWithEmailAndPassword,
    signOut,
  } from 'firebase/auth';
import { ref } from "vue";
import { useRoute } from "vue-router";
import { defineStore } from "pinia";

export const useAuthStore = defineStore('authStore', {
    state: () => ({
        user: {},
        signedIn: false
    }),
    getters: {
        getUser() {
            return this.user
        }
    },
    actions: {
       async register(email, pass, errMsg) {
            createUserWithEmailAndPassword(getAuth(), email, pass)
            .then(() => {
            })
            .catch((err) => {
            console.log(err.code);
            errMsg.value = err.message;
            });
        },
        async signInG() {
             var provider = new GoogleAuthProvider();
             await signInWithPopup(getAuth(), provider).then((userCredential)=>{
                // get creds here due to SOP error but does not stay updated from stateObserver
                // this.user = userCredential.user
            })
            document.querySelector('#signInClose').click()
        },
        signOutUser() {
            signOut(getAuth());
        },
        initFirebaseAuth() {
            onAuthStateChanged(getAuth(), this.authStateObserver);
        },
        authStateObserver(user) {
            if (user) {
              // User is signed in!
              // Get the signed-in user's profile pic and name.
            this.signedIn = true
              //   Popup Causes Same Origin Policy error when trying to use data from function locally
                this.user = user
                // Trying to work around the SOP error with fail
                // this.user = getAuth().currentUser
            } else {
              // User is signed out!
              // Hide user's profile and sign-out button.
                this.user = null
                this.signedIn = false
            }
          }

    }
})