import { Injectable } from '@angular/core';
import { ODataServiceBase } from '../common/ODataServiceBase';
import { Good } from '../../models/good.model';
import { ODataServiceFactory } from 'angular-odata';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GoodService extends ODataServiceBase<Good> {
  protected override oDataEntityName: string = 'Goods';

  constructor(factory: ODataServiceFactory) {
    super(factory);
  }

  getAllOrganizationGoods(organizationId: string): Observable<Good[]> {
    return this.ODataService.entities()
      .query((q) => {
          q.expand('producer,category');
          q.filter(({ e }) => e().eq('organizationId', organizationId, 'none'))
        }
      )
      .fetch()
      .pipe(this.mapODataEntities);
  }
}
