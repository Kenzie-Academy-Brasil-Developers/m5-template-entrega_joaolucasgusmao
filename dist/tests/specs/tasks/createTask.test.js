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
const tasks_mocks_1 = require("../../mocks/tasks.mocks");
const setupFiles_1 = require("../../setupFiles");
const generateAuthentication_1 = require("../../utils/generateAuthentication");
const taskDefaultExpects_1 = require("../../utils/taskDefaultExpects");
(0, vitest_1.describe)("create task", () => {
    (0, vitest_1.it)("should be able to create task sucessfully", () => __awaiter(void 0, void 0, void 0, function* () {
        const { user, token } = yield (0, generateAuthentication_1.generateAuthentication)();
        const data = yield setupFiles_1.request
            .post("/tasks")
            .set("Authorization", `Bearer ${token}`)
            .send(tasks_mocks_1.task)
            .expect(201)
            .then((response) => response.body);
        (0, taskDefaultExpects_1.taskDefaultExpects)(data, user.id);
    }));
    (0, vitest_1.it)("should throw error when try to create a task in a invalid category", () => __awaiter(void 0, void 0, void 0, function* () {
        const { token } = yield (0, generateAuthentication_1.generateAuthentication)();
        yield setupFiles_1.request
            .post("/tasks")
            .set("Authorization", `Bearer ${token}`)
            .send(tasks_mocks_1.taskWithInvalidCategory)
            .expect(404);
    }));
    (0, vitest_1.it)("should throw error when try to create a task with a missing body parameter", () => __awaiter(void 0, void 0, void 0, function* () {
        const { token } = yield (0, generateAuthentication_1.generateAuthentication)();
        yield setupFiles_1.request
            .post("/tasks")
            .set("Authorization", `Bearer ${token}`)
            .expect(400);
    }));
    (0, vitest_1.it)("should throw error when try to create a task with invalid data types", () => __awaiter(void 0, void 0, void 0, function* () {
        const { token } = yield (0, generateAuthentication_1.generateAuthentication)();
        yield setupFiles_1.request
            .post("/tasks")
            .set("Authorization", `Bearer ${token}`)
            .send(tasks_mocks_1.invalidDataTask)
            .expect(400);
    }));
    (0, vitest_1.it)("should throw error when there is no token", () => __awaiter(void 0, void 0, void 0, function* () {
        yield setupFiles_1.request.post("/tasks").expect(401);
    }));
    (0, vitest_1.it)("should throw error when the token is invalid", () => __awaiter(void 0, void 0, void 0, function* () {
        const token = (0, generateAuthentication_1.generateInvalidToken)();
        yield setupFiles_1.request
            .post("/tasks")
            .set("Authorization", `Bearer ${token}`)
            .expect(401);
    }));
});
