const db = require("./database.js")
const logger = require("../../logging/logger")


// returns all projects
const getAllProjects = async () => {
  let conn;
  try {
    conn = await db.pool.getConnection();
    const rows = await conn.query(`
        SELECT image_path, title, description, JSON_ARRAYAGG(name) AS techsUsed, link
        FROM project
        NATURAL JOIN projectUsesTech
        NATURAL JOIN technology
        GROUP BY projectID`);
    return rows;
  } catch (err) {
    logger.log("error", err);
    return 500;
  } finally {
    if (conn) conn.end();
  }
};

// returns all technologies
const getAllTechs = async () => {
  let conn;
  try {
    conn = await db.pool.getConnection();
    const rows = await conn.query(
      `SELECT * FROM technology`
    );
    return rows;
  } catch (err) {
    logger.log("error", err);
    return 500;
  } finally {
    if (conn) conn.end();
  }
};

// insert a new technology
const newTech = async (technology) => {
  let conn;
  try {
    conn = await db.pool.getConnection();
    await conn.beginTransaction();
    const res = await conn.query(`INSERT INTO technology (name) VALUES (?)`, [technology.name]);
    if (res["affectedRows"] === 1) {
      await conn.commit();
      return 201;
    } else {
      await conn.rollback();
      return 500;
    }
  } catch (err) {
    logger.log("error", err);
    return 500;
  } finally {
    if (conn) conn.end();
  }
}

// adds a new project
const newProject = async (project, image) => {
  let conn;
  try {
    conn = await db.pool.getConnection();
    await conn.beginTransaction();
    let res = await conn.query(
      `
      INSERT INTO project (title, description, link, image_path)
      VALUES (?, ?, ?, ?)
      RETURNING projectID
      `, [project.title, project.description, project.link, image]
    );
    const projectID = res["projectID"];
    let q = "";
    project.techsUsed.forEach(tech => {
      q += `(${projectID}, ${tech.techID})`
    });
    q = q.slice(0, -1);
    res = await conn.query(`
      INSERT INTO projectUsesTech (projectID, techID)
      VALUES ?`, [q]
    );
    await conn.commit();
    return 201;
  } catch (err) {
    logger.log("error", err);
    await conn.rollback();
    return 500;
  } finally {
    if (conn) conn.end();
  }
};

// returns all recepies, (just name and ID)
const getAllRecepies = async () => {
  let conn;
  try {
    conn = await db.pool.getConnection();
    let rows = await conn.query(`SELECT recipeID, json_value(recipeJson, '$.name') AS recipeName FROM recipe`);
    return rows;
  } catch (err) {
    logger.log("error", err);
    return 500;
  } finally {
    if (conn) conn.end();
  }
};

const getRecepie = async (id) => {
  let conn;
  try {
    conn = await db.pool.getConnection();
    let rows = await conn.query(`SELECT * FROM recipe WHERE recipeID = ?`, [id]);
    return rows;
  } catch (err) {
    logger.log("error", err);
    return 404;
  } finally {
    if (conn) conn.end();
  }
};

const newRecipe = async (recipeJson) => {
  let conn;
  try {
    conn = await db.pool.getConnection();
    await conn.beginTransaction();
    let result = await conn.query("INSERT INTO recipe (recipeJson) VALUES (?)", [recipeJson]);
    if (result["affectedRows"] === 1) {
      conn.commit();
      return 201;
    } else {
      conn.rollback();
      return 500;
    }
  } catch (err) {
    conn.rollback();
    logger.log("error", err);
    return 500;
  } finally {
    if (conn) conn.end();
  }
}

module.exports = {
  getAllProjects,
  newProject,
  getAllRecepies,
  getRecepie,
  getAllTechs,
  newTech,
  newRecipe
};