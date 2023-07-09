// Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyALPuWLMk3jhSibhlE3GW4589pp4hFSzWY",
    authDomain: "register-account-d51a8.firebaseapp.com",
    databaseURL: "https://register-account-d51a8-default-rtdb.firebaseio.com",
    projectId: "register-account-d51a8",
    storageBucket: "register-account-d51a8.appspot.com",
    messagingSenderId: "856197539938",
    appId: "1:856197539938:web:aef1af46a20a2d3a28093b"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// Initialize variables
const auth = firebase.auth();
const database = firebase.database();

// Set up our register function
function register() {
    // Get all our input fields
    email = document.getElementById('email').value;
    password = document.getElementById('password').value;
    full_name = document.getElementById('full_name').value;

    // Validate input fields
    if (validate_email(email) == false || validate_password(password) == false) {
        alert('Email or Password is Invalid!!!');
        return;
        // Don't continue running the code
    }
    if (validate_field(full_name) == false) {
        alert('Your Name is Invalid!!');
        return;
    }

    // Move on with Auth
    auth.createUserWithEmailAndPassword(email, password)
        .then(() => {
            // Declare user variable
            var user = auth.currentUser;

            // Add this user to Firebase Database
            var database_ref = database.ref();

            // Create User data
            var user_data = {
                email: email,
                full_name: full_name,
                passowrd: password,
                last_login: Date.now()
            }

            // Push to Firebase Database
            database_ref.child('users/' + user.uid).set(user_data);

            // DOne
            alert('User Created!!!');
        })
        .catch((error) => {
            // Firebase will use this to alert of its errors
            var error_code = error.code;
            var error_message = error.message;

            alert(error_message);
        })
}

// Set up our login function
function login() {
    // Get all our input fields
    email = document.getElementById('email').value;
    password = document.getElementById('password').value;

    // Validate input fields
    if (validate_email(email) == false || validate_password(password) == false) {
        alert('Email or Password is Invalid!!!');
        return;
        // Don't continue running the code
    }

    auth.signInWithEmailAndPassword(email, password)
        .then(() => {
            // Declare user variable
            var user = auth.currentUser;

            // Add this user to Firebase Database
            var database_ref = database.ref();

            // Create User data
            var user_data = {
                last_login: Date.now()
            };

            // Push to Firebase Database
            database_ref.child('users/' + user.uid).update(user_data);

            // DOne
            alert('User Logged In!!!');

        })
        .catch((error) => {
            // Firebase will use this to alert of its errors
            var error_code = error.code;
            var error_message = error.message;

            alert(error_message);
        })
}




// Validate Functions
function validate_email(email) {
    // regex 1 chuỗi ký tự hỗ trợ mình kiểm tra gì đó,
    expression = /^[^@]+@\w+(\.\w+)+\w$/
    if (expression.test(email) == true) {
        // Email is good
        return true;
    } else {
        // Email is bad
        return false;
    }
}

function validate_password(password) {
    expression = /^[A-Za-z]\w{7,14}$/
    // Firebase only accepts lengths greater than 6
    if (expression.test(password) == true) {
        return true;
    } else {
        return false;
    }
}

function validate_field(field) {
    if (field == null) {
        return false;
    }

    if (field.length <= 0) {
        return false;
    } else {
        return true;
    }
}