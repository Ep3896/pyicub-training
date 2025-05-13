import { Component,OnInit } from '@angular/core';
import {Robot} from "./types/Robot";
import {NavigationEnd, Router} from "@angular/router";
import {Application} from "./types/Application";
import {AppStateService} from "./services/app-state.service";
import {filter} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{

  isDrawerOpened:boolean = false;
  robots$ = this.appState.availableRobots$;
  isLoadingRobots$ = this.appState.isLoadingRobots$;
  selectedRobot$ = this.appState.selectedRobot$;
  showAppbarRobotCell:boolean = false;
  showAppbarApplicationCell:boolean = false;

  constructor(private appState:AppStateService, public router:Router){}

  onReloadButtonClick(){
    this.appState.updateRobots();
  }

  onDrawerCellClick(robot:Robot){

    if(!this.appState.selectedRobot || this.appState.selectedRobot.name !== robot.name){
      this.appState.selectRobot(robot);
    }

    if(this.router.url !== `/${robot.name}`){
      this.router.navigate([`${robot.name}`]);
    }

    this.isDrawerOpened = false;
  }

  onAppBarRobotCellClick(robot:Robot){
    console.log(robot);
  }

  onAppBarApplicationCellClick(application:Application){
    this.appState.selectedRobot.selectedApplication = undefined;
    this.router.navigate([`${application.robotName}`]);
  }

  onAppBarButtonClick(){
    this.isDrawerOpened = !this.isDrawerOpened;
  }

  ngOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      const path = event.url.substring(1);
      let segments = path.split('/').filter(segment => segment.length > 0);
      //console.log(segments)
      //console.log(segments.length)

      if(segments.length == 0){
        this.showAppbarApplicationCell = false;
        this.showAppbarRobotCell = false;
      } else if(segments.length < 2){
        this.showAppbarRobotCell = true;
        this.showAppbarApplicationCell = false;
      } else{
        this.showAppbarRobotCell = true;
        this.showAppbarApplicationCell = true;
      }

    });
  }

  /*
  ngOnInit() {
    console.log(this.route)
    this.route.paramMap.subscribe(params => {
      console.log("SUBSCRIBE")
      const robotName = params.get('robotName');
      const appName = params.get('appName');

      if(this.appState.selectedRobot && robotName){
        this.showAppbarRobotCell = true;

        if(this.appState.selectedRobot.selectedApplication && appName){
          this.showAppbarApplicationCell = true;
        } else {
          this.showAppbarApplicationCell = false;
        }

      } else {
        this.showAppbarRobotCell = false;
        this.showAppbarApplicationCell = false;
      }


    })
  }


   */
}
