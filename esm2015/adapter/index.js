/**
 * @fileoverview added by tsickle
 * Generated from: index.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
                        provide: MC_DATE_FORMATS, useValue: ɵ0
                    }]
            },] }
];
export { ɵ0 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcHRzZWN1cml0eS9tb3NhaWMtbW9tZW50LWFkYXB0ZXIvYWRhcHRlci8iLCJzb3VyY2VzIjpbImluZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsV0FBVyxFQUFFLGVBQWUsRUFBRSxjQUFjLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUV4RixPQUFPLEVBQUUsOEJBQThCLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUMxRixPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUcvRCwwR0FBYyx1QkFBdUIsQ0FBQztBQUN0Qyx1Q0FBYyx1QkFBdUIsQ0FBQztBQVd0QyxNQUFNLE9BQU8sZ0JBQWdCOzs7WUFUNUIsUUFBUSxTQUFDO2dCQUNOLFNBQVMsRUFBRTtvQkFDUDt3QkFDSSxPQUFPLEVBQUUsV0FBVzt3QkFDcEIsUUFBUSxFQUFFLGlCQUFpQjt3QkFDM0IsSUFBSSxFQUFFLENBQUUsY0FBYyxFQUFFLDhCQUE4QixDQUFFO3FCQUMzRDtpQkFDSjthQUNKOztXQU0yQyxzQkFBc0I7QUFHbEUsTUFBTSxPQUFPLGtCQUFrQjs7O1lBTjlCLFFBQVEsU0FBQztnQkFDTixPQUFPLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQztnQkFDM0IsU0FBUyxFQUFFLENBQUM7d0JBQ1IsT0FBTyxFQUFFLGVBQWUsRUFBRSxRQUFRLElBQXdCO3FCQUM3RCxDQUFDO2FBQ0wiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRGF0ZUFkYXB0ZXIsIE1DX0RBVEVfRk9STUFUUywgTUNfREFURV9MT0NBTEUgfSBmcm9tICdAcHRzZWN1cml0eS9jZGsvZGF0ZXRpbWUnO1xuXG5pbXBvcnQgeyBNQ19NT01FTlRfREFURV9BREFQVEVSX09QVElPTlMsIE1vbWVudERhdGVBZGFwdGVyIH0gZnJvbSAnLi9tb21lbnQtZGF0ZS1hZGFwdGVyJztcbmltcG9ydCB7IE1DX01PTUVOVF9EQVRFX0ZPUk1BVFMgfSBmcm9tICcuL21vbWVudC1kYXRlLWZvcm1hdHMnO1xuXG5cbmV4cG9ydCAqIGZyb20gJy4vbW9tZW50LWRhdGUtYWRhcHRlcic7XG5leHBvcnQgKiBmcm9tICcuL21vbWVudC1kYXRlLWZvcm1hdHMnO1xuXG5ATmdNb2R1bGUoe1xuICAgIHByb3ZpZGVyczogW1xuICAgICAgICB7XG4gICAgICAgICAgICBwcm92aWRlOiBEYXRlQWRhcHRlcixcbiAgICAgICAgICAgIHVzZUNsYXNzOiBNb21lbnREYXRlQWRhcHRlcixcbiAgICAgICAgICAgIGRlcHM6IFsgTUNfREFURV9MT0NBTEUsIE1DX01PTUVOVF9EQVRFX0FEQVBURVJfT1BUSU9OUyBdXG4gICAgICAgIH1cbiAgICBdXG59KVxuZXhwb3J0IGNsYXNzIE1vbWVudERhdGVNb2R1bGUge31cblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbTW9tZW50RGF0ZU1vZHVsZV0sXG4gICAgcHJvdmlkZXJzOiBbe1xuICAgICAgICBwcm92aWRlOiBNQ19EQVRFX0ZPUk1BVFMsIHVzZVZhbHVlOiBNQ19NT01FTlRfREFURV9GT1JNQVRTXG4gICAgfV1cbn0pXG5leHBvcnQgY2xhc3MgTWNNb21lbnREYXRlTW9kdWxlIHt9XG4iXX0=