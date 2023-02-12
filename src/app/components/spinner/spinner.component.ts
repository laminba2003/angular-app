import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent implements OnInit {

  isLoading$: Observable<boolean>;
  
  constructor(private store: Store) { 
    this.isLoading$ = this.store.select(state => state.appstate.isLoading);
  }

  ngOnInit(): void {
  }

}
