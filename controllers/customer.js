const db = require("../config/db.js");

const getCustomers = (req, res) => {
  db.query("SELECT * FROM customer", (err, results) => {
    if (err) {
      console.log("Error fetching customers:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    res.json(results);
  });
};

const addCustomer = (req, res) => {
  const { name, phone, email, address } = req.body;
  db.query(
    "INSERT INTO customer (name, phone, email, address) VALUES (?, ?, ?, ?)",
    [name, phone, email, address],
    (err, result) => {
      if (err) {
        console.log("Error adding a customer:", err);
        return res.status(500).json({
          message: "Error adding new customer",
          error: "Internal Server Error",
        });
      }
      res.json({
        message: "Customer added successfully",
        customerId: result.insertId,
      });
    }
  );
};

const getCustomerById = (req, res) => {
  const customerId = req.params.id;
  db.query(
    "SELECT * FROM customer WHERE id = ?",
    [customerId],
    (err, results) => {
      if (err) {
        console.log("Error selecting customer:", err);
        return res.status(500).json({ error: "Internal Server Error" });
      }
      if (results.length === 0) {
        return res.status(404).json({ message: "Customer not found" });
      }
      res.json(results[0]);
    }
  );
};
const deleteCustomerById = (req, res) => {
    const customerId = req.params.id;
  
    if (isNaN(customerId)) {
      return res.status(400).json({ error: "Invalid customer ID format" });
    }
  
    db.query(
      "DELETE FROM customer WHERE id = ?",
      [customerId],
      (err, results) => {
        if (err) {
          console.error("Error deleting customer:", err); // Error logging
          return res.status(500).json({ error: "Internal Server Error" });
        }
        if (results.affectedRows === 0) {
          return res.status(404).json({ message: "Customer not found" });
        }
        res.json({ message: "Customer deleted successfully" });
      }
    );
  };
  

const updateCustomerById = (req, res) => {
  const customerId = req.params.id;
  const { name, phone, email, address } = req.body;
  db.query(
    "UPDATE customer SET name = ?, phone = ?, email = ?, address = ? WHERE id = ?",
    [name, phone, email, address, customerId],
    (err, results) => {
      if (err) {
        console.log("Error updating customer:", err);
        return res.status(500).json({ error: "Internal Server Error" });
      }
      if (results.affectedRows === 0) {
        return res.status(404).json({ message: "Customer not found" });
      }
      res.json({ message: "Customer updated successfully" });
    }
  );
};

const findCustomerByQueries = (req, res) => {
  const { name, phone, email, address } = req.query;
  let whereClauses = [];
  let queryParams = [];

  if (name) {
    whereClauses.push("name LIKE ?");
    queryParams.push(`%${name}%`);
  }
  if (phone) {
    whereClauses.push("phone = ?");
    queryParams.push(phone);
  }
  if (email) {
    whereClauses.push("email = ?");
    queryParams.push(email);
  }
  if (address) {
    whereClauses.push("address LIKE ?");
    queryParams.push(`%${address}%`);
  }

  let query = "SELECT * FROM customer";
  if (whereClauses.length > 0) {
    query += " WHERE " + whereClauses.join(" AND ");
  }

  db.query(query, queryParams, (err, results) => {
    if (err) {
      console.log("Error finding customers:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: "No customers found" });
    }
    res.json(results);
  });
};

module.exports = {
  getCustomers,
  addCustomer,
  getCustomerById,
  deleteCustomerById,
  updateCustomerById,
  findCustomerByQueries
};
