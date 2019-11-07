export interface FlakeIDParams {
    seq?: number;
    mid?: number;
    timeOffset?: number;
    lastTime?: number;
}
export default class FlakeId {
    seq: number;
    mid: number;
    timeOffset: number;
    lastTime: number;
    constructor({ seq, mid, timeOffset, lastTime }?: FlakeIDParams);
    gen(): bigint;
}
//# sourceMappingURL=index.d.ts.map