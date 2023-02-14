const tbody = document.getElementById("usersTableBody");
const url = '/admin/all-users';

async function getAdminPage() {
    let response = await fetch(url);
    if (response.ok) {
        let usersJSONData =
            await response.json().then(usersJSONData => fillPage(usersJSONData, tbody))
    } else {
        alert(`HTTP Error, ${response.status}`)
    }
}

async function getCurrentUser() {
    let response = await fetch('/user/get-user');
    if (response.ok) {
        let usersJSONData =
            await response.json().then(usersJSONData => fillLoggedUser(usersJSONData, document.getElementById("userNameAndRole")))
    } else {
        alert(`HTTP Error, ${response.status}`)
    }
}

function fillLoggedUser(userData, logged) {
    $(logged).empty();
    userData.forEach(user => {
        logged.innerHTML = user.username.bold() + ' with roles: ' + user.rolesToString;
    })
}

function fillPage(userData, tbody) {
    $(tbody).empty();
    userData.forEach(user => {
        const tRow = document.createElement("tr");
        tRow.innerHTML =
            `<td>${user.id}</td>
             <td>${user.firstName}</td>
             <td>${user.lastName}</td>
             <td>${user.username}</td>
             <td>${user.rolesToString}</td>
             <td>
                 <button class="btn btn-primary btn-sm"
                         type="submit"
                         class="btn btn-primary btn-sm"
                         style="background: rgb(23,162,184)"
                         data-bs-toggle="modal"
                         data-bs-target="#editModal"
                         onclick="editForm(${user.id})">Edit
                 </button>
             </td>
             <td>
                   <button class="btn btn-danger btn-sm"
                           type="button"
                           data-bs-toggle="modal" 
                           data-bs-target="#deleteModal"
                           onclick="deleteForm(${user.id})"> Delete
                   </button>
            </td>`
        tbody.append(tRow);

    })
}

getCurrentUser();
getAdminPage();