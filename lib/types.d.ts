export declare type AtlasTypeFrameFrame = {
    w: number;
    h: number;
    x: number;
    y: number;
};
export declare type AtlasTypeFrame = {
    filename: string;
    frame: AtlasTypeFrameFrame;
    anchor?: {
        x: number;
        y: number;
    };
};
export declare type AtlasType = {
    frames: AtlasTypeFrame[];
};
export declare type AnimationTypeAnimsFrame = {
    key: string;
    frame: string;
};
export declare type AnimationTypeAnims = {
    key: string;
    type: string;
    repeat: number;
    frameRate: number;
    frames: AnimationTypeAnimsFrame[];
};
export declare type AnimationType = {
    anims: AnimationTypeAnims[];
};
export declare type ObjectPosition = {
    x: number;
    y: number;
};
export declare type ObjectSize = {
    w: number;
    h: number;
};
