const express = require("express")
const router = express.Router({mergeParams: true})
const wrapAsync = require("../utils/wrapAsync.js")
const SchoolController = require("../controllers/school.js")
const {validateSchoolSchema,validateLocationSchema} = require("../middleware.js")

// Root Directory
router.get("/", SchoolController.index)

// Get location for the finding nearby schools (form)
router.get("/searchSchool", SchoolController.searchSchool);

// Add a new school (form)
router.get("/addSchool", SchoolController.addSchool)

// List All Schools in DB
router.get("/allSchools", wrapAsync(SchoolController.allSchool));

// Add school to DB
router.post('/addSchool', validateSchoolSchema, wrapAsync(SchoolController.addSchoolToDB));

// Search and show results
router.get('/listSchool', validateLocationSchema, wrapAsync(SchoolController.listSchool));

module.exports = router;