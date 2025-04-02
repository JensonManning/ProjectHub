// All interfaces for phlayout service
// Based of Sakai with modifications
export interface LayoutOptions {
	preset: string;
	primary: string;
	surface: string | undefined | null;
	darkTheme: boolean;
	menuMode: string;
	menuTheme: string;
	cardStyle: string;
}

// State
export interface LayoutState {
    staticMenuDesktopInactive?: boolean;
    overlayMenuActive?: boolean;
    optionSidebarVisible: boolean;
    staticMenuMobileActive?: boolean;
    menuHoverActive?: boolean;
    sidebarActive: boolean;
    anchored: boolean;
    overlaySubmenuActive: boolean;
    activityMenuVisible: boolean;
    searchBarActive: boolean;
}

// Menu Change Event 
export interface MenuChangeEvent {
    key: string;
    routeEvent?: boolean;
}

// Notifications
export interface NotificationsBars {
    id: string;
    label: string;
    badge?: string | any;
}

// Breadcrumb
export interface Breadcrumb {
    label: string;
    url?: string;
}

