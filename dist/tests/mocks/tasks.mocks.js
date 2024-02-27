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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTaskList = exports.getTaskWithCategory = exports.taskWithInvalidCategory = exports.invalidDataUpdateTask = exports.updateTask = exports.invalidDataTask = exports.task = void 0;
const prisma_1 = require("../../database/prisma");
exports.task = {
    title: "Lorem ipsum",
    content: "Lorem ipsum",
};
exports.invalidDataTask = {
    title: 123,
    content: 123,
};
exports.updateTask = {
    title: "Updated title",
    content: "Updated content",
    finished: true,
};
exports.invalidDataUpdateTask = {
    title: 123,
    content: 123,
    finished: "testing",
};
exports.taskWithInvalidCategory = {
    title: "Lorem ipsum",
    content: "Lorem ipsum",
    categoryId: 1,
};
const getTaskWithCategory = () => __awaiter(void 0, void 0, void 0, function* () {
    const category = yield prisma_1.prisma.category.findFirst();
    return {
        title: "Lorem ipsum",
        content: "Lorem ipsum",
        categoryId: category === null || category === void 0 ? void 0 : category.id,
    };
});
exports.getTaskWithCategory = getTaskWithCategory;
const getTaskList = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const category = yield prisma_1.prisma.category.findFirst();
    return [
        {
            title: "Lorem ipsum",
            content: "Lorem ipsum",
            userId,
        },
        {
            title: "Lorem ipsum",
            content: "Lorem ipsum",
            categoryId: category === null || category === void 0 ? void 0 : category.id,
            userId,
        },
    ];
});
exports.getTaskList = getTaskList;
