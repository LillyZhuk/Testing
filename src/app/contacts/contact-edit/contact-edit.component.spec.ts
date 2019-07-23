/** The top six lines contain the Angular testing dependencies.*/
import { DebugElement } from '@angular/core'; /** DebugElement will debug the elements you select. */
/** These dependencies are from the Angular core testing library.*/
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser'; /** Uses By to select elements*/
import { NoopAnimationsModule } from '@angular/platform-browser/animations'; /** Uses NoopAnimationsModule to simulate animations*/
/** Uses BrowserDynamicTestingModule to bootstrap browser for testing*/
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { RouterTestingModule } from '@angular/router/testing'; /** Uses RouterTestingModule to test routing*/
/** Angular nontesting dependencies*/
import { FormsModule } from '@angular/forms';
/** These last three lines are the dependencies created for this project. */
import { Contact, ContactService, FavoriteIconDirective, InvalidEmailModalComponent, InvalidPhoneNumberModalComponent } from '../shared';
import { AppMaterialModule } from '../../app.material.module';
import { ContactEditComponent } from './contact-edit.component';

import '../../../material-app-theme.scss';

describe('ContactEditComponent tests', () => {
  let fixture: ComponentFixture<ContactEditComponent>;
  let component: ContactEditComponent;
  let rootElement: DebugElement;

  const contactServiceStub = {
    contact: {
      id: 1,
      name: 'janet'
    },

    /** Sets the passed-in object to the component’s contact property*/
    save: async function (contact: Contact) {
      component.contact = contact;
    },

    /** Method that sets the current contact to the component’s contact property and
     returns that contact*/
    getContact: async function () {
      component.contact = this.contact;
      return this.contact;
    },

    /** Method that updates the contact object*/
    updateContact: async function (contact: Contact) {
      component.contact = contact;
    }
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        ContactEditComponent,
        FavoriteIconDirective,
        InvalidPhoneNumberModalComponent,
        InvalidEmailModalComponent],
      imports: [
        AppMaterialModule,
        FormsModule,
        NoopAnimationsModule,
        RouterTestingModule
      ],
      providers: [{provide: ContactService, useValue: contactServiceStub}]
      /** This is where you use the contactServiceStub instead of the real service.*/
    }); /** Configuring TestBed to be used in your tests*/

    TestBed.overrideModule(BrowserDynamicTestingModule, {
      set: {
        entryComponents: [InvalidEmailModalComponent, InvalidPhoneNumberModalComponent]
      }
    });
  }); /** You have to use overrideModule because a couple of components will be lazily loaded.*/

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    rootElement = fixture.debugElement;
  });

  /** saveContact method test*/
  describe('saveContact() test', () => {
    it('should display contact name after contact set', fakeAsync(() => {
      const contact = { /** The contact object you’ll save */
        id: 1,
        name: 'lorace'
      };

      component.isLoading = false; /** Sets isLoading to false to hide the progress bar*/
      component.saveContact(contact); /** Saves the contact object*/
      fixture.detectChanges(); /** Uses the detectChanges method to trigger change detection*/
      const nameInput = rootElement.query(By.css('.contact-name')); /** Gets the nameInput form field*/
      tick(); /** Simulates the passage of time using tick*/
      expect(nameInput.nativeElement.value).toBe('lorace'); /** Checks to see if the name property has been set correctly*/
    }));
  });

  /** loadContact method test*/
  describe('loadContact() test', () => {
    it('should load contact', fakeAsync(() => {
      component.isLoading = false;
      component.loadContact(); /** Executes the loadContact method*/
      fixture.detectChanges();
      const nameInput = rootElement.query(By.css('.contact-name'));
      tick();
      expect(nameInput.nativeElement.value).toBe('janet');
      /** The default contact that’s loaded has a value of janet for the name property.*/
    }));
  });

  /** updateContact method test*/
  describe('updateContact() tests', () => {

    it('should update the contact', fakeAsync(() => {
      const newContact = {
        id: 1,
        name: 'delia',
        email: 'delia@example.com',
        number: '1234567890'
      };

      component.contact = {
        id: 2,
        name: 'rhonda',
        email: 'rhonda@example.com',
        number: '1234567890'
      };

      component.isLoading = false;
      fixture.detectChanges();
      const nameInput = rootElement.query(By.css('.contact-name'));
      tick();
      expect(nameInput.nativeElement.value).toBe('rhonda');

      component.updateContact(newContact); /** Updates the existing contact to the newContact object*/
      fixture.detectChanges(); /** Triggers change detection.*/
      tick(100); /** Simulates the passage of time, in this case 100 milliseconds*/
      expect(nameInput.nativeElement.value).toBe('delia');
      /** Checks to see that the value in the nameInput form field has been changed correctly*/
    }));

    // it('should not update the contact if email is invalid', fakeAsync(() => {
    //   const newContact = {
    //     id: 1,
    //     name: 'london',
    //     email: 'london@example', /** Email is invalid */
    //     number: '1234567890'
    //   };
    //
    //   component.contact = {
    //     id: 2,
    //     name: 'chauncey',
    //     email: 'chauncey@example.com',
    //     number: '1234567890'
    //   };
    //
    //   component.isLoading = false;
    //   fixture.detectChanges();
    //   const nameInput = rootElement.query(By.css('.contact-name'));
    //   tick();
    //   expect(nameInput.nativeElement.value).toBe('chauncey');
    //
    //   component.updateContact(newContact);
    //   fixture.detectChanges();
    //   tick(100);
    //   expect(nameInput.nativeElement.value).toBe('chauncey');
    //   /** Because the email is invalid, the contact shouldn’t be updated using
    //    the newContact object, so the contact name should be the same. */
    // }));
    //
    // it('should not update the contact if phone number is invalid', fakeAsync(() => {
    //   const newContact = {
    //     id: 1,
    //     name: 'london',
    //     email: 'london@example', /** Number is invalid */
    //     number: '123456789'
    //   };
    //
    //   component.contact = {
    //     id: 2,
    //     name: 'chauncey',
    //     email: 'chauncey@example.com',
    //     number: '1234567890'
    //   };
    //
    //   component.isLoading = false;
    //   fixture.detectChanges();
    //   const nameInput = rootElement.query(By.css('.contact-name'));
    //   tick();
    //   expect(nameInput.nativeElement.value).toBe('chauncey');
    //
    //   component.updateContact(newContact);
    //   fixture.detectChanges();
    //   tick(100);
    //   expect(nameInput.nativeElement.value).toBe('chauncey');
    //   /** Because the number is invalid, the contact shouldn’t be updated using the newContact
    //    object, so the contact name should be the same. */
    // }));
  });

});
