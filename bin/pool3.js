const  mysql = require('mysql2/promise');

const player = ({rpool,wpool,data}) => {
    return async() => {
        while(true){
            try{
                const [results, fields] = await rpool.query('SELECT ' + data + ' AS solution');
                console.log('The solution is: ', results[0].solution);
            }catch(e){
                console.log(e);
            }
        }
    }
}

const main = async () => {
    const rpool = await mysql.createPool({
        connectionLimit: 1,
        host:'localhost',
        user: 'root',
        database: 'test'
    });
    const wpool = await mysql.createPool({
        connectionLimit: 1000,
        host:'localhost',
        user: 'root',
        database: 'test'
    });

    const list = ["1+1","2+2","3+3","4+4","5+5","6+6","7+7","8+8","9+9","10+10"]
    const result = await Promise.all(list.map(v => {
        return player({rpool, wpool, data:v})()
    }))

    pool.end();
}

main()
