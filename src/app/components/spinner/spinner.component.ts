import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent implements OnInit {

  constructor(private store: Store) {     
  }

  ngOnInit(): void {
  }

  get isLoading$(): Observable<boolean> {
    return this.store.select(state => state.appstate.isLoading);
  }
  
}
