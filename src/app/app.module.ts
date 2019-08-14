import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import 'bootstrap';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import {AppRoutingModule} from './app-routing.module';
import {CoreModule} from './core/core.module';
import { FooterComponent } from './main-menu/footer/footer.component';
import { HeaderComponent } from './main-menu/header/header.component';
import { StudyComponent } from './main-menu/study/study.component';
import { TestComponent } from './main-menu/test/test.component';
import { MyhouseComponent } from './main-menu/myhouse/myhouse.component';
import { BestComponent } from './main-menu/best/best.component';
import { InfoComponent } from './main-menu/info/info.component'; // for bootstrap modal

@NgModule({
  declarations: [
    AppComponent,
    MainMenuComponent,
    PageNotFoundComponent,
    FooterComponent,
    HeaderComponent,
    StudyComponent,
    TestComponent,
    MyhouseComponent,
    BestComponent,
    InfoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    CoreModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
