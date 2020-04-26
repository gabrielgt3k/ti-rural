"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);

class Linha extends _sequelize.Model {
    static init(sequelize) {
        super.init(
            {
                numero: _sequelize2.default.STRING,
                dono_linha: _sequelize2.default.STRING,
                email_dono: _sequelize2.default.STRING,
                loja: _sequelize2.default.STRING,
                status: _sequelize2.default.STRING(10),
                operadora: _sequelize2.default.STRING,
            },
            {
                sequelize,
            }
        );
    }
}

exports. default = Linha;
