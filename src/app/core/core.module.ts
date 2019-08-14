import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {ServerService} from './server.service';
import {GeneralUtilityService} from './general-utility.service';
import {ViewStateService} from './view-state.service';
import {UserService} from './user.service';
import {ServerInterceptor} from './server.interceptor';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [ServerService, UserService,
    GeneralUtilityService, ViewStateService,
    {provide: HTTP_INTERCEPTORS, useClass: ServerInterceptor, multi: true}
  ]
})
export class CoreModule { }
