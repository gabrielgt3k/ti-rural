import Linha from '../models/Linha';

class LinhasAtivas {
    async index(req, res) {
        const linhasAtivas = await Linha.count({ where: { status: 'Ativa' } });

        return res.json({ linhasAtivas });
    }
}

export default new LinhasAtivas();
