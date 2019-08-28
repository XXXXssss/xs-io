"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const request_promise_native_1 = __importDefault(require("request-promise-native"));
const fp = __importStar(require("./lib/fs-promise"));
const defaultHttpReadOption = {
    method: 'GET'
};
class XsIO {
    constructor(arg) {
        this.Arg = {};
        if (arg) {
            this.Arg.httpReadMethod = arg.httpReadMethod || 'GET';
            this.Arg.httpWriteMethod = arg.httpWriteMethod || 'POST';
        }
    }
    read(path, options) {
        return __awaiter(this, void 0, void 0, function* () {
            if (path.startsWith('http://') || path.startsWith('https://')) {
                let trueOptions = Object.assign({}, {
                    method: this.Arg.httpReadMethod,
                    url: path
                });
                if (options) {
                    trueOptions = Object.assign(trueOptions, options);
                }
                return request_promise_native_1.default(trueOptions);
            }
            else {
                if (options) {
                    return fp.readFile(path, options);
                }
                else {
                    return fp.readFile(path);
                }
            }
        });
    }
    write(path, data, options) {
        return __awaiter(this, void 0, void 0, function* () {
            if (path.startsWith('http://') || path.startsWith('https://')) {
                let trueOptions = Object.assign({}, {
                    method: this.Arg.httpWriteMethod,
                    url: path,
                    body: data
                });
                if (options) {
                    trueOptions = Object.assign(trueOptions, options);
                }
                return request_promise_native_1.default(trueOptions);
            }
            else {
                if (options) {
                    return fp.writeFile(path, data, options);
                }
                else {
                    return fp.writeFile(path, data);
                }
            }
        });
    }
}
exports.default = XsIO;
