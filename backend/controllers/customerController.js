const Customer = require("../models/Customer");

const getCustomers = async (req, res) => {
  try {
    const { page = 1, limit = 10, search, filterField, filterValue } = req.query;

    const query = {};
    console.log("Received query params:", req.query);

    // Add search conditions
    if (search) {
      query.$or = [
        { name_of_customer: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ];
    }

    // Add filter conditions
    if (filterField && filterValue) {
      query[filterField] = filterValue;
    }

    console.log("Constructed query:", query);

    const customers = await Customer.find(query)
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await Customer.countDocuments(query);

    console.log("Fetched customers:", customers.length);

    res.status(200).json({ total, page: Number(page), limit: Number(limit), customers });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getCustomers,
};
