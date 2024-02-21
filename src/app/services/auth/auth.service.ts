import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../../models/auth/user.model';
import { HttpClient } from '@angular/common/http';
import { TokenStorageService } from './token-storage.service';
import { environment } from '../../../environments/environment';
import { LoginResponse } from '../../models/dtos/login-response.model';
import { LoginRequest } from '../../models/dtos/login-request.model';
import { RegisterRequest } from '../../models/dtos/register-request.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly $user = new BehaviorSubject<User | undefined>(undefined);

  constructor(
    private http: HttpClient,
    private tokenStorage: TokenStorageService
  ) {}

  login(request: LoginRequest): Observable<LoginResponse> {
    const obs = this.http.post<LoginResponse>(
      `${environment.apiBaseUrl}/api/auth/login`,
      request
    );

    return obs;
  }

  refreshToken(token: string, refreshToken: string): Observable<LoginResponse> {
    const req = this.http.post<LoginResponse>(
      `${environment.apiBaseUrl}/api/Auth/refresh-token`,
      { token, refreshToken }
    );
    return req;
  }

  register(request: RegisterRequest): Observable<any> {
    const req = this.http.post(
      `${environment.apiBaseUrl}/api/Auth/registerCompany`,
      request
    );

    return req;
  }

  setUser(user: User): void {
    this.$user.next(user);
  }

  user(): Observable<User | undefined> {
    return this.$user.asObservable();
  }

  getUser(): User | undefined {
    return this.tokenStorage.getUser();
  }

  loadUserFromLocalStorage() {
    this.user().subscribe((u) => {
      if (u === undefined) {
        const localStorageUser = this.getUser();
        if (localStorageUser !== undefined) {
          this.setUser(localStorageUser);
        }
      }
    });
  }

  logout(): void {
    localStorage.clear();
    this.$user.next(undefined);
  }
}
