import { Injectable, signal } from '@angular/core';
import { LayoutState } from '../../interfaces/layout/layout.interface';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {

  private _state: LayoutState = {
    sidebarActive: false,
    searchBarActive: false
  }

  layoutState = signal<LayoutState>(this._state);

  
}
