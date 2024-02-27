"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
exports.TaskController = void 0;
const services_1 = require("../services");
const tsyringe_1 = require("tsyringe");
let TaskController = class TaskController {
    constructor(TaskServices) {
        this.TaskServices = TaskServices;
        this.create = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const newTask = yield this.TaskServices.create(req.body);
            return res.status(201).json(newTask);
        });
        this.read = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const tasks = yield this.TaskServices.read(req.query.category, res.locals.decode.user.id);
            return res.status(200).json(tasks);
        });
        this.retrieve = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const task = yield this.TaskServices.retrieve(Number(req.params.id));
            return res.status(200).json(task);
        });
        this.update = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const taskUpdated = yield this.TaskServices.update(Number(req.params.id), req.body);
            return res.status(200).json(taskUpdated);
        });
        this.delete = (req, res) => __awaiter(this, void 0, void 0, function* () {
            yield this.TaskServices.delete(Number(req.params.id));
            return res.status(204).json();
        });
    }
};
exports.TaskController = TaskController;
exports.TaskController = TaskController = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)("TaskServices")),
    __metadata("design:paramtypes", [services_1.TaskServices])
], TaskController);
