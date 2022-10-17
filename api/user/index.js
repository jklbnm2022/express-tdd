// 라우팅 설정
const express = require("express")
const userRoute = express.Router()
const ctrl = require('./user.ctrl')

userRoute.get("/", ctrl.getUsers);
userRoute.get("/:id", ctrl.getUser);
userRoute.post("/", ctrl.postUser);
userRoute.put('/:id', ctrl.putUser)
userRoute.delete("/:id", ctrl.deleteUser)

module.exports = userRoute;

