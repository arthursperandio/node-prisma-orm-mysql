import express from 'express';
import { context } from './prisma.js';

const app = express();
app.use(express.json());

async function get({ nome, min, max } = {}) {
    return context.produto.findMany({
        where: {
            nome: nome ? { contains: nome } : undefined,
            preco: {gte: min, lte: max}
        },
        orderBy: { criadoEm: 'asc'}
    });
}

app.get('/produtos', async (req, res) => {
    try {
        const { nome, min, max } = req.query;

        const produtos = await get({
            nome,
            min: min !== undefined ? Number(min) : undefined,
            max: max !== undefined ? Number(max) : undefined
        });

        res.json(produtos);
    } catch (error) {
        res.status(500).json({ erro: 'Erro ao buscar produtos' });
    }
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});