import { Component, OnInit, Output, EventEmitter, Input, ElementRef, HostListener, ViewChild } from '@angular/core';
import { SharedService } from '../shared.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css']
})
export class DropdownComponent implements OnInit {
  public view = false;
  editClicked = false;
  delete = false;
  event = new EventEmitter<boolean>();
  @ViewChild('dropdown') pageDropdown;

  @Input() id = '0';
  @Output() deleteClicked = new EventEmitter();
  @Output() clicked = new EventEmitter();


  subscriptions: Subscription[] = [];

  constructor(private sharedService: SharedService,
    private eRef: ElementRef
  ) { }

  ngOnInit() {
    this.sharedService.dropdownList.push(this.pageDropdown);
    this.sharedService.dropdownOpenEvent.subscribe((isOpen) => {
      if (!isOpen) {
        this.view = false;
      }
    });
  }

  editFunction() {
    this.editClicked = true;
    this.clicked.emit(this.editClicked);
    this.sharedService.sendFormType('edit');
    this.sharedService.addButtonClicked(true);
  }

  public expandDropdown(event): void {

    if (this.view = false) {
      this.view = !this.view;
            event.stopPropagation();
    }
    if (this.view = true) {
      event.stopPropagation();
    }

    let i = 0;
    for (const dropdown of this.sharedService.dropdownList) {
      if (dropdown !== this.pageDropdown) {
        dropdown.close();
        this.sharedService.dropdownOpenEvent.next(false);
      } else {
        setTimeout(() => { this.view = true; }, 10);
      }
      i++;
    }
  }

  deleteFunction() {
    this.delete = true;
    this.deleteClicked.emit(this.delete);
    this.view = !this.view;
  }

  @HostListener('document:click', ['$event'])
  clickout(event) {
    this.view = false;
  }


}
