// ==========================================================================
// UNIT TESTS: dummy.js — getUsers() y renderUsers()
// ==========================================================================

const { getUsers, renderUsers } = require('../dummy');

// Mock global de fetch
global.fetch = jest.fn();

// ---------------------------------------------------------------------------
// getUsers()
// ---------------------------------------------------------------------------
describe('getUsers()', () => {

    beforeEach(() => {
        fetch.mockClear();
    });

    it('llama a fetch con la URL de dummyjson', async () => {
        fetch.mockResolvedValueOnce({
            json: () => Promise.resolve({ users: [] })
        });

        await getUsers();

        expect(fetch).toHaveBeenCalledWith('https://dummyjson.com/users');
    });

    it('llama a fetch exactamente una vez', async () => {
        fetch.mockResolvedValueOnce({
            json: () => Promise.resolve({ users: [] })
        });

        await getUsers();

        expect(fetch).toHaveBeenCalledTimes(1);
    });

    it('devuelve el array de usuarios de la respuesta', async () => {
        const mockUsers = [
            { id: 1, firstName: 'John', lastName: 'Doe', email: 'john@test.com', role: 'admin', image: '' }
        ];

        fetch.mockResolvedValueOnce({
            json: () => Promise.resolve({ users: mockUsers })
        });

        const result = await getUsers();

        expect(result).toEqual(mockUsers);
    });

    it('devuelve un array vacío si la API no tiene usuarios', async () => {
        fetch.mockResolvedValueOnce({
            json: () => Promise.resolve({ users: [] })
        });

        const result = await getUsers();

        expect(result).toHaveLength(0);
    });

    it('devuelve múltiples usuarios correctamente', async () => {
        const mockUsers = [
            { id: 1, firstName: 'John', lastName: 'Doe', email: 'john@test.com', role: 'admin', image: '' },
            { id: 2, firstName: 'Jane', lastName: 'Smith', email: 'jane@test.com', role: 'moderator', image: '' }
        ];

        fetch.mockResolvedValueOnce({
            json: () => Promise.resolve({ users: mockUsers })
        });

        const result = await getUsers();

        expect(result).toHaveLength(2);
        expect(result[0].firstName).toBe('John');
        expect(result[1].firstName).toBe('Jane');
    });

    it('lanza un error si fetch falla', async () => {
        fetch.mockRejectedValueOnce(new Error('Network error'));

        await expect(getUsers()).rejects.toThrow('Network error');
    });
});

// ---------------------------------------------------------------------------
// renderUsers()
// ---------------------------------------------------------------------------
describe('renderUsers()', () => {

    const mockUsers = [
        {
            id: 1,
            firstName: 'John',
            lastName: 'Doe',
            email: 'john@example.com',
            role: 'admin',
            image: 'https://dummyjson.com/icon/john/128'
        },
        {
            id: 2,
            firstName: 'Jane',
            lastName: 'Smith',
            email: 'jane@example.com',
            role: 'moderator',
            image: 'https://dummyjson.com/icon/jane/128'
        }
    ];

    beforeEach(() => {
        document.body.innerHTML = '<main></main>';
    });

    it('crea una lista con clase .dummy-user-list en el DOM', () => {
        renderUsers(mockUsers);
        expect(document.querySelector('.dummy-user-list')).not.toBeNull();
    });

    it('la lista se añade dentro de <main>', () => {
        renderUsers(mockUsers);
        const list = document.querySelector('main > .dummy-user-list');
        expect(list).not.toBeNull();
    });

    it('crea un .dummy-user-item por cada usuario', () => {
        renderUsers(mockUsers);
        const items = document.querySelectorAll('.dummy-user-item');
        expect(items).toHaveLength(2);
    });

    it('no crea items si el array está vacío', () => {
        renderUsers([]);
        const items = document.querySelectorAll('.dummy-user-item');
        expect(items).toHaveLength(0);
    });

    it('muestra el nombre completo del primer usuario', () => {
        renderUsers(mockUsers);
        const strong = document.querySelector('.dummy-user-item strong');
        expect(strong.textContent).toBe('John Doe');
    });

    it('muestra el email del primer usuario', () => {
        renderUsers(mockUsers);
        const p = document.querySelector('.dummy-user-item p');
        expect(p.textContent).toBe('john@example.com');
    });

    it('muestra el rol del primer usuario', () => {
        renderUsers(mockUsers);
        const small = document.querySelector('.dummy-user-item small');
        expect(small.textContent).toBe('admin');
    });

    it('muestra la imagen con el src correcto del primer usuario', () => {
        renderUsers(mockUsers);
        const img = document.querySelector('.dummy-user-item img');
        expect(img.getAttribute('src')).toBe('https://dummyjson.com/icon/john/128');
    });

    it('el alt de la imagen es el firstName del usuario', () => {
        renderUsers(mockUsers);
        const img = document.querySelector('.dummy-user-item img');
        expect(img.getAttribute('alt')).toBe('John');
    });

    it('muestra el rol correcto del segundo usuario', () => {
        renderUsers(mockUsers);
        const items = document.querySelectorAll('.dummy-user-item');
        const small = items[1].querySelector('small');
        expect(small.textContent).toBe('moderator');
    });

    it('cada item contiene img, strong, p y small', () => {
        renderUsers(mockUsers);
        document.querySelectorAll('.dummy-user-item').forEach(item => {
            expect(item.querySelector('img')).not.toBeNull();
            expect(item.querySelector('strong')).not.toBeNull();
            expect(item.querySelector('p')).not.toBeNull();
            expect(item.querySelector('small')).not.toBeNull();
        });
    });
});
