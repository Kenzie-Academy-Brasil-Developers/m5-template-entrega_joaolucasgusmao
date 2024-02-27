"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskServices = void 0;
const prisma_1 = require("../database/prisma");
const schemas_1 = require("../schemas");
const tsyringe_1 = require("tsyringe");
const errors_1 = require("../middlewares/errors");
let TaskServices = class TaskServices {
    constructor() {
        this.create = (data) => __awaiter(this, void 0, void 0, function* () {
            const newTask = yield prisma_1.prisma.task.create({ data });
            return schemas_1.taskSchema.parse(newTask);
        });
        this.read = (categoryName, userOwnerId) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            if (categoryName) {
                const task = yield prisma_1.prisma.task.findMany({
                    where: {
                        category: {
                            name: {
                                contains: categoryName,
                                mode: "insensitive",
                            },
                            userId: userOwnerId,
                        },
                    },
                    include: { category: true },
                    take: 1,
                });
                if (task.length === 0 || ((_a = task[0].category) === null || _a === void 0 ? void 0 : _a.userId) !== userOwnerId)
                    throw new errors_1.AppError("This user is not the task owner", 403);
                return schemas_1.getTaskSchema.array().parse(task);
            }
            const taskList = yield prisma_1.prisma.task.findMany({
                where: { userId: userOwnerId },
            });
            if (taskList.length === 0)
                throw new errors_1.AppError("This user has no tasks registered", 404);
            return schemas_1.getTaskSchema.array().parse(taskList.sort((a, b) => a.id - b.id));
        });
        this.retrieve = (taskId) => __awaiter(this, void 0, void 0, function* () {
            const foundTask = yield prisma_1.prisma.task.findFirst({
                where: { id: taskId },
                include: { category: true },
            });
            return schemas_1.getTaskSchema.parse(foundTask);
        });
        this.update = (taskId, data) => __awaiter(this, void 0, void 0, function* () {
            const task = yield prisma_1.prisma.task.update({
                where: { id: taskId },
                data,
            });
            return schemas_1.taskSchema.parse(task);
        });
        this.delete = (taskId) => __awaiter(this, void 0, void 0, function* () {
            yield prisma_1.prisma.task.delete({ where: { id: taskId } });
        });
    }
};
exports.TaskServices = TaskServices;
exports.TaskServices = TaskServices = __decorate([
    (0, tsyringe_1.injectable)()
], TaskServices);
