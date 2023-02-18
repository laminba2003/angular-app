import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { map, Observable, of } from 'rxjs';
import { KeycloakService } from 'keycloak-angular';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private store: Store, private keycloakService: KeycloakService) { }

  hasRoles(roles: string[]): Observable<boolean> {
    if (roles.length == 0) {
      return of(true);
    } else {
      return this.store.select(state => state.appstate.roles).pipe(map(x => roles.some((role) => x.includes(role))));
    }
  }

  async isLoggedIn(): Promise<boolean> {
    return this.keycloakService.isLoggedIn();
  }

  async signIn() {
    await this.keycloakService.login({
      redirectUri: window.location.origin
    });
  }

  async logOut() {
    await this.keycloakService.logout(window.location.origin)
      .then(() => document.location.href = '');
  }

  get userName(): string {
    return this.keycloakService.getUsername();
  }

}
