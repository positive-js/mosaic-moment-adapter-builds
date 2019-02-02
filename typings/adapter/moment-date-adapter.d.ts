import { InjectionToken } from '@angular/core';
import { DateAdapter } from '@ptsecurity/cdk/datetime';
import { Moment } from 'moment';
/** Configurable options for {@see MomentDateAdapter}. */
export interface IMcMomentDateAdapterOptions {
    /**
     * Turns the use of utc dates on or off.
     * Changing this will change how Angular Material components like DatePicker output dates.
     * {@default false}
     */
    useUtc: boolean;
}
/** InjectionToken for moment date adapter to configure options. */
export declare const MC_MOMENT_DATE_ADAPTER_OPTIONS: InjectionToken<IMcMomentDateAdapterOptions>;
/** @docs-private */
export declare function MC_MOMENT_DATE_ADAPTER_OPTIONS_FACTORY(): IMcMomentDateAdapterOptions;
export declare class MomentDateAdapter extends DateAdapter<Moment> {
    private options?;
    private localeData;
    constructor(dateLocale: string, options?: IMcMomentDateAdapterOptions | undefined);
    setLocale(locale: string): void;
    getYear(date: Moment): number;
    getMonth(date: Moment): number;
    getDate(date: Moment): number;
    getDayOfWeek(date: Moment): number;
    getMonthNames(style: 'long' | 'short' | 'narrow'): string[];
    getDateNames(): string[];
    getDayOfWeekNames(style: 'long' | 'short' | 'narrow'): string[];
    getYearName(date: Moment): string;
    getFirstDayOfWeek(): number;
    getNumDaysInMonth(date: Moment): number;
    clone(date: Moment): Moment;
    createDate(year: number, month: number, date: number): Moment;
    today(): Moment;
    parse(value: any, parseFormat: string | string[]): Moment | null;
    format(date: Moment, displayFormat: string): string;
    addCalendarYears(date: Moment, years: number): Moment;
    addCalendarMonths(date: Moment, months: number): Moment;
    addCalendarDays(date: Moment, days: number): Moment;
    toIso8601(date: Moment): string;
    /** https://www.ietf.org/rfc/rfc3339.txt */
    deserialize(value: any): Moment | null;
    isDateInstance(obj: any): boolean;
    isValid(date: Moment): boolean;
    invalid(): Moment;
    /** Creates a Moment instance while respecting the current UTC settings. */
    private createMoment;
}
