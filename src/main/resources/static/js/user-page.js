const userTable = document.getElementById("userTable");
const url = 'http://localhost:8080/user/get-user';

async function getUserPage() {
    let response = await fetch(url);
    if (response.ok) {
        let usersJSONData =
            await response.json().then(usersJSONData => fillPage(usersJSONData, userTable))
    } else {
        alert(`HTTP Error, ${response.status}`)
    }
}

function fillPage(usersJSONData, userTable) {
    $(userTable).empty();
    usersJSONData.forEach(user => {
        document.getElementById("userNameAndRole").innerHTML = user.username.bold() + ' with roles: ' + user.rolesToString;
        const tRow = document.createElement("tr");
        tRow.innerHTML =
            `
            <td>${user.id}</td>
            <td>${user.firstName}</td>
             <td>${user.lastName}</td>
             <td>${user.username}</td>
             <td>${user.rolesToString}</td>
             
            `
        userTable.append(tRow);

    })
}

getUserPage();