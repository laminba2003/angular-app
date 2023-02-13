import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  visible: boolean = false;

  constructor(
    private router: Router,
    public auth: AuthService
  ) { }


  async ngOnInit() {
    await this.checkLoggedIn();
  }

  async checkLoggedIn() {
    this.auth.isLoggedIn().then((isLoggedIn) => {
      if (isLoggedIn) {
        this.router.navigate(['countries']);
      } else {
        this.visible = true;
      }
    })
  }


}
