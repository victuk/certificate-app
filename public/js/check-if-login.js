
function checkLogin() {
    if(localStorage.getItem("token") == null) {
        window.location.replace('/login');
    }
}

checkLogin();