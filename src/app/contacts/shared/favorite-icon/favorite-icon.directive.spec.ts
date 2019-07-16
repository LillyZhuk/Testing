import { Component } from '@angular/core';
import { ComponentFixture, TestBed, TestModuleMetadata } from '@angular/core/testing';
import { constants } from './favorite-icon.constants';
import { FavoriteIconDirective } from './favorite-icon.directive';
import { getStarElement, doClassesMatch } from '../../testing';

@Component({
  template: `
    <i [appFavoriteIcon]="true"></i>
    <i [appFavoriteIcon]="false"></i>
    <i [appFavoriteIcon]="true" [color]="'blue'"></i>
    <i [appFavoriteIcon]="true" [color]="'cat'"></i>
  `
})
class TestComponent { }

describe('Directive: FavoriteIconDirective', () => {
  let fixture: ComponentFixture<any>;
  const expectedSolidStarList = constants.classes.SOLID_STAR_STYLE_LIST;
  const expectedOutlineStarList = constants.classes.OUTLINE_STAR_STYLE_LIST;

  beforeEach(() => {
    /** Declares the testModuleMetadata to contain the information needed to configure TestBed*/
    const testModuleMetadata: TestModuleMetadata = {
      declarations: [FavoriteIconDirective, TestComponent]
    };
    /** Configures TestBed using the testModuleMetadata variable*/
    fixture = TestBed.configureTestingModule(testModuleMetadata)
      .createComponent(TestComponent); /** Uses TestBed.createComponent to create a component fixture to use with your tests*/
    fixture.detectChanges(); /** Uses detectChanges to initiate change detection*/
  });

  describe('when favorite icon is set to true', () => {
    let startElement = null;

     beforeEach(() => {
      const defaultTrueElementIndex = 0;
      startElement = getStarElement(fixture, defaultTrueElementIndex);
    });

     it('should display a solid gold star after the page loads', () => {
       expect(startElement.style.color).toBe('gold');
       expect(doClassesMatch(startElement.classList, expectedSolidStarList)).toBeTruthy();
     });

     it('should display a solid gold star if the user rolls over the star', () => {
       const event = new Event('mouseenter');
       startElement.dispatchEvent(event);

       expect(startElement.style.color).toBe('gold');
       expect(doClassesMatch(startElement.classList, expectedSolidStarList)).toBeTruthy();
     });

     it('should display a black outline of a star after the user clicks on the star', () => {
       const event = new Event('click');
       startElement.dispatchEvent(event);

       expect(startElement.style.color).toBe('black');
       expect(doClassesMatch(startElement.classList, expectedOutlineStarList)).toBeTruthy();
     });
  });

  afterEach(() => { fixture = null; });
});
