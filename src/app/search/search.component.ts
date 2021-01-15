import { Component, OnInit } from '@angular/core';
import { TaskService } from '../task.service';
import { Subject, timer } from 'rxjs';
import { subscribeOn, debounce } from 'rxjs/operators';
import { filter } from 'rxjs/operators';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  taskSubscriber: any;

  searchWord: any;
  data: any;
  name: any[] = [];
  final: any[] = [];
  afisare = true;

  inputSearch = new Subject();
  inputSubscriber: any;

  constructor(private taskService: TaskService, private sharedService: SharedService) { }

  ngOnInit() {
    this.inputSearch
      .asObservable().pipe(debounce(() => timer(500)))
      .subscribe(value => {
        this.searchWord = value;
        this.sharedService.searchTasks(this.searchWord);
      });
  }
} 