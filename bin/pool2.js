const  mysql = require('mysql2/promise');

const player = ({pool,data}) => {
    return async() => {
        while(true){
            const conn = await pool.getConnection();
            const [results, fields] = await conn.query('SELECT ' + data + ' AS solution');
            console.log('The solution is: ', results[0].solution);
            conn.release();
        }
    }
}

const main = async () => {
    const pool = await mysql.createPool({
        connectionLimit: 4,
        host:'localhost',
        user: 'root',
        database: 'test'
    });

    const list = ["1+1","2+2","3+3","4+4","5+5","6+6"]
    const result = await Promise.all(list.map(v => {
        return player({pool, data:v})()
    }))

    pool.end();
}

main()
