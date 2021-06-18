import { NgModule } from '@angular/core';
import { DateAdapter, MC_DATE_FORMATS, MC_DATE_LOCALE } from '@ptsecurity/cdk/datetime';
import { MC_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from './moment-date-adapter';
import { MC_MOMENT_DATE_FORMATS } from './moment-date-formats';
import * as i0 from "@angular/core";
export * from './moment-date-adapter';
export * from './moment-date-formats';
export class MomentDateModule {
}
/** @nocollapse */ MomentDateModule.ɵfac = function MomentDateModule_Factory(t) { return new (t || MomentDateModule)(); };
/** @nocollapse */ MomentDateModule.ɵmod = i0.ɵɵdefineNgModule({ type: MomentDateModule });
/** @nocollapse */ MomentDateModule.ɵinj = i0.ɵɵdefineInjector({ providers: [{
            provide: DateAdapter,
            useClass: MomentDateAdapter,
            deps: [MC_DATE_LOCALE, MC_MOMENT_DATE_ADAPTER_OPTIONS]
        }] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(MomentDateModule, [{
        type: NgModule,
        args: [{
                providers: [{
                        provide: DateAdapter,
                        useClass: MomentDateAdapter,
                        deps: [MC_DATE_LOCALE, MC_MOMENT_DATE_ADAPTER_OPTIONS]
                    }]
            }]
    }], null, null); })();
export class McMomentDateModule {
}
/** @nocollapse */ McMomentDateModule.ɵfac = function McMomentDateModule_Factory(t) { return new (t || McMomentDateModule)(); };
/** @nocollapse */ McMomentDateModule.ɵmod = i0.ɵɵdefineNgModule({ type: McMomentDateModule });
/** @nocollapse */ McMomentDateModule.ɵinj = i0.ɵɵdefineInjector({ providers: [{
            provide: MC_DATE_FORMATS, useValue: MC_MOMENT_DATE_FORMATS
        }], imports: [[MomentDateModule]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(McMomentDateModule, { imports: [MomentDateModule] }); })();
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(McMomentDateModule, [{
        type: NgModule,
        args: [{
                imports: [MomentDateModule],
                providers: [{
                        provide: MC_DATE_FORMATS, useValue: MC_MOMENT_DATE_FORMATS
                    }]
            }]
    }], null, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wYWNrYWdlcy9tb3NhaWMtbW9tZW50LWFkYXB0ZXIvYWRhcHRlci9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxXQUFXLEVBQUUsZUFBZSxFQUFFLGNBQWMsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBRXhGLE9BQU8sRUFBRSw4QkFBOEIsRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzFGLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLHVCQUF1QixDQUFDOztBQUcvRCxjQUFjLHVCQUF1QixDQUFDO0FBQ3RDLGNBQWMsdUJBQXVCLENBQUM7QUFTdEMsTUFBTSxPQUFPLGdCQUFnQjs7bUdBQWhCLGdCQUFnQjt1RUFBaEIsZ0JBQWdCOzRFQU5kLENBQUM7WUFDUixPQUFPLEVBQUUsV0FBVztZQUNwQixRQUFRLEVBQUUsaUJBQWlCO1lBQzNCLElBQUksRUFBRSxDQUFDLGNBQWMsRUFBRSw4QkFBOEIsQ0FBQztTQUN6RCxDQUFDO3VGQUVPLGdCQUFnQjtjQVA1QixRQUFRO2VBQUM7Z0JBQ04sU0FBUyxFQUFFLENBQUM7d0JBQ1IsT0FBTyxFQUFFLFdBQVc7d0JBQ3BCLFFBQVEsRUFBRSxpQkFBaUI7d0JBQzNCLElBQUksRUFBRSxDQUFDLGNBQWMsRUFBRSw4QkFBOEIsQ0FBQztxQkFDekQsQ0FBQzthQUNMOztBQVNELE1BQU0sT0FBTyxrQkFBa0I7O3VHQUFsQixrQkFBa0I7eUVBQWxCLGtCQUFrQjs4RUFKaEIsQ0FBQztZQUNSLE9BQU8sRUFBRSxlQUFlLEVBQUUsUUFBUSxFQUFFLHNCQUFzQjtTQUM3RCxDQUFDLFlBSE8sQ0FBQyxnQkFBZ0IsQ0FBQzt3RkFLbEIsa0JBQWtCLGNBUmxCLGdCQUFnQjt1RkFRaEIsa0JBQWtCO2NBTjlCLFFBQVE7ZUFBQztnQkFDTixPQUFPLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQztnQkFDM0IsU0FBUyxFQUFFLENBQUM7d0JBQ1IsT0FBTyxFQUFFLGVBQWUsRUFBRSxRQUFRLEVBQUUsc0JBQXNCO3FCQUM3RCxDQUFDO2FBQ0wiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRGF0ZUFkYXB0ZXIsIE1DX0RBVEVfRk9STUFUUywgTUNfREFURV9MT0NBTEUgfSBmcm9tICdAcHRzZWN1cml0eS9jZGsvZGF0ZXRpbWUnO1xuXG5pbXBvcnQgeyBNQ19NT01FTlRfREFURV9BREFQVEVSX09QVElPTlMsIE1vbWVudERhdGVBZGFwdGVyIH0gZnJvbSAnLi9tb21lbnQtZGF0ZS1hZGFwdGVyJztcbmltcG9ydCB7IE1DX01PTUVOVF9EQVRFX0ZPUk1BVFMgfSBmcm9tICcuL21vbWVudC1kYXRlLWZvcm1hdHMnO1xuXG5cbmV4cG9ydCAqIGZyb20gJy4vbW9tZW50LWRhdGUtYWRhcHRlcic7XG5leHBvcnQgKiBmcm9tICcuL21vbWVudC1kYXRlLWZvcm1hdHMnO1xuXG5ATmdNb2R1bGUoe1xuICAgIHByb3ZpZGVyczogW3tcbiAgICAgICAgcHJvdmlkZTogRGF0ZUFkYXB0ZXIsXG4gICAgICAgIHVzZUNsYXNzOiBNb21lbnREYXRlQWRhcHRlcixcbiAgICAgICAgZGVwczogW01DX0RBVEVfTE9DQUxFLCBNQ19NT01FTlRfREFURV9BREFQVEVSX09QVElPTlNdXG4gICAgfV1cbn0pXG5leHBvcnQgY2xhc3MgTW9tZW50RGF0ZU1vZHVsZSB7fVxuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtNb21lbnREYXRlTW9kdWxlXSxcbiAgICBwcm92aWRlcnM6IFt7XG4gICAgICAgIHByb3ZpZGU6IE1DX0RBVEVfRk9STUFUUywgdXNlVmFsdWU6IE1DX01PTUVOVF9EQVRFX0ZPUk1BVFNcbiAgICB9XVxufSlcbmV4cG9ydCBjbGFzcyBNY01vbWVudERhdGVNb2R1bGUge31cbiJdfQ==