"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userReturnSchema = exports.userLoginSchema = exports.userCreateSchema = exports.userSchema = exports.updateTaskSchema = exports.getTaskSchema = exports.createTaskSchema = exports.taskSchema = exports.createCategorySchema = exports.categorySchema = exports.baseSchema = void 0;
const base_schema_1 = require("./base.schema");
Object.defineProperty(exports, "baseSchema", { enumerable: true, get: function () { return base_schema_1.baseSchema; } });
const categories_schema_1 = require("./categories.schema");
Object.defineProperty(exports, "categorySchema", { enumerable: true, get: function () { return categories_schema_1.categorySchema; } });
Object.defineProperty(exports, "createCategorySchema", { enumerable: true, get: function () { return categories_schema_1.createCategorySchema; } });
const tasks_schema_1 = require("./tasks.schema");
Object.defineProperty(exports, "taskSchema", { enumerable: true, get: function () { return tasks_schema_1.taskSchema; } });
Object.defineProperty(exports, "createTaskSchema", { enumerable: true, get: function () { return tasks_schema_1.createTaskSchema; } });
Object.defineProperty(exports, "getTaskSchema", { enumerable: true, get: function () { return tasks_schema_1.getTaskSchema; } });
Object.defineProperty(exports, "updateTaskSchema", { enumerable: true, get: function () { return tasks_schema_1.updateTaskSchema; } });
const users_schemas_1 = require("./users.schemas");
Object.defineProperty(exports, "userSchema", { enumerable: true, get: function () { return users_schemas_1.userSchema; } });
Object.defineProperty(exports, "userCreateSchema", { enumerable: true, get: function () { return users_schemas_1.userCreateSchema; } });
Object.defineProperty(exports, "userLoginSchema", { enumerable: true, get: function () { return users_schemas_1.userLoginSchema; } });
Object.defineProperty(exports, "userReturnSchema", { enumerable: true, get: function () { return users_schemas_1.userReturnSchema; } });
