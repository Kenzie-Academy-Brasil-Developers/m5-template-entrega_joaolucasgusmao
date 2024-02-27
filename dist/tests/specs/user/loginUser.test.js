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
const bcrypt_1 = require("bcrypt");
const vitest_1 = require("vitest");
const prisma_1 = require("../../../database/prisma");
const user_mocks_1 = require("../../mocks/user.mocks");
const setupFiles_1 = require("../../setupFiles");
const userDefaultExpects_1 = require("../../utils/userDefaultExpects");
const loginUserBeforeEach = () => __awaiter(void 0, void 0, void 0, function* () {
    const password = yield (0, bcrypt_1.hash)(user_mocks_1.userMock.password, 10);
    const registerUser = yield prisma_1.prisma.user.create({
        data: Object.assign(Object.assign({}, user_mocks_1.userMock), { password }),
    });
    return { registerUser };
});
(0, vitest_1.describe)("login user", () => {
    (0, vitest_1.it)("should be able de login correctly", () => __awaiter(void 0, void 0, void 0, function* () {
        const { registerUser } = yield loginUserBeforeEach();
        const credentials = {
            email: registerUser.email,
            password: "1234",
        };
        const data = yield setupFiles_1.request
            .post("/users/login")
            .send(credentials)
            .expect(200)
            .then((response) => response.body);
        (0, vitest_1.expect)(data).toBeDefined();
        (0, vitest_1.expect)(data).toBeTypeOf("object");
        (0, vitest_1.expect)(data.accessToken).toBeDefined();
        (0, vitest_1.expect)(data.accessToken).toBeTypeOf("string");
        (0, userDefaultExpects_1.userDefaultExpects)(data.user);
    }));
    (0, vitest_1.it)("should be throw error when password in wrong", () => __awaiter(void 0, void 0, void 0, function* () {
        const { registerUser } = yield loginUserBeforeEach();
        const credentials = {
            email: registerUser.email,
            password: "wrongpassword",
        };
        yield setupFiles_1.request.post("/users/login").send(credentials).expect(401);
    }));
    (0, vitest_1.it)("should be throw error when user not found", () => __awaiter(void 0, void 0, void 0, function* () {
        const credentials = {
            email: "invalid@email.com",
            password: "wrongpassword",
        };
        yield setupFiles_1.request.post("/users/login").send(credentials).expect(404);
    }));
});
