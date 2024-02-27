"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = exports.categoryRouter = exports.taskRouter = void 0;
const tasks_router_1 = require("./tasks.router");
Object.defineProperty(exports, "taskRouter", { enumerable: true, get: function () { return tasks_router_1.taskRouter; } });
const categories_router_1 = require("./categories.router");
Object.defineProperty(exports, "categoryRouter", { enumerable: true, get: function () { return categories_router_1.categoryRouter; } });
const users_router_1 = require("./users.router");
Object.defineProperty(exports, "userRouter", { enumerable: true, get: function () { return users_router_1.userRouter; } });
