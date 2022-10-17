
// DB 설정
let users = [
    { id: 1, name: "alice" },
    { id: 2, name: "bek" },
    { id: 3, name: "chris" },
];

// api 설정
function getUsers(req, res) {
    const limit = parseInt(req.query.limit ?? 10, 10);
    const offset = parseInt(req.query.offset ?? 0, 10);
    if (Number.isNaN(limit) || Number.isNaN(offset)) {
        return res.status(400).end();
    }

    res.json(users.slice(offset, offset + limit));
}

function getUser(req, res) {
    const id = parseInt(req.params.id, 10);
    if (Number.isNaN(id)) {
        return res.status(400).end();
    }

    const user = users.find((user) => user.id === id);
    if (!user) {
        return res.status(404).end();
    }
    res.json(user);
}

function postUser(req, res) {
    const name = req.body.name;
    const id = Date.now();
    const obj = { id, name };

    if (!name) {
        return res.status(400).end()
    }

    const isConflict = users.find(user => user.name === name)
    if (isConflict) {
        return res.status(409).end()
    }

    users.push(obj);
    res.json(obj).status(201);
}

function putUser(req, res) {
    const id = parseInt(req.params.id, 10);
    const name = req.body.name;
    if (Number.isNaN(id)) {
        return res.status(400).end()
    }
    if (!name) {
        return res.status(400).end()
    }
    const user = users.find(user => user.id === id);
    const isConflict = users.find(user => user.id !== id && user.name === name);
    if (!user) {
        return res.status(404).end()
    }
    if (isConflict) {
        return res.status(409).end()
    }

    users = [...users.filter(user => user.id !== id), { id, name }]
    res.json(users.find(user => user.id === id));
}

function deleteUser(req, res) {
    const id = parseInt(req.params.id, 10);
    if (Number.isNaN(id)) {
        return res.status(400).end()
    }

    // id 기준으로 삭제
    users = users.filter(user => user.id !== id);

    res.status(204).end()
}

module.exports = {
    getUser,
    getUsers,
    postUser,
    putUser,
    deleteUser
}