const fs = require("fs");
const path = require("path");
const AdminSettings = require("../models/adminModel");

async function createBackup() {
    const settings = await AdminSettings.findOne().lean();
    fs.writeFileSync(path.join(__dirname, "../backup.json"), JSON.stringify(settings, null, 2));
}

async function restoreBackup() {
    const data = JSON.parse(fs.readFileSync(path.join(__dirname, "../backup.json"), "utf-8"));
    await AdminSettings.deleteMany({});
    await AdminSettings.create(data);
}

module.exports = { createBackup, restoreBackup };
