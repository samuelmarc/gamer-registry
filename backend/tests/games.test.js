const request = require('supertest');
const app = require('../server');

describe('Parte 1 — Testes Básicos', () => {

    test('Ex1 — GET /api/games deve retornar status 200', async () => {
        const response = await request(app).get('/api/games');
        expect(response.statusCode).toBe(200);
    });

    test('Ex2 — GET /api/games deve retornar um array', async () => {
        const response = await request(app).get('/api/games');
        expect(Array.isArray(response.body)).toBe(true);
    });

});
