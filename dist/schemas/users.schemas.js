"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userReturnSchema = exports.userLoginSchema = exports.userCreateSchema = exports.userSchema = void 0;
const zod_1 = require("zod");
const base_schema_1 = require("./base.schema");
const userSchema = base_schema_1.baseSchema.extend({
    name: zod_1.z.string().min(1),
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(4),
});
exports.userSchema = userSchema;
const userCreateSchema = userSchema.omit({ id: true });
exports.userCreateSchema = userCreateSchema;
const userLoginSchema = userSchema.omit({ name: true, id: true });
exports.userLoginSchema = userLoginSchema;
const userReturnSchema = userSchema.omit({ password: true });
exports.userReturnSchema = userReturnSchema;
