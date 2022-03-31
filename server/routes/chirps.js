import * as express from "express"
const router = express.Router();
import db from '../db'
// const chirpsStore = require("../chirpstore.js");
// no more chirpstore! install mysql from npm and configure the routes to use that instead of chirpstore.

// REST API
router.get("/:id?", async (req, res) => {
    const id = req.params.id;

    if (id) {
        res.json(await db.chirps.one(id))
    } else {
        res.json(await db.chirps.all())
    }
});

// Create
router.post("/", async (req, res) => {
    const body = req.body;
    res.json(await db.chirps.insert(body.userid, body.content))

    // chirpsStore.CreateChirp(body);
});

// Delete
router.delete("/:id", async (req, res) => {
   try {const id = req.params.id;
   await db.chirps.del(id)
    res.sendStatus(200)}
    catch(err) {console.log(err)}
});                                            

// Update
router.put("/:id", async (req, res) => {
    const id = req.params.id;
    const body = req.body;
    console.log(body)
    await db.chirps.update(body.content, id)
    res.sendStatus(200);
});

export default router;