import {TestBed, async, ComponentFixture} from '@angular/core/testing';
import { AppComponent } from './app.component';
import { By } from '@angular/platform-browser';
import {CustomOption} from './custom-option';
import {ToastModule, ToastOptions} from 'ng2-toastr';
import {DebugElement} from '@angular/core';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let app: AppComponent;
  let de: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [
        ToastModule.forRoot(),
      ],
      providers: [{provide: ToastOptions, useClass: CustomOption}],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
    de = fixture.debugElement;
  });

  it('should create the app', async(() => {
    expect(app).toBeTruthy();
  }));

  it(`should have as title 'Toastr Demo'`, async(() => {
    expect(app.title).toEqual('Toastr Demo');
  }));

  it('should render title in a h1 tag', async(() => {
    fixture.detectChanges();
    expect(de.query(By.css('h1')).nativeElement.textContent).toContain(app.title);
  }));
});
