require("dotenv").config();
const MySql = require("./MySql");

exports.execQuery = async function (query, values) { // add also values to prevent SQLi
    let returnValue = []
const connection = await MySql.connection();
    try {
    await connection.query("START TRANSACTION");
    returnValue = await connection.query(query, values); // add also values to prevent SQLi
  } catch (err) {
    await connection.query("ROLLBACK");
    console.log('ROLLBACK at querySignUp', err);
    throw err;
  } finally {
    await connection.release();
  }
  return returnValue
}

