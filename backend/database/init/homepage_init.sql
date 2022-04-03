CREATE TABLE IF NOT EXISTS project (
  projectID INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(50) NOT NULL,
  description VARCHAR(350),
  link VARCHAR(250),
  image_path VARCHAR(250)
);

CREATE TABLE IF NOT EXISTS technology (
  techID INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS projectUsesTech (
  projectID INT NOT NULL,
  techID INT NOT NULL,
  PRIMARY KEY (projectID, techID),
  CONSTRAINT `fk_project`
    FOREIGN KEY(projectID) REFERENCES project(projectID)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_tech`
    FOREIGN KEY(techID) REFERENCES technology(techID)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS recipe (
  recipeID INT AUTO_INCREMENT PRIMARY KEY,
  recipeJson JSON CHECK (JSON_VALID(recipeJson))
);