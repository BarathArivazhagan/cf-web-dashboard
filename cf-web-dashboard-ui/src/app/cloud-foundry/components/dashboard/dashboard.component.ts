import { Component, OnInit, ViewChild, OnDestroy, AfterViewInit } from '@angular/core';
import { ApplicationComponent } from '../application/application.component';
import { DatacenterComponent } from '../datacenter/datacenter.component';
import { Router, ActivatedRoute } from '@angular/router';
import { DashboardService } from '../../services/dashboard.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { DataCenterService } from '../../services/data-center.service';
import { UserDefinedServiceComponent } from '../user-defined-service/user-defined-service.component';
import { UserDefinedServiceInstancesService } from '../../services/user-defined-service-instances.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy, AfterViewInit {

  public showApps = false;
  public showDatacenters = false;
  public showCUPS = false;
  public showOverview = true;

  @ViewChild(ApplicationComponent) apps: ApplicationComponent;
  @ViewChild(DatacenterComponent) datacenters: DatacenterComponent;
  @ViewChild(UserDefinedServiceComponent) cups: UserDefinedServiceComponent;

  constructor(private _router: Router, private activatedRoute: ActivatedRoute
     , private dashboardService: DashboardService
     , private datacenterService: DataCenterService
    , private spinnerService: Ng4LoadingSpinnerService,
      private userDefinedService: UserDefinedServiceInstancesService ) { }

  ngOnInit() {

    console.log('route info', this.activatedRoute);
    this.activatedRoute.params
          .subscribe( param => {
              console.log('params in activated route ', param);
              if ( param.datacenter) {
                  this.datacenterService.setDatacenter(param.datacenter);
                  this.showViewsByName('datacenters');
              } else if( param.serviceName) {
                this.userDefinedService.setUserDefinedServiceName(param.serviceName);
                this.showViewsByName('services');
              }

          });
  }

  ngOnDestroy() {

    this.showApps = false;
    this.showCUPS = false;
    this.showDatacenters = false;
    this.showOverview = true;
  }


  public load( viewName: string): void {

    console.log('load view name ', viewName);
    this.showViewsByName(viewName);
  }


  public showViewsByName( viewName: string): void {

    switch (viewName) {

      case 'datacenters' : this.showApps = false;
                            this.showCUPS = false;
                            this.showOverview = false;
                            this.showDatacenters = true;
                            this._router.navigateByUrl('/dashboard/datacenters');
                            break;
      case 'services' : this.showApps = false;
                        this.showCUPS = true;
                        this.showOverview = false;
                        this.showDatacenters = false;
                         break;
      case 'applications' : this.showApps = true;
                            this.showCUPS = false;
                            this.showOverview = false;
                            this.showDatacenters = false;
                            break;
      case 'overview' :    this.showApps = false;
                            this.showCUPS = false;
                            this.showOverview = true;
                            this.showDatacenters = false;
                            this._router.navigateByUrl('/dashboard');
                            break;
      default : this.showApps = false;
                this.showCUPS = false;
                this.showDatacenters = false;
                this.showOverview = true;

    }

  }

  ngAfterViewInit() {

  }



}
