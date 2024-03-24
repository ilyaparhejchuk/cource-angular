import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { GetPopularTagsResponseInterface } from "../getPopularTagsResponse.interface";
import { map } from "rxjs";


@Injectable()
export class PopularTagsService {
    constructor(private http: HttpClient) {}

    public getPopularTags(): Observable<any> {
        const url = environment.apiUrl + '/tags';
        return this.http.get(url).pipe(map((response: any) => response.tags))
    }
}
