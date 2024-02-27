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
exports.categoryDefaultExpects = void 0;
const vitest_1 = require("vitest");
const categoryDefaultExpects = (category) => __awaiter(void 0, void 0, void 0, function* () {
    (0, vitest_1.expect)(category).toBeDefined();
    (0, vitest_1.expect)(category).toBeTypeOf("object");
    (0, vitest_1.expect)(category.name).toBeDefined();
    (0, vitest_1.expect)(category.name).toBeTypeOf("string");
});
exports.categoryDefaultExpects = categoryDefaultExpects;
