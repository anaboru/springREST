const changeForm = document.getElementById('editForm');
const idField = document.getElementById('change-Id');
const fistNameField = document.getElementById('change-firstname');
const lastNameField = document.getElementById('change-lastname');
const loginField = document.getElementById('change-username');
const passwordField = document.getElementById('change-password')

async function editForm(id) {
    const userByIdURL = '/admin/users/' + id;
    let userResponse = await fetch(userByIdURL);
    if (userResponse.ok) {
        let userJSONData =
            await userResponse.json().then(user => {
                idField.value = `${user.id}`;
                fistNameField.value = `${user.firstName}`;
                lastNameField.value = `${user.lastName}`;
                loginField.value = `${user.username}`;
                getRolesForEditForm();
            })

    } else {
        alert(`HTTP Error, ${userResponse.status}`)
    }
}

async function updateUser() {
    const url = '/admin/update-user/' + idField.value
    let roles = [];

    for (let i = 0; i < changeForm.selectRolesName.options.length; i++) {
        if (changeForm.selectRolesName.options[i].selected) roles.push({
            id: changeForm.selectRolesName.options[i].value,
            role: "ROLE_" + changeForm.selectRolesName.options[i].text
        })
    }


    let user = {
        id: idField.value,
        firstName: fistNameField.value,
        lastName: lastNameField.value,
        username: loginField.value,
        password: passwordField.value,
        roles: roles

    }

    const method = {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    }

    await fetch(url, method).then(() => {
        $('#editCloseButton').click();
        getAdminPage();
    })
}

async function getRolesForEditForm() {
    const getRolesURL = '/admin/get-roles/'
    let rolesResponse = await fetch(getRolesURL);

    if (rolesResponse.ok) {
        let rolesJSONData =
            await rolesResponse.json().then(roles => {
                let roleUser = roles[0];
                let roleAdmin = roles[1];
                changeForm.selectRolesName.options[0] = new Option('ADMIN', `${roleUser.id}`)
                changeForm.selectRolesName.options[1] = new Option('USER', `${roleAdmin.id}`)

            })
    } else {
        alert(`HTTP Error, ${rolesResponse.status}`)
    }
}