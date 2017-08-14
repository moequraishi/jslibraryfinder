import { Component } from '@angular/core';
import * as $ from 'jquery';
import { SearchService } from './search.service';
import { Subject } from 'rxjs/Subject';
import { AuthService } from '../auth.service';
import { InfiniteScrollModule } from 'angular2-infinite-scroll';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { TodoComponent } from '../home/todo';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
    providers: [SearchService, AuthService, TodoComponent]
})
export class HomeComponent {
    todos$: FirebaseListObservable<any[]>;
    items: FirebaseListObservable<any[]>;
    
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
    }

    sendData(api: any) {
        this.todos$.push({message: api});
        const resText = $(api).siblings('.api-text').text();
        const finalText = String(resText);
        console.log(finalText);
    }

    addToList(elements: string) {
        const currentApiText = $(elements).siblings('.api-txt').select();
        const resText = $(elements).siblings('.api-txt').text();
        const finalText = String(resText);
        console.log(finalText);
        this.sendData(finalText);
    }

    copyText(el: string) {
        const currentApiText = $(el).siblings('.api-txt').select();
        currentApiText;
        document.execCommand('copy');
    }

    copyWithScript(el: string) {
        const currentScriptApitText = $(el).siblings('.api-script-txt').select();
        currentScriptApitText
        document.execCommand('copy');
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
