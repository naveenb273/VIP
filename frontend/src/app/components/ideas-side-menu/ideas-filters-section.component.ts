import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-ideas-filters-section',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ideas-filters-section.component.html',
  styleUrls: ['./ideas-filters-section.component.scss']
})
export class IdeasFiltersSectionComponent {
  @Input() tagFilter = '';
  @Input() emailFilter = '';

  @Output() tagFilterChange = new EventEmitter<string>();
  @Output() emailFilterChange = new EventEmitter<string>();

  onTagFilterChange(value: string): void {
    this.tagFilterChange.emit(value);
  }

  onEmailFilterChange(value: string): void {
    this.emailFilterChange.emit(value);
  }

  clearTagFilter(): void {
    this.tagFilterChange.emit('');
  }

  clearEmailFilter(): void {
    this.emailFilterChange.emit('');
  }
}
