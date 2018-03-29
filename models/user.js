"use strict";
exports.__esModule = true;
var ROLE;
(function (ROLE) {
    ROLE[ROLE["ADMIN"] = 0] = "ADMIN";
    ROLE[ROLE["COSTING"] = 1] = "COSTING";
    ROLE[ROLE["BUYER"] = 2] = "BUYER";
    ROLE[ROLE["SUPPLIER"] = 3] = "SUPPLIER";
})(ROLE = exports.ROLE || (exports.ROLE = {}));
exports.userWithRoles = {
    ADMIN: [
        {
            name: "admin",
            password: "password",
            email: "admin@mail.com"
        }
    ],
    COSTING: [
        {
            name: "cost",
            password: "password",
            email: "cost@mail.com"
        }
    ],
    BUYER: [
        {
            name: "buy",
            password: "password",
            email: "buy@mail.com"
        }
    ],
    SUPPLIER: [
        {
            name: "sup",
            password: "password",
            email: "sup@mail.com"
        }
    ]
};
