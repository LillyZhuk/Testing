import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactsComponent } from './contacts.component';
import { Contact } from './shared/models';

/**  block to create your test suite */
describe('ContactsComponent test', () => {
  /** Declaration of the contactsComponent variable initialized to null */
  let contactsComponent: ContactsComponent = null;

  /** A new instance of ContactsComponent will be set
   before each test using the beforeEach method.*/
  beforeEach(() => {
    contactsComponent = new ContactsComponent();
  });

  /**  The assertion where you test whether
   the component is set correctly*/
  it('should set instance correctly', () => {
    expect(contactsComponent).not.toBeNull();
  });

  /** Assertion to test that there should be no contacts by default*/
  it('should be no contacts if there is no dat', () => {
    expect(contactsComponent.contacts.length).toBe(0);
  });

  it('should be contacts if there is data', () => {
    const newContact: Contact = {
      id: 1,
      name: 'Jason Pipemaker'
    };
    const contactList: Array<Contact> = [newContact];
    contactsComponent.contacts = contactList;

    /** Assertion to test that if one contact is added, then the number of contacts in
     the contact array should be 1*/
    expect(contactsComponent.contacts.length).toBe(1);
  });
  // let fixture: ComponentFixture<ContactsComponent>;
  //
  // beforeEach(async(() => {
  //   TestBed.configureTestingModule({
  //     declarations: [ ContactsComponent ]
  //   })
  //   .compileComponents();
  // }));
  //
  // beforeEach(() => {
  //   fixture = TestBed.createComponent(ContactsComponent);
  //   component = fixture.componentInstance;
  //   fixture.detectChanges();
  // });
  //
  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
