document.addEventListener('DOMContentLoaded', async () => {
    const usersTab = document.getElementById('usersTab');
    const newUserTab = document.getElementById('newUserTab');
    const usersSection = document.getElementById('usersSection');
    const newUserSection = document.getElementById('newUserSection');

    const editModal = new bootstrap.Modal(document.getElementById('editModal'));
    const deleteModal = new bootstrap.Modal(document.getElementById('deleteModal'));

    usersTab.addEventListener('click', () => {
        usersTab.classList.add('active');
        newUserTab.classList.remove('active');
        usersSection.classList.remove('d-none');
        newUserSection.classList.add('d-none');
    });

    newUserTab.addEventListener('click', () => {
        newUserTab.classList.add('active');
        usersTab.classList.remove('active');
        newUserSection.classList.remove('d-none');
        usersSection.classList.add('d-none');
    });

    document.getElementById('createUserForm').addEventListener('submit', createUser);
    document.getElementById('editUserForm').addEventListener('submit', updateUser);
    document.getElementById('deleteUserForm').addEventListener('submit', deleteUser);

    await loadCurrentUser();
    await loadUsers();

    async function loadCurrentUser() {
        const response = await fetch('/api/user');
        if (!response.ok) {
            console.error('Failed to load current user');
            return;
        }

        const user = await response.json();
        const roles = user.roles.map(role => role.name.replace('ROLE_', '')).join(' ');
        document.getElementById('currentUserInfo').textContent = `${user.username} with roles: ${roles}`;
    }

    async function loadUsers() {
        const response = await fetch('/api/admin/users');
        if (!response.ok) {
            console.error('Failed to load users');
            return;
        }

        const users = await response.json();
        const tbody = document.getElementById('usersTableBody');
        tbody.innerHTML = '';

        users.forEach(user => {
            const roles = user.roles.map(role => role.name.replace('ROLE_', '')).join(' ');

            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${user.id}</td>
                <td>${user.firstName}</td>
                <td>${user.lastName}</td>
                <td>${user.age}</td>
                <td>${user.username}</td>
                <td>${roles}</td>
                <td><button type="button" class="btn btn-info btn-sm text-white">Edit</button></td>
                <td><button type="button" class="btn btn-danger btn-sm">Delete</button></td>
            `;

            row.querySelector('.btn-info').addEventListener('click', () => openEditModal(user));
            row.querySelector('.btn-danger').addEventListener('click', () => openDeleteModal(user));

            tbody.appendChild(row);
        });
    }

    async function createUser(event) {
        event.preventDefault();

        const user = {
            firstName: document.getElementById('newFirstName').value,
            lastName: document.getElementById('newLastName').value,
            age: parseInt(document.getElementById('newAge').value),
            username: document.getElementById('newUsername').value,
            password: document.getElementById('newPassword').value,
            roles: getSelectedRoles('newRoles')
        };

        const response = await fetch('/api/admin/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });

        if (!response.ok) {
            console.error('Failed to create user');
            return;
        }

        event.target.reset();
        usersTab.click();
        await loadUsers();
    }

    function openEditModal(user) {
        document.getElementById('editId').value = user.id;
        document.getElementById('editFirstName').value = user.firstName;
        document.getElementById('editLastName').value = user.lastName;
        document.getElementById('editAge').value = user.age;
        document.getElementById('editUsername').value = user.username;
        document.getElementById('editPassword').value = '';

        setSelectedRoles('editRoles', user.roles);
        editModal.show();
    }

    async function updateUser(event) {
        event.preventDefault();

        const id = document.getElementById('editId').value;

        const user = {
            firstName: document.getElementById('editFirstName').value,
            lastName: document.getElementById('editLastName').value,
            age: parseInt(document.getElementById('editAge').value),
            username: document.getElementById('editUsername').value,
            password: document.getElementById('editPassword').value,
            roles: getSelectedRoles('editRoles')
        };

        const response = await fetch(`/api/admin/users/${id}/edit`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });

        if (!response.ok) {
            console.error('Failed to update user');
            return;
        }

        editModal.hide();
        await loadUsers();
    }

    function openDeleteModal(user) {
        document.getElementById('deleteId').value = user.id;
        document.getElementById('deleteFirstName').value = user.firstName;
        document.getElementById('deleteLastName').value = user.lastName;
        document.getElementById('deleteAge').value = user.age;
        document.getElementById('deleteUsername').value = user.username;

        setSelectedRoles('deleteRoles', user.roles);
        deleteModal.show();
    }

    async function deleteUser(event) {
        event.preventDefault();

        const id = document.getElementById('deleteId').value;

        const response = await fetch(`/api/admin/users/${id}/delete`, {
            method: 'POST'
        });

        if (!response.ok) {
            console.error('Failed to delete user');
            return;
        }

        deleteModal.hide();
        await loadUsers();
    }

    function getSelectedRoles(selectId) {
        return Array.from(document.getElementById(selectId).selectedOptions)
            .map(option => ({ name: option.value }));
    }

    function setSelectedRoles(selectId, roles) {
        const select = document.getElementById(selectId);
        const roleNames = roles.map(role => role.name);

        Array.from(select.options).forEach(option => {
            option.selected = roleNames.includes(option.value);
        });
    }
});