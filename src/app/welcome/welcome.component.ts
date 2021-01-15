import { Component, OnInit, ElementRef, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit, OnDestroy {

  routerSubscriber: any;

  constructor(private elementRef: ElementRef,
    private router: Router) { }

  ngOnInit() {
  }

  goToBoard(event) {
    event.stopPropagation();

    this.router.navigate(['board']);
  }

  ngOnDestroy() {
  }
}
