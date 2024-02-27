"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCategorySchema = exports.categorySchema = void 0;
const zod_1 = require("zod");
const base_schema_1 = require("./base.schema");
const categorySchema = base_schema_1.baseSchema.extend({
    name: zod_1.z.string().min(1).max(255),
    userId: zod_1.z.number().positive().nullish(),
});
exports.categorySchema = categorySchema;
const createCategorySchema = categorySchema.omit({ id: true });
exports.createCategorySchema = createCategorySchema;
