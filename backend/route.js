const express = require("express");
const router = express.Router();
const fs = require("fs").promises;

const dataFilePath = "./data.json";

const readDataFromFile = async () => {
  try {
    const data = await fs.readFile(dataFilePath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    // If the file doesn't exist yet, return an empty array
    if (error.code === "ENOENT") {
      return [];
    }
    throw error;
  }
};

// Write data to the file
const writeDataToFile = async (data) => {
  await fs.writeFile(dataFilePath, JSON.stringify(data, null, 2), "utf-8");
};

router.get("/getData", async (req, res) => {
  try {
    const data = await readDataFromFile();
    res.json(data);
  } catch (error) {
    console.error("Error reading data:", error.message);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/addData", async (req, res) => {
  try {
    const newData = req.body;
    const data = await readDataFromFile();

    // Assign a unique ID to the new data
    newData.id = Date.now();

    // Add the new data to the existing array
    data.push(newData);

    // Write the updated data back to the file
    await writeDataToFile(data);

    res.json(newData);
  } catch (error) {
    console.error("Error creating data:", error.message);
    res.status(500).send("Internal Server Error");
  }
});

// Route to update data by ID
router.put("/update/:id", async (req, res) => {
  try {
    const updatedData = req.body;
    const data = await readDataFromFile();

    // Find the index of the data with the specified ID
    const dataIndex = data.findIndex(
      (item) => item.id === parseInt(req.params.id, 10)
    );

    // If the ID is not found, return a 404 error
    if (dataIndex === -1) {
      res.status(404).send("Data not found");
      return;
    }

    // Update the data at the specified index
    data[dataIndex] = { ...data[dataIndex], ...updatedData };

    // Write the updated data back to the file
    await writeDataToFile(data);

    res.json(data[dataIndex]);
  } catch (error) {
    console.error("Error updating data:", error.message);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
