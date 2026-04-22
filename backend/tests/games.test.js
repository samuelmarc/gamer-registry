const request = require('supertest');
 
const mockQuery = jest.fn();
 
jest.mock('pg', () => {
    return {
        Pool: jest.fn(() => ({ query: mockQuery }))
    };
});
 
const app = require('../server');
 
const FAKE_GAME = { id: 1, title: 'Counter-Strike 2', genre: 'FPS', release_year: 2023 };
 
beforeEach(() => {
    mockQuery.mockReset();
});

describe('Parte 1 — Testes Básicos', () => {
    test('Ex1 — GET /api/games deve retornar status 200', async () => {
        mockQuery.mockResolvedValueOnce({ rows: [FAKE_GAME] });
 
        const response = await request(app).get('/api/games');
        expect(response.statusCode).toBe(200);
    });
 
    test('Ex2 — GET /api/games deve retornar um array', async () => {
        mockQuery.mockResolvedValueOnce({ rows: [FAKE_GAME] });
 
        const response = await request(app).get('/api/games');
        expect(Array.isArray(response.body)).toBe(true);
    });
});

describe('Parte 2 — Testes de Funcionalidade', () => {
    test('Ex3 — POST /api/games deve criar um jogo com dados válidos', async () => {
        mockQuery.mockResolvedValueOnce({ rows: [FAKE_GAME] });
 
        const response = await request(app)
            .post('/api/games')
            .send({ title: 'Counter-Strike 2', genre: 'FPS', release_year: 2023 });
 
        expect(response.statusCode).toBe(201);
    });
 
    test('Ex4 — POST /api/games com corpo vazio deve retornar 400', async () => {
        const response = await request(app)
            .post('/api/games')
            .send({});
 
        expect(response.statusCode).toBe(400);
    });
 
    test('Ex5 — deve criar um jogo e buscá-lo por ID com status 200', async () => {
        mockQuery.mockResolvedValueOnce({ rows: [FAKE_GAME] });
        mockQuery.mockResolvedValueOnce({ rows: [FAKE_GAME] });
 
        const created = await request(app)
            .post('/api/games')
            .send({ title: 'Counter-Strike 2', genre: 'FPS', release_year: 2023 });
 
        const id = created.body.id;
 
        const response = await request(app).get(`/api/games/${id}`);
        expect(response.statusCode).toBe(200);
    });
});

describe('Parte 4 — Desafio: Fluxo Completo', () => {
    test('Ex6 — deve criar, buscar, deletar e retornar 404 após deleção', async () => {
        mockQuery.mockResolvedValueOnce({ rows: [FAKE_GAME] });
        mockQuery.mockResolvedValueOnce({ rows: [FAKE_GAME] });
        mockQuery.mockResolvedValueOnce({ rows: [] });
        mockQuery.mockResolvedValueOnce({ rows: [] });
 
        const created = await request(app)
            .post('/api/games')
            .send({ title: 'The Last of Us', genre: 'Action', release_year: 2013 });
 
        expect(created.statusCode).toBe(201);
 
        const id = created.body.id;
 
        const fetched = await request(app).get(`/api/games/${id}`);
        expect(fetched.statusCode).toBe(200);
 
        const deleted = await request(app).delete(`/api/games/${id}`);
        expect(deleted.statusCode).toBe(204);
 
        const afterDelete = await request(app).get(`/api/games/${id}`);
        expect(afterDelete.statusCode).toBe(404);
    });
});