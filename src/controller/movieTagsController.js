const knex = require("../database/knex")

class MovieTagsController {
  async show(request, response) {
    const {note_id} = request.params

    const tags = await knex("movie_tags")
    .where({note_id})

    return response.json(tags)
  }
}

module.exports = MovieTagsController