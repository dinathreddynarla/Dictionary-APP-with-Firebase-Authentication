    import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
    import { getFirestore,setDoc,doc,updateDoc,getDoc} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";
    import { getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword,GoogleAuthProvider,signInWithPopup,sendPasswordResetEmail} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";
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
    const provider = new GoogleAuthProvider(app);
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
        createUserWithEmailAndPassword(auth, signup_email, signup_password)
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
        // Function to handle Google Sign-in
        let gsign = document.getElementById("googlesignin")
        gsign.addEventListener("click",()=>{
                signInWithPopup(auth, provider)
                .then((result) => {
                    const user = result.user;
                    // Check if user exists in the Firestore database
                    getDoc(doc(db, "users", user.uid))
                        .then(docSnap => {
                            if (docSnap.exists()) {
                                // If user exists, retrieve and display their data
                                openDictionary()
                            } else {
                                // If user does not exist, show the form
                                document.getElementById('userForm').style.display = 'block';
                                document.getElementById('loginForm').style.display = 'none';
                                document.getElementById('signupForm').style.display = 'none';

                                // Pre-fill the email and fullname field with user's email
                                document.getElementById('email').value = user.email;
                                document.getElementById('fullName').value=user.displayName;
                                // Handle form submission
                                document.getElementById('profileForm').addEventListener('submit', (e) => {
                                    e.preventDefault();
                                    const fullName = document.getElementById('fullName').value;
                                    const email = document.getElementById('email').value;
                                    const username = document.getElementById('username').value;
                                    const phone = document.getElementById('phone').value;
                                    let realdate = currentTime()

                                    // Save the new user data to Firestore
                                    setDoc(doc(db, "users", user.uid), {
                                        fullName: fullName,
                                        email: email,
                                        username:username,
                                        history:[],
                                        lastLogin : realdate,
                                        phone: phone
                                    }).then(() => {
                                        console.log('User profile saved');
                                        document.getElementById('userForm').style.display = 'none';
                                        openDictionary()
                                    }).catch((error) => {
                                        console.error("Error saving user data:", error);
                                    });
                                });
                            }
                        })
                        .catch(error => {
                            console.error("Error retrieving user data:", error);
                        });
                })
                .catch((error) => {
                    console.error("Error during sign-in:", error);
                });
            })
            document.getElementById("resetPassword").addEventListener("click",()=>{
                var resetMail = document.getElementById("reset-email").value;
                sendPasswordResetEmail(auth, resetMail)
                .then(() => {
                    // Password reset email sent!
                    // ..
                    alert("reset Email sent")
                    
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    // ..
                });
        
            })         
function userdata(){
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('signupForm').style.display = 'none';
    document.getElementById('userdetails').style.display="block";
}

function openDictionary(){
    window.open("dictionary.html","_self")
}
