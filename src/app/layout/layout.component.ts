import { Component, OnInit } from '@angular/core';
import { AuthService } from './../services/auth.service';
import { Store } from '@ngxs/store';
import { Observable, withLatestFrom } from 'rxjs';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  constructor(
    private store: Store,
    public auth: AuthService
  ) { 
  }

  ngOnInit(): void {
  }

  doSearch($event: any) {
    const search = this.store.selectSnapshot(state => state.appstate.search);
    search($event.target.value);
  }


}
