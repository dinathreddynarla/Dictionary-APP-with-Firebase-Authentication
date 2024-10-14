import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getFirestore,doc,getDoc,updateDoc} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";
import { getAuth,onAuthStateChanged,signOut} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";
const firebaseConfig = {
  apiKey: "AIzaSyDk-jY4LDcRw4or4A42BmH0_kbyOqQ3-Cc",
  authDomain: "authentication-app-6cf14.firebaseapp.com",
  databaseURL: "https://authentication-app-6cf14-default-rtdb.firebaseio.com",
  projectId: "authentication-app-6cf14",
  storageBucket: "authentication-app-6cf14.appspot.com",
  messagingSenderId: "169600919766",
  appId: "1:169600919766:web:742372a38728c7a5c0c177"
}; 
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();
let username = document.getElementById("user")
//author state
const user = auth.currentUser;
onAuthStateChanged(auth, (user) => {
    if (user) {
        getDoc(doc(db,"users",user.uid)).then(docSnap => {
           if(docSnap.exists()){
                let userdata =docSnap.data()
               console.log(userdata)
               username.innerText=`Welcome, ${userdata.fullName}`
           }else{
               console.log("no data")
           }
   })
    } else {
      // User is signed out
      window.open("index.html","_self");
    }
  });
// let logout = document.getElementById("logout")
let logout = document.getElementById("profile")
logout.addEventListener("click",(e)=>{
    signOut(auth).then(() => {
        window.open("index.html","_self");
        // Sign-out successful.
      }).catch((error) => {
        // An error happened.
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage)
      });
})
let search  = document.getElementById("search-btn")
search.addEventListener("click",()=>{
  addhistory();
})
let searchbar= document.getElementById("inp-word")
    searchbar.addEventListener("keypress",async (e)=>{
        if(e.key==="Enter"){
            addhistory();
        }
    })

function addhistory() {
  const user = auth.currentUser;
  var localhistory = [];
  
  onAuthStateChanged(auth, (user) => {
    if (user) {
      getDoc(doc(db, "users", user.uid)).then(docSnap => {
        if (docSnap.exists()) {
          let userdata = docSnap.data();
          localhistory = userdata.history || [];
          
          let searchdata = document.getElementById("inp-word").value;
          localhistory.push(searchdata);
          
          updateDoc(doc(db, "users", user.uid), {
            history: localhistory
          });
        }
      }).catch(error => {
        console.error("Error fetching document: ", error);
      });
    }
  });
}
