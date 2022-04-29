var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
// tests/user.test.ts
import supertest from "supertest";
import app from "../src/index.js";
import { client } from "../src/database.js";
import userBodyFactory from "./factories/userBodyFactory.js";
import userFactory from "./factories/userFactory.js";
describe("User tests - POST auth/signUn", function () {
    beforeEach(truncateUsers);
    afterAll(disconnect);
    it("should return 201 and persist the user given a valid body", function () { return __awaiter(void 0, void 0, void 0, function () {
        var body, response, user;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    body = userBodyFactory();
                    return [4 /*yield*/, supertest(app).post("/auth/signup").send(body)];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, client.users.findUnique({
                            where: {
                                email: body.email
                            }
                        })];
                case 2:
                    user = _a.sent();
                    expect(response.status).toEqual(201);
                    expect(user).not.toBeNull();
                    return [2 /*return*/];
            }
        });
    }); });
    it("should return 422 given a invalid body", function () { return __awaiter(void 0, void 0, void 0, function () {
        var body, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    body = {};
                    return [4 /*yield*/, supertest(app).post("/auth/signup").send(body)];
                case 1:
                    response = _a.sent();
                    expect(response.status).toEqual(422);
                    return [2 /*return*/];
            }
        });
    }); });
    it("should return 409 given a duplicate email", function () { return __awaiter(void 0, void 0, void 0, function () {
        var body, response, users;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    body = userBodyFactory();
                    return [4 /*yield*/, supertest(app).post("/auth/signup").send(body)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, supertest(app).post("/auth/signup").send(body)];
                case 2:
                    response = _a.sent();
                    return [4 /*yield*/, client.users.findMany({
                            where: {
                                email: body.email
                            }
                        })];
                case 3:
                    users = _a.sent();
                    expect(response.status).toEqual(409);
                    expect(users.length).toEqual(1);
                    return [2 /*return*/];
            }
        });
    }); });
});
describe("User tests - POST auth/signin", function () {
    beforeEach(truncateUsers);
    afterAll(disconnect);
    it("should return 200 and a token given valid credentials", function () { return __awaiter(void 0, void 0, void 0, function () {
        var body, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    body = userBodyFactory();
                    return [4 /*yield*/, userFactory(body)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, supertest(app).post("/auth/signin").send(body)];
                case 2:
                    response = _a.sent();
                    expect(response.status).toEqual(200);
                    expect(typeof response.text).toEqual("string");
                    expect(response.text.length).toBeGreaterThan(25);
                    return [2 /*return*/];
            }
        });
    }); });
    it("should return 401 given invalid email", function () { return __awaiter(void 0, void 0, void 0, function () {
        var body, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    body = userBodyFactory();
                    return [4 /*yield*/, supertest(app).post("/auth/signin").send(body)];
                case 1:
                    response = _a.sent();
                    expect(response.status).toEqual(401);
                    return [2 /*return*/];
            }
        });
    }); });
    it("should return 401 given invalid password", function () { return __awaiter(void 0, void 0, void 0, function () {
        var body, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    body = userBodyFactory();
                    return [4 /*yield*/, userFactory(body)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, supertest(app)
                            .post("/auth/signin")
                            .send(__assign(__assign({}, body), { password: "bananinha" }))];
                case 2:
                    response = _a.sent();
                    expect(response.status).toEqual(401);
                    return [2 /*return*/];
            }
        });
    }); });
});
function disconnect() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, client.$disconnect()];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function truncateUsers() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, client.$executeRaw(templateObject_1 || (templateObject_1 = __makeTemplateObject(["TRUNCATE TABLE users, sessions;"], ["TRUNCATE TABLE users, sessions;"])))];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
var templateObject_1;
