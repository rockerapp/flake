export default class FlakeId {
    constructor({ seq = 0, mid = 1, timeOffset = 0, lastTime = 0 } = {}) {
        this.seq = seq;
        this.mid = mid % 1023;
        this.timeOffset = timeOffset;
        this.lastTime = lastTime;
    }
    gen() {
        const time = Date.now(), bTime = (time - this.timeOffset).toString(2);
        // get the sequence number
        if (this.lastTime == time) {
            this.seq += 1;
            if (this.seq > 4095) {
                this.seq = 0;
                // make system wait till time is been shifted by one millisecond
                while (Date.now() <= time) { }
            }
        }
        else {
            this.seq = 0;
        }
        this.lastTime = time;
        // make sure sequence length will be constant
        const bSeq = this.seq.toString(2).padStart(12, "0");
        const bMid = this.mid.toString(2).padStart(10, "0");
        const bid = bTime + bMid + bSeq;
        let id = "";
        for (let i = bid.length; i > 0; i -= 4) {
            id = parseInt(bid.substring(i - 4, i), 2).toString(16) + id;
        }
        return BigInt(`0x${id}`);
    }
}
//# sourceMappingURL=index.js.map