import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { LoginModalService, AccountService, Account } from 'app/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'jhi-home',
  templateUrl: './home.component.html',
  styleUrls: ['home.scss']
})
export class HomeComponent implements OnInit, AfterViewChecked {
  ngAfterViewChecked(): void {
    if (
      this.checkOnce === true &&
      this.webUrl !== null &&
      this.webUrl !== '' &&
      typeof this.webUrl !== undefined &&
      typeof this.webUrl !== 'undefined'
    ) {
      this.httpClient.get(this.webUrl, { responseType: 'text' }).subscribe(html => {
        this.htmlTemplate = html;
        console.log(html);
      });
      this.checkOnce = false;
    }
  }
  collectionSize = 10;
  collectionSize1 = 10;
  collectionSize2 = 10;
   collectionSize3 = 10;
  page1 = 1;
  page = 1;
  page2=1;
   page3=1;
  response: any = [];
  science: any = [];
  sport: any = [];
  india: any = [];
  checkOnce = false;
  account: Account;
  modalRef: NgbModalRef;
  webUrl: string;
  htmlTemplate: string;
  constructor(
    private accountService: AccountService,
    private loginModalService: LoginModalService,
    private eventManager: JhiEventManager,
    private httpClient: HttpClient
  ) {}

  ngOnInit() {
    this.accountService.identity().then((account: Account) => {
      this.account = account;
    });
    this.registerAuthenticationSuccess();
    var test = '';
    //    this.httpClient.get('/api/test').subscribe(
    //            data  => {
    //                alert("News Success");
    //                console.log(data);
    ////              },
    ////              error => {
    ////                alert("ERROR");
    //              });
    //    this.httpClient.get('/api/test', { responseType: 'text' }).subscribe(data => {
    //      alert('News Success');
    //      console.log(data);
    //    });
    this.httpClient
      .get('https://content.guardianapis.com/search?api-key=2fa8a7c8-6734-4c31-a1d4-39f0cda0c25d&from-date=1991-01-01')
      .subscribe((data: any) => {
        console.log(data);
        this.collectionSize = data.response.total;
        this.addResponse(data);

        console.log(this.response);
        console.log(data.response.results[0].webUrl);
        this.webUrl = data.response.results[0].webUrl;
        //      this.checkOnce = true;
      });
    this.httpClient
      .get('https://content.guardianapis.com/search?section=science&from-date=1991-01-01&api-key=2fa8a7c8-6734-4c31-a1d4-39f0cda0c25d')
      .subscribe((data: any) => {
        console.log(data);
        this.collectionSize1 = data.response.total;
        this.addResponse1(data);

        console.log(this.science);
        console.log(data.response.results[0].webUrl);
        this.webUrl = data.response.results[0].webUrl;
        //      this.checkOnce = true;
      });
	  this.httpClient
      .get('https://content.guardianapis.com/search?q=india&from-date=1991-01-01&api-key=2fa8a7c8-6734-4c31-a1d4-39f0cda0c25d')
      .subscribe((data: any) => {
        console.log(data);
        this.collectionSize2 = data.response.total;
        this.addResponse2(data);

        console.log(this.india);
        console.log(data.response.results[0].webUrl);
        this.webUrl = data.response.results[0].webUrl;
        //      this.checkOnce = true;
      });
	   this.httpClient
      .get('https://content.guardianapis.com/search?section=sport&from-date=1991-01-01&api-key=2fa8a7c8-6734-4c31-a1d4-39f0cda0c25d')
      .subscribe((data: any) => {
        console.log(data);
        this.collectionSize3 = data.response.total;
        this.addResponse3(data);

        console.log(this.india);
        console.log(data.response.results[0].webUrl);
        this.webUrl = data.response.results[0].webUrl;
        //      this.checkOnce = true;
      });
  }
  addResponse(data: any) {
    for (var i = 0; i <= data.response.results.length; i++) {
      this.response.push({ webtitle: data.response.results[i].webTitle, weburl: data.response.results[i].webUrl });
    }
  }
  addResponse1(data: any) {
    for (var i = 0; i <= data.response.results.length; i++) {
      this.science.push({ webtitle: data.response.results[i].webTitle, weburl: data.response.results[i].webUrl });
    }
  }
   addResponse2(data: any) {
    for (var i = 0; i <= data.response.results.length; i++) {
      this.india.push({ webtitle: data.response.results[i].webTitle, weburl: data.response.results[i].webUrl });
    }
  }
    addResponse3(data: any) {
    for (var i = 0; i <= data.response.results.length; i++) {
      this.sport.push({ webtitle: data.response.results[i].webTitle, weburl: data.response.results[i].webUrl });
    }
  }
  registerAuthenticationSuccess() {
    this.eventManager.subscribe('authenticationSuccess', message => {
      this.accountService.identity().then(account => {
        this.account = account;
      });
    });
  }

  isAuthenticated() {
    return this.accountService.isAuthenticated();
  }

  login() {
    this.modalRef = this.loginModalService.open();
  }

  onPageChange(value) {
    console.log(value);
    this.response = [];
    this.httpClient
      .get('https://content.guardianapis.com/search?api-key=2fa8a7c8-6734-4c31-a1d4-39f0cda0c25d&from-date=1991-01-01&page=' + value)
      .subscribe((data: any) => {
        console.log(data);
        this.collectionSize = data.response.total;
        this.addResponse(data);
        console.log(this.response);
        console.log(data.response.results[0].webUrl);
        this.webUrl = data.response.results[0].webUrl;
        //          this.checkOnce = true;
      });
  }
  onPageChange1(value) {
    console.log(value);
    this.science = [];
    this.httpClient
      .get(
        'https://content.guardianapis.com/search?section=science&from-date=1991-01-01&api-key=2fa8a7c8-6734-4c31-a1d4-39f0cda0c25d&page=' +
          value
      )
      .subscribe((data: any) => {
        console.log(data);
        this.collectionSize1 = data.response.total;
        this.addResponse1(data);
        console.log(this.response);
        console.log(data.response.results[0].webUrl);
        this.webUrl = data.response.results[0].webUrl;
        //          this.checkOnce = true;
      });
  }
   onPageChange2(value) {
    console.log(value);
    this.india = [];
    this.httpClient
      .get(
        'https://content.guardianapis.com/search?q=india&from-date=1991-01-01&api-key=2fa8a7c8-6734-4c31-a1d4-39f0cda0c25d&page=' +
          value
      )
      .subscribe((data: any) => {
        console.log(data);
        this.collectionSize2 = data.response.total;
        this.addResponse2(data);
        console.log(this.response);
        console.log(data.response.results[0].webUrl);
        this.webUrl = data.response.results[0].webUrl;
        //          this.checkOnce = true;
      });
  }
   onPageChange3(value) {
    console.log(value);
    this.sport = [];
    this.httpClient
      .get(
        'https://content.guardianapis.com/search?section=sport&from-date=1991-01-01&api-key=2fa8a7c8-6734-4c31-a1d4-39f0cda0c25d&page=' +
          value
      )
      .subscribe((data: any) => {
        console.log(data);
        this.collectionSize3 = data.response.total;
        this.addResponse3(data);
        console.log(this.response);
        console.log(data.response.results[0].webUrl);
        this.webUrl = data.response.results[0].webUrl;
        //          this.checkOnce = true;
      });
  }
}
