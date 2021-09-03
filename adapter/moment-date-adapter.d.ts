import { InjectionToken } from '@angular/core';
import { DateAdapter } from '@ptsecurity/cdk/datetime';
import { Moment, unitOfTime } from 'moment';
/** Configurable options for {@see MomentDateAdapter}. */
export interface IMcMomentDateAdapterOptions {
    /**
     * Turns the use of utc dates on or off.
     * {@default false}
     */
    useUtc: boolean;
    /**
     * whether should parse method try guess date format
     * {@default false}
     */
    findDateFormat: boolean;
}
/** InjectionToken for moment date adapter to configure options. */
export declare const MC_MOMENT_DATE_ADAPTER_OPTIONS: InjectionToken<IMcMomentDateAdapterOptions>;
/** @docs-private */
export declare function MC_MOMENT_DATE_ADAPTER_OPTIONS_FACTORY(): IMcMomentDateAdapterOptions;
export declare function DeprecatedMethod(target: any, key: string, descriptor: PropertyDescriptor): PropertyDescriptor;
export declare class MomentDateAdapter extends DateAdapter<Moment> {
    private readonly options?;
    private dateFormatter;
    private localeData;
    constructor(dateLocale: string, options?: IMcMomentDateAdapterOptions | undefined);
    setLocale(locale: string): void;
    getLocaleData(): {
        firstDayOfWeek: number;
        longMonths: string[];
        shortMonths: string[];
        dates: string[];
        longDaysOfWeek: string[];
        shortDaysOfWeek: string[];
        narrowDaysOfWeek: string[];
    };
    setLocaleData(localeData: any): void;
    updateLocaleData(localeData: any): void;
    getYear(date: Moment): number;
    getMonth(date: Moment): number;
    getDate(date: Moment): number;
    getHours(date: Moment): number;
    getMinutes(date: Moment): number;
    getSeconds(date: Moment): number;
    getMilliseconds(date: Moment): number;
    getTime(date: Moment): number;
    getDayOfWeek(date: Moment): number;
    getMonthNames(style: 'long' | 'short' | 'narrow'): string[];
    getDateNames(): string[];
    getDayOfWeekNames(style: 'long' | 'short' | 'narrow'): string[];
    getYearName(date: Moment): string;
    getFirstDayOfWeek(): number;
    getNumDaysInMonth(date: Moment): number;
    clone(date: Moment): Moment;
    createDate(year: number, month?: number, date?: number): Moment;
    createDateTime(year: number, month: number, date: number, hours: number, minutes: number, seconds: number, milliseconds: number): Moment;
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
    hasSame(startDate: Moment, endDate: Moment, unit: unitOfTime.Diff): boolean;
    diffNow(date: Moment, unit: unitOfTime.Diff): number;
    absoluteDate(date: Moment, params: any, datetime: boolean, milliseconds: boolean): string;
    absoluteLongDate(date: Moment): string;
    absoluteLongDateTime(date: Moment, options?: any): string;
    absoluteShortDate(date: Moment): string;
    absoluteShortDateTime(date: Moment, options?: any): string;
    openedRangeDate(startDate: Moment, endDate: Moment, template: any): string;
    openedRangeDateTime(startDate: Moment, endDate: Moment, template: any): string;
    rangeDate(startDate: Moment, endDate: Moment, template: any): string;
    rangeDateTime(startDate: Moment, endDate: Moment, template: any): string;
    rangeLongDate(startDate: Moment | null, endDate?: Moment): string;
    rangeLongDateTime(startDate: Moment | null, endDate?: Moment): string;
    rangeMiddleDateTime(startDate: Moment, endDate: Moment): string;
    rangeShortDate(startDate: Moment | null, endDate?: Moment): string;
    rangeShortDateTime(startDate: Moment | null, endDate?: Moment): string;
    relativeDate(date: Moment, template: any): string;
    relativeLongDate(date: Moment): string;
    relativeShortDate(date: Moment): string;
    /** Creates a Moment instance while respecting the current UTC settings. */
    private createMoment;
    private isNumeric;
    private findFormat;
    private parseWithSpace;
    private parseWithSlash;
    private parseWithDash;
    private parseWithDot;
}
