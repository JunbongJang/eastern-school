import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from '../core/user.service';
import {Title} from '@angular/platform-browser';
import {ServerService} from '../core/server.service';
import {ViewStateService} from '../core/view-state.service';
import {ActivatedRoute, Router} from '@angular/router';
import {environment} from '../../environments/environment.prod';
import {Subscription} from 'rxjs';
declare var $: any;

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css']
})
export class MainMenuComponent implements OnInit, OnDestroy {

  getUserSubcription: Subscription;

  constructor(public router: Router,
              public viewStateService: ViewStateService,
              public userService: UserService,
              private route: ActivatedRoute,
              private titleService: Title,
              private serverService: ServerService) { }

  ngOnInit() {
    this.setupSidebar();
    this.titleService.setTitle( 'Reading Adventure - Home' );
    this.serverService.checkLoggedInFromServer().subscribe((member_id: string) => {
        if (member_id !== '') { // assume the user page starts at vocab all the time
          this.getUserSubcription = this.serverService.getJindoFromServer(member_id, this.viewStateService.STUDY_VOCAB).subscribe((result) => {
              console.log('getJindoFromServer');
              console.log(result);
              if (result === '[]') {
                this.userService.jindo.user_id = member_id;
              } else {
                const json_result = JSON.parse(result);
                this.userService.jindo = <any>json_result[0];
              }
              this.userService.userInitialized.next(true);
            },
            (error) => {
              console.log(error);
            });
        } else {
          if (environment.chinese) {
            window.open('https://www.welleastern.cn/user/cn/?goto=https://www.easternschool.co.kr/academy/main/', '_self');
          } else {
            window.open('https://www.welleastern.co.kr/user/?goto=https://www.easternschool.co.kr/academy/main/', '_self');
          }
        }


      },
      (error) => {
        console.log(error);
      });


  } // ngOnInit ends here

  ngOnDestroy() {
    if (this.getUserSubcription !== undefined) {
      this.getUserSubcription.unsubscribe();
    }
  }

  setupSidebar() {
    $('.sidebar-dropdown > a').click(function() {
      $('.sidebar-submenu').slideUp(200);
      if (
        $(this)
          .parent()
          .hasClass('active')
      ) {
        $('.sidebar-dropdown').removeClass('active');
        $(this)
          .parent()
          .removeClass('active');
      } else {
        $('.sidebar-dropdown').removeClass('active');
        $(this)
          .next('.sidebar-submenu')
          .slideDown(200);
        $(this)
          .parent()
          .addClass('active');
      }
    });

    $('#close-sidebar').click(function() {
      $('.page-wrapper').removeClass('toggled');
    });
    $('.close-sidebar').click(function() {
      $('.page-wrapper').removeClass('toggled');
    });
    $('#show-sidebar').click(function() {
      $('.page-wrapper').addClass('toggled');
    });
  }

  viewStateChooseType(view_type: string, view_type_sub: string) {
    this.viewStateService.view_state = view_type;
    this.viewStateService.view_state_sub = view_type_sub;
    this.router.navigate([view_type], { relativeTo: this.route});
  }

  // viewStateChooseStudy(a_view: string) {
  //   if (this.userService.checkMasterPerm() || this.step_num >= step_num) {
  //     this.updateUserState(clicked_step_category, clicked_step);
  //     if (this.viewStateService.view_state !== a_view) {
  //       this.viewStateService.view_state = a_view;
  //       this.router.navigate([clicked_step_category + '/' + a_view]);
  //     }
  //   } else {
  //     alert('Finish previous sections first!');
  //   }
  // }

  notImplementedWarning() {
    if (environment.chinese) {
      alert('This feature is still in development.');
    } else {
      alert('이 기능은 아직 개발중입니다.');
    }
  }

}
