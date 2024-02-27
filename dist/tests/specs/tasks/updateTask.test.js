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
const vitest_1 = require("vitest");
const prisma_1 = require("../../../database/prisma");
const category_mocks_1 = require("../../mocks/category.mocks");
const tasks_mocks_1 = require("../../mocks/tasks.mocks");
const user_mocks_1 = require("../../mocks/user.mocks");
const setupFiles_1 = require("../../setupFiles");
const generateAuthentication_1 = require("../../utils/generateAuthentication");
const taskDefaultExpects_1 = require("../../utils/taskDefaultExpects");
const updateTaskBeforeEach = () => __awaiter(void 0, void 0, void 0, function* () {
    const { user: user1, token: token1 } = yield (0, generateAuthentication_1.generateAuthentication)();
    yield prisma_1.prisma.category.create({ data: (0, category_mocks_1.category)(user1.id) });
    const taskList = yield (0, tasks_mocks_1.getTaskList)(user1.id);
    yield prisma_1.prisma.task.createMany({ data: taskList });
    const { token: token2 } = yield (0, generateAuthentication_1.generateAuthentication)(user_mocks_1.secondUserMock);
    return { user: user1, token: token1, secondToken: token2 };
});
(0, vitest_1.describe)("update task", () => {
    (0, vitest_1.it)("should be able to update task successfully ", () => __awaiter(void 0, void 0, void 0, function* () {
        const { user, token } = yield updateTaskBeforeEach();
        const task = yield prisma_1.prisma.task.findFirst();
        const data = yield setupFiles_1.request
            .patch(`/tasks/${task === null || task === void 0 ? void 0 : task.id}`)
            .set("Authorization", `Bearer ${token}`)
            .send(tasks_mocks_1.updateTask)
            .expect(200)
            .then((response) => response.body);
        (0, taskDefaultExpects_1.taskDefaultExpects)(data, user.id);
        (0, vitest_1.expect)(data.title).toBe(tasks_mocks_1.updateTask.title);
        (0, vitest_1.expect)(data.content).toBe(tasks_mocks_1.updateTask.content);
        (0, vitest_1.expect)(data.finished).toBe(tasks_mocks_1.updateTask.finished);
    }));
    (0, vitest_1.it)("should throw error when try to update a invalid task", () => __awaiter(void 0, void 0, void 0, function* () {
        const { token } = yield updateTaskBeforeEach();
        const tasks = yield prisma_1.prisma.task.findMany();
        const id = tasks[1].id + 1;
        yield setupFiles_1.request
            .patch(`/tasks/${id}`)
            .set("Authorization", `Bearer ${token}`)
            .expect(404)
            .then((response) => response.body);
    }));
    (0, vitest_1.it)("should throw error when try to update a task with invalid data types", () => __awaiter(void 0, void 0, void 0, function* () {
        const { token } = yield updateTaskBeforeEach();
        const task = yield prisma_1.prisma.task.findFirst();
        yield setupFiles_1.request
            .patch(`/tasks/${task === null || task === void 0 ? void 0 : task.id}`)
            .set("Authorization", `Bearer ${token}`)
            .send(tasks_mocks_1.invalidDataUpdateTask)
            .expect(400);
    }));
    (0, vitest_1.it)("should throw error when try update a task from a different user", () => __awaiter(void 0, void 0, void 0, function* () {
        const { secondToken } = yield updateTaskBeforeEach();
        const task = yield prisma_1.prisma.task.findFirst();
        yield setupFiles_1.request
            .patch(`/tasks/${task === null || task === void 0 ? void 0 : task.id}`)
            .set("Authorization", `Bearer ${secondToken}`)
            .send(tasks_mocks_1.updateTask)
            .expect(403);
    }));
    (0, vitest_1.it)("should throw error when there is no token", () => __awaiter(void 0, void 0, void 0, function* () {
        yield setupFiles_1.request.patch("/tasks/1").expect(401);
    }));
    (0, vitest_1.it)("should throw error when the token is invalid", () => __awaiter(void 0, void 0, void 0, function* () {
        const token = (0, generateAuthentication_1.generateInvalidToken)();
        yield setupFiles_1.request
            .patch("/tasks/1")
            .set("Authorization", `Bearer ${token}`)
            .expect(401);
    }));
});
