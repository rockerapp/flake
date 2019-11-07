export interface FlakeIDParams {
  seq?: number,
  mid?: number,
  timeOffset?: number
  lastTime?: number
}
export default class FlakeId {
  public seq: number
  public mid: number
  public timeOffset: number
  public lastTime: number

  constructor({ seq = 0, mid = 1, timeOffset = 0, lastTime = 0 }: FlakeIDParams = {}) {
    this.seq = seq
    this.mid = mid % 1023;
    this.timeOffset = timeOffset;
    this.lastTime = lastTime;
  }

  gen() {
    const time = Date.now(),
    bTime = (time - this.timeOffset).toString(2);

    //get the sequence number
    if (this.lastTime == time) {
      this.seq += 1;

      if (this.seq > 4095) {
        this.seq = 0;

        //make system wait till time is been shifted by one millisecond
        while (Date.now() <= time) {}
      }
    } else {
      this.seq = 0;
    }

    this.lastTime = time;

    let bSeq = this.seq.toString(2),
        bMid = this.mid.toString(2);

    //create sequence binary bit
    while (bSeq.length < 12) bSeq = "0" + bSeq;

    while (bMid.length < 10) bMid = "0" + bMid;

    const bid = bTime + bMid + bSeq;
    let id = "";

    for (let i = bid.length; i > 0; i -= 4) {
      id = parseInt(bid.substring(i - 4, i), 2).toString(16) + id;
    }

    return BigInt(`0x${id}`);
  }
}