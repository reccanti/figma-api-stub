import * as cloneDeep from "clone-deep";
import { TConfig } from "./config";
import { Fonts } from "./fonts";
import { nanoid } from "nanoid";
import { Subject } from "rxjs";

export const selectionChangeSubject = new Subject();

export class RectangleNodeStub {
  constructor(private config: TConfig) {}

  type = "RECTANGLE";
}

export class TextNodeStub {
  constructor(private config: TConfig) {}

  type = "TEXT";
  private _fontName: FontName;
  private _characters: string;
  private _textAutoResize: string;
  get fontName() {
    return this._fontName || { family: "Roboto", style: "Regular" };
  }
  set fontName(fontName) {
    if (this.config.simulateErrors && !fontName) {
      throw new Error(`Error: fontName is undefined`);
    }
    this._fontName = fontName;
  }
  get characters() {
    return this._characters || "";
  }
  set characters(characters) {
    if (this.config.simulateErrors && !Fonts.isFontLoaded(this.fontName)) {
      throw new Error(
        `Error: font is not loaded ${this.fontName.family} ${this.fontName.style}`
      );
    }
    this._characters = characters;
  }
  get textAutoResize() {
    return this._textAutoResize;
  }
  set textAutoResize(value) {
    if (this.config.simulateErrors && !Fonts.isFontLoaded(this.fontName)) {
      throw new Error(
        `Error: font is not loaded ${this.fontName.family} ${this.fontName.style}`
      );
    }
    this._textAutoResize = value;
  }
  getRangeFontName(start: number, end: number): FontName | PluginAPI["mixed"] {
    if (this.config.simulateErrors && start < 0) {
      throw new Error(`Error: Expected "start" to have value >=0`);
    }
    if (this.config.simulateErrors && end < 0) {
      throw new Error(`Error: Expected "end" to have value >=0`);
    }
    if (this.config.simulateErrors && end > this._characters.length) {
      throw new Error(
        `Error: Range outside of available characters. 'start' must be less than node.characters.length and 'end' must be less than or equal to node.characters.length`
      );
    }
    if (this.config.simulateErrors && end === start) {
      throw new Error(
        `Error: Empty range selected. 'end' must be greater than 'start'`
      );
    }
    return this._fontName || { family: "Roboto", style: "Regular" };
  }
  deleteCharacters(start: number, end: number): void {
    if (this.config.simulateErrors && !Fonts.isFontLoaded(this.fontName)) {
      throw new Error(
        `Error: font is not loaded ${this.fontName.family} ${this.fontName.style}`
      );
    }
    if (this.config.simulateErrors && start < 0) {
      throw new Error(`Error: Expected "start" to have value >=0`);
    }
    if (this.config.simulateErrors && end < 0) {
      throw new Error(`Error: Expected "end" to have value >=0`);
    }
    if (this.config.simulateErrors && end > this._characters.length) {
      throw new Error(
        `Error: Cannot delete characters at index greater than the length of the text`
      );
    }
    this._characters =
      this._characters.slice(start, end) +
      (end === this._characters.length ? "" : this._characters.slice(end + 1));
  }
  insertCharacters(
    start: number,
    characters: string,
    _useStyle: "BEFORE" | "AFTER" = "BEFORE"
  ): void {
    if (this.config.simulateErrors && !Fonts.isFontLoaded(this.fontName)) {
      throw new Error(
        `Error: font is not loaded ${this.fontName.family} ${this.fontName.style}`
      );
    }
    if (this.config.simulateErrors && start < 0) {
      throw new Error(`Error: Expected "start" to have value >=0`);
    }
    if (this.config.simulateErrors && start > this._characters.length) {
      throw new Error(
        `Error: Cannot insert characters at index greater than the length of the text`
      );
    }
    this._characters = [
      this._characters.slice(0, start),
      characters,
      this._characters.slice(start)
    ].join("");
  }
}

export class TextSublayerNode {
  readonly hasMissingFont;
  paragraphIndent: number;
  paragraphSpacing: number;
  fontSize: number | PluginAPI["mixed"];
  textCase: TextCase | PluginAPI["mixed"];
  textDecoration: TextDecoration | PluginAPI["mixed"];
  letterSpacing: LetterSpacing | PluginAPI["mixed"];
  hyperlink: HyperlinkTarget | null | PluginAPI["mixed"];

  private _fontName: FontName;
  private _characters: string;

  get fontName() {
    return this._fontName || { family: "Roboto", style: "Regular" };
  }
  set fontName(fontName) {
    if (this.config.simulateErrors && !fontName) {
      throw new Error(`Error: fontName is undefined`);
    }
    this._fontName = fontName;
  }
  get characters() {
    return this._characters || "";
  }
  set characters(characters) {
    if (this.config.simulateErrors && !Fonts.isFontLoaded(this.fontName)) {
      throw new Error(
        `Error: font is not loaded ${this.fontName.family} ${this.fontName.style}`
      );
    }
    this._characters = characters;
  }

  constructor(private config: TConfig) {}

  insertCharacters(
    start: number,
    characters: string,
    _useStyle: "BEFORE" | "AFTER" = "BEFORE"
  ): void {
    if (this.config.simulateErrors && !Fonts.isFontLoaded(this._fontName)) {
      throw new Error(
        `Error: font is not loaded ${(this._fontName as FontName).family} ${
          (this._fontName as FontName).style
        }`
      );
    }
    if (this.config.simulateErrors && start < 0) {
      throw new Error(`Error: Expected "start" to have value >=0`);
    }
    if (this.config.simulateErrors && start > this._characters.length) {
      throw new Error(
        `Error: Cannot insert characters at index greater than the length of the text`
      );
    }
    this._characters = [
      this._characters.slice(0, start),
      characters,
      this._characters.slice(start)
    ].join("");
  }

  deleteCharacters(start: number, end: number): void {
    if (this.config.simulateErrors && !Fonts.isFontLoaded(this._fontName)) {
      throw new Error(
        `Error: font is not loaded ${(this._fontName as FontName).family} ${
          (this._fontName as FontName).style
        }`
      );
    }
    if (this.config.simulateErrors && start < 0) {
      throw new Error(`Error: Expected "start" to have value >=0`);
    }
    if (this.config.simulateErrors && end < 0) {
      throw new Error(`Error: Expected "end" to have value >=0`);
    }
    if (this.config.simulateErrors && end > this._characters.length) {
      throw new Error(
        `Error: Cannot delete characters at index greater than the length of the text`
      );
    }
    this._characters =
      this._characters.slice(start, end) +
      (end === this._characters.length ? "" : this._characters.slice(end + 1));
  }

  getRangeFontName(start: number, end: number): FontName | PluginAPI["mixed"] {
    if (this.config.simulateErrors && start < 0) {
      throw new Error(`Error: Expected "start" to have value >=0`);
    }
    if (this.config.simulateErrors && end < 0) {
      throw new Error(`Error: Expected "end" to have value >=0`);
    }
    if (this.config.simulateErrors && end > this._characters.length) {
      throw new Error(
        `Error: Range outside of available characters. 'start' must be less than node.characters.length and 'end' must be less than or equal to node.characters.length`
      );
    }
    if (this.config.simulateErrors && end === start) {
      throw new Error(
        `Error: Empty range selected. 'end' must be greater than 'start'`
      );
    }
    return this._fontName || { family: "Roboto", style: "Regular" };
  }
}

export class ShapeWithTextNodeStub {
  type = "SHAPE_WITH_TEXT";
  private _text: TextSublayerNode;
  private _cornerRadius = 50;
  shapeType:
    | "SQUARE"
    | "ELLIPSE"
    | "ROUNDED_RECTANGLE"
    | "DIAMOND"
    | "TRIANGLE_UP"
    | "TRIANGLE_DOWN"
    | "PARALLELOGRAM_RIGHT"
    | "PARALLELOGRAM_LEFT"
    | "ENG_DATABASE"
    | "ENG_QUEUE"
    | "ENG_FILE"
    | "ENG_FOLDER" = "ELLIPSE";
  rotation = 0;

  constructor(private config: TConfig) {
    this._text = new TextSublayerNode(this.config);
  }

  get text() {
    return this._text;
  }

  get cornerRadius() {
    return this._cornerRadius;
  }
}

export class StickyNodeStub {
  type = "STICKY";
  private _text: TextSublayerNode;
  authorVisible = true;
  authorName = "";

  constructor(private config: TConfig) {
    this._text = new TextSublayerNode(this.config);
  }

  get text() {
    return this._text;
  }
}

export class ConnectorNodeStub {
  type = "CONNECTOR";
  private _text: TextSublayerNode;
  private _textBackground;
  private _cornerRadius;

  connectorLineType: "ELBOWED" | "STRAIGHT";

  connectorStart;
  connectorEnd;
  connectorStartStrokeCap;
  connectorEndStrokeCap;

  constructor(private config: TConfig) {
    this._text = new TextSublayerNode(config);
  }

  get cornerRadius() {
    return this._cornerRadius;
  }

  get textBackground() {
    return this._textBackground;
  }

  get text() {
    return this._text;
  }
}

export class DocumentNodeStub {
  type = "DOCUMENT";
  children = [];

  constructor(private config: TConfig) {}
}

export class PageNodeStub {
  type = "PAGE";
  children = [];
  _selection: Array<SceneNode>;

  constructor(private config: TConfig) {}

  get selection() {
    return this._selection || [];
  }

  set selection(value) {
    this._selection = value;
    selectionChangeSubject.next();
  }
}

export class FrameNodeStub {
  type = "FRAME";
  children = [];

  constructor(private config: TConfig) {}
}

export class GroupNodeStub {
  constructor(private config: TConfig) {}

  type = "GROUP";

  set constraints(value) {
    if (this.config.simulateErrors) {
      throw new Error(
        `Error: Cannot add property constraints, object is not extensible`
      );
    }
  }
}

export class BooleanOperationNodeStub {
  constructor(private config: TConfig) {}

  type = "BOOLEAN_OPERATION";

  booleanOperation: "UNION" | "INTERSECT" | "SUBTRACT" | "EXCLUDE";
  expand = false;
}

export class ComponentNodeStub {
  constructor(private config: TConfig) {}

  type = "COMPONENT";
  key = nanoid(40);
  children = [];
  createInstance() {
    const instance = new InstanceNodeStub(this.config);
    instance.children = cloneDeep(this.children);
    instance.mainComponent = this;
    return instance;
  }
}

export class InstanceNodeStub {
  constructor(private config: TConfig) {}

  type = "INSTANCE";
  children: any;
  mainComponent: null | ComponentNodeStub;

  detachInstance(): void {
    this.type = "FRAME";
  }
}
