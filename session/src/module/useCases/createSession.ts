import { Response, Request, NextFunction } from 'express';
import { ISessionRepo } from '../dtos';
import PostgresSessionRepo from '../repos/PostgresSessionRepo';

interface ICreateSessionResult {
  id: string;
  createdAt: string;
}

export const execute = async (
  repo: ISessionRepo
): Promise<ICreateSessionResult | undefined> => {
  return repo.createSession();
};

const handler = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const sessionRepo = new PostgresSessionRepo();
    const result = await execute(sessionRepo);

    response.status(201).json(result);
  } catch (err) {
    next(err);
  }
};

export default handler;
