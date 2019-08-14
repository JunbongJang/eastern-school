import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';
import {ServerService} from './server.service';
import {environment} from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userInitialized = new Subject<boolean>();
  user_initialized_bool = false;

  view_lev = '1';
  view_chap = '1';

  reading_park_ho_map = {
    'best1': 13,
    'best2': 16,
    'best3': 18,
    'best4': 20,
    'best5': 21,
    'best6': 22,
    'best7': 19,
    'best8': 24,
  };

  private _jindo = {
    uid: '', // 1000050543
    user_id: 'testup1',
    user_name: '',
    study_gubun: 'academy',
    learn_gubun: 'vocabulary',
    lev: '1',
    chap: '1',
    sec: '1',
    study_date: '2016-07-11 15:31:13',
    today: '2016-07-11',
    today_cnt: '1',
    total_cnt: '1',
    academy: '1003'
  };

  constructor(private serverService: ServerService) { }


  checkMasterPerm() {
    // return parseInt(this.user.mb_level, 10) > 2;
  }

  get jindo(): { today_cnt: string; user_name: string; study_gubun: string; learn_gubun: string; sec: string; uid: string; total_cnt: string; user_id: string; today: string; study_date: string; chap: string; lev: string; academy: string } {
    return this._jindo;
  }

  set jindo(value: { today_cnt: string; user_name: string; study_gubun: string; learn_gubun: string; sec: string; uid: string; total_cnt: string; user_id: string; today: string; study_date: string; chap: string; lev: string; academy: string }) {
    this._jindo = value;
    this.view_lev = this._jindo.lev;
    this.view_chap = this._jindo.chap;
  }

  /**
   * newly added on 8/2/2019 because of china.
   * 중국용 호수 변경
   * @param input_ho
   */
  hoToViewHo(input_ho: string): string {
    let local_view_ho: string = input_ho;
    if (environment.chinese) {
      if (input_ho === '10') {
        local_view_ho = '9';
      } else if (input_ho === '11') {
        local_view_ho = '10';
      } else if (input_ho === '13') {
        local_view_ho = 'Best1';
      } else if (input_ho === '16') {
        local_view_ho = 'Best2';
      } else if (input_ho === '18') {
        local_view_ho = 'Best3';
      } else if (input_ho === '20') {
        local_view_ho = 'Best4';
      } else if (input_ho === '21') {
        local_view_ho = 'Best5';
      } else if (input_ho === '22') {
        local_view_ho = 'Best6';
      } else if (input_ho === '19') {
        local_view_ho = 'Best7';
      } else if (input_ho === '24') {
        local_view_ho = 'Best8';
      }
    }
    return local_view_ho;
  }

  viewHoToHo(view_ho: string): string {
    let local_ho: string = view_ho;
    if (environment.chinese) {
      if (view_ho === '9') {
        local_ho = '10';
      } else if (view_ho === '10') {
        local_ho = '11';
      } else if (view_ho === 'Best1') {
        local_ho = '13';
      } else if (view_ho === 'Best2') {
        local_ho = '16';
      } else if (view_ho === 'Best3') {
        local_ho = '18';
      } else if (view_ho === 'Best4') {
        local_ho = '20';
      } else if (view_ho === 'Best5') {
        local_ho = '21';
      } else if (view_ho === 'Best6') {
        local_ho = '22';
      } else if (view_ho === 'Best7') {
        local_ho = '19';
      } else if (view_ho === 'Best8') {
        local_ho = '24';
      }
    }

    return local_ho;
  }
}
