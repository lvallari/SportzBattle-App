import { Injectable } from '@angular/core';
//import { BlobService, UploadConfig, UploadParams,  } from 'angular-azure-blob-service';
import { BlobServiceClient } from '@azure/storage-blob';
//const { BlobServiceClient } = require('@azure/storage-blob');
//import { BlockBlobClient } from "@azure/storage-blob";
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { retry, catchError } from 'rxjs/operators';
import { environment } from './../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class MyblobService {

  blobParams: any;
  blobConfig: any;
  sas: string;

  blobServiceClient: any;

  public _fileUploaded = new BehaviorSubject<string | undefined>(undefined);
  public _profileImageUploaded = new BehaviorSubject<boolean>(false);
  
  constructor(
    //public blobService: BlobService,
    //public blobServiceClient: BlobServiceClient,
    private http: HttpClient,
  ) {

    this.sas = '?sv=2022-11-02&ss=bfqt&srt=co&sp=rwdlacupiytfx&se=2029-05-12T03:08:36Z&st=2024-05-11T19:08:36Z&spr=https,http&sig=G6q9GtdoZ%2BSqc8J6mXlW502h0ImpcNZUxhiAnbpcOPA%3D';
    this.blobServiceClient = new BlobServiceClient('https://sportzbattle.blob.core.windows.net' + this.sas);
    
  }

  httpOptions = {
    headers: new HttpHeaders({
      //'Accepts': 'application/json',
      //'Content-Type': 'application/json'
    })
  }

  dataURItoBlob(dataURI:any) {
    // convert base64 to raw binary data held in a string
    // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
    var byteString = atob(dataURI.split(',')[1]);

    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]

    // write the bytes of the string to an ArrayBuffer
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    // write the ArrayBuffer to a blob, and you're done
    var bb = new Blob([ab]);
    return bb;
  }

  uploadBulkFile(file:any, filename:any) {
    //console.log('upload new blob');
    //var file = this.dataURItoBlob(data);
    if (file !== null) {

      // Create a unique name for the blob
      const blobName = filename;
      const containerClient = this.blobServiceClient.getContainerClient('uploads');

      var content_type = 'text/csv';

      // Get a block blob client
      const blockBlobClient = containerClient.getBlockBlobClient(blobName);

      const blobUploadOptions = {
        blobHTTPHeaders: {
            /*
             * NOTE: Setting the blobContentType to pdf enforces the browser to view the pdf in the browser window
             * instead of downloading the file. This is the desired behavior for the report.
             * 
             * If you want to download the file instead of viewing it in the browser, set the blobContentType to
             * 'application/octet-stream' and set the blobContentDisposition to 'attachment; filename=' + encodeURIComponent(blobName)
             * 
             * blobContentDisposition has two options: 'attachment' and 'inline'. 'attachment' will download the file
             * and 'inline' will view the file in the browser.
            */
            blobContentType: content_type, // seems like not setting the blobContentType will default to 'application/octet-stream'
            blobContentDisposition: 'inline; filename=' + encodeURIComponent(blobName),
        },
    };

      // Upload data to the blob
      blockBlobClient.upload(file, 1024 * 64, blobUploadOptions).then((result: any) => {
        
        console.log('upload success!', filename);
        this._fileUploaded.next(filename);
        this._fileUploaded.next(undefined);

      }).catch((error:any) => console.log(error));
    }
    else console.log('no file!');

  }

  uploadProfileImageBlob(data:any, filename:any) {
    console.log('upload profile image');
    var file = this.dataURItoBlob(data);
    if (file !== null) {
      // Create a unique name for the blob
      const blobName = filename;
      const containerClient = this.blobServiceClient.getContainerClient('users');

      // Get a block blob client
      const blockBlobClient = containerClient.getBlockBlobClient(blobName);

      // Upload data to the blob
      blockBlobClient.upload(file, 1024 * 64).then((result: any) => {
        this._profileImageUploaded.next(filename);
        //optimize image for thumbnail width 150px
        //this.krakenService.optimizeImage(filename, 'users', 150).subscribe(data => { });
      });
      
    }
  }

  async uploadAdImageBlob(file:any, filename:any) {
    console.log('upload ad image');
    //var file = this.dataURItoBlob(data);
    if (file !== null) {
      // Create a unique name for the blob
      const blobName = filename;
      const containerClient = this.blobServiceClient.getContainerClient('advertisements');

      // Get a block blob client
      const blockBlobClient = containerClient.getBlockBlobClient(blobName);

      // Upload data to the blob
      blockBlobClient.upload(file, 1024 * 64).then((result: any) => {
        return result;
        //this._profileImageUploaded.next(filename);
        //optimize image for thumbnail width 150px
        //this.krakenService.optimizeImage(filename, 'users', 150).subscribe(data => { });
      });
      
    }
  }

  async uploadVerificationDocument(file:any, filename:any) {
    console.log('upload ad image');
    //var file = this.dataURItoBlob(data);
    if (file !== null) {
      // Create a unique name for the blob
      const blobName = filename;
      const containerClient = this.blobServiceClient.getContainerClient('verification-docs');

      // Get a block blob client
      const blockBlobClient = containerClient.getBlockBlobClient(blobName);

      // Upload data to the blob
      blockBlobClient.upload(file, 1024 * 64).then((result: any) => {
        return result;
        //this._profileImageUploaded.next(filename);
        //optimize image for thumbnail width 150px
        //this.krakenService.optimizeImage(filename, 'users', 150).subscribe(data => { });
      });
      
    }
  }



  deleteBlob(filename:any): Observable<any> {
    return this.http.delete<any>(filename + this.sas, this.httpOptions).pipe(
      retry(1),
      catchError(this.errorHandl),
    )
  }

  getFiles(item_id:number): Observable<any> {
    return this.http.get<any>( environment.baseurl + '/blob/getFiles/' + item_id, this.httpOptions).pipe(
      retry(1),
      catchError(this.errorHandl),
    )
  }
  getActiveFiles(): Observable<any> {
    return this.http.get<any>( environment.baseurl + '/blob/getActiveAdvertisementFiles', this.httpOptions).pipe(
      retry(1),
      catchError(this.errorHandl),
    )
  }
  
  // Error handling
  errorHandl(error:any) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    //console.log(errorMessage);
    return throwError(errorMessage);
 }
}
