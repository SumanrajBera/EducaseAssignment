const ExpressError = require("./utils/ExpressError");
const Joi = require('joi');

// Custom Float validator

const floatValidator = (value, helpers) => {
    const num = Number(value);
    if (typeof num !== 'number' || isNaN(num)) {
        return helpers.message("Coordinates must be float");
    }
    if (Number.isInteger(num)) {
        return helpers.message("Coordinates must be float and not an Integer");
    }
    return num;
};


// Joi Schema

const schoolSchema = Joi.object({
    name: Joi.string().max(255).required(),
    address: Joi.string().max(255).required(),
    latitude: Joi.number().required().custom(floatValidator),
    longitude: Joi.number().required().custom(floatValidator)
});

const locationSchema = Joi.object({
    latitude: Joi.number().required().custom(floatValidator),
    longitude: Joi.number().required().custom(floatValidator)
});

// School Validation

module.exports.validateSchoolSchema = (req, res, next) => {
    let { error } = schoolSchema.validate(req.body)
    if (error) {
        const errMsg = error.details.map(el => el.message).join(", ");
        throw new ExpressError(400, errMsg);
    } else {
        next()
    }
}

// Location Validation

module.exports.validateLocationSchema = (req, res, next) => {
    const { error } = locationSchema.validate(req.query, { convert: true });
    if (error) {
        let errMsg = error.details.map((el) => el.message).join(",")
        throw new ExpressError(400, errMsg)
    } else {
        next()
    }
}