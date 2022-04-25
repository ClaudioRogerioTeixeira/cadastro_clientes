import { Optional, SkipSelf } from "@angular/core";
import { MatPaginatorIntl } from "@angular/material/paginator";

export class MatPaginatorIntlPtBr extends MatPaginatorIntl {

  /** A label for the page size selector. */
  itemsPerPageLabel: string = 'Itens por página:'; // 'Items per page:';

  /** A label for the button that increments the current page. */
  nextPageLabel: string = 'Avançar'; // 'Next page';

  /** A label for the button that decrements the current page. */
  previousPageLabel: string = 'Voltar'; // 'Previous page';

  /** A label for the button that moves to the first page. */
  firstPageLabel: string = 'Primeira página'; // 'First page';

  /** A label for the button that moves to the last page. */
  lastPageLabel: string = 'Última página'; // 'Last page';

  /** A label for the range of items within the current page and the length of the whole list. */
  getRangeLabel: (page: number, pageSize: number, length: number) => string = (
    page: number,
    pageSize: number,
    length: number,
  ) => {
    if (length == 0 || pageSize == 0) {
      return `0 of ${length}`;
    }

    length = Math.max(length, 0);

    const startIndex = page * pageSize;

    // If the start index exceeds the list length, do not try and fix the end index to the end.
    const endIndex =
      startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;

    return `${startIndex + 1} – ${endIndex} de ${length}`; //  `${startIndex + 1} – ${endIndex} of ${length}`;
  };
}


/** @docs-private */
export function MAT_PAGINATOR_INTL_PROVIDER_FACTORY(parentIntl: MatPaginatorIntl) {
  return parentIntl || new MatPaginatorIntl();
}

/** @docs-private */
export const MAT_PAGINATOR_INTL_PROVIDER = {
  // If there is already an MatPaginatorIntl available, use that. Otherwise, provide a new one.
  provide: MatPaginatorIntl,
  deps: [[new Optional(), new SkipSelf(), MatPaginatorIntl]],
  useFactory: MAT_PAGINATOR_INTL_PROVIDER_FACTORY,
};
