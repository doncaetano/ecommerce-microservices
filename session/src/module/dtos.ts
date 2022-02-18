export interface ISessionDTO {
  id: string;
  createdAt: string;
}

export interface IGetSessionDTO {
  id: string;
}

export interface IGetSessionOpenCartDTO {
  sessionId: string;
}

export interface ICartAPI {
  getSessionOpenCart: (
    getSessionOpenCartDTO: IGetSessionOpenCartDTO
  ) => Promise<string | undefined>;
}

export interface ISessionRepo {
  createSession: () => Promise<ISessionDTO | undefined>;
  getSession: (
    getSessionDTO: IGetSessionDTO
  ) => Promise<ISessionDTO | undefined>;
}
