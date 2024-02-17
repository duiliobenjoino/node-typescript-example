import { NextFunction, Request, Response } from "express";
import { CustomError } from "../errors/CustomError";

export const errorHandler = async (err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err);
    if(err instanceof CustomError) {
      return res.status(err.statusCode)
                .send(err.getBody());
    }
    return res.status(500).json({
        error: `Internal server error - ${err}`,
    });
    
};