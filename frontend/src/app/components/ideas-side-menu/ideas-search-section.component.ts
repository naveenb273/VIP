import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-ideas-search-section',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ideas-search-section.component.html',
  styleUrls: ['./ideas-search-section.component.scss']
})
export class IdeasSearchSectionComponent {
  @Input({ required: true }) search = '';
  @Output() searchChange = new EventEmitter<string>();

  onSearchChange(value: string): void {
    this.searchChange.emit(value);
  }

  clearSearch(): void {
    this.searchChange.emit('');
  }
}
