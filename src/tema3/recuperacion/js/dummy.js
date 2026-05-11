const url = 'https://dummyjson.com/users';

async function getUsers() {
    const response = await fetch(url);
    const data = await response.json();
    return data.users;
}

function renderUsers(users) {
    const main = document.querySelector('main');

    const list = document.createElement('ul');
    list.classList.add('dummy-user-list');

    users.forEach(user => {
        const item = document.createElement('li');
        item.classList.add('dummy-user-item');
        item.innerHTML = `
            <img src="${user.image}" alt="${user.firstName}">
            <div>
                <strong>${user.firstName} ${user.lastName}</strong>
                <p>${user.email}</p>
                <small>${user.role}</small>
            </div>
        `;
        list.appendChild(item);
    });

    main.appendChild(list);
}

// Exportar para tests unitarios (Jest / Node.js)
if (typeof module !== 'undefined') {
    module.exports = { getUsers, renderUsers };
}

// En el navegador, enlazar el botón
if (typeof document !== 'undefined' && typeof module === 'undefined') {
    const btn = document.querySelector('.btn-show');
    btn.addEventListener('click', async () => {
        const existingList = document.querySelector('.dummy-user-list');

        if (existingList) {
            return;
        }

        const users = await getUsers();
        renderUsers(users);
    });
}
