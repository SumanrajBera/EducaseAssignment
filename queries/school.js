module.exports.listSchoolQuery = "SELECT * FROM school_info"
module.exports.insert_query = "INSERT INTO school_info (ID, NAME, Address, Latitude, Longitude) VALUES (?, ?, ?, ?, ?)";
module.exports.checkLocationQuery = "SELECT * FROM school_info WHERE ABS(Latitude - ?) < 0.0001 AND ABS(Longitude - ?) < 0.0001";
module.exports.searchQuery = `SELECT *, 
      (6371 * ACOS(
          COS(RADIANS(?)) * COS(RADIANS(Latitude)) * COS(RADIANS(Longitude) - RADIANS(?)) +
          SIN(RADIANS(?)) * SIN(RADIANS(Latitude))
      )) AS distance
  FROM school_info
  HAVING distance <= 10
  ORDER BY distance`