import fs from "fs";

const loadJson = () => {

  
  try {
    const file = fs.readFileSync("./swagger.json", "utf8"); // Adjust path as needed
    return JSON.parse(file);
  } catch (error) {
    console.error("Error loading Swagger JSON file:", error.message);
    throw error;
  }
};

const swaggerSpec = loadJson();

export default swaggerSpec;
