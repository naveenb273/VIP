import {
  Component, Input, Output, EventEmitter, ElementRef, ViewChild,
  HostListener, OnDestroy, ChangeDetectionStrategy, signal
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../shared/icon/icon.component';

/**
 * CoverPositionerComponent
 * Renders a fixed-height preview of a cover image and lets the user
 * drag it to choose the focal point (stored as CSS object-position).
 *
 * Inputs:
 *   src          — base64 or URL string
 *   position     — current CSS object-position, e.g. "50% 30%"
 * Outputs:
 *   positionChange — emits the new CSS string whenever user drags
 *   remove         — emits void when user clicks ✕
 */
@Component({
  selector: 'app-cover-positioner',
  standalone: true,
  imports: [CommonModule, IconComponent],
  templateUrl: './cover-positioner.component.html',
  styleUrls: ['./cover-positioner.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CoverPositionerComponent implements OnDestroy {
  @Input()  src      = '';
  @Input()  position = '50% 50%';
  @Output() positionChange = new EventEmitter<string>();
  @Output() remove         = new EventEmitter<void>();

  @ViewChild('frame') frameRef!: ElementRef<HTMLDivElement>;

  dragging   = signal(false);
  showHint   = signal(true);

  // ── parse/stringify helpers ───────────────────────────────────────────
  get posX(): number { return parseInt(this.position.split(' ')[0]) || 50; }
  get posY(): number { return parseInt(this.position.split(' ')[1]) || 50; }

  private clamp(v: number) { return Math.max(0, Math.min(100, v)); }
  private emit(x: number, y: number) {
    this.positionChange.emit(`${this.clamp(x)}% ${this.clamp(y)}%`);
  }

  // ── drag handling (mouse + touch) ─────────────────────────────────────
  onPointerDown(e: PointerEvent): void {
    e.preventDefault();
    this.dragging.set(true);
    this.showHint.set(false);
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    this.updateFromEvent(e);
  }

  onPointerMove(e: PointerEvent): void {
    if (!this.dragging()) return;
    e.preventDefault();
    this.updateFromEvent(e);
  }

  onPointerUp(e: PointerEvent): void {
    this.dragging.set(false);
  }

  private updateFromEvent(e: PointerEvent): void {
    const rect = this.frameRef.nativeElement.getBoundingClientRect();
    const x = this.clamp(Math.round(((e.clientX - rect.left) / rect.width)  * 100));
    const y = this.clamp(Math.round(((e.clientY - rect.top)  / rect.height) * 100));
    this.emit(x, y);
  }

  ngOnDestroy(): void {}
}
