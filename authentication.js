    import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
    import { getFirestore,setDoc,doc,updateDoc} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";
    import { getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";
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
    const auth = getAuth(app);

    //sign up
    let signup = document.getElementById("signup")
    signup.addEventListener("click",(e)=>{
        let signup_FullName = document.getElementById("signup-FullName").value
        let signup_username = document.getElementById("signup-username").value
        let signup_email = document.getElementById("signup-email").value
        let signup_password = document.getElementById("signup-password").value
        let realdate = currentTime()
        let history = [];
        createUserWithEmailAndPassword(auth, signup_email, signup_password,signup_FullName)
        .then((userCredential) => {
            // Signed up 
            const user = userCredential.user;
            setDoc(doc(db, "users",user.uid), {
                fullName : signup_FullName,
                userName : signup_username,
                email:signup_email,
                lastLogin:realdate,
                history:history
                });
                alert("user Signed Up successful, Please login using Login Page")
                showForm("loginForm")
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorMessage)
        });
    })

    //login
    let login = document.getElementById("login")
    login.addEventListener('click',(e)=>{
        let login_email = document.getElementById("login-email").value
        let login_password = document.getElementById("login-password").value
        let realdate = currentTime()
        signInWithEmailAndPassword(auth, login_email, login_password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            updateDoc(doc(db, "users",user.uid),{
                lastLogin : realdate
            })
            alert("user Logged in Successful")
            window.open("dictionary.html","_self")
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorMessage +"please register using SignUP page")

        });

    })

    //author state
    /*const user = auth.currentUser;
    onAuthStateChanged(auth, (user) => {
        if (user) {
            const uid = user.uid;
            window.open("dictionary.html")
        }
        });*/
        function currentTime(){
        const ISTOffset = 5.5 * 60 * 60 * 1000;
        const ISTTime = new Date(new Date().getTime() + ISTOffset);
        const date = ISTTime.toISOString();
        return date
        }
        
        