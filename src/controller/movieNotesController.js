const knex = require("../database/knex")

class MovieNotesController {
  async create(request, response) {
    const {title, description, rating, tags} = request.body
    const user_id = request.user.id

    const [note_id] = await knex("movie_notes").insert({
      title,
      description,
      rating,
      user_id
    })

    const tagsInsert = tags.map(name => {
      return {
        name,
        note_id,
        user_id
      }
    })

    await knex("movie_tags").insert(tagsInsert)

    return response.json()
  }

  async delete(request, response) {
    const {id} = request.params

    await knex("movie_notes").where({id}).delete()

    response.json()
  }

  async show(request, response) {
    const {id} = request.params

    const showNote = await knex("movie_notes").where({id}).first()

    return response.json(showNote)
  }

  async index(request, response) {
    const {tags, title} = request.query
    const user_id = request.user.id

    let notes
    if(tags) {
      const filteredTags = tags.split(',').map(tag => tag)

      notes = await knex("movie_tags")
      .select([
        "movie_notes.id",
        "movie_notes.title",
        "movie_notes.description",
        "movie_notes.rating",
        "movie_notes.user_id"
      ])
      .where("movie_notes.user_id", user_id)
      .whereLike("movie_notes.title", `%${title}%`)
      .whereIn("name", filteredTags)
      .innerJoin("movie_notes", "movie_notes.id", "movie_tags.note_id")
      .orderBy("movie_notes.title")
    } else {
      notes = await knex("movie_notes").where({user_id}).whereLike("title", `%${title}%`).orderBy("title")
    }

    const userTags = await knex("movie_tags").where({user_id})
    const notesWithTags = notes.map(note => {
      const noteTags = userTags.filter(tag => tag.note_id === note.id)
      return {
        ...note,
        movie_tags: noteTags
      }
    })
    
    return response.json(notesWithTags)
  }
}

module.exports = MovieNotesController