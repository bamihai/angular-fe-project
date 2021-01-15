import { Component, OnInit, OnDestroy } from '@angular/core';
import { state, animate, transition, trigger, style } from '@angular/animations';
import { Subscription } from 'rxjs';
import { SharedService } from '../shared.service';
import { HttpLibrary } from '../shared/libraries/HttpLibrary';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
  animations: [
    trigger('openCloseComponents', [
      state('0', style({ width: '93.6667%' })),
      state('1', style({ width: '96.46%' })),
      transition('0 => 1', animate(100)),
      transition('1 => 0', animate(0))
    ])]
})

export class LayoutComponent implements OnInit, OnDestroy {
  showForm = false;
  subscriptions: Subscription[] = [];

  constructor(private sharedService: SharedService) { }

  ngOnInit() {
    this.subscriptions.push(this.sharedService.getState$.subscribe(
      showForm => {
        setTimeout(() => this.showForm = showForm, 50);
      }));
  }

  ngOnDestroy() {
    HttpLibrary.unsubscribeAll(this.subscriptions);
  }

}
