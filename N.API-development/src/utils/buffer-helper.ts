export class BufferHelper {
  static async streamToBuffer(stream: NodeJS.ReadableStream): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      const buffers: Buffer[] = [];
      stream.on('data', (data) => buffers.push(data));
      stream.on('end', () => resolve(Buffer.concat(buffers)));
      stream.on('error', (error) => reject(error));
    });
  }
}
