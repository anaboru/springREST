const removeForm = document.getElementById('deleteUserForm');
const idDeleteField = document.getElementById('delete-Id');
const fistNameDeleteField = document.getElementById('delete-firstname');
const lastNameDeleteField = document.getElementById('delete-lastname');
const loginDeleteField = document.getElementById('delete-username');

async function deleteForm(id) {
    const userByIdURL = '/admin/users/' + id;
    let userResponse = await fetch(userByIdURL);
    if (userResponse.ok) {
        let userJSONData =
            await userResponse.json().then(user => {
                idDeleteField.value = `${user.id}`;
                fistNameDeleteField.value = `${user.firstName}`;
                lastNameDeleteField.value = `${user.lastName}`;
                loginDeleteField.value = `${user.username}`;
                getRolesForDeleteForm();
            })

    } else {
        alert(`HTTP Error, ${userResponse.status}`)
    }
}

async function deleteUser() {
    let url = '/admin/delete-user/' + idDeleteField.value

    let method = {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json"
        }
    }

    await fetch(url, method).then(() => {
        $('#deleteCloseButton').click();
        getAdminPage();
    })
}

async function getRolesForDeleteForm() {
    const getRolesURL = '/admin/get-roles/'
    let rolesResponse = await fetch(getRolesURL);

    if (rolesResponse.ok) {
        let rolesJSONData =
            await rolesResponse.json().then(roles => {
                let roleUser = roles[0];
                let roleAdmin = roles[1];
                removeForm.roles.options[0] = new Option('ADMIN', `${roleUser.id}`)
                removeForm.roles.options[1] = new Option('USER', `${roleAdmin.id}`)

            })
    } else {
        alert(`HTTP Error, ${rolesResponse.status}`)
    }
}