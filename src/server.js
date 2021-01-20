const express = require("express");
const server = express();

const db = require("./database/db")

const nunjucks = require("nunjucks");
// const { query } = require("express");
nunjucks.configure('src/views', {
    express: server,
    noCache: true
});

server.use(express.urlencoded({ extended: true }));

server.use(express.static('public'));

server.get("/", (req, res) => {
    return res.render("index.html", { title: 'Ecol' });
});

server.get("/create-point", (req, res) => {
    return res.render("create-point.html", { title: 'Register collection point' });
});

server.post("/point-created", (req, res) => {
    console.log(req.body);

    db.serialize(() => {

        db.run(`
        CREATE TABLE IF NOT EXISTS places (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            image TEXT,
            address TEXT,
            address2 TEXT,
            state TEXT,
            city TEXT,
            selectedItems TEXT
        )
        `);
            

        const query = `
        INSERT INTO places (
            name,
            image,
            address,
            address2,
            state,
            city,
            selectedItems
        ) values (?, ?, ?, ?, ?, ?, ?)
        `
        const params = [
            req.body.name,
            req.body.image,
            req.body.address,
            req.body.address2,
            req.body.state,
            req.body.city,
            req.body.selectedItems
        ]
        db.run(query, params, (err) => {
            if (err) {
                console.log(err.message);
            }
        })
    })
    return res.render("index.html", { title: 'Ecol' });
})

server.post("/searching", (req, res) => {
    db.serialize(() => {

        var query = `
        SELECT * FROM places
        WHERE city LIKE '%${req.body.citySearch}%';
        `
    
        db.all(query, [], (err, rows) => {
            if (err) {
                throw err; 
            }

            return res.render("search-results.html", {places: rows, title: 'Results of the search'});   
        });
    });
});

server.get("/search-results", (req, res) => {

    db.serialize(() => {

        var query = `
        SELECT * FROM places;
        `
    
        db.all(query, [], (err, rows) => {
            if (err) {
                throw err; 
            }

            return res.render("search-results.html", {places: rows, title: 'Results of the search'});   
        });
    
    });
    
});

server.listen(3000);