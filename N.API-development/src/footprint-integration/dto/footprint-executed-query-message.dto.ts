export class FootprintExecutedQueryMessageDto {
  message: string;
  code: number;
  data: {
    state: string;
    execution_id: string;
  };

  constructor(data: FootprintExecutedQueryMessageDto) {
    this.message = data.message;
    this.code = data.code;
    this.data = data.data;
  }
}
