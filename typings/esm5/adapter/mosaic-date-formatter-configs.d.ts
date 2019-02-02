import { InjectionToken } from '@angular/core';
export declare const MC_DATE_FORMATTER_CONFIGS_SET: InjectionToken<McDateFormatterConfigSet>;
export declare class McDateFormatterConfigSet {
    [name: string]: IFormatterConfig;
}
export interface IFormatterConfig {
    variables: IFormatterVariables;
    monthNames: {
        long: string[];
        short: string[];
        narrow: string[];
    };
    dayOfWeekNames: {
        long: string[];
        short: string[];
        narrow: string[];
    };
    relativeTemplates: {
        short: IFormatterRelativeTemplate;
        long: IFormatterRelativeTemplate;
    };
    absoluteTemplates: {
        short: IFormatterAbsoluteTemplate;
        long: IFormatterAbsoluteTemplate;
    };
    rangeTemplates: {
        short: IFormatterRangeTemplate;
        middle: IFormatterRangeTemplate;
        long: IFormatterRangeTemplate;
    };
}
export interface IFormatterVariables {
    [name: string]: string;
}
export interface IFormatterRangeTemplate {
    variables?: IFormatterVariables;
    START_DATE: string;
    END_DATE: string;
    DATE: string;
    START_DATETIME: string;
    END_DATETIME: string;
    DATETIME: string;
}
export interface IFormatterAbsoluteTemplate {
    variables?: IFormatterVariables;
    DATE: string;
    DATETIME: string;
}
export interface IFormatterRelativeTemplate {
    variables?: IFormatterVariables;
    SECONDS_AGO: string;
    MINUTES_AGO: string;
    TODAY: string;
    YESTERDAY: string;
    BEFORE_YESTERDAY: string;
}
export declare const DEFAULT_MC_DATE_FORMATTER_CONFIGS_SET: McDateFormatterConfigSet;
