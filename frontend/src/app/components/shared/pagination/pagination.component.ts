import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-shared-pagination',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent {
  @Input({ required: true }) totalItems = 0;
  @Input({ required: true }) currentPage = 1;
  @Input({ required: true }) totalPages = 0;
  @Input({ required: true }) rangeStart = 0;
  @Input({ required: true }) rangeEnd = 0;
  @Input({ required: true }) pages: number[] = [];
  @Input() jumpPage: number | null = null;
  @Input() itemLabel = 'ideas';

  @Output() first = new EventEmitter<void>();
  @Output() prev = new EventEmitter<void>();
  @Output() next = new EventEmitter<void>();
  @Output() last = new EventEmitter<void>();
  @Output() pageSelect = new EventEmitter<number>();
  @Output() jumpPageChange = new EventEmitter<number | null>();
  @Output() jumpSubmit = new EventEmitter<void>();

  onJumpPageChange(value: number | null): void {
    this.jumpPageChange.emit(value);
  }
}
