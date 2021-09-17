import { Writable } from "stream";

export class AudioStringWritable extends Writable {
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
