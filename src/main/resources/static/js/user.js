document.addEventListener('DOMContentLoaded', async () => {
    const currentUserInfo = document.getElementById('currentUserInfo');
    const userTableBody = document.getElementById('userTableBody');

    async function loadCurrentUser() {
        const response = await fetch('/api/user');
        const user = await response.json();

        const roles = user.roles.map(role => role.role.replace('ROLE_', '')).join(' ');
        currentUserInfo.textContent = `${user.username} with roles: ${roles}`;

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

    await loadCurrentUser();
});