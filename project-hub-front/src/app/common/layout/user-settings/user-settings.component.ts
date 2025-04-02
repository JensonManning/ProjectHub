import { PhlayoutService } from '@/core/services/layout/phlayout.service';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { booleanAttribute, Component, computed, inject, Input, model, PLATFORM_ID, Signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { updatePreset, updateSurfacePalette } from '@primeng/themes';
import { PrimeNG } from 'primeng/config';
import { SelectButtonModule } from 'primeng/selectbutton';
import { DrawerModule } from 'primeng/drawer';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { RadioButtonModule } from 'primeng/radiobutton';

@Component({
  selector: 'app-user-settings',
  imports: [CommonModule, FormsModule, SelectButtonModule, DrawerModule, ToggleSwitchModule, RadioButtonModule],
  templateUrl: './user-settings.component.html',
  styleUrl: './user-settings.component.scss'
})
export class UserSettingsComponent {
	@Input({ transform: booleanAttribute }) simple: boolean = false;

    @Input() location: string = 'app';

    router = inject(Router);

    config = inject(PrimeNG);

    layoutService = inject(PhlayoutService);

    platformId = inject(PLATFORM_ID);

    primeng = inject(PrimeNG);

    themeOptions = [
        { name: 'Light', value: false },
        { name: 'Dark', value: true }
    ];

    menuMode = model(this.layoutService.layoutOptions().menuMode);

    visible: Signal<boolean> = computed(() => this.layoutService.layoutState().optionSidebarVisible);

    darkTheme = computed(() => this.layoutService.layoutOptions().darkTheme);

    menuTheme = computed(() => this.layoutService.layoutOptions().menuTheme);

    onDrawerHide() {
        this.layoutService.hideOptionSidebar();
    }

    onMenuThemeChange(value: string) {
        this.layoutService.layoutOptions.update((state) => ({
            ...state,
            menuTheme: value
        }));
    }

    setMenuMode(mode: string) {
        this.layoutService.layoutOptions.update((state) => ({
            ...state,
            menuMode: mode
        }));

        if (this.menuMode() === 'static') {
            this.layoutService.layoutState.update((state) => ({
                ...state,
                staticMenuDesktopInactive: false
            }));
        }
    }

    toggleDarkMode() {
        this.executeDarkModeToggle();
    }

    executeDarkModeToggle() {
        this.layoutService.layoutOptions.update((state) => ({
            ...state,
            darkTheme: !state.darkTheme
        }));
        if (this.darkTheme()) {
            this.setMenuTheme('dark');
        }
        // this.updateMenuThemeOptions();
    }

    toggleConfigSidebar() {
        this.layoutService.layoutState.update((val) => ({ ...val, configSidebarVisible: !val.optionSidebarVisible }));
    }

    setMenuTheme(theme: string) {
        this.layoutService.layoutOptions.update((state) => ({
            ...state,
            menuTheme: theme
        }));
    }
}
