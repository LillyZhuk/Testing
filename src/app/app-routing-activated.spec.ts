import { Component, OnInit, DebugElement } from '@angular/core';
import { Location } from '@angular/common';
import { By } from '@angular/platform-browser';
import { TestBed, inject, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs'

@Component({
    selector: 'app-contact-edit',
    template: `<div class="contact-id">{{ contactId }}</div>`
})
class ContactEditComponent implements OnInit {
    private contactId: number;
    constructor(private activatedRoute: ActivatedRoute) { }
    ngOnInit () {
        this.contactId = this.activatedRoute.snapshot.params['id'];
    }
}

describe('Testing activated routes', () => {
    let fixture;
    const mockActivateRoute = {
        snapshot: {
            params: {
                id: 'aMockId'
            }
        }
    };

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                { provide: ActivatedRoute, useValue: mockActivateRoute }
            ],
            declarations: [ContactEditComponent],
        });
    });

    beforeEach(async(() => {
        fixture = TestBed.createComponent(ContactEditComponent),
        fixture.detectChanges();
    }));

    it('Tries to route to a page', async(() => {
        let testEl = fixture.debugElement.query(By.css('div'));
        expect(testEl.nativeElement.textContent).toEqual('aMockId');
    }));

    /** If your component uses properties of ActivatedRoute that emit observables */

    // const paramsMock = Observable.create((observer) => {
    //    observer.next({
    //      id: 'aMockId'
    //    });
    //    observer.complete();
    // });

    // beforeEach(() => {
    //     TestBed.configureTestingModule({
    //         providers: [
    //             { provide: ActivatedRoute, useValue: {params: paramsMock} }
    //         ],
    //         declarations: [ContactEditComponent],
    //     });
    // });
});
