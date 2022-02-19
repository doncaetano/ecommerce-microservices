interface ICreateRequestErrorDTO {
  status: number;
  message: string;
  code: string;
}

interface IRequestErrorResponseDTO {
  status: number;
  body: { error: { code: number | string; message: string } };
}

export class RequestError {
  private status: number;

  private message: string;

  private code: string;

  constructor({ status, message, code }: ICreateRequestErrorDTO) {
    this.status = status;
    this.message = message;
    this.code = code;
  }

  response(): IRequestErrorResponseDTO {
    return {
      status: this.status,
      body: {
        error: { code: this.code, message: this.message },
      },
    };
  }
}

export default RequestError;
