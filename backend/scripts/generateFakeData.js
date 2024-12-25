const mongoose = require("mongoose");
const { faker } = require('@faker-js/faker'); // Ensure correct destructuring

const Customer = require("../models/Customer");

// MongoDB Connection
const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://ermanishakhare22:qxUV2ZrMXtOVRdKk@cluster0.bber6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected successfully!");
  } catch (err) {
    console.error("MongoDB connection error:", err.message);
    process.exit(1); // Exit process with failure
  }
};

// Generate fake customer data
const generateFakeCustomers = (count) => {
  const customers = [];
  for (let i = 1; i <= count; i++) {
    customers.push({
      s_no: i,
      name_of_customer: faker.name.fullName(), // Correct method for generating a name
      email: faker.internet.email(),
      mobile_number: faker.phone.number(), // Correct method for generating a phone number
      dob: faker.date.past(30),
      created_at: faker.date.recent(),
      modified_at: faker.date.recent(),
    });
  }
  return customers;
};

// Insert data into MongoDB
const insertFakeCustomers = async () => {
  try {
    const fakeCustomers = generateFakeCustomers(2000000); // 2 million records
    await Customer.insertMany(fakeCustomers);
    console.log("2 million fake customer records inserted successfully!");
  } catch (err) {
    console.error("Error inserting fake customer data:", err.message);
  }
};

// Run the script
const run = async () => {
  await connectDB();
  await insertFakeCustomers();
  process.exit();
};

run();
