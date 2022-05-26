export class Page<T> {
  pageSize: number;
  currentPage: number;
  totalPages: number;
  items: T[];

  setPageSize(pageSize) {
    this.pageSize = pageSize;
    return this;
  }

  setCurrentPage(currentPage) {
    this.currentPage = currentPage;
    return this;
  }

  setTotalPages(totalPages) {
    this.totalPages = totalPages;
    return this;
  }

  setItems(items) {
    this.items = items;
    return this;
  }
}
