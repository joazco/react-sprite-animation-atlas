/// <reference types="node" />
import { ObjectPosition, ObjectSize } from "./types";
export declare type AnimationReducerState = {
    loaded: boolean;
    imgLoaded: boolean;
    objectSize: ObjectSize;
    objectPosition: ObjectPosition;
    parentSize: ObjectSize;
};
export declare const animationDefaultState: AnimationReducerState;
export interface AnimationReducerActionData {
    x: number;
    y: number;
}
export interface AnimationReducerActionData {
    h: number;
    w: number;
}
export interface AnimationReducerActionData {
    timer: NodeJS.Timeout;
}
export declare type AnimationReducerActionType = keyof AnimationReducerState;
export declare type AnimationReducerAction = {
    type: AnimationReducerActionType;
    data?: AnimationReducerActionData;
};
declare const animationReducer: (state: AnimationReducerState, action: AnimationReducerAction) => AnimationReducerState;
export default animationReducer;
