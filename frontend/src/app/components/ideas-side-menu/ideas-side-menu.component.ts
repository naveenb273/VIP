import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IdeasSearchSectionComponent } from './ideas-search-section.component';
import { IdeasSortSectionComponent, SortMode, SortDirection } from './ideas-sort-section.component';
import { IdeasFiltersSectionComponent } from './ideas-filters-section.component';

export type { SortMode, SortDirection } from './ideas-sort-section.component';

@Component({
  selector: 'app-ideas-side-menu',
  standalone: true,
  imports: [IdeasSearchSectionComponent, IdeasSortSectionComponent, IdeasFiltersSectionComponent],
  templateUrl: './ideas-side-menu.component.html',
  styleUrls: ['./ideas-side-menu.component.scss']
})
export class IdeasSideMenuComponent {
  @Input({ required: true }) search = '';
  @Input({ required: true }) sort: SortMode = 'recent';
  @Input() sortDirection: SortDirection = null;
  @Input() tagFilter = '';
  @Input() emailFilter = '';

  @Output() searchChange = new EventEmitter<string>();
  @Output() sortChange = new EventEmitter<SortMode>();
  @Output() tagFilterChange = new EventEmitter<string>();
  @Output() emailFilterChange = new EventEmitter<string>();

  setSort(mode: SortMode): void {
    this.sortChange.emit(mode);
  }

  onSearchChange(value: string): void {
    this.searchChange.emit(value);
  }

  onTagFilterChange(value: string): void {
    this.tagFilterChange.emit(value);
  }

  onEmailFilterChange(value: string): void {
    this.emailFilterChange.emit(value);
  }
}
