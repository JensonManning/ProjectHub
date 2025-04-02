import { PhlayoutService } from '@/core/services/layout/phlayout.service';
import { Component, computed, inject } from '@angular/core';

@Component({
  selector: '[app-footer]',
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
    layoutService = inject(PhlayoutService);

    isDarkTheme = computed(() => this.layoutService.isDarkTheme());
}
