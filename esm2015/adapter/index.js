/**
 * @fileoverview added by tsickle
 * Generated from: index.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { DateAdapter, MC_DATE_FORMATS, MC_DATE_LOCALE } from '@ptsecurity/cdk/datetime';
import { MC_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from './moment-date-adapter';
import { MC_MOMENT_DATE_FORMATS } from './moment-date-formats';
export { MC_MOMENT_DATE_ADAPTER_OPTIONS_FACTORY, MC_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from './moment-date-adapter';
export { MC_MOMENT_DATE_FORMATS } from './moment-date-formats';
export class MomentDateModule {
}
MomentDateModule.decorators = [
    { type: NgModule, args: [{
                providers: [
                    {
                        provide: DateAdapter,
                        useClass: MomentDateAdapter,
                        deps: [MC_DATE_LOCALE, MC_MOMENT_DATE_ADAPTER_OPTIONS]
                    }
                ]
            },] }
];
const ɵ0 = MC_MOMENT_DATE_FORMATS;
export class McMomentDateModule {
}
McMomentDateModule.decorators = [
    { type: NgModule, args: [{
                imports: [MomentDateModule],
                providers: [{
                        provide: MC_DATE_FORMATS,
                        useValue: ɵ0
                    }]
            },] }
];
export { ɵ0 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiL2hvbWUvY2lyY2xlY2kvbW9zYWljL3BhY2thZ2VzL21vc2FpYy1tb21lbnQtYWRhcHRlci9hZGFwdGVyLyIsInNvdXJjZXMiOlsiaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxXQUFXLEVBQUUsZUFBZSxFQUFFLGNBQWMsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBRXhGLE9BQU8sRUFBRSw4QkFBOEIsRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzFGLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBRy9ELDBHQUFjLHVCQUF1QixDQUFDO0FBQ3RDLHVDQUFjLHVCQUF1QixDQUFDO0FBV3RDLE1BQU0sT0FBTyxnQkFBZ0I7OztZQVQ1QixRQUFRLFNBQUM7Z0JBQ04sU0FBUyxFQUFFO29CQUNQO3dCQUNJLE9BQU8sRUFBRSxXQUFXO3dCQUNwQixRQUFRLEVBQUUsaUJBQWlCO3dCQUMzQixJQUFJLEVBQUUsQ0FBRSxjQUFjLEVBQUUsOEJBQThCLENBQUU7cUJBQzNEO2lCQUNKO2FBQ0o7O1dBTTJDLHNCQUFzQjtBQUdsRSxNQUFNLE9BQU8sa0JBQWtCOzs7WUFOOUIsUUFBUSxTQUFDO2dCQUNOLE9BQU8sRUFBRSxDQUFDLGdCQUFnQixDQUFDO2dCQUMzQixTQUFTLEVBQUUsQ0FBQzt3QkFDUixPQUFPLEVBQUUsZUFBZTt3QkFBRSxRQUFRLElBQXdCO3FCQUM3RCxDQUFDO2FBQ0wiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRGF0ZUFkYXB0ZXIsIE1DX0RBVEVfRk9STUFUUywgTUNfREFURV9MT0NBTEUgfSBmcm9tICdAcHRzZWN1cml0eS9jZGsvZGF0ZXRpbWUnO1xuXG5pbXBvcnQgeyBNQ19NT01FTlRfREFURV9BREFQVEVSX09QVElPTlMsIE1vbWVudERhdGVBZGFwdGVyIH0gZnJvbSAnLi9tb21lbnQtZGF0ZS1hZGFwdGVyJztcbmltcG9ydCB7IE1DX01PTUVOVF9EQVRFX0ZPUk1BVFMgfSBmcm9tICcuL21vbWVudC1kYXRlLWZvcm1hdHMnO1xuXG5cbmV4cG9ydCAqIGZyb20gJy4vbW9tZW50LWRhdGUtYWRhcHRlcic7XG5leHBvcnQgKiBmcm9tICcuL21vbWVudC1kYXRlLWZvcm1hdHMnO1xuXG5ATmdNb2R1bGUoe1xuICAgIHByb3ZpZGVyczogW1xuICAgICAgICB7XG4gICAgICAgICAgICBwcm92aWRlOiBEYXRlQWRhcHRlcixcbiAgICAgICAgICAgIHVzZUNsYXNzOiBNb21lbnREYXRlQWRhcHRlcixcbiAgICAgICAgICAgIGRlcHM6IFsgTUNfREFURV9MT0NBTEUsIE1DX01PTUVOVF9EQVRFX0FEQVBURVJfT1BUSU9OUyBdXG4gICAgICAgIH1cbiAgICBdXG59KVxuZXhwb3J0IGNsYXNzIE1vbWVudERhdGVNb2R1bGUge31cblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbTW9tZW50RGF0ZU1vZHVsZV0sXG4gICAgcHJvdmlkZXJzOiBbe1xuICAgICAgICBwcm92aWRlOiBNQ19EQVRFX0ZPUk1BVFMsIHVzZVZhbHVlOiBNQ19NT01FTlRfREFURV9GT1JNQVRTXG4gICAgfV1cbn0pXG5leHBvcnQgY2xhc3MgTWNNb21lbnREYXRlTW9kdWxlIHt9XG4iXX0=