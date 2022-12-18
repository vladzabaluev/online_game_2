const {Schema, model} = require('mongoose')

const Role = new Schema({
    RoleName: {type:String, unique: true, default: "USER"},
})

module.exports = model('Role', Role)