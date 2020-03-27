const connection = require("../database/connection");

module.exports = {
  async create(req, res) {
    const { id } = req.body;

    const name = await connection("ongs")
      .where("id", id)
      .select("name")
      .first();

    if (!name) {
      return res.status(400).json({ error: "No Ong found with this ID!" });
    }

    return res.json(name);
  }
};
