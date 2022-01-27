import { NgModule } from '@angular/core';
import { DateAdapter, MC_DATE_FORMATS, MC_DATE_LOCALE } from '@ptsecurity/cdk/datetime';
import { MC_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from './moment-date-adapter';
import { MC_MOMENT_DATE_FORMATS } from './moment-date-formats';
import * as i0 from "@angular/core";
export * from './moment-date-adapter';
export * from './moment-date-formats';
export class MomentDateModule {
}
/** @nocollapse */ /** @nocollapse */ MomentDateModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.0", ngImport: i0, type: MomentDateModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
/** @nocollapse */ /** @nocollapse */ MomentDateModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.2.0", ngImport: i0, type: MomentDateModule });
/** @nocollapse */ /** @nocollapse */ MomentDateModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.2.0", ngImport: i0, type: MomentDateModule, providers: [{
            provide: DateAdapter,
            useClass: MomentDateAdapter,
            deps: [MC_DATE_LOCALE, MC_MOMENT_DATE_ADAPTER_OPTIONS]
        }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.0", ngImport: i0, type: MomentDateModule, decorators: [{
            type: NgModule,
            args: [{
                    providers: [{
                            provide: DateAdapter,
                            useClass: MomentDateAdapter,
                            deps: [MC_DATE_LOCALE, MC_MOMENT_DATE_ADAPTER_OPTIONS]
                        }]
                }]
        }] });
export class McMomentDateModule {
}
/** @nocollapse */ /** @nocollapse */ McMomentDateModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.0", ngImport: i0, type: McMomentDateModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
/** @nocollapse */ /** @nocollapse */ McMomentDateModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.2.0", ngImport: i0, type: McMomentDateModule, imports: [MomentDateModule] });
/** @nocollapse */ /** @nocollapse */ McMomentDateModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.2.0", ngImport: i0, type: McMomentDateModule, providers: [{
            provide: MC_DATE_FORMATS, useValue: MC_MOMENT_DATE_FORMATS
        }], imports: [[MomentDateModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.0", ngImport: i0, type: McMomentDateModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [MomentDateModule],
                    providers: [{
                            provide: MC_DATE_FORMATS, useValue: MC_MOMENT_DATE_FORMATS
                        }]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wYWNrYWdlcy9tb3NhaWMtbW9tZW50LWFkYXB0ZXIvYWRhcHRlci9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxXQUFXLEVBQUUsZUFBZSxFQUFFLGNBQWMsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBRXhGLE9BQU8sRUFBRSw4QkFBOEIsRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzFGLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLHVCQUF1QixDQUFDOztBQUcvRCxjQUFjLHVCQUF1QixDQUFDO0FBQ3RDLGNBQWMsdUJBQXVCLENBQUM7QUFTdEMsTUFBTSxPQUFPLGdCQUFnQjs7bUpBQWhCLGdCQUFnQjtvSkFBaEIsZ0JBQWdCO29KQUFoQixnQkFBZ0IsYUFOZCxDQUFDO1lBQ1IsT0FBTyxFQUFFLFdBQVc7WUFDcEIsUUFBUSxFQUFFLGlCQUFpQjtZQUMzQixJQUFJLEVBQUUsQ0FBQyxjQUFjLEVBQUUsOEJBQThCLENBQUM7U0FDekQsQ0FBQzsyRkFFTyxnQkFBZ0I7a0JBUDVCLFFBQVE7bUJBQUM7b0JBQ04sU0FBUyxFQUFFLENBQUM7NEJBQ1IsT0FBTyxFQUFFLFdBQVc7NEJBQ3BCLFFBQVEsRUFBRSxpQkFBaUI7NEJBQzNCLElBQUksRUFBRSxDQUFDLGNBQWMsRUFBRSw4QkFBOEIsQ0FBQzt5QkFDekQsQ0FBQztpQkFDTDs7QUFTRCxNQUFNLE9BQU8sa0JBQWtCOztxSkFBbEIsa0JBQWtCO3NKQUFsQixrQkFBa0IsWUFSbEIsZ0JBQWdCO3NKQVFoQixrQkFBa0IsYUFKaEIsQ0FBQztZQUNSLE9BQU8sRUFBRSxlQUFlLEVBQUUsUUFBUSxFQUFFLHNCQUFzQjtTQUM3RCxDQUFDLFlBSE8sQ0FBQyxnQkFBZ0IsQ0FBQzsyRkFLbEIsa0JBQWtCO2tCQU45QixRQUFRO21CQUFDO29CQUNOLE9BQU8sRUFBRSxDQUFDLGdCQUFnQixDQUFDO29CQUMzQixTQUFTLEVBQUUsQ0FBQzs0QkFDUixPQUFPLEVBQUUsZUFBZSxFQUFFLFFBQVEsRUFBRSxzQkFBc0I7eUJBQzdELENBQUM7aUJBQ0wiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRGF0ZUFkYXB0ZXIsIE1DX0RBVEVfRk9STUFUUywgTUNfREFURV9MT0NBTEUgfSBmcm9tICdAcHRzZWN1cml0eS9jZGsvZGF0ZXRpbWUnO1xuXG5pbXBvcnQgeyBNQ19NT01FTlRfREFURV9BREFQVEVSX09QVElPTlMsIE1vbWVudERhdGVBZGFwdGVyIH0gZnJvbSAnLi9tb21lbnQtZGF0ZS1hZGFwdGVyJztcbmltcG9ydCB7IE1DX01PTUVOVF9EQVRFX0ZPUk1BVFMgfSBmcm9tICcuL21vbWVudC1kYXRlLWZvcm1hdHMnO1xuXG5cbmV4cG9ydCAqIGZyb20gJy4vbW9tZW50LWRhdGUtYWRhcHRlcic7XG5leHBvcnQgKiBmcm9tICcuL21vbWVudC1kYXRlLWZvcm1hdHMnO1xuXG5ATmdNb2R1bGUoe1xuICAgIHByb3ZpZGVyczogW3tcbiAgICAgICAgcHJvdmlkZTogRGF0ZUFkYXB0ZXIsXG4gICAgICAgIHVzZUNsYXNzOiBNb21lbnREYXRlQWRhcHRlcixcbiAgICAgICAgZGVwczogW01DX0RBVEVfTE9DQUxFLCBNQ19NT01FTlRfREFURV9BREFQVEVSX09QVElPTlNdXG4gICAgfV1cbn0pXG5leHBvcnQgY2xhc3MgTW9tZW50RGF0ZU1vZHVsZSB7fVxuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtNb21lbnREYXRlTW9kdWxlXSxcbiAgICBwcm92aWRlcnM6IFt7XG4gICAgICAgIHByb3ZpZGU6IE1DX0RBVEVfRk9STUFUUywgdXNlVmFsdWU6IE1DX01PTUVOVF9EQVRFX0ZPUk1BVFNcbiAgICB9XVxufSlcbmV4cG9ydCBjbGFzcyBNY01vbWVudERhdGVNb2R1bGUge31cbiJdfQ==