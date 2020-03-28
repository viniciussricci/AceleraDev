const { insertFormatter, queryHelper, updateFormatter } = require('../../db/helper')

const NODE_ENV  = process.env.NODE_ENV || 'production'
const table = `students_${NODE_ENV}`

const students = {
  findAll: async () => {
    const result = await queryHelper(`SELECT * FROM ${table};`)
    return result
  },

  findById: async id => {
    const result = await queryHelper(`SELECT * FROM ${table} WHERE id = ${id};`)
      .then(res => (res.length ? res[0] : {}))

    return result
  },

  create: async data => {
    const values = insertFormatter(data)
    const result = await queryHelper(`INSERT INTO ${table}(id, ${values.columns}) VALUES (null, ${values.values});`)

    return result
  },

  update: async (data, id) => {
    const values = updateFormatter(data)
    const result = await queryHelper(`UPDATE ${table} SET ${values} WHERE id = ${id};`)

    return result
  },

  delete: async (id) => await queryHelper(`DELETE FROM ${table} WHERE id = ${id};`)
}


module.exports = { students }