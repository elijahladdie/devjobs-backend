import { Response } from 'express';

interface ApiResponse {
  resp_code: number;
  resp_msg: string;
  data?: any;
}

export const responseSuccess = (res: Response, status_code: number, message: string, data?: any): Response<ApiResponse> => {
  return res.status(200).json({
    resp_code: status_code,
    resp_msg: message,
    data,
  });
};

export const responseError = (res: Response, status_code: number, error: string, data?: any): Response<ApiResponse> => {
  return res.status(200).json({
    resp_code: status_code,
    resp_msg: error,
    data,
  });
};

export const responseServerError = (res: Response, error: string): Response<ApiResponse> => {
  return res.status(500).json({
    resp_code: 999,
    resp_msg: `There is a problem with the server!: ${error}`,
  });
};