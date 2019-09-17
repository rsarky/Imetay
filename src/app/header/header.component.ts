import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  user: Observable<firebase.User>

  constructor(private auth: AuthService) { 
    this.user = auth.userObservable()
  }

  ngOnInit() {
  }

  logout() {
    this.auth.logout()
  }

}
