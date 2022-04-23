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
import * as authRepository from "../repositories/authRepository.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
export function signUp(_a) {
    var password = _a.password, email = _a.email;
    return __awaiter(this, void 0, void 0, function () {
        var user, hashPassword;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, authRepository.findUserByEmail(email)];
                case 1:
                    user = _b.sent();
                    if (user) {
                        throw { type: "Bad_Request" };
                    }
                    hashPassword = bcrypt.hashSync(password, 10);
                    return [4 /*yield*/, authRepository.insertOneUser({ password: hashPassword, email: email })];
                case 2:
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    });
}
export function signIn(_a) {
    var password = _a.password, email = _a.email;
    return __awaiter(this, void 0, void 0, function () {
        var user, checkAuth, session, chaveSecreta, token;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, authRepository.findUserByEmail(email)];
                case 1:
                    user = _b.sent();
                    checkAuth = bcrypt.compareSync(password, user.password);
                    if (!checkAuth) {
                        throw { type: "Unauthorized" };
                    }
                    return [4 /*yield*/, authRepository.insertOneSession(user.id)];
                case 2:
                    session = _b.sent();
                    chaveSecreta = process.env.JWT_SECRET;
                    token = jwt.sign(session.id.toString(), chaveSecreta);
                    return [2 /*return*/, token];
            }
        });
    });
}
export function verifyToken(token) {
    return __awaiter(this, void 0, void 0, function () {
        var chaveSecreta, sessionId, session;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    chaveSecreta = process.env.JWT_SECRET;
                    sessionId = jwt.verify(token, chaveSecreta);
                    return [4 /*yield*/, authRepository.findSessionById(parseInt(sessionId))];
                case 1:
                    session = _a.sent();
                    return [2 /*return*/, session.userId];
            }
        });
    });
}
