export class PaginatedEventsDto<T> {
    data: T[];
    total: number;
    page: number;
    lastPage: number;
  
    constructor(data: T[], total: number, page: number, lastPage: number) {
      this.data = data;
      this.total = total;
      this.page = page;
      this.lastPage = lastPage;
    }
  }
  