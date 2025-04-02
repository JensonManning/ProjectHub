import { PhlayoutService } from '@/core/services/layout/phlayout.service';
import { Component, inject } from '@angular/core';
import { DrawerModule } from 'primeng/drawer';

@Component({
  selector: '[app-activity-menu]',
  imports: [DrawerModule],
  templateUrl: './activity-menu.component.html',
  styleUrl: './activity-menu.component.scss'
})
export class ActivityMenuComponent {
layoutService = inject(PhlayoutService);

get activityMenuVisible(): boolean {
  return this.layoutService.layoutState().activityMenuVisible;
}

set activityMenuVisible(_val: boolean) {
  this.layoutService.layoutState.update((prev) => ({ ...prev, activityMenuVisible: _val }));
}
}
