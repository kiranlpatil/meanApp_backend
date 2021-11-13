const express = require("express");
const morgan = require("morgan");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/user-routes");
const momentRoutes = require("./routes/moment-routes");
const uploadRoutes = require("./routes/upload-routes");
var cors = require("cors");

// Middlewares
const app = new express();
app.use(express.json());
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// app.use(express.static(`${__dirname}/public`))

app.use((req, res, next) => {
  next();
});

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "MEAN STACK API",
      description: "Mean stack information",
      contact: {
        name: "Kiran",
      },
      servers: ["http://localhost:3000"],
    },
  },
  apis: ["./routes/*.js"],
};

app.use(cors());
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/uploads`));

const swaggerDoc = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));

app.use("/api/user", userRoutes);
app.use("/api/moment", momentRoutes);
app.use("/api/upload", uploadRoutes);

// Start Server
module.exports = app;
