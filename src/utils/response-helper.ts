
export class OkResponse<T> {
  public success = true;
    constructor(public data: T) {}
 
  toJson() {
    return {
      success: true,
      data: this.data,
    };
  }
}
export class OkResponseWithPagination<T> {
    public success = true;
    constructor(public data: T[], public hasNextPage: boolean) {}
    
    toJson() {
        return {
        success: true,
        data: this.data,
        hasNextPage: this.hasNextPage,
        };
    }
}
export class ErrorResponse {
    public success = false;
  constructor(public message: string, public statusCode: number) {}

  toJson() {
    return {
      success: false,
      message: this.message,
      statusCode: this.statusCode,
    };
  }
}

export type Response<T> = OkResponse<T> | ErrorResponse;
export type ResponseWithPagination<T> = OkResponseWithPagination<T> | ErrorResponse;