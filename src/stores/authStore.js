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
            // console.log("Got a new nigga on the SQUAD!!!!", getAuth().currentUser);
            // this.user = userCredential.user
            // console.log(this.user)
            })
            .catch((err) => {
            console.log(err.code);
            errMsg.value = err.message;
            });
        },
        async signInG() {
             var provider = new GoogleAuthProvider();
             await signInWithPopup(getAuth(), provider).then((userCredential)=>{
                // console.log(userCredential.user)
                // get creds here due to SOP error but does not stay updated from stateObserver
                // this.user = userCredential.user
                console.log(this.user)
            })
            document.querySelector('#signInClose').click()
        },
        signOutUser() {
            signOut(getAuth());
            console.log(useRoute())
        },
        initFirebaseAuth() {
            onAuthStateChanged(getAuth(), this.authStateObserver);
        },
        authStateObserver(user) {
            console.log('change in auth')
            if (user) {
              // User is signed in!
              // Get the signed-in user's profile pic and name.
              console.log('logged in')
            this.signedIn = true
              //   Popup Causes Same Origin Policy error when trying to use data from function locally
                this.user = user
                // Trying to work around the SOP error with fail
                // this.user = getAuth().currentUser
              // Set the user's profile pic and name.
              
          
              // Show user's profile and sign-out button.
             
          
              // Hide sign-in button.
          
              // We save the Firebase Messaging Device token and enable notifications.
            } else {
              // User is signed out!
              // Hide user's profile and sign-out button.
                console.log('logged out')
                this.user = null
                this.signedIn = false
                
              // Show sign-in button.
            }
          }

    }
})