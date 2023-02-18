import { Component } from '@angular/core';
import { AuthService } from '@app/services/auth.service';
import { Store } from '@ngxs/store';
import { MENU } from './navigation';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent {

  readonly menu = MENU;

  constructor(
    private store: Store,
    public auth: AuthService
  ) {
  }

  doSearch($event: any) {
    const search = this.store.selectSnapshot(state => state.appstate.search);
    search($event.target.value);
  }


}
