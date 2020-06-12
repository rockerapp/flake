export interface FlakeOptions {
	/**
	 * Unique machine ID.
	 */
	nodeId?: number
	/**
	 * Time, in milliseconds, to subtract from current time during ID generation. Based on Unix epoch.
	 */
	timeOffset?: number
}

export default class Flake {
	private sequence: number = 0
	private lastTime: number = 0

	private nodeId: number = 1
	private timeOffset: number = 0

	constructor(options: FlakeOptions) {
		this.nodeId = (options.nodeId || this.nodeId) % 1023
		this.timeOffset = options.timeOffset || this.timeOffset
	}

	generateRaw(): BigInt {
		const nowTime = Date.now()
		const genTime = (nowTime - this.timeOffset).toString(2)

		// set sequence number
		// this prevents multiple IDs from being generated in 1ms
		if (this.lastTime === nowTime) {
			this.sequence += 1

			if (this.sequence > 4095) {
				this.sequence = 0

				// wait until time has incremented by a millisecond
				while (Date.now() <= nowTime) { }
			}
		} else {
			this.sequence = 0
		}

		this.lastTime = nowTime

		// make sure sequence length will be constant
		const genSequence = this.sequence.toString(2).padStart(12, "0")
		const genNode = this.nodeId.toString(2).padStart(10, "0")
		const rawId = genTime + genNode + genSequence

		let id = ""

		for (let i = rawId.length; i > 0; i -= 4) {
			id = parseInt(rawId.substring(i - 4, i), 2).toString(16) + id
		}

		return BigInt(`0x${id}`)
	}

	generate(): string {
		return `${this.generateRaw()}`
	}
}
