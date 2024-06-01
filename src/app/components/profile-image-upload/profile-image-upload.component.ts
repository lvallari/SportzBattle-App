import { Component, OnChanges,  EventEmitter, Input, Output } from '@angular/core';
import 'hammerjs';
import { ImageCroppedEvent, ImageCropperComponent } from 'ngx-image-cropper';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile-image-upload',
  standalone: true,
  imports: [CommonModule, ImageCropperComponent],
  templateUrl: './profile-image-upload.component.html',
  styleUrl: './profile-image-upload.component.scss'
})
export class ProfileImageUploadComponent implements OnChanges {


  @Input() previewUrl: any;
  @Input() ratio: any;
  @Input() shape!: string;
  
  @Output() imageLoadedEvent = new EventEmitter();
  @Output() cropperActiveEvent = new EventEmitter();

  imageChangedEvent: any;
  croppedImage: any;
  previewUrlo: any;

  image_is_preview:boolean = false;

  constructor(
    private sanitizer: DomSanitizer
  ) { }

  ngOnChanges() {
    this.previewUrlo = this.previewUrl;
  }

  fileChangeEvent(event: any): void {
    //console.log('fileChangedEvent');
    this.imageChangedEvent = event;
    this.cropperActiveEvent.emit(true);
  }

  imageCropped(event: any) {
    console.log('imageCropped', event);
    this.croppedImage = event.base64;
    this.previewUrl = event.base64;
    this.image_is_preview = true;
    //this.croppedImage = this.sanitizer.bypassSecurityTrustUrl(event.objectUrl);
    //this.croppedImage = this.sanitizer.bypassSecurityTrustUrl(event.objectUrl as string);
    console.log('this.previewUrl',this.previewUrl);
  }

  imageLoaded() {
    // show cropper
  }
  
  cropperReady() {
    // cropper ready
  }
  
  loadImageFailed() {
    // show message
  }

  cancelImageOnAdd(){
    this.imageChangedEvent=undefined;
    this.previewUrl = this.previewUrlo;
    this.imageLoadedEvent.emit(this.previewUrl);
  }

  setImageOnAdd(){
    this.previewUrl = this.croppedImage;

    console.log('this.previewUrl',this.previewUrl);

    this.imageChangedEvent = undefined;
    this.imageLoadedEvent.emit(this.previewUrl);
    this.cropperActiveEvent.emit(false);
  }

}

