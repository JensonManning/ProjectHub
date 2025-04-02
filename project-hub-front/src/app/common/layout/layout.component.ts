import { Component, computed, inject, Renderer2, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UserSettingsComponent } from "./user-settings/user-settings.component";
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { TopbarComponent } from './topbar/topbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component';
import { PhlayoutService } from '@/core/services/layout/phlayout.service';
import { ActivityMenuComponent } from './activity-menu/activity-menu.component';
import { SearchComponent } from './search/search.component';
import { NavigationEnd, Router } from '@angular/router';
import { filter, Subscription } from 'rxjs';
@Component({
  selector: 'app-layout',
  imports: [CommonModule, RouterModule, SearchComponent, ActivityMenuComponent, UserSettingsComponent, BreadcrumbComponent, TopbarComponent, SidebarComponent, FooterComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {
	layoutService = inject(PhlayoutService);
	renderer = inject(Renderer2);
	router = inject(Router);

    overlayMenuOpenSubscription: Subscription;

    menuOutsideClickListener: any;

    menuScrollListener: any;

    @ViewChild(SidebarComponent) appSidebar!: SidebarComponent;

    @ViewChild(TopbarComponent) appTopBar!: TopbarComponent;

    constructor() {
      	this.overlayMenuOpenSubscription = this.layoutService.overlayOpen$.subscribe(() => {
        if (!this.menuOutsideClickListener) {
            this.menuOutsideClickListener = this.renderer.listen('document', 'click', (event) => {
                if (this.isOutsideClicked(event)) {
                    this.hideMenu();
                }
            });
        }
        if (!this.menuScrollListener) {
            this.menuScrollListener = this.renderer.listen(this.appSidebar.menuContainer.nativeElement, 'scroll', (event) => {
                if (this.layoutService.isDesktop()) {
                    this.hideMenu();
                }
            });
        }
        if (this.layoutService.layoutState().staticMenuMobileActive) {
            this.blockBodyScroll();
        }
    });

    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => {
		this.hideMenu();
    });
    }

    isOutsideClicked(event: any) {
		const sidebarEl = document.querySelector('.layout-sidebar');
		const topbarButtonEl = document.querySelector('.menu-button');

		return !(sidebarEl?.isSameNode(event.target) || sidebarEl?.contains(event.target) || topbarButtonEl?.isSameNode(event.target) || topbarButtonEl?.contains(event.target));
  	}

  	hideMenu() {
      	this.layoutService.layoutState.update((prev) => ({
			...prev,
			overlayMenuActive: false,
			staticMenuMobileActive: false,
			menuHoverActive: false
      	}));
		this.layoutService.reset();
		if (this.menuOutsideClickListener) {
			this.menuOutsideClickListener();
			this.menuOutsideClickListener = null;
		}

		if (this.menuScrollListener) {
			this.menuScrollListener();
			this.menuScrollListener = null;
		}

		this.unblockBodyScroll();
   }

	blockBodyScroll(): void {
		if (document.body.classList) {
			document.body.classList.add('blocked-scroll');
		} else {
			document.body.className += ' blocked-scroll';
		}
	}

	unblockBodyScroll(): void {
		if (document.body.classList) {
			document.body.classList.remove('blocked-scroll');
		} else {
			document.body.className = document.body.className.replace(new RegExp('(^|\\b)' + 'blocked-scroll'.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
		}
	}

	containerClass = computed(() => {
		const layoutOptions= this.layoutService.layoutOptions();
		const layoutState = this.layoutService.layoutState();

		return {
			'layout-overlay': layoutOptions.menuMode === 'overlay',
			'layout-static': layoutOptions.menuMode === 'static',
			'layout-hover': layoutOptions.menuMode === 'hover',
			'layout-static-inactive': layoutState.staticMenuDesktopInactive && layoutOptions.menuMode === 'static',
			'layout-sidebar-active': layoutState.sidebarActive,
			'layout-sidebar-anchored': layoutState.anchored,
			[`layout-card-${layoutOptions.cardStyle}`]: true,
			[`layout-sidebar-${layoutOptions.menuTheme}`]: true
		};
	});

	ngOnDestroy() {
		if (this.overlayMenuOpenSubscription) {
			this.overlayMenuOpenSubscription.unsubscribe();
		}

		if (this.menuOutsideClickListener) {
			this.menuOutsideClickListener();
		}
	}
}
