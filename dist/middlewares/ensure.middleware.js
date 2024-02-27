"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ensure = void 0;
const prisma_1 = require("../database/prisma");
const AppError_1 = require("./errors/AppError");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class EnsureMiddleware {
    constructor() {
        this.validBody = (schema) => (req, _, next) => __awaiter(this, void 0, void 0, function* () {
            req.body = yield schema.parseAsync(req.body);
            return next();
        });
        this.idExists = (req, _, next) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const taskFound = yield prisma_1.prisma.task.findFirst({
                where: { id: Number(id) },
            });
            if (!taskFound)
                throw new AppError_1.AppError("Task not found", 404);
            return next();
        });
        this.categoryIdExists = (req, __, next) => __awaiter(this, void 0, void 0, function* () {
            const { categoryId } = req.body;
            if (!categoryId)
                return next();
            const categoryFound = yield prisma_1.prisma.category.findFirst({
                where: { id: categoryId },
            });
            if (!categoryFound)
                throw new AppError_1.AppError("Category not found", 404);
            return next();
        });
        this.deleteCategoryIdExists = (req, __, next) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const allTasks = yield prisma_1.prisma.category.findFirst({
                where: { id: Number(id) },
            });
            if (!allTasks)
                throw new AppError_1.AppError("Category not found", 404);
            return next();
        });
        this.tokenIsValid = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { authorization } = req.headers;
            if (!authorization)
                throw new AppError_1.AppError("Token is required", 401);
            const [_bearer, token] = authorization.split(" ");
            jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
            res.locals.decode = jsonwebtoken_1.default.decode(token);
            return next();
        });
        this.isTaskOwner = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const userOwnerId = res.locals.decode.user.id;
            const taskId = Number(req.params.id);
            const userTaskOwner = yield prisma_1.prisma.task.findFirst({
                where: { id: taskId },
            });
            if ((userTaskOwner === null || userTaskOwner === void 0 ? void 0 : userTaskOwner.userId) !== userOwnerId)
                throw new AppError_1.AppError("This user is not the task owner", 403);
            return next();
        });
        this.isCategoryOwner = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const userOwnerId = res.locals.decode.user.id;
            const taskId = Number(req.params.id);
            const userCategory = yield prisma_1.prisma.category.findFirst({
                where: { id: taskId },
            });
            if ((userCategory === null || userCategory === void 0 ? void 0 : userCategory.userId) !== userOwnerId)
                throw new AppError_1.AppError("This user is not the category owner", 403);
            return next();
        });
    }
}
const ensure = new EnsureMiddleware();
exports.ensure = ensure;
