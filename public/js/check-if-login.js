
function checkLogin() {
    if(localStorage.getItem("token") == null) {
        window.location.replace('/login');
    }
}

checkLogin();

function logout() {
    localStorage.removeItem('token');
    location.replace('/login')
}