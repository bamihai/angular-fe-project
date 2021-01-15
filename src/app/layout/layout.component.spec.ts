import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { LayoutComponent } from './layout.component';
import { } from 'jasmine';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedService } from '../shared.service';
import { Observable, of } from 'rxjs';
import { HttpLibrary } from '../shared/libraries/HttpLibrary';

describe('LayoutComponent', () => {
  let component: LayoutComponent;
  let fixture: ComponentFixture<LayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LayoutComponent],
      imports: [BrowserAnimationsModule],
      providers: [
        SharedService
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();

    fixture = TestBed.createComponent(LayoutComponent);
    component = fixture.debugElement.componentInstance;
  }));
  describe('Test ngOnInit', () => {

    it('Should push form', () => {
      component.subscriptions = jasmine.createSpyObj('array', ['push']);
      const serviceSpy = spyOn(Observable.prototype, 'subscribe');
      fixture.detectChanges();
      component.ngOnInit();
      expect(component.subscriptions.push).toHaveBeenCalled();
    });

    it('should test subscribe', fakeAsync( () => {
      const reflectedComponent = (component as any);
      reflectedComponent.ngOnInit();
      reflectedComponent.sharedService.addButtonClicked(true);
      tick(100);
      expect(reflectedComponent.showForm).toBe(true);
    }));

    describe('test ngOnDestroy', () => {
      it('should call onDestroy', () => {
        const httpLibrarySpy = spyOn(HttpLibrary, 'unsubscribeAll');
        component.ngOnDestroy();
        expect(httpLibrarySpy).toHaveBeenCalled();
      });
    });
  });
});
