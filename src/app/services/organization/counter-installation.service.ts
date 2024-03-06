import { Injectable } from '@angular/core';
import { CounterInstallationRequest } from '../../models/counter-install-request.model';
import { ODataServiceBase } from '../common/ODataServiceBase';
import { ODataServiceFactory } from 'angular-odata';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CounterInstallationService extends ODataServiceBase<CounterInstallationRequest> {
  protected override oDataEntityName: string = 'CounterInstallationRequests';

  constructor(factory: ODataServiceFactory, 
    private http: HttpClient) {
    super(factory);
  }

  getOrganizationsInstallationRequests(organizationId: string): Observable<CounterInstallationRequest[]> {
    debugger;
    return this.ODataService.entities()
    .query((q) => {
      q.filter(({ e }) => e().eq('organizationId', organizationId, 'none'))
    }
    )
    .fetch()
    .pipe(this.mapODataEntities);
  }

  getAllRequests(): Observable<CounterInstallationRequest[]> {
    return this.ODataService.entities()
    .query((q) => {
        q.expand('organization');
      }
    )
    .fetch()
    .pipe(this.mapODataEntities);
  }

  updateInstallRequest(id: string, updatedRequest: CounterInstallationRequest): Observable<CounterInstallationRequest> {
    return this.ODataService.update(id, updatedRequest).pipe(this.mapODataEntity);
  }
}
