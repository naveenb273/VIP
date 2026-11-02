import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

export type SortMode = 'recent' | 'liked' | 'collaborated';
export type SortDirection = 'asc' | 'desc' | null;

@Component({
  selector: 'app-ideas-sort-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ideas-sort-section.component.html',
  styleUrls: ['./ideas-sort-section.component.scss']
})
export class IdeasSortSectionComponent {
  @Input({ required: true }) sort: SortMode = 'recent';
  @Input() sortDirection: SortDirection = null;

  @Output() sortChange = new EventEmitter<SortMode>();

  setSort(mode: SortMode): void {
    this.sortChange.emit(mode);
  }

  orderIcon(mode: SortMode): string {
    if (this.sort !== mode || this.sortDirection === null) {
      return '';
    }

    return this.sortDirection === 'asc' ? '↑' : '↓';
  }
}
