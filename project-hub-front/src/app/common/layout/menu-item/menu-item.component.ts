import { Component, computed, effect, ElementRef, HostBinding, inject, Input, input, OnDestroy, OnInit, signal, ViewChild } from '@angular/core';
import { animate, AnimationEvent, state, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { RippleModule } from 'primeng/ripple';
import { TooltipModule } from 'primeng/tooltip';
import { PhlayoutService } from '@/core/services/layout/phlayout.service';
import { filter, Subscription } from 'rxjs';
import { DomHandler } from 'primeng/dom';

@Component({
	selector: '[app-menu-item]',
	imports: [CommonModule, RouterModule, RippleModule, TooltipModule],
	templateUrl: './menu-item.component.html',
	styleUrl: './menu-item.component.scss',
	animations: [
		trigger('children', [
			state(
				'collapsed',
				style({
					height: '0'
				})
			),
			state(
				'expanded',
				style({
					height: '*'
				})
			),
			state(
				'hidden',
				style({
					display: 'none'
				})
			),
			state(
				'visible',
				style({
					display: 'block'
				})
			),
			transition('collapsed <=> expanded', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)'))
		])
	]
})
export class MenuItemComponent implements OnInit, OnDestroy {
    layoutService = inject(PhlayoutService);
	router = inject(Router);

    @Input() item: any;

    @Input() index!: number;

    @Input() @HostBinding('class.layout-root-menuitem') root!: boolean;

    @Input() parentKey!: string;

    @ViewChild('submenu') submenu!: ElementRef;

    @HostBinding('class.active-menuitem')
    get activeClass() {
        return this.active;
    }

    active = false;

    menuSourceSubscription: Subscription;

    menuResetSubscription: Subscription;

    key: string = '';

    get submenuAnimation() {
        if (this.layoutService.isDesktop() && (this.layoutService.isCompact())) {
            return this.active ? 'visible' : 'hidden';
        } else return this.root ? 'expanded' : this.active ? 'expanded' : 'collapsed';
    }

    isCompact = computed(() => this.layoutService.isCompact());

    get isDesktop() {
        return this.layoutService.isDesktop();
    }

    get isMobile() {
        return this.layoutService.isMobile();
    }

    constructor() {
        this.menuSourceSubscription = this.layoutService.menuSource$.subscribe((value) => {
            Promise.resolve(null).then(() => {
                if (value.routeEvent) {
                    this.active = value.key === this.key || value.key.startsWith(this.key + '-') ? true : false;
                } else {
                    if (value.key !== this.key && !value.key.startsWith(this.key + '-')) {
                        this.active = false;
                    }
                }
            });
        });

        this.menuResetSubscription = this.layoutService.resetSource$.subscribe(() => {
            this.active = false;
        });

        this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe((params) => {
            if (this.isCompact()) {
                this.active = false;
            } else {
                if (this.item.routerLink) {
                    this.updateActiveStateFromRoute();
                }
            }
        });

        effect(() => {
            if (this.layoutService.isOverlay() && this.layoutService.isSidebarActive()) {
                if (this.item.routerLink) {
                    this.updateActiveStateFromRoute();
                }
            }
        });
    }

    ngOnInit() {
        this.key = this.parentKey ? this.parentKey + '-' + this.index : String(this.index);

        if (!(this.isCompact()) && this.item.routerLink) {
            this.updateActiveStateFromRoute();
        }
    }

    ngAfterViewChecked() {
        if (this.root && this.active && this.isDesktop && (this.isCompact())) {
            this.calculatePosition(this.submenu?.nativeElement, this.submenu?.nativeElement.parentElement);
        }
    }

    updateActiveStateFromRoute() {
        let activeRoute = this.router.isActive(this.item.routerLink[0], {
            paths: 'exact',
            queryParams: 'ignored',
            matrixParams: 'ignored',
            fragment: 'ignored'
        });

        if (activeRoute) {
            this.layoutService.onMenuStateChange({
                key: this.key,
                routeEvent: true
            });
        }
    }
    onSubmenuAnimated(event: AnimationEvent) {
        if (event.toState === 'visible' && this.isDesktop && (this.isCompact())) {
            const el = <HTMLUListElement>event.element;
            const elParent = <HTMLUListElement>el.parentElement;
            this.calculatePosition(el, elParent);
        }
    }

    calculatePosition(overlay: HTMLElement, target: HTMLElement) {
        if (overlay) {
            const { left, top } = target.getBoundingClientRect();
            const [vWidth, vHeight] = [window.innerWidth, window.innerHeight];
            const [oWidth, oHeight] = [overlay.offsetWidth, overlay.offsetHeight];
            const scrollbarWidth = DomHandler.calculateScrollbarWidth();
            // reset
            overlay.style.top = '';
            overlay.style.left = '';

            if (this.isCompact()) {
                const height = top + oHeight;
                overlay.style.top = vHeight < height ? `${top - (height - vHeight)}px` : `${top}px`;
            }
        }
    }

    itemClick(event: Event) {
        // avoid processing disabled items
        if (this.item.disabled) {
            event.preventDefault();
            return;
        }

        // navigate with hover
        if ((this.root) || this.isCompact()) {
            this.layoutService.layoutState.update((val) => ({
                ...val,
                menuHoverActive: !val.menuHoverActive
            }));
        }

        // execute command
        if (this.item.command) {
            this.item.command({ originalEvent: event, item: this.item });
        }

        // toggle active state
        if (this.item.items) {
            this.active = !this.active;

            if (this.root && this.active && (this.isCompact())) {
                this.layoutService.onOverlaySubmenuOpen();
            }
        } else {
            if (this.layoutService.isMobile()) {
                this.layoutService.layoutState.update((val) => ({
                    ...val,
                    staticMenuMobileActive: false
                }));
            }

            if (this.isCompact()) {
                this.layoutService.reset();
                this.layoutService.layoutState.update((val) => ({
                    ...val,
                    menuHoverActive: false
                }));
            }
        }

        this.layoutService.onMenuStateChange({ key: this.key });
    }

    onMouseEnter() {
        // activate item on hover
        if (this.root && (this.isCompact()) && this.layoutService.isDesktop()) {
            if (this.layoutService.layoutState().menuHoverActive) {
                this.active = true;
                this.layoutService.onMenuStateChange({ key: this.key });
            }
        }
    }

    ngOnDestroy() {
        if (this.menuSourceSubscription) {
            this.menuSourceSubscription.unsubscribe();
        }

        if (this.menuResetSubscription) {
            this.menuResetSubscription.unsubscribe();
        }
    }
}
