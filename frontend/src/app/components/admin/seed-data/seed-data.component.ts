import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../../shared/icon/icon.component';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../../services/auth.service';
import { PaginationComponent } from '../../shared/pagination/pagination.component';

/* ── Column definition ────────────────────────────────────────────────────── */
interface ColDef {
  key:     string;
  label:   string;
  visible: boolean;
  sortable:boolean;
  width:   string;
  render?: (val: any, row: any) => string;
}

type SortDir = 'asc' | 'desc' | 'none';

const PAGE_SIZES = [10, 25, 50, 100];

@Component({
  selector: 'app-seed-data',
  standalone: true,
  imports: [CommonModule, FormsModule, PaginationComponent, IconComponent],
  templateUrl: './seed-data.component.html',
  styleUrls: ['./seed-data.component.scss']
})
export class SeedDataComponent implements OnInit {
  private http = inject(HttpClient);
  auth         = inject(AuthService);

  /* ── State ──────────────────────────────────────────────────────────────── */
  rawData      = signal<any[]>([]);
  loading      = signal(false);
  uploading    = signal(false);
  clearing     = signal(false);
  error        = signal('');
  successMsg   = signal('');
  activeTab    = signal<'table' | 'json'>('table');
  showColChooser = signal(false);
  showClearConfirm = signal(false);

  searchQuery  = signal('');
  sortKey      = signal('audit.createdDate');
  sortDir      = signal<SortDir>('desc');
  pageSize     = signal(10);
  currentPage  = signal(1);
  jumpPage     = signal<number | null>(1);

  pageSizeOptions = PAGE_SIZES;

  /* ── Column definitions ──────────────────────────────────────────────────── */
  columns = signal<ColDef[]>([
    { key: 'id',          label: 'ID',            visible: false, sortable: true,  width: '160px' },
    { key: 'ideaInformation.title',         label: 'Title',         visible: true,  sortable: true,  width: '220px' },
    { key: 'authorInformation.name',        label: 'Author',        visible: true,  sortable: true,  width: '150px' },
    { key: 'audit.createdDate',             label: 'Date',          visible: true,  sortable: true,  width: '140px' },
    { key: 'ideaInformation.status',        label: 'Status',        visible: true,  sortable: true,  width: '90px'  },
    { key: 'engagement.likes',              label: 'Likes',         visible: true,  sortable: true,  width: '70px' },
    { key: 'engagement.shares',             label: 'Shares',        visible: true,  sortable: true,  width: '70px' },
    { key: 'ideaInformation.tags',          label: 'Tags',          visible: true,  sortable: false, width: '180px', render: (v) => Array.isArray(v) ? v.join(', ') : '' },
    { key: 'content.comments',              label: 'Comments',      visible: true,  sortable: true,  width: '90px',  render: (v) => String(Array.isArray(v) ? v.length : 0) },
    { key: 'collaboratorInformation.members',label:'Collaborators', visible: false, sortable: true,  width: '110px', render: (v) => String(Array.isArray(v) ? v.length : 0) },
    { key: 'authorInformation.email',       label: 'Author Email',  visible: false, sortable: false, width: '220px' },
    { key: 'ideaInformation.description',   label: 'Description',   visible: false, sortable: false, width: '260px', render: (v) => v?.length > 80 ? v.slice(0,77)+'…' : (v??'') },
  ]);

  visibleCols = computed(() => this.columns().filter(c => c.visible));

  /* ── Derived / filtered / sorted / paged data ────────────────────────────── */
  filtered = computed(() => {
    const q = this.searchQuery().toLowerCase().trim();
    const data = this.rawData();
    if (!q) return data;
    return data.filter(row =>
      ['ideaInformation.title','authorInformation.name','ideaInformation.description','ideaInformation.tags','ideaInformation.status','id','authorInformation.email'].some(k => {
        const v = this.valueAt(row, k);
        if (Array.isArray(v)) return v.join(' ').toLowerCase().includes(q);
        return String(v ?? '').toLowerCase().includes(q);
      })
    );
  });

  sorted = computed(() => {
    const rows = [...this.filtered()];
    const key  = this.sortKey();
    const dir  = this.sortDir();
    if (dir === 'none' || !key) return rows;
    return rows.sort((a, b) => {
      let av = this.cellVal(key, a);
      let bv = this.cellVal(key, b);
      // numeric
      const an = Number(av); const bn = Number(bv);
      if (!isNaN(an) && !isNaN(bn)) return dir === 'asc' ? an - bn : bn - an;
      // string
      const cmp = String(av).localeCompare(String(bv));
      return dir === 'asc' ? cmp : -cmp;
    });
  });

  totalPages = computed(() => Math.max(1, Math.ceil(this.sorted().length / this.pageSize())));

  paged = computed(() => {
    const start = (this.currentPage() - 1) * this.pageSize();
    return this.sorted().slice(start, start + this.pageSize());
  });

  visiblePages = computed(() => {
    const total = this.totalPages();
    if (total <= 0) {
      return [] as number[];
    }

    const page = Math.min(this.currentPage(), total);
    const windowSize = 5;
    const halfWindow = Math.floor(windowSize / 2);

    let start = Math.max(1, page - halfWindow);
    let end = Math.min(total, start + windowSize - 1);

    if (end - start + 1 < windowSize) {
      start = Math.max(1, end - windowSize + 1);
    }

    return Array.from({ length: end - start + 1 }, (_, idx) => start + idx);
  });

  /* ── Lifecycle ────────────────────────────────────────────────────────────── */
  ngOnInit(): void { this.loadData(); }

  /* ── Data fetching ────────────────────────────────────────────────────────── */
  loadData(): void {
    this.loading.set(true);
    this.error.set('');
    this.http.get<any>('/api/admin/seed').subscribe({
      next: (db) => {
        this.rawData.set(Array.isArray(db.ideas) ? db.ideas : []);
        this.loading.set(false);
        this.currentPage.set(1);
        this.jumpPage.set(1);
      },
      error: (e) => { this.error.set('Failed to load data: ' + e.message); this.loading.set(false); }
    });
  }

  /* ── Download ─────────────────────────────────────────────────────────────── */
  download(): void {
    this.http.get('/api/admin/seed', { responseType: 'blob' }).subscribe({
      next: (blob) => {
        const url = URL.createObjectURL(blob);
        const a   = document.createElement('a');
        a.href = url; a.download = 'db.json';
        a.click(); URL.revokeObjectURL(url);
      },
      error: () => this.error.set('Download failed')
    });
  }

  /* ── Upload ───────────────────────────────────────────────────────────────── */
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) return;
    const file = input.files[0];
    if (!file.name.endsWith('.json')) { this.error.set('Please select a .json file'); return; }
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(reader.result as string);
        this.uploading.set(true);
        this.error.set('');
        this.http.post<any>('/api/admin/seed', parsed).subscribe({
          next: (r) => {
            this.successMsg.set(`✓ Uploaded ${r.ideas} ideas successfully`);
            this.uploading.set(false);
            this.loadData();
            setTimeout(() => this.successMsg.set(''), 4000);
          },
          error: (e) => { this.error.set('Upload failed: ' + (e.error?.error ?? e.message)); this.uploading.set(false); }
        });
      } catch { this.error.set('Invalid JSON file'); }
    };
    reader.readAsText(file);
    input.value = '';
  }

  /* ── Clear ────────────────────────────────────────────────────────────────── */
  confirmClear(): void { this.showClearConfirm.set(true); }
  cancelClear():  void { this.showClearConfirm.set(false); }
  executeClear(): void {
    this.clearing.set(true); this.showClearConfirm.set(false); this.error.set('');
    this.http.delete<any>('/api/admin/seed').subscribe({
      next: () => {
        this.successMsg.set('✓ All seed data cleared');
        this.clearing.set(false);
        this.rawData.set([]);
        this.jumpPage.set(1);
        setTimeout(() => this.successMsg.set(''), 4000);
      },
      error: (e) => { this.error.set('Clear failed: ' + e.message); this.clearing.set(false); }
    });
  }

  /* ── Table helpers ────────────────────────────────────────────────────────── */
  private valueAt(row: any, key: string): any {
    return key.split('.').reduce((acc, part) => (acc == null ? undefined : acc[part]), row);
  }

  cellVal(key: string, row: any): any {
    const col = this.columns().find(c => c.key === key);
    const v = this.valueAt(row, key);
    if (col?.render) return col.render(v, row);
    if (Array.isArray(v)) return v.length;  // for sort: use length
    return v ?? '';
  }

  cellDisplay(col: ColDef, row: any): string {
    const v = this.valueAt(row, col.key);
    if (col.render) return col.render(v, row);
    if (v === null || v === undefined) return '—';
    if (typeof v === 'boolean') return v ? 'Yes' : 'No';
    return String(v);
  }

  setSort(key: string): void {
    if (this.sortKey() === key) {
      const cycle: SortDir[] = ['asc','desc','none'];
      const cur  = cycle.indexOf(this.sortDir());
      this.sortDir.set(cycle[(cur + 1) % 3]);
    } else {
      this.sortKey.set(key); this.sortDir.set('asc');
    }
    this.currentPage.set(1);
  }

  sortIcon(key: string): string {
    if (this.sortKey() !== key) return '↕';
    return this.sortDir() === 'asc' ? '↑' : this.sortDir() === 'desc' ? '↓' : '↕';
  }

  onSearch(q: string): void { this.searchQuery.set(q); this.currentPage.set(1); this.jumpPage.set(1); }

  setPage(p: number): void {
    this.currentPage.set(Math.max(1, Math.min(this.totalPages(), p)));
    this.jumpPage.set(this.currentPage());
  }

  goFirst(): void { this.setPage(1); }

  goLast(): void { this.setPage(this.totalPages()); }

  previousPage(): void { this.setPage(this.currentPage() - 1); }

  nextPage(): void { this.setPage(this.currentPage() + 1); }

  onJumpPageChange(value: number | null): void {
    this.jumpPage.set(value);
  }

  submitJump(): void {
    const raw = this.jumpPage();
    if (raw === null || Number.isNaN(raw)) {
      return;
    }

    const target = Math.max(1, Math.min(this.totalPages(), Math.trunc(raw)));
    this.setPage(target);
  }

  onPageSizeChange(n: number): void { this.pageSize.set(n); this.currentPage.set(1); this.jumpPage.set(1); }

  toggleCol(col: ColDef): void {
    this.columns.update(cols =>
      cols.map(c => c.key === col.key ? { ...c, visible: !c.visible } : c)
    );
  }

  resetCols(): void {
    this.columns.update(cols => cols.map(c => ({
      ...c,
      visible: [
        'ideaInformation.title',
        'authorInformation.name',
        'audit.createdDate',
        'ideaInformation.status',
        'engagement.likes',
        'engagement.shares',
        'ideaInformation.tags',
        'content.comments'
      ].includes(c.key)
    })));
  }

  get jsonPreview(): string {
    return JSON.stringify({ ideas: this.rawData() }, null, 2);
  }

  statusClass(row: any): string {
    return this.valueAt(row, 'ideaInformation.status') === 'published' ? 'badge--published' : 'badge--draft';
  }

  startIdx = computed(() => (this.currentPage() - 1) * this.pageSize() + 1);
  endIdx   = computed(() => Math.min(this.currentPage() * this.pageSize(), this.sorted().length));
}
