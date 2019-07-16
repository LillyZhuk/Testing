import Contact from './contact';

describe('Contact class tests', () => {
  let contact: Contact = null;
  beforeEach(() => {
    contact = new Contact();
  });
  it('should have a valid constructor', () => {
    expect(contact).not.toBeNull();
  });
  // it('should set name correctly through constructor', () => {
  //   // contact = new Contact('Liz');
  //   expect(contact.name).toEqual('Liz');
  // });
  it('should get and set id correctly', () => {
    contact.id = 1;
    expect(contact.id).toEqual(1);
  });
  it('should get and set name correctly', () => {
    contact.name = 'Liz';
    expect(contact.name).toEqual('Liz');
  });
  it('should get and set email correctly', () => {
    contact.email = 'liz@email.com';
    expect(contact.email).toEqual('liz@email.com');
  });
  it('should get and set country correctly', () => {
    contact.country = 'USA';
    expect(contact.country).toEqual('USA');
  });
  afterEach(() => {
    contact = null;
  });
});
