import {Component, OnDestroy, OnInit} from '@angular/core';
import {ViewStateService} from '../../core/view-state.service';
import {UserService} from '../../core/user.service';
import {Title} from '@angular/platform-browser';
import {Subscription} from 'rxjs';
import {ServerService} from '../../core/server.service';

@Component({
  selector: 'app-study',
  templateUrl: './study.component.html',
  styleUrls: ['./study.component.css']
})
export class StudyComponent implements OnInit, OnDestroy {

  level_chapter_map = {
    L1: 4,
    L2: 6,
    L3: 5,
    L4: 6,
    L5: 5,
    L6: 5,
    L7: 5,
    L8: 5
  };
  icon_list = ['assets/img/writing_person.gif'];
  learn_subject_list = ['aaaaa', 'bbbb', 'cccc', 'dddd', 'eee', 'ffff', 'ggg', 'hhhh'];

  constructor(private viewStateService: ViewStateService,
              public userService: UserService,
              private serverService: ServerService,
              private titleService: Title) { }

  ngOnInit() {

    this.titleService.setTitle( 'Reading Adventure - Study' );
    // if user intialized!!!
    this.userService.userInitialized.subscribe((passed_bool) => {
        this.serverService.getLevelSetupFromServer(this.userService.jindo.learn_gubun).subscribe((setup_string) => {
            console.log('getLevelSetupFromServer:');
            const json_result = JSON.parse(setup_string);
            console.log(json_result);

            this.learn_subject_list = [];
            const arrayLength = json_result.length;
            for (let i = 0; i < arrayLength; i++) {
              this.learn_subject_list.push(json_result[i].learn_subject);
            }
          },
          (error) => {
            console.log(error);
          });

      this.updateStudyView();
      },
      (error) => {
        console.log(error);
      });

    this.viewStateService.viewStateSubChanged.subscribe((passed_bool) => {
        this.updateStudyView();
      },
      (error) => {
        console.log(error);
      });

  }

  ngOnDestroy(): void {
  }

  updateStudyView() {
    this.serverService.getStudySetupFromServer(this.viewStateService.view_state_sub, this.userService.view_lev, this.userService.view_chap).subscribe((setup_string) => {
        console.log('getStudySetupFromServer:');
        const json_result = JSON.parse(setup_string);
        console.log(json_result);

        this.icon_list = [];
        const arrayLength = json_result.length;
        for (let i = 0; i < arrayLength; i++) {
          this.icon_list.push(json_result[i].icon_name);
        }
      },
      (error) => {
        console.log(error);
      });
  }

  displayAbreViewStateSub(): string {
    if (this.viewStateService.STUDY_VOCAB === this.viewStateService.view_state_sub) {
      return 'vo';
    } else if (this.viewStateService.STUDY_STORY === this.viewStateService.view_state_sub) {
      return 'st';
    } else if (this.viewStateService.STUDY_GRAMMAR === this.viewStateService.view_state_sub) {
      return 'gr';
    } else if (this.viewStateService.STUDY_LISTEN === this.viewStateService.view_state_sub) {
      return 'li';
    } else if (this.viewStateService.STUDY_SPEAK === this.viewStateService.view_state_sub) {
      return 'sp';
    } else if (this.viewStateService.STUDY_FINAL === this.viewStateService.view_state_sub) {
      return 'te';
    }
  }

  openPopup( study_num: number) {
    let popup_url = 'https://www.easternschool.co.kr/academy/test/';
    let study_string = '';
    if (study_num < 10) {
      study_string = '0' + study_num.toString(10);
    } else {
      study_string = study_num.toString(10);
    }
    // if (this.checkMasterPerm()) {
      if (this.displayAbreViewStateSub() === 'te') {
        popup_url += this.viewStateService.view_state_sub + `/L${this.userService.view_lev}/L${this.userService.view_lev}_${this.userService.view_chap}_final.html`;
      } else {
        popup_url += this.viewStateService.view_state_sub + `/L${this.userService.view_lev}/L${this.userService.view_lev}_${this.userService.view_chap}_${this.displayAbreViewStateSub()}_${study_string}.html`;
      }
      window.open(popup_url, '_blank');   // 1.vocabulary/L1/L1_1_vo_01.html
    // } else {
    //   alert('Finish previous sections first!');
    // }
  }

  changeLevel(new_level: number) {
    this.userService.view_lev = new_level.toString(10);
  }
  changeChapter(new_chapter: number) {
    this.userService.view_chap = new_chapter.toString(10);
  }

  numToString(a_num: number) {
    return a_num.toString(10);
  }

  makeChapterListFromLevel() {
    const max_chapter = this.level_chapter_map['L' + this.userService.view_lev];
    const chapter_list: Array<number> = [];
    for (let i = 1; i <= max_chapter; i++) {
      chapter_list.push(i);
    }
    return chapter_list;
  }

  makeListWithMax(max_val) {
    const a_list = [];
    for (let i = 0; i < max_val; i++) {
      a_list.push(i);
    }
    return a_list;
  }

  getCurrentSubjectLearn() {
    const index = parseInt(this.userService.view_lev, 10);
    return this.learn_subject_list[index - 1];
  }

}
