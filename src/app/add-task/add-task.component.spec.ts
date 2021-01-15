import { AddTaskComponent } from '../add-task/add-task.component';
import { TestBed, async, ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import { } from 'jasmine';
import { ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { SharedService } from '../shared.service';
import { NoopAnimationsModule, BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpLibrary } from '../shared/libraries/HttpLibrary';

describe('AppComponent', () => {
  let component: AddTaskComponent;
  let fixture: ComponentFixture<AddTaskComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AddTaskComponent
      ],
      imports: [
        BrowserAnimationsModule,
        ReactiveFormsModule,
        HttpClientModule

      ],
      providers: [
        SharedService,
      ],
      schemas: [
        NO_ERRORS_SCHEMA
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AddTaskComponent);
    component = fixture.debugElement.componentInstance;
  }));

  describe('Test ngOnInit', () => {
    it('should push form', () => {
      const serviceSpy = spyOn(Observable.prototype, 'subscribe');
      component.ngOnInit();
      expect(serviceSpy).toHaveBeenCalled();
    });
    it('should test submit', fakeAsync(() => {
      const sharedSpy = spyOn(Observable.prototype, 'subscribe').and.returnValue(of(false));
      component.ngOnInit();
      expect(sharedSpy).toHaveBeenCalled();
      expect(component.showForm).toBe(false);
    }));
  });

  describe('Test ngOnDestroy', () => {
    it('should call destroy', () => {
      const getTaskSpy = spyOn(HttpLibrary, 'unsubscribeAll');
      component.ngOnDestroy();
      expect(getTaskSpy).toHaveBeenCalled();
    });
  });
});
