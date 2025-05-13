import {Component, OnInit} from '@angular/core';
import {WidgetBaseComponent} from '../../widget-base/widget-base.component';
import {forkJoin} from "rxjs";
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';

@Component({
  selector: 'app-robot-cam-viewer',
  templateUrl: './robot-cam-viewer.component.html',
  styleUrl: './robot-cam-viewer.component.css'
})
export class RobotCamViewerComponent extends WidgetBaseComponent implements OnInit {

  isLoading = true
  errorMessage: string = "";
  showErrorDialog: boolean = false;

  rightCamURI: SafeResourceUrl;
  camImgWidth: number = 0;
  camImgHeight: number = 0;

  constructor(private sanitizer: DomSanitizer) {
    super();
  }

  ngOnInit() {
    forkJoin({
      url: this.camRightGetURI(),
      imgSize: this.camRightGetImgRes()
    }).subscribe({

        next: result => {
          //console.log(result)
          const notSecureUrl = result.url.toString()
          this.rightCamURI = this.sanitizer.bypassSecurityTrustResourceUrl(notSecureUrl);
          this.camImgHeight = result.imgSize.height;
          this.camImgWidth = result.imgSize.width;
          this.isLoading = false;
        },
        error: err => {
          console.log(err)
          this.isLoading = false;
          this.openErrorDialog("Impossibile caricare il viewer.")
        }
      }
    )

  }

  openErrorDialog(errorMessage: string) {
    this.errorMessage = errorMessage;
    this.showErrorDialog = true;
  }

  closeErrorDialog() {
    this.errorMessage = "";
    this.showErrorDialog = false;
  }


}
