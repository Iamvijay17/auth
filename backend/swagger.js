import fs from "fs";
import path from "path";

const loadJson = () => {
  try {
    const filePath = path.resolve(process.cwd(), "swagger.json"); // Resolves to the project's root directory
    const file = fs.readFileSync(filePath, "utf8");
    return JSON.parse(file);
  } catch (error) {
    console.error("Error loading Swagger JSON file:", error.message);
    throw error;
  }
};

const swaggerSpec = loadJson();

export default swaggerSpec;
