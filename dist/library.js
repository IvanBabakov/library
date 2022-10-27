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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var express_session_1 = __importDefault(require("express-session"));
var body_parser_1 = __importDefault(require("body-parser"));
var connect_mongo_1 = __importDefault(require("connect-mongo"));
var mongoose_1 = __importDefault(require("mongoose"));
var passport_1 = __importDefault(require("passport"));
var userModel_1 = __importDefault(require("./models/userModel"));
// const Session = require('./models/sessionMonel');
var passport_local_1 = __importDefault(require("passport-local"));
var localStrategy = passport_local_1.default.Strategy;
var verify = function (username, password, done) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, userModel_1.default.findOne({ name: username })
                    .then(function (user) {
                    if (!user) {
                        return done(null, false, { message: "Can't find User" });
                    }
                    else {
                        if (password == user.password) {
                            return done(null, user);
                        }
                        else {
                            return done(null, false, { message: "Wrong Password" });
                        }
                    }
                })
                    .catch(function (err) {
                    return done(null, false, { message: err });
                })];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
var options = {
    usernameField: "name",
    passwordField: "password",
};
passport_1.default.use('local', new localStrategy(options, verify));
passport_1.default.serializeUser(function (user, cb) {
    cb(null, user._id);
});
passport_1.default.deserializeUser(function (id, cb) {
    userModel_1.default.findOne({ _id: id }, function (err, user) {
        if (err) {
            return cb(err);
        }
        cb(null, user);
    });
});
// import loggerMiddleware from './middleware/logger';
var error_1 = __importDefault(require("./middleware/error"));
var books_1 = __importDefault(require("./routers/books"));
var books_2 = __importDefault(require("./routers/books"));
var user_1 = __importDefault(require("./routers/user"));
var index_1 = __importDefault(require("./routers/index"));
var app = (0, express_1.default)();
//app.use(loggerMiddleware);
app.use((0, express_session_1.default)({
    secret: 'SECRET',
    store: new connect_mongo_1.default({
        mongoUrl: 'mongodb://Skoge:FI-643-119-b@mongodb:27017',
        dbName: 'library_database',
        collectionName: 'session',
        ttl: 180
    }),
    resave: false,
    saveUninitialized: true,
    cookie: {}
}));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
app.use(passport_1.default.authenticate('session'));
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.set('view engine', 'ejs');
app.use('/api/books', books_1.default);
app.use('/books', books_2.default);
app.use('/', index_1.default);
app.use('/user', user_1.default);
app.use(error_1.default);
var PORT = process.env.PORT || 3000;
var UserDB = process.env.DB_USERNAME || 'root';
var PasswordDB = process.env.DB_PASSWORD || 'password';
var NameDB = process.env.DB_NAME || 'books';
var HostDB = process.env.DB_HOST || 'mongodb://localhost:27017/';
function start() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            try {
                mongoose_1.default.connect(HostDB, {
                    user: UserDB,
                    pass: PasswordDB,
                    dbName: NameDB
                });
                app.listen(PORT, function () {
                    console.log("=== start server PORT ".concat(PORT, " ==="));
                });
            }
            catch (e) {
                console.log(e);
            }
            return [2 /*return*/];
        });
    });
}
start();
