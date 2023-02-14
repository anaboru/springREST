const createUserURL = '/admin/create-user/'
const createForm = document.getElementById('newUserForm');

createForm.addEventListener('submit', (event) => {
    event.preventDefault();
    let roles = []

    for (let i = 0; i < createForm.roles.options.length; i++) {
        if (createForm.roles.options[i].selected) roles.push({
            id: createForm.roles.options[i].value,
            name: "ROLE_" + createForm.roles.options[i].text
        })
    }

    let user = {
        firstName: $('#create-firstname').val(),
        lastName: $('#create-lastname').val(),
        username: $('#create-username').val(),
        password: $('#create-password').val(),
        roles: roles
    }

    const method = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    }
    fetch(createUserURL, method)
        .then(() => {
            $('#newUserForm').trigger("reset");
            $(`.nav-tabs a[href="#tab-1"]`).tab("show");
            getAdminPage();
        })
})

function addNewUserFormOptions() {
    createForm.roles.options[0] = new Option('USER', `1`);
    createForm.roles.options[1] = new Option('ADMIN', `2`);
}

addNewUserFormOptions();