"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize');
var _Linha = require('../models/Linha'); var _Linha2 = _interopRequireDefault(_Linha);

class LinhasVivoController {
    async index(req, res) {
        const linhas = await _Linha2.default.findAll({
            where: {
                operadora: {
                    [_sequelize.Op.iLike]: '%vivo',
                },
            },
            attributes: [
                'id',
                'numero',
                'dono_linha',
                'email_dono',
                'loja',
                'operadora',
                'status',
            ],
            order: ['id'],
        });

        return res.json(linhas);
    }
}

exports. default = new LinhasVivoController();
