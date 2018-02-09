const  mysql = require('mysql2/promise');

const main_loop1 = async ({pool}) => {
    while(true){
        const conn = await pool.getConnection();
        const [results, fields] = await conn.query('SELECT 1 + 1 AS solution');
        console.log('The solution is: ', results[0].solution);
        conn.release();
    }
}

const main_loop2 = async ({pool}) => {
    while(true){
        const conn = await pool.getConnection();
        const [results, fields] = await conn.query('SELECT 2 + 2 AS solution');
        console.log('The solution is: ', results[0].solution);
        conn.release();
    }
}
const main_loop3 = async ({pool}) => {
    while(true){
        const conn = await pool.getConnection();
        const [results, fields] = await conn.query('SELECT 4 + 4 AS solution');
        console.log('The solution is: ', results[0].solution);
        conn.release();
    }
}

const main = async () => {
    const pool = await mysql.createPool({
        connectionLimit: 1,
        host:'localhost',
        user: 'root',
        database: 'test'
    });
    const result = await Promise.all([
        main_loop1({ pool }),
        main_loop2({ pool }),
        main_loop3({ pool })
    ])
    pool.end();
}

main()
