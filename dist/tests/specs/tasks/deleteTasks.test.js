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
const tasks_mocks_1 = require("../../mocks/tasks.mocks");
const user_mocks_1 = require("../../mocks/user.mocks");
const setupFiles_1 = require("../../setupFiles");
const generateAuthentication_1 = require("../../utils/generateAuthentication");
const deleteTaskBeforeEach = () => __awaiter(void 0, void 0, void 0, function* () {
    const { user: user1, token: token1 } = yield (0, generateAuthentication_1.generateAuthentication)();
    const deleteTask = yield prisma_1.prisma.task.create({
        data: Object.assign(Object.assign({}, tasks_mocks_1.task), { userId: user1.id }),
    });
    const { token: token2 } = yield (0, generateAuthentication_1.generateAuthentication)(user_mocks_1.secondUserMock);
    return { token: token1, secondToken: token2, deleteTask };
});
(0, vitest_1.describe)("delete task", () => {
    (0, vitest_1.it)("should be able to delete task sucessfully", () => __awaiter(void 0, void 0, void 0, function* () {
        const { token, deleteTask } = yield deleteTaskBeforeEach();
        yield setupFiles_1.request
            .delete(`/tasks/${deleteTask === null || deleteTask === void 0 ? void 0 : deleteTask.id}`)
            .set("Authorization", `Bearer ${token}`)
            .expect(204);
    }));
    (0, vitest_1.it)("should throw error when try to delete a invalid task", () => __awaiter(void 0, void 0, void 0, function* () {
        const { token, deleteTask } = yield deleteTaskBeforeEach();
        const id = (deleteTask === null || deleteTask === void 0 ? void 0 : deleteTask.id) + 1;
        yield setupFiles_1.request
            .delete(`/tasks/${id}`)
            .set("Authorization", `Bearer ${token}`)
            .expect(404);
    }));
    (0, vitest_1.it)("should throw error when try to delete a task from a different user", () => __awaiter(void 0, void 0, void 0, function* () {
        const { secondToken, deleteTask } = yield deleteTaskBeforeEach();
        yield setupFiles_1.request
            .delete(`/tasks/${deleteTask === null || deleteTask === void 0 ? void 0 : deleteTask.id}`)
            .set("Authorization", `Bearer ${secondToken}`)
            .expect(403);
    }));
    (0, vitest_1.it)("should throw error when there is no token", () => __awaiter(void 0, void 0, void 0, function* () {
        yield setupFiles_1.request.delete("/tasks/1").expect(401);
    }));
    (0, vitest_1.it)("should throw error when the token is invalid", () => __awaiter(void 0, void 0, void 0, function* () {
        const token = (0, generateAuthentication_1.generateInvalidToken)();
        yield setupFiles_1.request
            .delete("/tasks/1")
            .set("Authorization", `Bearer ${token}`)
            .expect(401);
    }));
});
