import {Component, OnInit} from '@angular/core';
import {Application} from "../types/Application";
import {ActivatedRoute, Router} from "@angular/router";
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {AppStateService} from "../services/app-state.service";

@Component({
  selector: 'app-applications-page',
  templateUrl: './applications-page.component.html',
  styleUrl: './applications-page.component.css'
})
export class ApplicationsPageComponent implements OnInit{

  //per eliminare il BreakpointObserver quando il componente è distrutto
  destroyed = new Subject<void>();
  selectedRobot$ = this.appState.selectedRobot$;
  gridColsNumber = 2;

  onApplicationClick(application:Application){
    this.appState.selectApplication(application);
    this.router.navigate([`${application.robotName}/${application.name}`]);
  }

  constructor(private route:ActivatedRoute,public appState:AppStateService,private router:Router,private breakpointObserver: BreakpointObserver) {
    breakpointObserver
      .observe([
        Breakpoints.XSmall,
        Breakpoints.Small,
        Breakpoints.Medium,
        Breakpoints.Large,
        Breakpoints.XLarge,
      ])
      .pipe(takeUntil(this.destroyed))
      .subscribe(result => {

        const breakpoint = Object.keys(result.breakpoints).find( key =>{
          return result.breakpoints[key]
        })

        switch(breakpoint){
          case Breakpoints.XSmall:
            this.gridColsNumber = 2;
            break;
          case Breakpoints.Small:
            this.gridColsNumber = 2;
            break;
          case Breakpoints.Medium:
            this.gridColsNumber = 3;
            break;
          case Breakpoints.Large:
            this.gridColsNumber = 4;
            break;
          case Breakpoints.XLarge:
            this.gridColsNumber = 5;
            break;
        }

      })
  }

  ngOnInit() {
    this.appState.availableRobots$.subscribe(robots => {
      if(robots){
        this.route.paramMap.subscribe(params => {
          const robotName = params.get('robotName');

          //se il parametro inserito non corrisponde a nessun robot, reindirizza in homepage
          let selectedRobot = robots.find(robot => robot.name === robotName)

          if(!selectedRobot){
            this.router.navigate([''])
            console.log("Non è stato trovato un robot corrispondente a quello indicato. Reindirizzo in Homepage.")
            return
          }

          if(!this.appState.selectedRobot || this.appState.selectedRobot.name !== robotName){
            this.appState.selectRobot(selectedRobot)
          }

        })
      }
    })
  }
}
