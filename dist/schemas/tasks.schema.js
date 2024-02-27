"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTaskSchema = exports.getTaskSchema = exports.createTaskSchema = exports.taskSchema = void 0;
const zod_1 = require("zod");
const base_schema_1 = require("./base.schema");
const categories_schema_1 = require("./categories.schema");
const taskSchema = base_schema_1.baseSchema.extend({
    title: zod_1.z.string().min(1).max(255),
    content: zod_1.z.string().min(1).max(255),
    finished: zod_1.z.boolean().default(false),
    categoryId: zod_1.z.number().positive().nullish(),
    userId: zod_1.z.number().positive().nullish(),
});
exports.taskSchema = taskSchema;
const createTaskSchema = taskSchema.omit({ id: true });
exports.createTaskSchema = createTaskSchema;
const getTaskSchema = taskSchema.omit({ categoryId: true }).extend({
    category: categories_schema_1.categorySchema.nullish(),
});
exports.getTaskSchema = getTaskSchema;
const updateTaskSchema = taskSchema.omit({ id: true });
exports.updateTaskSchema = updateTaskSchema;
