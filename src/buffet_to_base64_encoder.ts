import { Writable } from "stream";

export class BufferToBase64Encoder extends Writable {
    buffers: Array<Buffer> = [];

    constructor() {
        super();
    }

    _write(chunk: Buffer, encoding: string, next: (error?: Error) => void) {
        this.buffers.push(chunk)
        next();
    }

    public encodeBuffersToBase64() : string {
        return Buffer.concat(this.buffers).toString('base64');
    }
}
