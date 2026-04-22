# Relatório de Defeito e Respostas

---

## Parte 3 — Relatório de Defeito (Bug Report)

**Título/Resumo**
Rota `GET /api/games/:id` não implementada — busca de jogo por ID retorna 404

**Prioridade:** P1 — Alta

**Severidade:** S2 — Alta

**Passos para Reproduzir**
1. Iniciar o servidor com `node server.js`
2. Criar um jogo via `POST /api/games` com dados válidos
3. Capturar o `id` retornado no corpo da resposta
4. Realizar a requisição `GET /api/games/:id` substituindo `:id` pelo valor capturado

**Resultado Esperado**
A API deve retornar status `200` com os dados do jogo correspondente ao ID informado.

**Resultado Obtido**
A API retorna status `404`. A rota `GET /api/games/:id` não está definida no arquivo `backend/routes/games.routes.js`, portanto nenhum handler processa a requisição.

**Evidências**

Passo 1 — Criar um jogo (funciona normalmente):
```
POST /api/games
Content-Type: application/json

{ "title": "Valorant", "genre": "FPS", "release_year": 2020 }

→ 201 Created
{ "id": 1, "title": "Valorant", "genre": "FPS", "release_year": 2020 }
```

Passo 2 — Buscar o jogo criado pelo ID retornado (defeito):
```
GET /api/games/1

→ 404 Not Found
```

**Ambiente**
- Node.js
- Express
- Banco de Dados: PostgreSQL
- Ferramenta de teste: Supertest
- Arquivo afetado: `backend/routes/games.routes.js`
- Impacto: busca individual de jogos, fluxo de detalhes e exercícios 5 e 6 da suíte de testes são inoperantes

---

## Parte 4 — Exercício 7: Por que o teste está falhando?

```js
test("POST /games deve criar jogo", async () => {
    const response = await request(app)
        .post("/games")
        .send({});

    expect(response.statusCode).toBe(200);
});
```

O teste falha por dois motivos combinados:

**1. Rota errada:** a rota correta é `/api/games`, não `/games`. A requisição retorna 404.

**2. Corpo vazio:** mesmo que a rota estivesse correta, enviar `{}` sem os campos obrigatórios (`title`, `genre`) deve retornar 400, não 200. O teste espera sucesso onde deveria esperar erro.

---

## Parte 5 — Perguntas

**1. O que um teste automatizado verifica em uma API?**

Um teste automatizado é como um inspetor que trabalha sozinho para garantir que a API está funcionando direito. Ele finge ser um usuário e faz várias perguntas ao sistema: primeiro, checa se a resposta veio com o sinal de "sucesso" ou "erro" correto; depois, olha se as informações enviadas estão completas e no formato esperado. Ele também tenta "enganar" o sistema com dados errados para ver se a API percebe a falha e, por fim, confirma se as ações de criar, ler ou apagar algo realmente aconteceram na prática.

**2. Qual a diferença entre os erros 400 e 500?**

O erro **400 (Bad Request)** significa que os dados enviados pelo cliente são incorretos, esse erro geralmente acontece quando o corpo da requisição não está certo.

O erro **500 (Internal Server Error)** significa que o servidor falhou ao tentar processar a requisição, aqui é um problema no servidor e não no cliente.

**3. Por que testes automatizados são importantes no desenvolvimento de software?**

Os testes automatizados funcionam como uma rede de segurança que acompanha o crescimento do sistema. Eles servem para avisar na hora se uma funcionalidade nova acabou quebrando algo que já estava pronto, evitando que erros passem despercebidos. Além de servirem como um manual que mostra como o sistema deve se comportar, esses testes poupam o esforço de alguém ter que conferir tudo manualmente toda vez que o código muda. No fim das contas, eles trazem a tranquilidade de que o sistema está sólido, impedindo que falhas escondidas cheguem até o usuário final e causem problemas maiores.