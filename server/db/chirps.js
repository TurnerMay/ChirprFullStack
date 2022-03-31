import { Query } from './index'

const all = async () => Query('select * from chirps join users on chirps.userid = users.id')

const one = async (id) => Query("select * from chirps where chirps.id = ?", [id])

const insert = async (userid, content) => Query("insert into chirps(userid, content) values (?,?)", [userid, content])

const del = async (id) => Query("delete from chirps where id = ?", [id])

const update = async (content, id) => Query("update chirps set content = ? Where id = ?", [content, id])

export default {
    all,
    one,
    insert,
    del,
    update
}