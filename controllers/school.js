const connectDB = require("../db");
const {listSchoolQuery,insert_query,checkLocationQuery,searchQuery} = require("../queries/school")
const { v4: uuidv4 } = require('uuid');
const ExpressError = require("../utils/ExpressError");

module.exports.index = (req, res) => {
    res.redirect("/searchSchool")
}

module.exports.searchSchool = (req, res) => {
    res.render("findLoc.ejs")
}

module.exports.addSchool = (req, res) => {
    res.render("addSchool.ejs")
}

module.exports.allSchool = async (req, res, next) => {
    const connection = await connectDB();
    const [results] = await connection.query(listSchoolQuery);
    res.render("allSchools.ejs", { results });
}

module.exports.addSchoolToDB = async (req, res, next) => {
    const { name, address, latitude, longitude } = req.body;
    const id = uuidv4();
    const connection = await connectDB();
    const [existingSchool] = await connection.query(checkLocationQuery, [latitude, longitude]);
    if (existingSchool.length > 0) {
        throw new ExpressError(400, "School already exists on current coordinates")
    }
    await connection.query(insert_query, [id, name, address, latitude, longitude]);
    res.redirect("/allSchools")
}

module.exports.listSchool = async (req, res, next) => {
    const { latitude, longitude } = req.query;
    const connection = await connectDB();
    let [results] = await connection.query(searchQuery, [latitude, longitude, latitude])
    res.render("resSchool.ejs", { latitude, longitude, results })
}