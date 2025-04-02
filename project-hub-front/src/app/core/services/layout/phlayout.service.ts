import { LayoutOptions, LayoutState, MenuChangeEvent, Breadcrumb } from '@/core/interfaces/layout/layout.interface';
import { computed, effect, Injectable, signal } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PhlayoutService {

	// init option
	private _options: LayoutOptions = {
		preset: 'Aura',
		primary: 'nior',
		surface: 'neutral',
		darkTheme: true,
		menuMode: 'static',
		menuTheme: 'dark',
		cardStyle: 'filled'
	};

	private _state: LayoutState = {
		overlayMenuActive: false,
		activityMenuVisible: false,
		optionSidebarVisible: false,
		staticMenuMobileActive: false,
		menuHoverActive: false,
		sidebarActive: false,
		anchored: false,
		overlaySubmenuActive: false,
		searchBarActive: false
	};

	// State signals
	layoutOptions = signal<LayoutOptions>(this._options);
    layoutState = signal<LayoutState>(this._state);

	// Event handling
	private optionUpdate = new Subject<LayoutOptions>();

    private overlayOpen = new Subject<any>();

    private menuSource = new Subject<MenuChangeEvent>();

    private resetSource = new Subject();

    menuSource$ = this.menuSource.asObservable();

    resetSource$ = this.resetSource.asObservable();

    optionUpdate$ = this.optionUpdate.asObservable();

    overlayOpen$ = this.overlayOpen.asObservable();

    isDarkTheme = computed(() => this.layoutOptions().darkTheme);

    isSidebarActive = computed(() => this.layoutState().overlayMenuActive || this.layoutState().staticMenuMobileActive || this.layoutState().overlaySubmenuActive);

    isOverlay = computed(() => this.layoutOptions().menuMode === 'overlay');

    isCompact = computed(() => this.layoutOptions().menuMode === 'compact');

    isStatic = computed(() => this.layoutOptions().menuMode === 'static');

    isReveal = computed(() => this.layoutOptions().menuMode === 'reveal');

    transitionComplete = signal<boolean>(false);

    isSidebarStateChanged = computed(() => {
        const layoutOptions = this.layoutOptions();
        return layoutOptions.menuMode === 'horizontal' || layoutOptions.menuMode === 'slim' || layoutOptions.menuMode === 'slim-plus';
    });

    private initialized = false;
	
	constructor() {
		effect(() => {
            const option = this.layoutOptions();
            if (option) {
                this.onOptionUpdate();
            }
        });

        effect(() => {
            const option = this.layoutOptions();

            if (!this.initialized || !option) {
                this.initialized = true;
                return;
            }

            this.handleDarkModeTransition(option);
        });

        effect(() => {
            this.isSidebarStateChanged() && this.reset();
        });
	}

	private handleDarkModeTransition(option: LayoutOptions): void {
        const supportsViewTransition = 'startViewTransition' in document;

        if (supportsViewTransition) {
            this.startViewTransition(option);
        } else {
            this.toggleDarkMode(option);
            this.onTransitionEnd();
        }
    }

    private startViewTransition(option: LayoutOptions): void {
        const transition = (document as any).startViewTransition(() => {
            this.toggleDarkMode(option);
        });

        transition.ready
            .then(() => {
                this.onTransitionEnd();
            })
            .catch(() => {});
    }

    toggleDarkMode(option?: LayoutOptions): void {
        const _option = option || this.layoutOptions();
        if (_option.darkTheme) {
            document.documentElement.classList.add('app-dark');
        } else {
            document.documentElement.classList.remove('app-dark');
        }
    }

    private onTransitionEnd() {
        this.transitionComplete.set(true);
        setTimeout(() => {
            this.transitionComplete.set(false);
        });
    }

    toggleOptionSidebar() {
        if (this.isSidebarActive()) {
            this.updateLayoutState({
                overlayMenuActive: false,
                overlaySubmenuActive: false,
                staticMenuMobileActive: false,
                menuHoverActive: false,
                optionSidebarVisible: false
            });
        }
        this.updateLayoutState({
            optionSidebarVisible: true
        });
    }

    updateLayoutState(newState: Partial<any>) {
        this.layoutState.update((prev) => ({
            ...prev,
            ...newState
        }));
    }

    onMenuToggle() {
        if (this.isOverlay()) {
            this.updateLayoutState({ overlayMenuActive: !this.layoutState().overlayMenuActive });

            if (this.layoutState().overlayMenuActive) {
                this.overlayOpen.next(null);
            }
        }

        if (this.isDesktop()) {
            this.updateLayoutState({ staticMenuDesktopInactive: !this.layoutState().staticMenuDesktopInactive });
        } else {
            this.updateLayoutState({ staticMenuMobileActive: !this.layoutState().staticMenuMobileActive });

            if (this.layoutState().staticMenuMobileActive) {
                this.overlayOpen.next(null);
            }
        }
    }
    onOptionUpdate() {
        this._options = { ...this.layoutOptions() };
        this.optionUpdate.next(this.layoutOptions());
    }

    onMenuStateChange(event: MenuChangeEvent) {
        this.menuSource.next(event);
    }

    reset() {
        this.resetSource.next(true);
    }

    onOverlaySubmenuOpen() {
        this.overlayOpen.next(null);
    }

    showProfileSidebar() {
        this.updateLayoutState({ profileSidebarVisible: true });
    }

    showOptionSidebar() {
        this.updateLayoutState({ optionSidebarVisible: true });
    }

    hideOptionSidebar() {
        this.updateLayoutState({ optionSidebarVisible: false });
    }

    toggleActivityMenu() {
        this.updateLayoutState({ activityMenuVisible: !this.layoutState().activityMenuVisible });
    }

    isDesktop() {
        return window.innerWidth > 991;
    }

    isMobile() {
        return !this.isDesktop();
    }
}
