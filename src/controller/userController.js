const {hash, compare} = require("bcryptjs")
const knex = require("../database/knex")
const AppError = require("../utils/AppError")

class UserController {
  async create(request, response) {
    const {name, email, password} = request.body

    const checkifUserExists = await knex("users").where({email})

    if(checkifUserExists.length !== 0) {
      throw new AppError("Esté usuário já está cadastrado")
    }    

    const hashedPassword = await hash(password, 8)

    await knex("users").insert({
      name,
      email,
      password: hashedPassword
    })
    
    return response.json()
  }

  async update(request, response) {
    const {name, email, password, oldpassword} = request.body
    const {id} = request.params

    const userCheck = await knex("users").where({id})

    if(userCheck.length === 0) {
      throw new AppError("Usuário não encontrado")
    }

    if(name === userCheck[0].name) {
      throw new AppError("O nome já está em uso")
    }

    if(email === userCheck[0].email) {
      throw new AppError("O email já está cadastrado")
    }

    userCheck[0].name = name ?? userCheck[0].name
    userCheck[0].email = email ?? userCheck[0].email

    if(password && !oldpassword) {
      throw new AppError("Você precisa digitar a senha antiga")
    }

    if(password && oldpassword) {
      const checkOldPassword = await compare(oldpassword, userCheck[0].password)

      if(!checkOldPassword){
        throw new AppError("A senha antiga não confere")
      }

      userCheck[0].password = await hash(password, 8)
    }

    await knex("users").where({id}).update({
      name: userCheck[0].name,
      email: userCheck[0].email,
      password: userCheck[0].password,
      updated_at: knex.fn.now()
    })

    return response.json()
  }
}

module.exports = UserController