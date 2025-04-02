import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MiniLineChart } from '@/common/charts/minilinechart';
import { DividerModule } from 'primeng/divider';
import { ButtonModule } from 'primeng/button';
import { MenuItem } from 'primeng/api';
import { Menu } from 'primeng/menu';

@Component({
  selector: 'app-dash-phases',
  standalone: true,
  imports: [CommonModule, MiniLineChart, DividerModule, ButtonModule, Menu],
  templateUrl: './dash-phases.component.html',
  styleUrls: ['./dash-phases.component.scss'],
  host: {
    class: 'grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-6 gap-7 pb-7'
  }
})
export class DashPhasesComponent {

  // Array of phases
  phases = [
    { title: 'Phase 1'},
    { title: 'Phase 2'},
    { title: 'Phase 3'},
    { title: 'Phase 4'},
    { title: 'Phase 5'},
    { title: 'Phase 6'}
  ];

  // Sample item for each phase
  itemData = [
    {
      cardData: {
        title: 'TONE25P',
        value: 'Tone Accounting Group',
        percent: '25'
      },
      data: [100, 200, 300, 400, 500, 600, 700, 800, 900]
    },
  ];

  items: MenuItem[] | undefined;

  ngOnInit() {
    this.items = [
      { label: 'Quick View', icon: 'pi pi-pencil', command: () => this.quickView() },
      { label: 'View', icon: 'pi pi-trash', command: () => this.view() }
    ];
  }

  bgColor(data: any) {
    return data.bgColor || ['rgba(22,160,133,0.3)', 'rgba(22,160,133,0)'];
  }

  borderColor(data: any) {
    return data.borderColor || 'rgb(22, 160, 133)';
  }

  trackByFn() {
    return (index: number) => index;
  }

  quickView() {
    console.log('Quick view clicked');
  }

  view() {
    console.log('View clicked');
  }
}
