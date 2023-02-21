import { Component } from '@angular/core';
import { AuthService } from '@app/services/auth.service';
import { Store } from '@ngxs/store';
import { MENU } from './navigation';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {

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
