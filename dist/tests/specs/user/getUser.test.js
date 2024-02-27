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
const setupFiles_1 = require("../../setupFiles");
const generateAuthentication_1 = require("../../utils/generateAuthentication");
const userDefaultExpects_1 = require("../../utils/userDefaultExpects");
(0, vitest_1.describe)("get user", () => {
    (0, vitest_1.it)("should be able to get user sucessfully", () => __awaiter(void 0, void 0, void 0, function* () {
        const { token } = yield (0, generateAuthentication_1.generateAuthentication)();
        const data = yield setupFiles_1.request
            .get("/users/profile")
            .set("Authorization", `Bearer ${token}`)
            .expect(200)
            .then((response) => response.body);
        (0, userDefaultExpects_1.userDefaultExpects)(data);
    }));
    (0, vitest_1.it)("should throw error when there is no token", () => __awaiter(void 0, void 0, void 0, function* () {
        yield setupFiles_1.request.get("/users/profile").expect(401);
    }));
    (0, vitest_1.it)("should throw error when the token is invalid", () => __awaiter(void 0, void 0, void 0, function* () {
        const token = (0, generateAuthentication_1.generateInvalidToken)();
        yield setupFiles_1.request
            .get("/users/profile")
            .set("Authorization", `Bearer ${token}`)
            .expect(401);
    }));
});
