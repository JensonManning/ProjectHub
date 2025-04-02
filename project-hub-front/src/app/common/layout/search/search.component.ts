import { PhlayoutService } from '@/core/services/layout/phlayout.service';
import { Component, inject } from '@angular/core';
import { AutoFocusModule } from 'primeng/autofocus';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';

@Component({
	selector: '[app-search]',
	imports: [DialogModule, InputTextModule, AutoFocusModule],
	templateUrl: './search.component.html',
	styleUrl: './search.component.scss'
})
export class SearchComponent {
	layoutService = inject(PhlayoutService);

    toggleSearchBar() {
        this.layoutService.layoutState.update((value) => ({ ...value, searchBarActive: !value.searchBarActive }));
    }

    get searchBarActive(): boolean {
        return this.layoutService.layoutState().searchBarActive;
    }

    set searchBarActive(_val: boolean) {
        this.layoutService.layoutState.update((prev) => ({ ...prev, searchBarActive: _val }));
    }
}
