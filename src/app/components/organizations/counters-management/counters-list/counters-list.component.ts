import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { PickupCounter } from '../../../../models/pickup-counter.model';
import { CounterInstallationRequest } from '../../../../models/counter-install-request.model';
import { Organization } from '../../../../models/organization.model';
import { CounterService } from '../../../../services/organization/counter.service';
import { CounterInstallationService } from '../../../../services/organization/counter-installation.service';
import { OrganizationService } from '../../../../services/organization/organization.service';
import { AuthService } from '../../../../services/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-counters-list',
  templateUrl: './counters-list.component.html',
  styleUrl: './counters-list.component.css',
  providers: [DatePipe]
})
export class CountersListComponent implements OnInit, OnDestroy{
  organizationId?: string;
  counters$?: Observable<PickupCounter[]>;
  requests$?: Observable<CounterInstallationRequest[]>;

  organization?: Organization | null;
  organizationSubscription$?: Subscription;

  constructor(
    private counterService: CounterService,
    private counterInstallService: CounterInstallationService,
    private organizationService: OrganizationService,
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const organizationId = this.route.snapshot.paramMap.get('organizationId');

    if (!organizationId) {
      this.router.navigateByUrl('/notFound');
      return;
    }

    this.organizationId = organizationId;

    this.organizationSubscription$ = this.organizationService
            .getById(organizationId)
            .subscribe((s) => {
              this.organization = s;
              
              if(this.organization?.isBlocked) {
                this.authService.logout();
                this.router.navigateByUrl('/blocked');
              }
            });

    this.counters$ = this.counterService.getOrganizationsCounters(organizationId);

    this.requests$ = this.counterInstallService.getOrganizationsInstallationRequests(organizationId);
  }

  ngOnDestroy(): void {
    this.organizationSubscription$?.unsubscribe();
  }
}
