const app = require("../index.js")
const syncDB = require("./sync-db");
const PORT = 3000;

syncDB().then(_ => {
    console.log('Sync database\n')
    app.listen(PORT, () => {
        console.log(`Server is running in PORT:${PORT}`)
    })
})
