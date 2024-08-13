
const express = require("express");
require("dotenv").config();
const PORT = process.env.PORT || 3000;

const mainRoute = require("./routers/index");

const app = express();
app.use(express.json());

app.use("/api", mainRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});





// const express = require("express");
// require("dotenv").config();
// const PORT = process.env.PORT || 3000;

// const app = express();

// app.use(express.json());

// const customerRoutes = require("./routers/customers"); 
// const booksRoutes = require("./routers/books");

// app.use("/api/customers", customerRoutes);

// app.use("/api/books", booksRoutes);

// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({ error: "Internal Server Error" });
// });

// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });

