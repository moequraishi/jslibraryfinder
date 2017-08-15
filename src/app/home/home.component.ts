import { Component, Input } from '@angular/core';
import * as $ from 'jquery';
import { SearchService } from './search.service';
import { Subject } from 'rxjs/Subject';
import { AuthService } from '../auth.service';
import { TodoComponent } from '../home/todo';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
    providers: [SearchService, AuthService, TodoComponent]
//    animations: [
//      trigger('heroState', [
//        state('inactive', style({
//          backgroundColor: '#eee',
//          transform: 'scale(1)'
//        })),
//        state('active',   style({
//          backgroundColor: '#cfd8dc',
//          transform: 'scale(1.1)'
//        })),
//        transition('inactive => active', animate('100ms ease-in')),
//        transition('active => inactive', animate('100ms ease-out'))
//      ])
//    ]
})
export class HomeComponent {
    todos$: FirebaseListObservable<any[]>;
    items: FirebaseListObservable<any[]>;
    resText: any;

    finalText: string = $(this).siblings('.api-txt').text();
//    finalText: string;

    results: Object;
    searchTerm$ = new Subject<string>();

    constructor(private searchService: SearchService,
               public authService: AuthService,
               private myApiList: TodoComponent,
               private af: AngularFireDatabase) {
        this.searchService.search(this.searchTerm$)
            .subscribe(results => {
            this.results = results.results;
            console.log(results);
            // If Search box contains no text slide header down
            if ($('.search-box').val() === '') {
                $('.welcome-row').slideDown(400);
            // Else hide the welcome header
            } else {
                $('.welcome-row').slideUp(400);
            }
        });
        this.todos$ = this.af.list('/api-list');
        this.resText = $(this).siblings('.api-txt').text();
    }

    sendData(api: any) {
        this.todos$.push({message: api});
        const resText = $(api).siblings('.api-text').text();
        const finalText = String(resText);
        console.log(finalText);
    }

    addToList(element: string) {
        const currentApiText = $(element).siblings('.api-txt').select();
        const resText = $(element).siblings('.api-txt').text();
        const finalText = String(resText);
        console.log(finalText);
        this.sendData(finalText);
    }

    copyText(el: string) {
        const currentApiText = $(el).siblings('.api-txt').select();
        document.execCommand('copy');
    }

    copyWithScript(el: string) {
        const currentScriptApitText = $(el).siblings('.api-script-txt').select();
        document.execCommand('copy');
    }

    copyMyListText(el: string) {
        $(el).siblings('.success-txt').show();
        const currentApiText = $(el).siblings('#my-list').select();
        document.execCommand('copy');
        $(el).siblings('.success-txt').html('Successfully Copied!').fadeOut(1500);
        $('#my-list').animate({backgroundColor: '#e74c3c'}, 'slow');
    }

    deleteTodo(todo: any): void {
        this.af.object('/api-list/' + todo.$key).remove();

        $(todo).find('.error-txt').html('Item has been Deleted!').fadeOut(1500);
      }

    showMore() {
        $('.more-list').removeClass('display-none');

        $('body, html').animate({
          scrollTop: $($('.full-list')).offset().top
        }, 300);
        const currentResults: number = $('.more-list').length + 1;
        console.log(currentResults);
        $('.more-list').slice(currentResults).hide();
    }

    onScroll() {
        console.log('scrolled!!');
    }
    
//    keyPress(event: KeyboardEvent) {
//        const val = $('.search-box').val().toLowerCase();
//        if ($('.search-box').val() === '') {
//            $('.welcome-row').slideDown('slow');
//        } else {
//            $('.welcome-row').slideUp('slow');
//        }
//    }
}
