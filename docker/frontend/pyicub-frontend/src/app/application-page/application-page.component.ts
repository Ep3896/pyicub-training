import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {AppStateService} from "../services/app-state.service";
import {Plugin} from "../types/Plugin";
import {MatDialog} from "@angular/material/dialog";
import {PluginDialogComponent} from "../plugin-dialog/plugin-dialog.component";
import {ApplicationArgsDialogComponent} from "../application-args-dialog/application-args-dialog.component";
import {ActivatedRoute, Router} from "@angular/router";
import {Application} from "../types/Application";
import {SavedDashboardDialogComponent} from "../saved-dashboard-dialog/saved-dashboard-dialog.component";
import {RestoreSessionDialogComponent} from "../restore-session-dialog/restore-session-dialog.component";
import {SessionStorageService} from "../services/session-storage.service";

@Component({
  selector: 'app-application-page',
  templateUrl: './application-page.component.html',
  styleUrl: './application-page.component.css'
})
export class ApplicationPageComponent implements OnInit{

  application:Application;
  canShowApplication = false;
  editModeEnabled = false;

  constructor(private route:ActivatedRoute, private router:Router, public appState:AppStateService,public dialog: MatDialog,private changeDec:ChangeDetectorRef, private sessionStorage:SessionStorageService) {}

  openSettingsDialog() {
    const dialogRef = this.dialog.open(PluginDialogComponent, {
      data: this.appState.selectedRobot.selectedApplication,
      disableClose: true //evita che il dialog si chiuda cliccando all'esterno del suo frame
    });
  }

  toggleEditMode(){
    this.editModeEnabled = !this.editModeEnabled;
  }

  openArgsDialog(){
    const dialogRef = this.dialog.open(ApplicationArgsDialogComponent,{
      data: this.appState.selectedRobot.selectedApplication,
      disableClose: true
    })

    dialogRef.afterClosed().subscribe(args => {
      this.appState.configureApplication(this.application,args).subscribe(() => {
        this.application.isConfigured = true;
        this.sessionStorage.saveIsApplicationConfigured(this.application.robotName,this.application.name,true)
        this.canShowApplication = true;
      })
    })
  }

  openRestoreSessionDialog(){
    const dialogRef = this.dialog.open(RestoreSessionDialogComponent,{
      disableClose: true
    })

    dialogRef.afterClosed().subscribe(shouldRestore => {
      const argsTemplateExists = Object.keys(this.application.argsTemplate).length !== 0

      //se l'utente ha selezionato di ripristinare la sessione
      if(!shouldRestore){

        //ed esistono argomenti da selezionare, mostro il popup degli argomenti
        if(argsTemplateExists){
          this.application.args = {};
          this.application.isConfigured = false;
          this.sessionStorage.saveApplicationArgs(this.application.robotName,this.application.name,{})
          this.sessionStorage.saveIsApplicationConfigured(this.application.robotName,this.application.name,false)
          this.openArgsDialog()

          //e non esistono argomenti da selezionare, invio la configure vuota
        } else {
          this.appState.configureApplication(this.application,{}).subscribe(() => {
            this.application.isConfigured = true;
            this.sessionStorage.saveIsApplicationConfigured(this.application.robotName,this.application.name,true)
            this.canShowApplication = true;
          })
        }

      } else {
        this.canShowApplication = true;
      }

    })

  }

  openSavedDashboardDialog(){
    const dialogRef = this.dialog.open(SavedDashboardDialogComponent)
  }

  onClick(){
    this.openSettingsDialog()
  }

  onSaveClick(){
    this.appState.saveDashboardConfig(this.application)
    this.openSavedDashboardDialog()
    console.log("Dashboard salvata")
  }

  onPluginToggle(plugin:Plugin){
    this.appState.selectedRobot.selectedApplication.togglePlugin(plugin)
  }

  ngOnInit() {
    this.appState.availableRobots$.subscribe(robots => {
      if(robots){
        this.route.paramMap.subscribe(params => {
          const robotName = params.get('robotName');
          const appName = params.get('appName');

          //se i parametri inseriti non corrispondono a nessuna coppia robot-applicazione reindirizzo alla HomePage
          let selectedRobot = robots.find(robot => robot.name === robotName)

          if(!selectedRobot){
            this.router.navigate([''])
            console.log("Non è stata trovata un robot corrispondente a quello indicata. Reindirizzo in Homepage.")
            return
          }

          let selectedApplication = selectedRobot.applications.find(application => application.name === appName)

          if(!selectedApplication){
            this.router.navigate([''])
            console.log("Non è stata trovata un' applicazione corrispondente a quella indicata. Reindirizzo in Homepage.")
            return
          }


          if(!this.appState.selectedRobot || this.appState.selectedRobot.name !== robotName){
            this.appState.selectRobot(selectedRobot)
          }

          this.appState.selectApplication(selectedApplication)
          this.application = selectedApplication

          //Se gli argomenti non sono stati gia impostati dall'utente, mostro il dialog per settarli
          //quindi se argsTemplate non è vuoto e args lo è
          const argsTemplateExists = Object.keys(this.application.argsTemplate).length !== 0
          const areArgsSet = this.application.args && Object.keys(this.application.args).length !== 0
          const isApplicationConfigured = this.application.isConfigured;
          //se l'applicazione è gia stata configurata mostro il dialog per scegliere se ripristinare la sessione
          if(isApplicationConfigured){

            this.openRestoreSessionDialog()

            //se l'applicazione non è gia stata configurata e non ci sono argomenti da configurare, invio la configure senza parametri
          } else if(!argsTemplateExists){
            this.appState.configureApplication(this.application, {}).subscribe(() => {
              this.application.isConfigured = true;
              this.sessionStorage.saveIsApplicationConfigured(this.application.robotName,this.application.name,true)
              this.canShowApplication = true;
            })

            //se l'applicazione non è gia stata configurata, ci sono argomenti da configurare e non sono stati ancora selezionati, mostro il dialog per la scelta degli argomenti
          } else if(!areArgsSet){
            this.openArgsDialog()
          }

          /*
          if(!argsTemplateExists){
            this.canShowApplication = true;
          }else if(!areArgsSet){
            this.openArgsDialog()
          } else {
            this.openRestoreSessionDialog()
          }
          */

          //Il timeout senza durate serve per mettere l'evento in coda a tutte le altre attività asincrone
          setTimeout(() => {
            this.changeDec.detectChanges()
          })
        })

      }
    })

  }

}
