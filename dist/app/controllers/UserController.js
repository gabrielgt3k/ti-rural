"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } } function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _yup = require('yup'); var Yup = _interopRequireWildcard(_yup);
var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);

class UserController {
    async store(req, res) {
        const schema = Yup.object().shape({
            nome: Yup.string().required(),
            email: Yup.string()
                .email()
                .required(),
            senha: Yup.string()
                .required()
                .min(6),
        });

        if (!(await schema.isValid(req.body))) {
            return res
                .status(400)
                .json({ error: 'Não foi possível validar os dados' });
        }

        const userExist = await _User2.default.findOne({
            where: {
                email: req.body.email,
            },
        });

        if (userExist) {
            return res.status(400).json({ error: 'Usuário já existe' });
        }

        const { id, nome, email, admin } = await _User2.default.create(req.body);

        return res.json({
            id,
            nome,
            email,
            admin,
        });
    }

    async update(req, res) {
        const schema = Yup.object().shape({
            nome: Yup.string(),
            email: Yup.string().email(),
            senha_antiga: Yup.string().min(6),
            senha: Yup.string()
                .min(6)
                .when('senha_antiga', (senha_antiga, field) =>
                    senha_antiga ? field.required() : field
                ),
            confirmarSenha: Yup.string().when('senha', (senha, field) =>
                senha ? field.required().oneOf(Yup.ref(['senha'])) : field
            ),
        });

        if (!(await schema.isValid(req.body))) {
            return res
                .status(400)
                .json({ error: 'Não foi possível validar os dados' });
        }

        const { email, senha_antiga } = req.body;

        const user = await _User2.default.findByPk(req.userId);

        if (email !== user.email) {
            const userExist = await _User2.default.findOne({ where: { email } });

            if (userExist) {
                return res.status(400).json({ error: 'Usuário já existe' });
            }
        }

        if (senha_antiga && !(await user.checkPassword(senha_antiga))) {
            res.status(401).json({ error: 'Senha inválida' });
        }

        const { id, nome, admin } = await user.update(req.body);

        return res.json({
            id,
            nome,
            email,
            admin,
        });
    }
}

exports. default = new UserController();
