import { Server } from 'azle';
import bodyParser from 'body-parser';
import express from 'express';
import initSqlJs from 'sql.js/dist/sql-asm.js';

export default Server(async () => {
    const app = express();
    const SQL = await initSqlJs({});
    const db = new SQL.Database();

    // TABLES

    db.run(`
            CREATE TABLE users
                (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    username TEXT NOT NULL UNIQUE,
                    wallet TEXT NOT NULL UNIQUE
                );
        `);
    // db.run(`
    //         CREATE TABLE repos
    //             (
    //                 id INTEGER PRIMARY KEY AUTOINCREMENT,
    //                 user_id INTEGER NOT NULL,
    //                 repo_name TEXT NOT NULL UNIQUE,
    //             );
    //     `);

    //API

    // Users
    app.post('/user', bodyParser.urlencoded(),async (req, res) => {
        var sql = `INSERT INTO users(username, wallet) VALUES('${req.body.username}', '${req.body.wallet}');`
        var test = db.run(sql);
        res.send(`${test}`);
    });
    app.get('/user', async (req, res) => {
        var test = await db.exec("SELECT * FROM users");
        res.send(`${JSON.stringify(test)}`);
    });
    app.get('/user/:id', async(req, res) => {
        var sql = `SELECT * FROM users WHERE id = ${req.params.id}`;
        var test = await db.exec(sql);
        res.send(`${JSON.stringify(test)}`);
    });
    app.get('/user/:user_name', async(req, res) => {
        var sql = `SELECT * FROM users WHERE username = '${req.params.user_name}'`;
        var test = await db.exec(sql);
        res.send(`${JSON.stringify(test)}`);
    });

    // // Repos
    // app.post('/repo', bodyParser.urlencoded(),async (req, res) => {
    //     var sql = `INSERT INTO repos(user_id, repo_name) VALUES(${req.body.user_id}, '${req.body.repo_name}');`
    //     var test = db.run(sql);
    //     res.send(`${test}`);
    // });
    // app.get('/repos', async (req, res) => {
    //     var test = await db.exec("SELECT * FROM repos");
    //     res.send(`${JSON.stringify(test)}`);
    // });
    // app.get('/repo/:name', async(req, res) => {
    //     var sql = `SELECT * FROM repos WHERE repo_name = '${req.params.name}'`;
    //     var test = await db.exec(sql);
    //     res.send(`${JSON.stringify(test)}`);
    // });
    // app.get('/repo/:user_id', async(req, res) => {
    //     var sql = `SELECT * FROM repos WHERE user_id = ${req.params.user_id}`;
    //     var test = await db.exec(sql);
    //     res.send(`${JSON.stringify(test)}`);
    // });
    // app.get('/repo/:id', async(req, res) => {
    //     var sql = `SELECT * FROM repos WHERE id = ${req.params.id}`;
    //     var test = await db.exec(sql);
    //     res.send(`${JSON.stringify(test)}`);
    // });

    return app.listen();
});
