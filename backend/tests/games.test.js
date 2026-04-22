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
