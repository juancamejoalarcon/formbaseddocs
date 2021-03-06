const uri = require('./uri');
const paidUri = require('./paidUri');
const imageUri = require('./imageUri');
const steps = require('./steps');
const information = require('./information');
const blog = require('./blog');
const meta = require('./meta');

const contrato_arrendamiento_vivienda = {
    id: 'contrato-arrendamiento-vivienda',
    title: 'Contrato de arrendamiento de vivienda',
    topLabelTitle: 'Contrato de arrendamiento de vivienda',
    amount: 10,
    image: imageUri,
    uri: uri,
    paidUri: paidUri,
    steps: steps,
    information: information,
    updated: '20 Febrero 2020',
    blog: blog,
    meta: meta
};

module.exports = contrato_arrendamiento_vivienda;