import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { PhlayoutService } from '@/core/services/layout/phlayout.service';
import { filter, map } from 'rxjs/operators';
import { ActivatedRouteSnapshot, NavigationEnd, Router } from '@angular/router';
import { Breadcrumb } from '@/core/interfaces/layout/layout.interface';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: '[app-breadcrumb]',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './breadcrumb.component.html',
  styleUrl: './breadcrumb.component.scss'
})
export class BreadcrumbComponent {
  layoutService = inject(PhlayoutService);
  router = inject(Router);

  private readonly _breadcrumbs$ = new BehaviorSubject<Breadcrumb[]>([]);
  readonly breadcrumbs$ = this._breadcrumbs$.asObservable();

  constructor() {
    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe((event) => {
      const root = this.router.routerState.snapshot.root;
      const breadcrumbs: Breadcrumb[] = [];
      this.addBreadcrumb(root, [], breadcrumbs);

      this._breadcrumbs$.next(breadcrumbs);
  });
  }

  private addBreadcrumb(route: ActivatedRouteSnapshot, parentUrl: string[], breadcrumbs: Breadcrumb[]) {
    const routeUrl = parentUrl.concat(route.url.map((url) => url.path));
    const breadcrumb = route.data['breadcrumb'];
    const parentBreadcrumb = route.parent && route.parent.data ? route.parent.data['breadcrumb'] : null;

    if (breadcrumb && breadcrumb !== parentBreadcrumb) {
        breadcrumbs.push({
            label: route.data['breadcrumb'],
            url: '/' + routeUrl.join('/')
        });
    }

    if (route.firstChild) {
        this.addBreadcrumb(route.firstChild, routeUrl, breadcrumbs);
    }
}

  // Add a tracking function to avoid recreation of the entire collection
  trackByFn(index: number, item: Breadcrumb): string {
    return item.label + (item.url || '') + index;
  }
}
