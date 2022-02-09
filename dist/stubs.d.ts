/// <reference types="plugin-typings" />
declare type TConfig = {
    simulateErrors?: boolean;
    isWithoutTimeout?: boolean;
};
export declare const createFigma: (config: TConfig) => PluginAPI;
export declare const createParentPostMessage: (figma: PluginAPI, isWithoutTimeout?: boolean) => (message: {
    pluginMessage: any;
}, target: string) => void;
export {};
