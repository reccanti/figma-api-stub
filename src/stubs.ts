import { nanoid } from "nanoid";
import { Subject, Subscription } from "rxjs";
import { take } from "rxjs/operators";
import {
  getEffectStyleStub,
  getGridStyleStub,
  getPaintStyleStub,
  getTextStyleStub
} from "./styleStubs";
import { applyMixins } from "./applyMixins";
import {
  BooleanOperationNodeStub,
  ComponentNodeStub,
  ConnectorNodeStub,
  DocumentNodeStub,
  FrameNodeStub,
  GroupNodeStub,
  InstanceNodeStub,
  PageNodeStub,
  RectangleNodeStub,
  selectionChangeSubject,
  ShapeWithTextNodeStub,
  StickyNodeStub,
  TextNodeStub
} from "./componentStubs";
import { defaultConfig, TConfig } from "./config";
import { Fonts, Helvetica, Roboto } from "./fonts";
import {
  ExportMixinStub,
  GeometryMixinStub,
  getBaseNodeMixinStub,
  getChildrenMixinStub,
  getLayoutMixinStub
} from "./mixins";

export const createFigma = (paramConfig: TConfig): PluginAPI => {
  const config = { ...defaultConfig, ...paramConfig };
  const BaseNodeMixinStub = getBaseNodeMixinStub(config);
  const LayoutMixinStub = getLayoutMixinStub(config);
  const ChildrenMixinStub = getChildrenMixinStub(config);

  applyMixins(RectangleNodeStub, [
    BaseNodeMixinStub,
    LayoutMixinStub,
    ExportMixinStub,
    GeometryMixinStub
  ]);

  applyMixins(TextNodeStub, [
    BaseNodeMixinStub,
    LayoutMixinStub,
    ExportMixinStub,
    GeometryMixinStub
  ]);

  applyMixins(ShapeWithTextNodeStub, [
    BaseNodeMixinStub,
    LayoutMixinStub,
    ExportMixinStub,
    GeometryMixinStub
  ]);

  applyMixins(StickyNodeStub, [
    BaseNodeMixinStub,
    LayoutMixinStub,
    ExportMixinStub,
    GeometryMixinStub
  ]);

  applyMixins(ConnectorNodeStub, [
    BaseNodeMixinStub,
    LayoutMixinStub,
    ExportMixinStub,
    GeometryMixinStub
  ]);

  applyMixins(DocumentNodeStub, [BaseNodeMixinStub, ChildrenMixinStub]);

  applyMixins(PageNodeStub, [
    BaseNodeMixinStub,
    ChildrenMixinStub,
    ExportMixinStub
  ]);

  applyMixins(FrameNodeStub, [
    BaseNodeMixinStub,
    ChildrenMixinStub,
    LayoutMixinStub,
    ExportMixinStub,
    GeometryMixinStub
  ]);

  applyMixins(GroupNodeStub, [
    BaseNodeMixinStub,
    ChildrenMixinStub,
    ExportMixinStub,
    LayoutMixinStub
  ]);

  applyMixins(BooleanOperationNodeStub, [
    BaseNodeMixinStub,
    ChildrenMixinStub,
    ExportMixinStub,
    LayoutMixinStub
  ]);

  applyMixins(ComponentNodeStub, [
    BaseNodeMixinStub,
    ChildrenMixinStub,
    ExportMixinStub,
    LayoutMixinStub,
    GeometryMixinStub
  ]);

  applyMixins(InstanceNodeStub, [
    BaseNodeMixinStub,
    ExportMixinStub,
    LayoutMixinStub
  ]);

  const selectionChangeSubscribes = new Map<Function, Subscription>();

  const currentPageChangeSubject = new Subject();
  const currentPageChangeSubscribes = new Map<Function, Subscription>();

  let majorId = 1;
  let minorId = 1;
  const allocateNodeId = (node, shouldIncreaseMajor?: boolean) => {
    minorId += 1;
    if (!shouldIncreaseMajor) {
      node.id = `${majorId}:${minorId}`;
    } else {
      node.id = `${majorId}:${1}`;
      majorId += 1;
    }
  };

  const allocateStyleId = style => {
    style.id = `S:${nanoid(40)},`;
  };

  const getImageHash = () => {
    return nanoid(40);
  };

  class UIAPIStub {
    onmessage: MessageEventHandler | undefined;

    postMessage(pluginMessage: any, options?: UIPostMessageOptions): void {
      const message = {
        data: { pluginMessage, pluginId: "000000000000000000" },
        type: "message"
      };

      // @ts-ignore
      if (global && global.onmessage) {
        if (config.isWithoutTimeout) {
          // @ts-ignore
          global.onmessage(message);
        } else {
          setTimeout(() => {
            // @ts-ignore
            global.onmessage(message);
          }, 0);
        }
      }
    }
  }

  // --- styles

  const PaintStyleStub = getPaintStyleStub(config);
  const EffectStyleStub = getEffectStyleStub(config);
  const TextStyleStub = getTextStyleStub(config);
  const GridStyleStub = getGridStyleStub(config);

  const styleBasics: {
    styles: Map<string, BaseStyle>;
    paintStyles: any[];
    effectStyles: any[];
    textStyles: any[];
    gridStyles: any[];
  } = {
    styles: new Map<string, BaseStyle>(),
    paintStyles: [],
    effectStyles: [],
    textStyles: [],
    gridStyles: []
  };

  // @ts-ignore
  class PluginApiStub implements PluginAPI {
    root: DocumentNode;
    _currentPage: PageNode;
    readonly ui: UIAPI;

    constructor() {
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

    get currentPage() {
      return this._currentPage;
    }

    set currentPage(value) {
      this._currentPage = value;
      currentPageChangeSubject.next();
    }

    // @ts-ignore
    createPage() {
      const result: any = new PageNodeStub(config);
      allocateNodeId(result, true);
      this.root.appendChild(result);
      return result;
    }

    // @ts-ignore
    createFrame() {
      const result: any = new FrameNodeStub(config);
      allocateNodeId(result);
      this.currentPage.appendChild(result);
      return result;
    }

    // @ts-ignore
    createShapeWithText() {
      const result: any = new ShapeWithTextNodeStub(config);
      allocateNodeId(result);
      this.root.appendChild(result);
      return result;
    }

    // @ts-ignore
    createSticky() {
      const result: any = new StickyNodeStub(config);
      allocateNodeId(result);
      this.root.appendChild(result);
      return result;
    }

    // @ts-ignore
    createComponent() {
      const result: any = new ComponentNodeStub(config);
      allocateNodeId(result);
      this.currentPage.appendChild(result);
      return result;
    }

    // @ts-ignore
    createRectangle() {
      const result: any = new RectangleNodeStub(config);
      allocateNodeId(result);
      this.currentPage.appendChild(result);
      return result;
    }

    // @ts-ignore
    createText() {
      const result: any = new TextNodeStub(config);
      allocateNodeId(result);
      this.currentPage.appendChild(result);
      return result;
    }

    createConnector() {
      const result: any = new ConnectorNodeStub(config);
      allocateNodeId(result);
      this.currentPage.appendChild(result);
      return result;
    }

    getStyleById(id) {
      if (styleBasics.styles.has(id)) {
        return styleBasics.styles.get(id);
      }

      return null;
    }

    getLocalPaintStyles() {
      return styleBasics.paintStyles;
    }

    getLocalEffectStyles() {
      return styleBasics.effectStyles;
    }

    getLocalTextStyles() {
      return styleBasics.textStyles;
    }

    getLocalGridStyles() {
      return styleBasics.gridStyles;
    }

    // @ts-ignore
    createPaintStyle() {
      const style = new PaintStyleStub(styleBasics);
      allocateStyleId(style);
      styleBasics.styles.set(style.id, style);
      styleBasics.paintStyles.push(style);
      return style;
    }

    // @ts-ignore
    createEffectStyle() {
      const style = new EffectStyleStub(styleBasics);
      allocateStyleId(style);
      styleBasics.styles.set(style.id, style);
      styleBasics.effectStyles.push(style);
      return style;
    }

    // @ts-ignore
    createTextStyle() {
      const style = new TextStyleStub(styleBasics);
      allocateStyleId(style);
      styleBasics.styles.set(style.id, style);
      styleBasics.textStyles.push(style);
      return style;
    }

    // @ts-ignore
    createGridStyle() {
      const style = new GridStyleStub(styleBasics);
      allocateStyleId(style);
      styleBasics.styles.set(style.id, style);
      styleBasics.gridStyles.push(style);
      return style;
    }

    createImage(bytes: Uint8Array) {
      const hash = getImageHash();
      return {
        hash,
        getBytesAsync: () => Promise.resolve(bytes)
      };
    }

    union(
      nodes: readonly BaseNode[],
      parent: BaseNode & ChildrenMixin,
      index?: number
    ): BooleanOperationNode {
      const booleanOperation = this.booleanOperate(nodes, parent, index);
      booleanOperation.booleanOperation = "UNION";
      return booleanOperation as any;
    }

    intersect(
      nodes: readonly BaseNode[],
      parent: BaseNode & ChildrenMixin,
      index?: number
    ): BooleanOperationNode {
      const booleanOperation = this.booleanOperate(nodes, parent, index);
      booleanOperation.booleanOperation = "INTERSECT";
      return booleanOperation as any;
    }

    subtract(
      nodes: readonly BaseNode[],
      parent: BaseNode & ChildrenMixin,
      index?: number
    ): BooleanOperationNode {
      const booleanOperation = this.booleanOperate(nodes, parent, index);
      booleanOperation.booleanOperation = "SUBTRACT";
      return booleanOperation as any;
    }

    exlude(
      nodes: readonly BaseNode[],
      parent: BaseNode & ChildrenMixin,
      index?: number
    ): BooleanOperationNode {
      const booleanOperation = this.booleanOperate(nodes, parent, index);
      booleanOperation.booleanOperation = "EXCLUDE";
      return booleanOperation as any;
    }

    private booleanOperate(
      nodes: readonly BaseNode[],
      parent: BaseNode & ChildrenMixin,
      index?: number
    ): BooleanOperationNodeStub {
      if (config.simulateErrors && (!nodes || nodes.length === 0)) {
        throw new Error(
          "Error: First argument must be an array of at least one node"
        );
      }

      const booleanOperation: any = new BooleanOperationNodeStub(config);
      allocateNodeId(booleanOperation);
      nodes.forEach(node => booleanOperation.appendChild(node));
      if (index) {
        parent.insertChild(index, booleanOperation);
      } else {
        parent.appendChild(booleanOperation);
      }
      booleanOperation.parent = parent;

      return booleanOperation;
    }

    // @ts-ignore
    group(nodes: any, parent: any, index) {
      if (config.simulateErrors && (!nodes || nodes.length === 0)) {
        throw new Error(
          "Error: First argument must be an array of at least one node"
        );
      }

      const group: any = new GroupNodeStub(config);
      allocateNodeId(group);
      nodes.forEach(node => group.appendChild(node));
      if (index) {
        parent.insertChild(index, group);
      } else {
        parent.appendChild(group);
      }
      group.parent = parent;
      return group;
    }
    // @ts-ignore
    loadFontAsync(fontName) {
      if (Fonts.isFontLoaded(fontName)) {
        return;
      }
      return new Promise<void>(resolve => {
        Fonts.loadedFonts.push(fontName);
        resolve();
      });
    }

    listAvailableFontsAsync(): Promise<Font[]> {
      return Promise.resolve([...Roboto, ...Helvetica]);
    }

    on(type: ArgFreeEventType, callback: () => void);
    on(type: "run", callback: (event: RunEvent) => void);
    on(type: "drop", callback: (event: DropEvent) => boolean): void;
    on(type: any, callback: any) {
      if (type === "selectionchange") {
        selectionChangeSubscribes.set(
          callback,
          selectionChangeSubject.subscribe(callback)
        );
      }
      if (type === "currentpagechange") {
        currentPageChangeSubscribes.set(
          callback,
          currentPageChangeSubject.subscribe(callback)
        );
      }
    }

    once(type: ArgFreeEventType, callback: () => void);
    once(type: "run", callback: (event: RunEvent) => void);
    once(type: "drop", callback: (event: DropEvent) => boolean): void;
    once(type: any, callback: any) {
      if (type === "selectionchange") {
        selectionChangeSubscribes.set(
          callback,
          selectionChangeSubject.pipe(take(1)).subscribe(callback)
        );
      }
      if (type === "currentpagechange") {
        currentPageChangeSubscribes.set(
          callback,
          currentPageChangeSubject.pipe(take(1)).subscribe(callback)
        );
      }
    }

    off(type: ArgFreeEventType, callback: () => void);
    off(type: "run", callback: (event: RunEvent) => void);
    off(type: "drop", callback: (event: DropEvent) => boolean): void;
    off(type: any, callback: any) {
      if (type === "selectionchange") {
        selectionChangeSubscribes.get(callback).unsubscribe();
      }
      if (type === "currentpagechange") {
        currentPageChangeSubscribes.get(callback).unsubscribe();
      }
    }

    getNodeById(id) {
      const _genNodeById = (nodes, id) => {
        for (const node of nodes) {
          if (node.id === id) {
            return node;
          }
          const childMatch = node.children && _genNodeById(node.children, id);
          if (childMatch) {
            return childMatch;
          }
        }
      };
      return _genNodeById([figma.root], id) || null;
    }
  }

  // @ts-ignore
  return new PluginApiStub();
};

export const createParentPostMessage = (
  figma: PluginAPI,
  isWithoutTimeout?: boolean
) => (message: { pluginMessage: any }, target: string) => {
  if (figma.ui.onmessage) {
    const call = () => {
      // @ts-ignore
      figma.ui.onmessage(message.pluginMessage, { origin: null });
    };
    if (isWithoutTimeout) {
      call();
    } else {
      setTimeout(call, 0);
    }
  }
};
