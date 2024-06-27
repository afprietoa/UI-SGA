
import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {faBell, faInfoCircle} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  faBell = faBell;
  faInfoCircle = faInfoCircle;

  isOpen = false;
  isOpenBody = false;

  constructor(private router: Router){}


  ngOnInit(): void {
    
  }
  isLoggedIn():boolean {
    return sessionStorage.getItem('loggedIn') === 'true';
  }

  logout():void {
    sessionStorage.removeItem('loggedIn');
    this.router.navigate(['/login']);
  }

}
