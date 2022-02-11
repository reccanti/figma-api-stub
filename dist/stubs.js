"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
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
Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var applyMixins_1 = require("./applyMixins");
var fonts_1 = require("./fonts");
var nanoid_1 = require("nanoid");
var defaultConfig = {
    simulateErrors: false,
    isWithoutTimeout: false
};
var isInsideInstance = function (node) {
    if (!node.parent) {
        return;
    }
    return node.parent.type === "INSTANCE" || isInsideInstance(node.parent);
};
exports.createFigma = function (config) {
    var joinedConfig = __assign({}, defaultConfig, config);
    var loadedFonts = [];
    var isFontLoaded = function (fontName) {
        return loadedFonts.find(function (font) { return font.family === fontName.family && font.style === fontName.style; });
    };
    var selectionChangeSubject = new rxjs_1.Subject();
    var selectionChangeSubscribes = new Map();
    var currentPageChangeSubject = new rxjs_1.Subject();
    var currentPageChangeSubscribes = new Map();
    var majorId = 1;
    var minorId = 1;
    var allocateNodeId = function (node, shouldIncreaseMajor) {
        minorId += 1;
        if (!shouldIncreaseMajor) {
            node.id = majorId + ":" + minorId;
        }
        else {
            node.id = majorId + ":" + 1;
            majorId += 1;
        }
    };
    var allocateStyleId = function (style) {
        style.id = "S:" + nanoid_1.nanoid(40) + ",";
    };
    var getImageHash = function () {
        return nanoid_1.nanoid(40);
    };
    var UIAPIStub = /** @class */ (function () {
        function UIAPIStub() {
        }
        UIAPIStub.prototype.postMessage = function (pluginMessage, options) {
            var message = {
                data: { pluginMessage: pluginMessage, pluginId: "000000000000000000" },
                type: "message"
            };
            // @ts-ignore
            if (global && global.onmessage) {
                if (config.isWithoutTimeout) {
                    // @ts-ignore
                    global.onmessage(message);
                }
                else {
                    setTimeout(function () {
                        // @ts-ignore
                        global.onmessage(message);
                    }, 0);
                }
            }
        };
        return UIAPIStub;
    }());
    var ChildrenMixinStub = /** @class */ (function () {
        function ChildrenMixinStub() {
        }
        ChildrenMixinStub.prototype.appendChild = function (item) {
            if (!this.children) {
                this.children = [];
            }
            if (item.parent) {
                item.parent.children = item.parent.children.filter(function (child) { return child !== item; });
            }
            if (joinedConfig.simulateErrors && !item) {
                throw new Error("Error: empty child");
            }
            if (joinedConfig.simulateErrors &&
                // @ts-ignore
                this.type === "DOCUMENT" &&
                item.type !== "PAGE") {
                throw new Error("Error: The root node cannot have children of type other than PAGE");
            }
            item.parent = this;
            this.children.push(item);
        };
        ChildrenMixinStub.prototype.insertChild = function (index, child) {
            if (!this.children) {
                this.children = [];
            }
            if (joinedConfig.simulateErrors && !child) {
                throw new Error("Error: empty child");
            }
            // @ts-ignore
            if (joinedConfig.simulateErrors && child.parent === this) {
                throw new Error("Error: Node already inside parent");
            }
            if (joinedConfig.simulateErrors &&
                // @ts-ignore
                this.type === "DOCUMENT" &&
                child.type !== "PAGE") {
                throw new Error("Error: The root node cannot have children of type other than PAGE");
            }
            if (child.parent) {
                child.parent.children = child.parent.children.filter(function (_child) { return child !== _child; });
            }
            // @ts-ignore
            child.parent = this;
            this.children.splice(index, 0, child);
        };
        ChildrenMixinStub.prototype.findAllWithCriteria = function (criteria) {
            var typeLookup = new Set(criteria.types);
            return this.findAll(function () { return true; }).filter(function (child) {
                return typeLookup.has(child.type);
            });
        };
        ChildrenMixinStub.prototype.findAll = function (callback) {
            if (!this.children) {
                return [];
            }
            var matchingChildren = [];
            this.children.forEach(function (child) {
                if (callback(child)) {
                    matchingChildren.push(child);
                }
                if ("findAll" in child) {
                    matchingChildren.push.apply(matchingChildren, child.findAll(callback));
                }
            });
            return matchingChildren;
        };
        ChildrenMixinStub.prototype.findOne = function (callback) {
            var matches = this.findAll(callback);
            if (matches.length > 0) {
                return matches[0];
            }
            return null;
        };
        ChildrenMixinStub.prototype.findChild = function (callback) {
            if (!this.children) {
                return null;
            }
            return this.children.find(callback);
        };
        ChildrenMixinStub.prototype.findChildren = function (callback) {
            if (!this.children) {
                return null;
            }
            return this.children.filter(callback);
        };
        return ChildrenMixinStub;
    }());
    var BaseNodeMixinStub = /** @class */ (function () {
        function BaseNodeMixinStub() {
            var _this = this;
            this.pluginData = {};
            this.sharedPluginData = {};
            this._orig = null;
            this.getPluginDataKeys = function () {
                if (joinedConfig.simulateErrors && _this.removed) {
                    throw new Error("The node with id " + _this.id + " does not exist");
                }
                if (!_this.pluginData) {
                    return [];
                }
                return Object.keys(_this.pluginData);
            };
        }
        BaseNodeMixinStub.prototype.setPluginData = function (key, value) {
            if (!this.pluginData) {
                this.pluginData = {};
            }
            this.pluginData[key] = value;
        };
        BaseNodeMixinStub.prototype.getPluginData = function (key) {
            if (joinedConfig.simulateErrors && this.removed) {
                throw new Error("The node with id " + this.id + " does not exist");
            }
            if (!this.pluginData) {
                return;
            }
            if (this.pluginData[key]) {
                return this.pluginData[key];
            }
            else {
                if (this._orig) {
                    return this._orig.getPluginData(key);
                }
            }
        };
        BaseNodeMixinStub.prototype.setSharedPluginData = function (namespace, key, value) {
            if (!this.sharedPluginData) {
                this.sharedPluginData = {};
            }
            if (!this.sharedPluginData[namespace]) {
                this.sharedPluginData[namespace] = {};
            }
            this.sharedPluginData[namespace][key] = value;
        };
        BaseNodeMixinStub.prototype.getSharedPluginData = function (namespace, key) {
            if (!this.sharedPluginData) {
                return;
            }
            if (this.sharedPluginData[namespace] &&
                this.sharedPluginData[namespace][key]) {
                return this.sharedPluginData[namespace][key];
            }
            else {
                if (this._orig) {
                    return this._orig.getSharedPluginData(namespace, key);
                }
            }
        };
        BaseNodeMixinStub.prototype.getSharedPluginDataKeys = function (namespace) {
            if (!this.sharedPluginData || !this.sharedPluginData[namespace]) {
                return;
            }
            return Object.keys(this.sharedPluginData[namespace]);
        };
        BaseNodeMixinStub.prototype.setRelaunchData = function (data) {
            this.relaunchData = data;
        };
        BaseNodeMixinStub.prototype.getRelaunchData = function () {
            return this.relaunchData || {};
        };
        BaseNodeMixinStub.prototype.remove = function () {
            var _this = this;
            this.removed = true;
            if (joinedConfig.simulateErrors && isInsideInstance(this)) {
                throw new Error("Error: can't remove item");
            }
            if (this.parent) {
                // @ts-ignore
                this.parent.children = this.parent.children.filter(function (child) { return child !== _this; });
            }
        };
        return BaseNodeMixinStub;
    }());
    var LayoutMixinStub = /** @class */ (function () {
        function LayoutMixinStub() {
        }
        LayoutMixinStub.prototype.rescale = function (scale) {
            if (joinedConfig.simulateErrors && scale < 0.01) {
                throw new Error('Error: in rescale: Expected "scale" to have value >= 0.01');
            }
            this.width = this.width * scale;
            this.height = this.height * scale;
        };
        LayoutMixinStub.prototype.resize = function (width, height) {
            if (joinedConfig.simulateErrors && isInsideInstance(this)) {
                throw new Error("Error: can't change layout inside item");
            }
            if (joinedConfig.simulateErrors && width < 0.01) {
                throw new Error('Error: in resize: Expected "width" to have value >= 0.01');
            }
            if (joinedConfig.simulateErrors && height < 0.01) {
                throw new Error('Error: in resize: Expected "height" to have value >= 0.01');
            }
            this.width = width;
            this.height = height;
        };
        LayoutMixinStub.prototype.resizeWithoutConstraints = function (width, height) {
            this.width = width;
            this.height = height;
        };
        return LayoutMixinStub;
    }());
    var ExportMixinStub = /** @class */ (function () {
        function ExportMixinStub() {
        }
        ExportMixinStub.prototype.exportAsync = function (settings) {
            // "exportAsync" is not implemented in stubs
            return Promise.resolve(new Uint8Array());
        };
        return ExportMixinStub;
    }());
    var GeometryMixinStub = /** @class */ (function () {
        function GeometryMixinStub() {
        }
        Object.defineProperty(GeometryMixinStub.prototype, "fills", {
            get: function () {
                return this._fills || [];
            },
            set: function (theFills) {
                this._fills = theFills;
            },
            enumerable: true,
            configurable: true
        });
        GeometryMixinStub.prototype.outlineStroke = function () {
            return null;
        };
        return GeometryMixinStub;
    }());
    var RectangleNodeStub = /** @class */ (function (_super) {
        __extends(RectangleNodeStub, _super);
        function RectangleNodeStub() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.type = "RECTANGLE";
            return _this;
        }
        return RectangleNodeStub;
    }(BaseNodeMixinStub));
    applyMixins_1.applyMixins(RectangleNodeStub, [
        BaseNodeMixinStub,
        LayoutMixinStub,
        ExportMixinStub,
        GeometryMixinStub
    ]);
    var TextNodeStub = /** @class */ (function (_super) {
        __extends(TextNodeStub, _super);
        function TextNodeStub() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.type = "TEXT";
            return _this;
        }
        Object.defineProperty(TextNodeStub.prototype, "fontName", {
            get: function () {
                return this._fontName || { family: "Roboto", style: "Regular" };
            },
            set: function (fontName) {
                if (joinedConfig.simulateErrors && !fontName) {
                    throw new Error("Error: fontName is undefined");
                }
                this._fontName = fontName;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TextNodeStub.prototype, "characters", {
            get: function () {
                return this._characters || "";
            },
            set: function (characters) {
                if (joinedConfig.simulateErrors && !isFontLoaded(this.fontName)) {
                    throw new Error("Error: font is not loaded " + this.fontName.family + " " + this.fontName.style);
                }
                this._characters = characters;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TextNodeStub.prototype, "textAutoResize", {
            get: function () {
                return this._textAutoResize;
            },
            set: function (value) {
                if (joinedConfig.simulateErrors && !isFontLoaded(this.fontName)) {
                    throw new Error("Error: font is not loaded " + this.fontName.family + " " + this.fontName.style);
                }
                this._textAutoResize = value;
            },
            enumerable: true,
            configurable: true
        });
        TextNodeStub.prototype.getRangeFontName = function (start, end) {
            if (joinedConfig.simulateErrors && start < 0) {
                throw new Error("Error: Expected \"start\" to have value >=0");
            }
            if (joinedConfig.simulateErrors && end < 0) {
                throw new Error("Error: Expected \"end\" to have value >=0");
            }
            if (joinedConfig.simulateErrors && end > this._characters.length) {
                throw new Error("Error: Range outside of available characters. 'start' must be less than node.characters.length and 'end' must be less than or equal to node.characters.length");
            }
            if (joinedConfig.simulateErrors && end === start) {
                throw new Error("Error: Empty range selected. 'end' must be greater than 'start'");
            }
            return this._fontName || { family: "Roboto", style: "Regular" };
        };
        TextNodeStub.prototype.deleteCharacters = function (start, end) {
            if (joinedConfig.simulateErrors && !isFontLoaded(this.fontName)) {
                throw new Error("Error: font is not loaded " + this.fontName.family + " " + this.fontName.style);
            }
            if (joinedConfig.simulateErrors && start < 0) {
                throw new Error("Error: Expected \"start\" to have value >=0");
            }
            if (joinedConfig.simulateErrors && end < 0) {
                throw new Error("Error: Expected \"end\" to have value >=0");
            }
            if (joinedConfig.simulateErrors && end > this._characters.length) {
                throw new Error("Error: Cannot delete characters at index greater than the length of the text");
            }
            this._characters =
                this._characters.slice(start, end) +
                    (end === this._characters.length
                        ? ""
                        : this._characters.slice(end + 1));
        };
        TextNodeStub.prototype.insertCharacters = function (start, characters, _useStyle) {
            if (_useStyle === void 0) { _useStyle = "BEFORE"; }
            if (joinedConfig.simulateErrors && !isFontLoaded(this.fontName)) {
                throw new Error("Error: font is not loaded " + this.fontName.family + " " + this.fontName.style);
            }
            if (joinedConfig.simulateErrors && start < 0) {
                throw new Error("Error: Expected \"start\" to have value >=0");
            }
            if (joinedConfig.simulateErrors && start > this._characters.length) {
                throw new Error("Error: Cannot insert characters at index greater than the length of the text");
            }
            this._characters = [
                this._characters.slice(0, start),
                characters,
                this._characters.slice(start)
            ].join("");
        };
        return TextNodeStub;
    }(BaseNodeMixinStub));
    applyMixins_1.applyMixins(TextNodeStub, [
        BaseNodeMixinStub,
        LayoutMixinStub,
        ExportMixinStub,
        GeometryMixinStub
    ]);
    var DocumentNodeStub = /** @class */ (function (_super) {
        __extends(DocumentNodeStub, _super);
        function DocumentNodeStub() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.type = "DOCUMENT";
            _this.children = [];
            return _this;
        }
        return DocumentNodeStub;
    }(BaseNodeMixinStub));
    applyMixins_1.applyMixins(DocumentNodeStub, [BaseNodeMixinStub, ChildrenMixinStub]);
    var PageNodeStub = /** @class */ (function (_super) {
        __extends(PageNodeStub, _super);
        function PageNodeStub() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.type = "PAGE";
            _this.children = [];
            return _this;
        }
        Object.defineProperty(PageNodeStub.prototype, "selection", {
            get: function () {
                return this._selection || [];
            },
            set: function (value) {
                this._selection = value;
                selectionChangeSubject.next();
            },
            enumerable: true,
            configurable: true
        });
        return PageNodeStub;
    }(BaseNodeMixinStub));
    applyMixins_1.applyMixins(PageNodeStub, [
        BaseNodeMixinStub,
        ChildrenMixinStub,
        ExportMixinStub
    ]);
    var FrameNodeStub = /** @class */ (function (_super) {
        __extends(FrameNodeStub, _super);
        function FrameNodeStub() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.type = "FRAME";
            _this.children = [];
            return _this;
        }
        return FrameNodeStub;
    }(BaseNodeMixinStub));
    applyMixins_1.applyMixins(FrameNodeStub, [
        BaseNodeMixinStub,
        ChildrenMixinStub,
        LayoutMixinStub,
        ExportMixinStub,
        GeometryMixinStub
    ]);
    var GroupNodeStub = /** @class */ (function () {
        function GroupNodeStub() {
            this.type = "GROUP";
        }
        Object.defineProperty(GroupNodeStub.prototype, "constraints", {
            set: function (value) {
                if (joinedConfig.simulateErrors) {
                    throw new Error("Error: Cannot add property constraints, object is not extensible");
                }
            },
            enumerable: true,
            configurable: true
        });
        return GroupNodeStub;
    }());
    applyMixins_1.applyMixins(GroupNodeStub, [
        BaseNodeMixinStub,
        ChildrenMixinStub,
        ExportMixinStub,
        LayoutMixinStub
    ]);
    function cloneChildren(node) {
        var clone = new node.constructor();
        for (var key in node) {
            if (typeof node[key] === "function") {
                clone[key] = node[key].bind(clone);
            }
            else {
                clone[key] = node[key];
            }
        }
        clone._orig = node;
        clone.pluginData = {};
        clone.sharedPluginData = {};
        if ("children" in node) {
            clone.children = node.children.map(function (child) { return cloneChildren(child); });
            clone.children.forEach(function (child) {
                child.parent = clone;
            });
        }
        return clone;
    }
    var ComponentNodeStub = /** @class */ (function (_super) {
        __extends(ComponentNodeStub, _super);
        function ComponentNodeStub() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.type = "COMPONENT";
            _this.key = nanoid_1.nanoid(40);
            _this.children = [];
            return _this;
        }
        ComponentNodeStub.prototype.createInstance = function () {
            var _this = this;
            var instance = new InstanceNodeStub();
            instance.children = this.children.map(function (child) { return cloneChildren(child); });
            instance.children.forEach(function (child) {
                child.parent = _this;
            });
            instance.pluginData = {};
            instance._orig = this;
            instance.mainComponent = this;
            return instance;
        };
        return ComponentNodeStub;
    }(BaseNodeMixinStub));
    applyMixins_1.applyMixins(ComponentNodeStub, [
        BaseNodeMixinStub,
        ChildrenMixinStub,
        ExportMixinStub,
        LayoutMixinStub,
        GeometryMixinStub
    ]);
    var InstanceNodeStub = /** @class */ (function (_super) {
        __extends(InstanceNodeStub, _super);
        function InstanceNodeStub() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.type = "INSTANCE";
            return _this;
        }
        InstanceNodeStub.prototype.detachInstance = function () {
            this.type = "FRAME";
        };
        return InstanceNodeStub;
    }(BaseNodeMixinStub));
    applyMixins_1.applyMixins(InstanceNodeStub, [
        BaseNodeMixinStub,
        ExportMixinStub,
        LayoutMixinStub,
        ChildrenMixinStub
    ]);
    // --- styles
    var styles = new Map();
    var paintStyles = [];
    var effectStyles = [];
    var textStyles = [];
    var gridStyles = [];
    var BaseStyleStub = /** @class */ (function () {
        function BaseStyleStub() {
            this.remote = false;
        }
        BaseStyleStub.prototype.setPluginData = function (key, value) {
            if (!this.pluginData) {
                this.pluginData = {};
            }
            this.pluginData[key] = value;
        };
        BaseStyleStub.prototype.getPluginData = function (key) {
            if (joinedConfig.simulateErrors && this.removed) {
                throw new Error("The style with id " + this.id + " does not exist");
            }
            if (!this.pluginData) {
                return;
            }
            return this.pluginData[key];
        };
        BaseStyleStub.prototype.getPluginDataKeys = function () {
            if (joinedConfig.simulateErrors && this.removed) {
                throw new Error("The style with id " + this.id + " does not exist");
            }
            if (!this.pluginData) {
                return [];
            }
            return Object.keys(this.pluginData);
        };
        BaseStyleStub.prototype.setSharedPluginData = function (namespace, key, value) {
            if (!this.sharedPluginData) {
                this.sharedPluginData = {};
            }
            if (!this.sharedPluginData[namespace]) {
                this.sharedPluginData[namespace] = {};
            }
            this.sharedPluginData[namespace][key] = value;
        };
        BaseStyleStub.prototype.getSharedPluginData = function (namespace, key) {
            if (!this.sharedPluginData || !this.sharedPluginData[namespace]) {
                return;
            }
            return this.sharedPluginData[namespace][key];
        };
        BaseStyleStub.prototype.getSharedPluginDataKeys = function (namespace) {
            if (!this.sharedPluginData || !this.sharedPluginData[namespace]) {
                return;
            }
            return Object.keys(this.sharedPluginData[namespace]);
        };
        BaseStyleStub.prototype.remove = function () {
            this.removed = true;
            styles.delete(this.id);
        };
        BaseStyleStub.prototype.getPublishStatusAsync = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, "UNPUBLISHED"];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        return BaseStyleStub;
    }());
    applyMixins_1.applyMixins(BaseStyleStub, []);
    var PaintStyleStub = /** @class */ (function (_super) {
        __extends(PaintStyleStub, _super);
        function PaintStyleStub() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            // @ts-ignore
            _this.type = "PAINT";
            return _this;
        }
        PaintStyleStub.prototype.remove = function () {
            _super.prototype.remove.call(this);
            paintStyles.splice(paintStyles.indexOf(this), 1);
        };
        return PaintStyleStub;
    }(BaseStyleStub));
    var EffectStyleStub = /** @class */ (function (_super) {
        __extends(EffectStyleStub, _super);
        function EffectStyleStub() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            // @ts-ignore
            _this.type = "EFFECT";
            return _this;
        }
        EffectStyleStub.prototype.remove = function () {
            _super.prototype.remove.call(this);
            effectStyles.splice(effectStyles.indexOf(this), 1);
        };
        return EffectStyleStub;
    }(BaseStyleStub));
    var TextStyleStub = /** @class */ (function (_super) {
        __extends(TextStyleStub, _super);
        function TextStyleStub() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            // @ts-ignore
            _this.type = "TEXT";
            return _this;
        }
        TextStyleStub.prototype.remove = function () {
            _super.prototype.remove.call(this);
            textStyles.splice(textStyles.indexOf(this), 1);
        };
        return TextStyleStub;
    }(BaseStyleStub));
    var GridStyleStub = /** @class */ (function (_super) {
        __extends(GridStyleStub, _super);
        function GridStyleStub() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            // @ts-ignore
            _this.type = "GRID";
            return _this;
        }
        GridStyleStub.prototype.remove = function () {
            _super.prototype.remove.call(this);
            gridStyles.splice(gridStyles.indexOf(this), 1);
        };
        return GridStyleStub;
    }(BaseStyleStub));
    // @ts-ignore
    var PluginApiStub = /** @class */ (function () {
        function PluginApiStub() {
            // @ts-ignore
            this.root = new DocumentNodeStub();
            // @ts-ignore
            this.root.id = "0:0";
            // @ts-ignore
            this._currentPage = new PageNodeStub();
            // @ts-ignore
            this._currentPage.id = "0:1";
            this.root.appendChild(this._currentPage);
            // @ts-ignore
            this.ui = new UIAPIStub();
        }
        Object.defineProperty(PluginApiStub.prototype, "currentPage", {
            get: function () {
                return this._currentPage;
            },
            set: function (value) {
                this._currentPage = value;
                currentPageChangeSubject.next();
            },
            enumerable: true,
            configurable: true
        });
        // @ts-ignore
        PluginApiStub.prototype.createPage = function () {
            var result = new PageNodeStub();
            allocateNodeId(result, true);
            this.root.appendChild(result);
            return result;
        };
        // @ts-ignore
        PluginApiStub.prototype.createFrame = function () {
            var result = new FrameNodeStub();
            allocateNodeId(result);
            this.currentPage.appendChild(result);
            return result;
        };
        // @ts-ignore
        PluginApiStub.prototype.createComponent = function () {
            var result = new ComponentNodeStub();
            allocateNodeId(result);
            this.currentPage.appendChild(result);
            return result;
        };
        // @ts-ignore
        PluginApiStub.prototype.createRectangle = function () {
            var result = new RectangleNodeStub();
            allocateNodeId(result);
            this.currentPage.appendChild(result);
            return result;
        };
        // @ts-ignore
        PluginApiStub.prototype.createText = function () {
            var result = new TextNodeStub();
            allocateNodeId(result);
            this.currentPage.appendChild(result);
            return result;
        };
        PluginApiStub.prototype.getStyleById = function (id) {
            if (styles.has(id)) {
                return styles.get(id);
            }
            return null;
        };
        PluginApiStub.prototype.getLocalPaintStyles = function () {
            return paintStyles;
        };
        PluginApiStub.prototype.getLocalEffectStyles = function () {
            return effectStyles;
        };
        PluginApiStub.prototype.getLocalTextStyles = function () {
            return textStyles;
        };
        PluginApiStub.prototype.getLocalGridStyles = function () {
            return gridStyles;
        };
        // @ts-ignore
        PluginApiStub.prototype.createPaintStyle = function () {
            var style = new PaintStyleStub();
            allocateStyleId(style);
            styles.set(style.id, style);
            paintStyles.push(style);
            return style;
        };
        // @ts-ignore
        PluginApiStub.prototype.createEffectStyle = function () {
            var style = new EffectStyleStub();
            allocateStyleId(style);
            styles.set(style.id, style);
            effectStyles.push(style);
            return style;
        };
        // @ts-ignore
        PluginApiStub.prototype.createTextStyle = function () {
            var style = new TextStyleStub();
            allocateStyleId(style);
            styles.set(style.id, style);
            textStyles.push(style);
            return style;
        };
        // @ts-ignore
        PluginApiStub.prototype.createGridStyle = function () {
            var style = new GridStyleStub();
            allocateStyleId(style);
            styles.set(style.id, style);
            gridStyles.push(style);
            return style;
        };
        PluginApiStub.prototype.createImage = function (bytes) {
            var hash = getImageHash();
            return {
                hash: hash,
                getBytesAsync: function () { return Promise.resolve(bytes); }
            };
        };
        // @ts-ignore
        PluginApiStub.prototype.group = function (nodes, parent, index) {
            if (joinedConfig.simulateErrors && (!nodes || nodes.length === 0)) {
                throw new Error("Error: First argument must be an array of at least one node");
            }
            var group = new GroupNodeStub();
            allocateNodeId(group);
            nodes.forEach(function (node) { return group.appendChild(node); });
            if (index) {
                parent.insertChild(index, group);
            }
            else {
                parent.appendChild(group);
            }
            group.parent = parent;
            return group;
        };
        // @ts-ignore
        PluginApiStub.prototype.loadFontAsync = function (fontName) {
            if (isFontLoaded(fontName)) {
                return;
            }
            return new Promise(function (resolve) {
                loadedFonts.push(fontName);
                resolve();
            });
        };
        PluginApiStub.prototype.listAvailableFontsAsync = function () {
            return Promise.resolve(fonts_1.Roboto.concat(fonts_1.Helvetica));
        };
        PluginApiStub.prototype.on = function (type, callback) {
            if (type === "selectionchange") {
                selectionChangeSubscribes.set(callback, selectionChangeSubject.subscribe(callback));
            }
            if (type === "currentpagechange") {
                currentPageChangeSubscribes.set(callback, currentPageChangeSubject.subscribe(callback));
            }
        };
        PluginApiStub.prototype.once = function (type, callback) {
            if (type === "selectionchange") {
                selectionChangeSubscribes.set(callback, selectionChangeSubject.pipe(operators_1.take(1)).subscribe(callback));
            }
            if (type === "currentpagechange") {
                currentPageChangeSubscribes.set(callback, currentPageChangeSubject.pipe(operators_1.take(1)).subscribe(callback));
            }
        };
        PluginApiStub.prototype.off = function (type, callback) {
            if (type === "selectionchange") {
                selectionChangeSubscribes.get(callback).unsubscribe();
            }
            if (type === "currentpagechange") {
                currentPageChangeSubscribes.get(callback).unsubscribe();
            }
        };
        PluginApiStub.prototype.getNodeById = function (id) {
            var _genNodeById = function (nodes, id) {
                for (var _i = 0, nodes_1 = nodes; _i < nodes_1.length; _i++) {
                    var node = nodes_1[_i];
                    if (node.id === id) {
                        return node;
                    }
                    var childMatch = node.children && _genNodeById(node.children, id);
                    if (childMatch) {
                        return childMatch;
                    }
                }
            };
            return _genNodeById([figma.root], id) || null;
        };
        return PluginApiStub;
    }());
    // @ts-ignore
    return new PluginApiStub();
};
exports.createParentPostMessage = function (figma, isWithoutTimeout) { return function (message, target) {
    if (figma.ui.onmessage) {
        var call = function () {
            // @ts-ignore
            figma.ui.onmessage(message.pluginMessage, { origin: null });
        };
        if (isWithoutTimeout) {
            call();
        }
        else {
            setTimeout(call, 0);
        }
    }
}; };
//# sourceMappingURL=stubs.js.map