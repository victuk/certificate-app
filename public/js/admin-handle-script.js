
// login
function callme() {
    const email = document.getElementById('lemail2').value;
    const password = document.getElementById('lpassword2').value;
    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);
    //return console.log(formData)
    fetch('/users/login-admin', {
        method: "POST",
        headers:{
            "content-type": "application/json"
        },
        body: JSON.stringify({email, password})
    })
    .then(res => {
        if(res.status === 401) {
            return alert("Invalid username or password");
        } else if (res.status === 404) {
            return alert("User not found!");
        }
        return res.json();
    })
    .then(resp => {
        if (resp.message === "ok") {
            localStorage.setItem("token", resp.token);
            location.assign('/dashboard');
        }
    })
    .catch(err => {
        console.log('error ' + err);
    })
}

// function fetchStudents() {
    
// }


fetch('/users/all-students', {
    method: "GET"
})
.then(function(response) {
    return response.json();
}).then(function(res) {
    let showStudents = document.getElementById('studentList');
    res.forEach(student => {
        showStudents.innerHTML += `<div class='col-md-12 p-2 my-3' style="border: 1px solid #007bff; border-radius: 10px;">
        <button class="btn btn-primary" onclick="editStudent('${student._id}')">Edit</button>
            <button class="btn btn-link" onclick="viewStudent('${student._id}')">${student.first_name} ${student.last_name} ${student.gender}</button>
            
        </div>`; 
        console.log(student);
    });
    
}).catch(function(err) {
    console.log(err);
});


function viewStudent(did) {
    location.assign('/single-user?user=' + did)
    //console.log(did);
}

function editStudent(did) {
    location.assign('/edit-user?user=' + did)
    //console.log(did);
}

function deleteStudent(did) {
    fetch('/users/stid/' + did, {
        method: "DELETE"
    }).then(resp => {
        return resp.json();
    })
    .then(finalresp => {
        if(finalresp.message == 'deleted') {
            alert("Delete Successful");
            location.replace('/dashboard')
        }
    })
}
