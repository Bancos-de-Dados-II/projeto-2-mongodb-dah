import sequelize from "./sequelize.js";


async function getUsuarios(){
    const [resposta, metadados] = await sequelize.query(`
        SELECT * FROM usuario;
    `);
    console.log(resposta);

    return resposta;
}

await sequelize.query('CREATE EXTENSION IF NOT EXISTS postgis;');
await sequelize.query('CREATE EXTENSION IF NOT EXISTS postgis_topology;');

getUsuarios();

export { getUsuarios };