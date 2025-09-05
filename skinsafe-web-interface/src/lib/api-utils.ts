import { error } from "console";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export type ApiResponse<T> = {
  success: boolean,
  data?: T,
  error?: {
    message: string;
    code?: number;
    details?: any;
  },
  pagination?: {
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
  }
}

export function successResponse<T>(data: T, pagination?: ApiResponse<T>['pagination']) : NextResponse {
  const response : ApiResponse<T> = {
    success: true,
    data
  }

  if (pagination) {
    response.pagination = pagination;
  }

  return NextResponse.json(response);
}

export function errorResponse(message = "Internal Server Error", code?: number, details?: any) : NextResponse {
  const response : ApiResponse<null> = {
    success: false,
    error: {
      message,
      code,
      ...(details ? { details } : {})
    }
  }

  return NextResponse.json(response);
}

export const asyncHandler = (fn: (req: NextRequest) => Promise<NextResponse>) => 
  async (req: NextRequest, context: any): Promise<NextResponse> => {
    try {
      return await fn(req);
    } catch (err: any) {
      if (err.name === 'ValidationError') {
        return errorResponse("Validation Error", 400, err);
      }

      if (err.code === 1000) {
        return errorResponse("Duplicate data error", 400, err);
      }

      return errorResponse(err.message || "Internal Server Error", 500, err);
    }
};