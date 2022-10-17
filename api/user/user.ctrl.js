const userRoute = require(".");
const models = require("../../models")

// DB 설정

// api 설정
function getUsers(req, res) {
    const limit = parseInt(req.query.limit ?? 10, 10);
    const offset = parseInt(req.query.offset ?? 0, 10);
    if (Number.isNaN(limit) || Number.isNaN(offset)) {
        return res.status(400).end();
    }
    models.User.findAll({
        offset: offset,
        limit: limit
    }).then(users => {
        res.json(users)
    })
}

function getUser(req, res) {
    const id = parseInt(req.params.id, 10);
    if (Number.isNaN(id)) {
        return res.status(400).end();
    }

    models.User.findOne({ where: { id } }).then(user => {
        if (!user) {
            return res.status(404).end();
        }
        res.json(user);
    });
}

function postUser(req, res) {
    const name = req.body.name;

    if (!name) return res.status(400).end()

    models.User.create({ name }).then((user) => {
        res.json(user).status(201)
    }).catch((err) => {
        if (err.name === "SequelizeUniqueConstraintError") {
            return res.status(409).end()
        }
        res.status(500).end()
    })
}

function putUser(req, res) {
    const id = parseInt(req.params.id, 10);
    if (Number.isNaN(id)) return res.status(400).end()

    const name = req.body.name;

    if (!name) return res.status(400).end()

    models.User.findOne({ where: { id } }).then(user => {
        if (!user) {
            return res.status(404).end()
        }

        user.name = name;
        user.save()
            .then(_ => {
                res.json(user)
            }).catch(err => {
                if (err.name === "SequelizeUniqueConstraintError") {
                    return res.status(409).end();
                }

                res.status(500).end()
            })
    })
}

function deleteUser(req, res) {
    const id = parseInt(req.params.id, 10);
    if (Number.isNaN(id)) {
        return res.status(400).end()
    }

    models.User.destroy({ where: { id } }).then(
        () => res.status(204).end()
    )
}

module.exports = {
    getUser,
    getUsers,
    postUser,
    putUser,
    deleteUser
}