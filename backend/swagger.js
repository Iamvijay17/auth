// const loadJson = () => {
//   try {
//     const file = fs.readFileSync("./swagger.json", "utf8"); // Adjust path as needed
//     return JSON.parse(file);
//   } catch (error) {
//     console.error("Error loading Swagger JSON file:", error.message);
//     throw error;
//   }
// };

import swaggerJSDoc from "swagger-jsdoc";

// const loadYaml = () => {
//   try {
//     const filePath = path.resolve("swagger.yaml");
//     const file = fs.readFileSync(filePath, "utf8");
//     return yaml.load(file);
//   } catch (error) {
//     console.error("Error loading Swagger YAML file:", error.message);
//     throw error;
//   }
// };

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API",
      version: "1.0.0",
      description:
        "API for managing users, including creating, updating, deleting, and fetching user details.",
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [], // Apply JWT authentication globally to all routes
      },
    ],
  },
  apis: ["./routes/auth.js", "./routes/userRoutes.js"],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

export default swaggerSpec;
