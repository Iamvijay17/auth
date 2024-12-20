import fs from "fs";
import yaml from "js-yaml";
import path from "path";
// const loadJson = () => {  
//   try {
//     const file = fs.readFileSync("./swagger.json", "utf8"); // Adjust path as needed
//     return JSON.parse(file);
//   } catch (error) {
//     console.error("Error loading Swagger JSON file:", error.message);
//     throw error;
//   }
// };

const loadYaml = () => {
  try {
    const filePath = path.resolve("swagger.yaml");
    const file = fs.readFileSync(filePath, "utf8");
    return yaml.load(file);
  } catch (error) {
    console.error("Error loading Swagger YAML file:", error.message);
    throw error;
  }
};

const swaggerSpec = loadYaml();

export default swaggerSpec;
