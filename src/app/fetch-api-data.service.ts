import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

//declare the api url that will provide data for the client app
const apiUrl = 'https://women-composers-api.onrender.com/';

@Injectable({
  providedIn: 'root',
})
export class UserRegistrationService {
  //Inject the HttpClient module to the constructor params
  // (provides HttpClent to the entire class, making it available via this.http)
  constructor(private http: HttpClient) {}

  // USER REGISTRATION
  // Make the api call for the user registration endpoint
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
      .post(apiUrl + 'users', userDetails)
      .pipe(catchError(this.handleError));
  }

  // USER LOGIN
  public userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
      .post(apiUrl + 'login', userDetails)
      .pipe(catchError(this.handleError));
  }

  // GET ALL COMPOSERS
  public getComposers(): Observable<any> {
    return this.http.get(apiUrl + 'composers');
  }

  // GET ONE COMPOSER
  // '/composers/:name', GET
  public getOneComposer(name: string): Observable<any> {
    return this.http.get(apiUrl + 'composers/' + name);
  }

  // GET ERA
  // '/eras/:eraName', GET
  public getOneEra(eraName: string): Observable<any> {
    return this.http.get(apiUrl + 'eras/' + eraName);
  }

  // GET INFO ABOUT ALL ERAS
  // '/eras', GET
  public getEras(): Observable<any> {
    return this.http.get(apiUrl + 'eras');
  }

  // GET USER
  // '/users/:username', GET
  public getUser(username: string): Observable<any> {
    return this.http.get(apiUrl + 'users/' + username);
  }

  // GET A USER'S FAVOURITE COMPOSERS
  // '/users/:username/favouriteComposers/', GET
  public getFavourites(username: string): Observable<any> {
    return this.http.get(apiUrl + 'users/' + username + '/favouriteComposers/');
  }

  // ADD A COMPOSER TO FAVOURITE COMPOSERS
  // '/users/:username/favouriteComposers/:composerId', POST
  public addFavourite(
    username: string,
    composerId: string,
    userDetails: any
  ): Observable<any> {
    return this.http.post(
      apiUrl + 'users/' + username + '/favouriteComposers/' + composerId,
      userDetails
    );
  }

  // EDIT USER INFO
  // '/users/:username', PUT
  public updateUser(username: string, userDetails: any): Observable<any> {
    return this.http.put(apiUrl + 'users/' + username, userDetails);
  }

  // DELETE USER
  // '/users/:username'
  public deleteUser(username: string): Observable<any> {
    return this.http.delete(apiUrl + 'users/' + username);
  }

  // DELETE A COMPOSER FROM FAVOURITE COMPOSERS
  // '/users/:username/favouriteComposers/:composerId', DELETE
  public deleteFavourite(
    username: string,
    composerId: string
  ): Observable<any> {
    return this.http.delete(
      apiUrl + 'users/' + username + '/favouriteComposers/' + composerId
    );
  }

  //handle errors: leave this at the end
  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code is ${error.status} ` +
          `Error body is: ${error.error}`
      );
    }
    return throwError('Something bad happened; please try again later.');
  }
}

export class FetchApiDataService {
  constructor() {}
}
