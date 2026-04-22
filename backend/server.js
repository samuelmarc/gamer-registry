const express = require('express');
const path = require('path');

const app = express();

app.use(express.json());

const gamersRoutes = require('./routes/gamers.routes');
const gamesRoutes = require('./routes/games.routes');
const gamerGamesRoutes = require('./routes/gamerGames.routes');

app.use('/api/gamers', gamersRoutes);
app.use('/api/games', gamesRoutes);
app.use('/api/gamer-games', gamerGamesRoutes);

app.use(express.static(path.join(__dirname, '../frontend')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

if (require.main === module) {
    app.listen(3000, () => {
        console.log('Servidor rodando em http://localhost:3000');
    });
}

module.exports = app;