"use strict";
exports.__esModule = true;
var user_1 = require("../models/user");
var users = user_1.userWithRoles;
function validateUser(user) {
    var result = { valid: false };
    if (user != null) {
        Object.keys(user_1.userWithRoles).forEach(function (role) {
            user_1.userWithRoles[role].forEach(function (validationUser) {
                if (validationUser.email.toLocaleLowerCase() == user.email.toLocaleLowerCase() &&
                    validationUser.password == user.password) {
                    result = {
                        valid: true,
                        role: user_1.ROLE[role],
                        user: validationUser
                    };
                }
            });
        });
    }
    return result;
}
exports.validateUser = validateUser;
