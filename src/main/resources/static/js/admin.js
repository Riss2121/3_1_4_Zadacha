document.addEventListener('DOMContentLoaded', async () => {
    const usersTableBody = document.getElementById('usersTableBody');
    const userTableBody = document.getElementById('userTableBody');
    const currentUserInfo = document.getElementById('currentUserInfo');

    const usersTab = document.getElementById('usersTab');
    const newUserTab = document.getElementById('newUserTab');
    const usersSection = document.getElementById('usersSection');
    const newUserSection = document.getElementById('newUserSection');

    const adminMenuLink = document.getElementById('adminMenuLink');
    const userMenuLink = document.getElementById('userMenuLink');
    const adminPage = document.getElementById('adminPage');
    const userPage = document.getElementById('userPage');

    let currentUser = null;
    let isAdmin = false;

    usersTab.addEventListener('click', () => {
        usersSection.classList.remove('d-none');
        newUserSection.classList.add('d-none');
        usersTab.classList.add('active');
        newUserTab.classList.remove('active');
    });

    newUserTab.addEventListener('click', () => {
        usersSection.classList.add('d-none');
        newUserSection.classList.remove('d-none');
        usersTab.classList.remove('active');
        newUserTab.classList.add('active');
    });

    adminMenuLink.addEventListener('click', async (event) => {
        event.preventDefault();

        if (!isAdmin) {
            userMenuLink.click();
            return;
        }

        adminPage.classList.remove('d-none');
        userPage.classList.add('d-none');

        adminMenuLink.classList.add('active');
        userMenuLink.classList.remove('active');

        await loadUsers();
    });

    userMenuLink.addEventListener('click', async (event) => {
        event.preventDefault();

        userPage.classList.remove('d-none');
        adminPage.classList.add('d-none');

        userMenuLink.classList.add('active');
        adminMenuLink.classList.remove('active');

        await loadUserPage();
    });

    async function loadCurrentUser() {
        const response = await fetch('/api/user');

        if (!response.ok) {
            throw new Error('Failed to load current user');
        }

        currentUser = await response.json();

        const roles = currentUser.roles.map(role => role.role.replace('ROLE_', '')).join(' ');
        currentUserInfo.textContent = `${currentUser.username} with roles: ${roles}`;

        isAdmin = currentUser.roles.some(role => role.role === 'ROLE_ADMIN');

        if (!isAdmin) {
            adminMenuLink.classList.add('d-none');
            adminPage.classList.add('d-none');
            userPage.classList.remove('d-none');
            userMenuLink.classList.add('active');
            adminMenuLink.classList.remove('active');
            usersSection.classList.remove('d-none');
            newUserSection.classList.add('d-none');
            usersTab.classList.add('active');
            newUserTab.classList.remove('active');
        }
    }

    async function loadUsers() {
        if (!isAdmin) {
            return;
        }

        const response = await fetch('/api/admin/users');

        if (!response.ok) {
            throw new Error('Failed to load users');
        }

        const users = await response.json();

        usersTableBody.innerHTML = '';

        users.forEach(user => {
            const roles = user.roles.map(role => role.role.replace('ROLE_', '')).join(' ');

            usersTableBody.insertAdjacentHTML('beforeend', `
                <tr>
                    <td>${user.id}</td>
                    <td>${user.firstName}</td>
                    <td>${user.lastName}</td>
                    <td>${user.age}</td>
                    <td>${user.username}</td>
                    <td>${roles}</td>
                    <td><button type="button" class="btn btn-info btn-sm" onclick="editUser(${user.id})">Edit</button></td>
                    <td><button type="button" class="btn btn-danger btn-sm" onclick="deleteUser(${user.id})">Delete</button></td>
                </tr>
            `);
        });
    }

    async function loadUserPage() {
        const response = await fetch('/api/user');

        if (!response.ok) {
            throw new Error('Failed to load user page');
        }

        const user = await response.json();
        const roles = user.roles.map(role => role.role.replace('ROLE_', '')).join(' ');

        userTableBody.innerHTML = `
            <tr>
                <td>${user.id}</td>
                <td>${user.firstName}</td>
                <td>${user.lastName}</td>
                <td>${user.age}</td>
                <td>${user.username}</td>
                <td>${roles}</td>
            </tr>
        `;
    }

    document.getElementById('createUserForm').addEventListener('submit', async (event) => {
        event.preventDefault();

        if (!isAdmin) {
            return;
        }

        const roles = Array.from(document.getElementById('newRoles').selectedOptions)
            .map(option => ({ role: option.value }));

        const user = {
            firstName: document.getElementById('newFirstName').value.trim(),
            lastName: document.getElementById('newLastName').value.trim(),
            age: Number(document.getElementById('newAge').value),
            username: document.getElementById('newUsername').value.trim(),
            password: document.getElementById('newPassword').value,
            roles: roles
        };

        const response = await fetch('/api/admin/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });

        if (!response.ok) {
            const errorText = await response.text();
            alert(errorText || 'User was not created');
            return;
        }

        event.target.reset();
        usersTab.click();
        await loadUsers();
    });

    window.deleteUser = async (id) => {
        if (!isAdmin) {
            return;
        }

        const response = await fetch(`/api/admin/users/${id}/delete`, {
            method: 'POST'
        });

        if (!response.ok) {
            const errorText = await response.text();
            alert(errorText || 'User was not deleted');
            return;
        }

        await loadUsers();
    };

    window.editUser = async (id) => {
        if (!isAdmin) {
            return;
        }

        const response = await fetch(`/api/admin/users/${id}`);

        if (!response.ok) {
            alert('User not found');
            return;
        }

        const user = await response.json();

        const firstName = prompt('First name', user.firstName);
        if (firstName === null) return;

        const lastName = prompt('Last name', user.lastName);
        if (lastName === null) return;

        const age = prompt('Age', user.age);
        if (age === null) return;

        const username = prompt('Username', user.username);
        if (username === null) return;

        const password = prompt('Password (leave blank to keep current)', '');
        if (password === null) return;

        const updatedUser = {
            firstName: firstName.trim(),
            lastName: lastName.trim(),
            age: Number(age),
            username: username.trim(),
            password: password,
            roles: user.roles
        };

        const updateResponse = await fetch(`/api/admin/users/${id}/edit`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedUser)
        });

        if (!updateResponse.ok) {
            const errorText = await updateResponse.text();
            alert(errorText || 'User was not updated');
            return;
        }

        await loadUsers();
    };

    await loadCurrentUser();
    await loadUserPage();

    if (isAdmin) {
        await loadUsers();
    }
});