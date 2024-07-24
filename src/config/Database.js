import mysql from "mysql2";

const dbKemiling = {
  host: "202.157.189.177",
  port: "3306",
  user: "aris",
  password: "Kosasih20!8",
  database: "acc_kemiling",
};

const dbBugis = {
  host: "202.157.189.177",
  port: "3306",
  user: "aris",
  password: "Kosasih20!8",
  database: "acc_bugis",
};

const dbRajabasa = {
  host: "202.157.189.177",
  port: "3306",
  user: "aris",
  password: "Kosasih20!8",
  database: "acc_rajabasa",
};

const poolKemiling = mysql.createPool(dbKemiling);
const connectionKemiling = poolKemiling.promise();

const poolBugis = mysql.createPool(dbBugis);
const connectionBugis = poolBugis.promise();

const poolRajabasa = mysql.createPool(dbRajabasa);
const connectionRajabasa = poolRajabasa.promise();

export { connectionKemiling, connectionBugis, connectionRajabasa };
