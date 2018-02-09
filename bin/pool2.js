const  mysql = require('mysql2/promise');

const player = ({pool,data}) => {
    return async() => {
        while(true){
            try{
                const conn = await pool.getConnection();
                try{
                    const [results, fields] = await conn.query('SELECT ' + data + ' AS solution');
                    console.log('The solution is: ', results[0].solution);
                }catch(e){
                    console.log(e);
                }
                conn.release();
            }catch(e){
                console.log(e);
                continue;
            }
        }
    }
}

const main = async () => {
    const pool = await mysql.createPool({
        connectionLimit: 100,
        host:'localhost',
        user: 'root',
        database: 'test'
    });

    const list = ["1+1","2+2","3+3","4+4","5+5","6+6","7+7","8+8","9+9","10+10"]
    const result = await Promise.all(list.map(v => {
        return player({pool, data:v})()
    }))

    pool.end();
}

main()
