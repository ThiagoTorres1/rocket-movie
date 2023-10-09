const {hash, compare} = require("bcryptjs")
const knex = require("../database/knex")
const AppError = require("../utils/AppError")

class UserController {
  async create(request, response) {
    const {name, email, password} = request.body

    const checkifUserExists = await knex("users").where({email}).first()

    if(checkifUserExists) {
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
    const user_id = request.user.id

    const userCheck = await knex("users").where({id: user_id}).first()

    if(!userCheck) {
      throw new AppError("Usuário não encontrado")
    }

    if(email === userCheck.email) {
      throw new AppError("O email já está cadastrado")
    }

    userCheck.name = name ?? userCheck.name
    userCheck.email = email ?? userCheck.email

    if(password && !oldpassword) {
      throw new AppError("Você precisa digitar a senha antiga")
    }

    if(password && oldpassword) {
      const checkOldPassword = await compare(oldpassword, userCheck.password)

      if(!checkOldPassword){
        throw new AppError("A senha antiga não confere")
      }

      userCheck.password = await hash(password, 8)
    }

    await knex("users").where({id: user_id}).update({
      name: userCheck.name,
      email: userCheck.email,
      password: userCheck.password,
      updated_at: knex.fn.now()
    })

    return response.json()
  }
}

module.exports = UserController