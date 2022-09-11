import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.4/firebase-app.js";
import { getAuth, signInWithEmailAndPassword  } from "https://www.gstatic.com/firebasejs/9.9.4/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyDwBp3AN9CB_ErkntIAVQ1Lkm-lWkCYvwg",
  authDomain: "formdata-prd.firebaseapp.com",
  databaseURL: "https://formdata-prd-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "formdata-prd",
  storageBucket: "formdata-prd.appspot.com",
  messagingSenderId: "137229941775",
  appId: "1:137229941775:web:e73f88adad9209abd6f77a"
};
initializeApp(firebaseConfig);
signInWithEmailAndPassword(getAuth(), 'open@sprsllp.com', 'password')

export function failMessage() {
  Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: 'Something went wrong! Please try again later Or reach us via email/phone.',
  }).then(
    () => location.reload()
  )
}

export function successMessage() {
  Swal.fire({
    icon: 'success',
    title: 'Submitted!',
    text: 'Thank you for reaching out to us! Our team will get back to you soon',
  }).then(
    () => location.reload()
  )
}