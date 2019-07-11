/**
 * @license
 * Positive Technologies All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license.
 */
import { Inject, Injectable, InjectionToken, Optional, NgModule } from '@angular/core';
import { DateAdapter, MC_DATE_LOCALE, MC_DATE_FORMATS } from '@ptsecurity/cdk/datetime';
import * as MessageFormat from 'messageformat';
import * as _rollupMoment from 'moment';
import _rollupMoment__default, {  } from 'moment';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const enUS = {
    variables: {
        SECONDS: 's',
        MINUTES: 'm',
        TIME: 'HH:mm',
        DAY: 'D',
        MONTH: 'MMM',
        YEAR: 'YYYY',
        DATE: 'MMMM\u00A0D',
        SHORT_DATE: 'MMM\u00A0D',
        DASH: '\u2013',
        LONG_DASH: '\u202F\u2013\u2009',
        NBSP: '\u00A0'
    },
    monthNames: {
        long: [
            'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September',
            'October', 'November', 'December'
        ],
        short: {
            standalone: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            formatted: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        },
        narrow: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D']
    },
    dayOfWeekNames: {
        long: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        short: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        narrow: ['S', 'M', 'T', 'W', 'T', 'F', 'S']
    },
    relativeTemplates: {
        short: {
            SECONDS_AGO: '{SECONDS_PASSED}{NBSP}s ago',
            MINUTES_AGO: '{MINUTES_PASSED}{NBSP}min ago',
            TODAY: '{TIME}',
            YESTERDAY: 'Yesterday, {TIME}',
            BEFORE_YESTERDAY: '{CURRENT_YEAR, select, yes{{SHORT_DATE}, {TIME}} other{{SHORT_DATE}, {YEAR}}}'
        },
        long: {
            SECONDS_AGO: '{SECONDS_PASSED, plural, =1{#{NBSP}second} other{#{NBSP}seconds}} ago',
            MINUTES_AGO: '{MINUTES_PASSED, plural, =1{#{NBSP}minute} other{#{NBSP}minutes}} ago',
            TODAY: '{TIME}',
            YESTERDAY: 'Yesterday, {TIME}',
            BEFORE_YESTERDAY: '{CURRENT_YEAR, select, yes{{DATE}, {TIME}} other{{DATE}, {YEAR}}}'
        }
    },
    absoluteTemplates: {
        short: {
            DATE: '{CURRENT_YEAR, select, yes{{SHORT_DATE}} other{{SHORT_DATE}, {YEAR}}}',
            DATETIME: '{CURRENT_YEAR, select, yes{{SHORT_DATE}, {TIME}} other{{SHORT_DATE}, {YEAR}, {TIME}}}'
        },
        long: {
            DATE: '{CURRENT_YEAR, select, yes{{DATE}} other{{DATE}, {YEAR}}}',
            DATETIME: '{CURRENT_YEAR, select, yes{{DATE}, {TIME}} other{{DATE}, {YEAR}, {TIME}}}'
        }
    },
    rangeTemplates: {
        short: {
            START_DATE: '{CURRENT_YEAR, select, yes{{SHORT_DATE}} other{{SHORT_DATE}, {YEAR}}}',
            END_DATE: `{
                            SAME_MONTH,
                            select,
                                yes{{DAY}}
                                other{{
                                    CURRENT_YEAR,
                                    select,
                                        yes{{SHORT_DATE}}
                                        other{{SHORT_DATE}, {YEAR}}
                                }}
                        }`,
            DATE: `{
                            SAME_MONTH,
                            select,
                                yes{{START_DATE}{DASH}{END_DATE}}
                                other{{START_DATE}{LONG_DASH}{END_DATE}}
                        }`,
            START_DATETIME: `{
                            SAME_DAY,
                            select,
                                yes{{TIME}}
                                other{{
                                    CURRENT_YEAR,
                                    select,
                                        yes{{SHORT_DATE}, {TIME}}
                                        other{{SHORT_DATE}, {YEAR}, {TIME}}
                                }}
                        }`,
            END_DATETIME: `{
                            SAME_DAY,
                            select,
                                yes{{
                                    CURRENT_YEAR,
                                    select,
                                        yes{{TIME}, {SHORT_DATE}}
                                        other{{TIME}, {SHORT_DATE}, {YEAR}}
                                }}
                                other{{
                                    CURRENT_YEAR,
                                    select,
                                        yes{{SHORT_DATE}, {TIME}}
                                        other{{SHORT_DATE}, {YEAR}, {TIME}}
                                }}
                        }`,
            DATETIME: `{
                            SAME_DAY,
                            select,
                                yes{{START_DATETIME}{DASH}{END_DATETIME}}
                                other{{START_DATETIME}{LONG_DASH}{END_DATETIME}}
                        }`
        },
        middle: {
            START_DATE: `{
                            SAME_MONTH,
                            select,
                                yes{{DAY}}
                                other{{
                                    CURRENT_YEAR,
                                    select,
                                        yes{{DATE}}
                                        other{{DATE}, {YEAR}}
                                }}
                        }`,
            END_DATE: '{CURRENT_YEAR, select, yes{{DATE}} other{{DATE}, {YEAR}}}',
            DATE: `{
                            SAME_MONTH,
                            select,
                                yes{{START_DATE}{DASH}{END_DATE}}
                                other{{START_DATE}{LONG_DASH}{END_DATE}}
                        }`,
            START_DATETIME: `{
                            SAME_DAY,
                            select,
                                yes{{TIME}}
                                other{{
                                    CURRENT_YEAR,
                                    select,
                                        yes{{DATE}, {TIME}}
                                        other{{DATE}, {YEAR}, {TIME}}
                                }}
                        }`,
            END_DATETIME: `{
                            SAME_DAY,
                            select,
                                yes{{
                                    CURRENT_YEAR,
                                    select,
                                        yes{{TIME}, {DATE}}
                                        other{{TIME}, {DATE}, {YEAR}}
                                }}
                                other{{
                                    CURRENT_YEAR,
                                    select,
                                        yes{{DATE}, {TIME}}
                                        other{{DATE}, {YEAR}, {TIME}}
                                }}
                        }`,
            DATETIME: `{
                            SAME_DAY,
                            select,
                                yes{{START_DATETIME}{DASH}{END_DATETIME}}
                                other{{START_DATETIME}{LONG_DASH}{END_DATETIME}}
                        }`
        },
        long: {
            START_DATE: '{CURRENT_YEAR, select, yes{{DATE}} other{{DATE}, {YEAR}}}',
            END_DATE: `{
                            SAME_MONTH,
                            select,
                                yes{{DAY}}
                                other{{
                                    CURRENT_YEAR,
                                    select,
                                        yes{{DATE}}
                                        other{{DATE}, {YEAR}}
                                }}
                        }`,
            DATE: `{
                            SAME_MONTH,
                            select,
                                yes{{START_DATE}{DASH}{END_DATE}}
                                other{{START_DATE}{LONG_DASH}{END_DATE}}
                        }`,
            START_DATETIME: `{
                            SAME_DAY,
                            select,
                                yes{{
                                    CURRENT_YEAR,
                                    select,
                                        yes{{DATE}, from{NBSP}{TIME}}
                                        other{{DATE}, {YEAR}, from{NBSP}{TIME}}
                                }}
                                other{{
                                    CURRENT_YEAR,
                                    select,
                                        yes{{DATE}, {TIME}}
                                        other{{DATE}, {YEAR}, {TIME}}
                                }}
                        }`,
            END_DATETIME: `{
                            SAME_DAY,
                            select,
                                yes{to{NBSP}{TIME}}
                                other{{
                                    CURRENT_YEAR,
                                    select,
                                        yes{{DATE}, {TIME}}
                                        other{{DATE}, {YEAR}, {TIME}}
                                }}
                        }`,
            DATETIME: `{
                            SAME_DAY,
                            select,
                                yes{{START_DATETIME} {END_DATETIME}}
                                other{From {START_DATETIME} to{NBSP}{END_DATETIME}}
                        }`
        }
    }
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const ruRU = {
    variables: {
        SECONDS: 's',
        MINUTES: 'm',
        TIME: 'HH:mm',
        DAY: 'D',
        MONTH: 'MMM',
        YEAR: 'YYYY',
        DATE: 'D\u00A0MMMM',
        SHORT_DATE: 'D\u00A0MMM',
        DASH: '\u2013',
        LONG_DASH: '\u202F\u2014\u2009',
        NBSP: '\u00A0'
    },
    monthNames: {
        long: [
            'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь',
            'Октябрь', 'Ноябрь', 'Декабрь'
        ],
        short: {
            standalone: ['янв', 'фев', 'март', 'апр', 'май', 'июнь', 'июль', 'авг', 'сен', 'окт', 'ноя', 'дек'],
            formatted: ['янв', 'фев', 'мар', 'апр', 'мая', 'июня', 'июля', 'авг', 'сен', 'окт', 'ноя', 'дек']
        },
        narrow: ['Я', 'Ф', 'М', 'А', 'М', 'И', 'И', 'А', 'С', 'О', 'Н', 'Д']
    },
    dayOfWeekNames: {
        long: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
        short: ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'],
        narrow: ['В', 'П', 'В', 'С', 'Ч', 'П', 'С']
    },
    relativeTemplates: {
        short: {
            SECONDS_AGO: '{SECONDS_PASSED}{NBSP}с назад',
            MINUTES_AGO: '{MINUTES_PASSED}{NBSP}мин назад',
            TODAY: '{TIME}',
            YESTERDAY: 'Вчера, {TIME}',
            BEFORE_YESTERDAY: '{CURRENT_YEAR, select, yes{{SHORT_DATE}, {TIME}} other{{SHORT_DATE}, {YEAR}}}'
        },
        long: {
            // tslint:disable-next-line:max-line-length
            SECONDS_AGO: '{SECONDS_PASSED, plural, =1{#{NBSP}секунду} =2{#{NBSP}секунды} other{#{NBSP}секунд}} назад',
            MINUTES_AGO: '{MINUTES_PASSED, plural, =1{#{NBSP}минуту} =2{#{NBSP}минуты} other{#{NBSP}минут}} назад',
            TODAY: '{TIME}',
            YESTERDAY: 'Вчера, {TIME}',
            BEFORE_YESTERDAY: '{CURRENT_YEAR, select, yes{{DATE}, {TIME}} other{{DATE}, {YEAR}}}'
        }
    },
    absoluteTemplates: {
        short: {
            DATE: '{CURRENT_YEAR, select, yes{{SHORT_DATE}} other{{SHORT_DATE} {YEAR}}}',
            DATETIME: '{CURRENT_YEAR, select, yes{{SHORT_DATE}, {TIME}} other{{SHORT_DATE} {YEAR}, {TIME}}}'
        },
        long: {
            DATE: '{CURRENT_YEAR, select, yes{{DATE}} other{{DATE} {YEAR}}}',
            DATETIME: '{CURRENT_YEAR, select, yes{{DATE}, {TIME}} other{{DATE} {YEAR}, {TIME}}}'
        }
    },
    rangeTemplates: {
        short: {
            START_DATE: `{
                            SAME_MONTH,
                            select,
                                yes{{DAY}}
                                other{{
                                    CURRENT_YEAR,
                                    select,
                                        yes{{SHORT_DATE}}
                                        other{{SHORT_DATE} {YEAR}}
                                }}
                        }`,
            END_DATE: '{CURRENT_YEAR, select, yes{{SHORT_DATE}} other{{SHORT_DATE} {YEAR}}}',
            DATE: `{
                            SAME_MONTH,
                            select,
                                yes{{START_DATE}{DASH}{END_DATE}}
                                other{{START_DATE}{LONG_DASH}{END_DATE}}
                        }`,
            START_DATETIME: `{
                            SAME_DAY,
                            select,
                                yes{{TIME}}
                                other{{
                                    CURRENT_YEAR,
                                    select,
                                        yes{{SHORT_DATE}, {TIME}}
                                        other{{SHORT_DATE} {YEAR}, {TIME}}
                                }}
                        }`,
            END_DATETIME: `{
                            SAME_DAY,
                            select,
                                yes{{
                                    CURRENT_YEAR,
                                    select,
                                        yes{{TIME}, {SHORT_DATE}}
                                        other{{TIME}, {SHORT_DATE} {YEAR}}
                                }}
                                other{{
                                    CURRENT_YEAR,
                                    select,
                                        yes{{SHORT_DATE}, {TIME}}
                                        other{{SHORT_DATE} {YEAR}, {TIME}}
                                }}
                        }`,
            DATETIME: `{
                            SAME_DAY,
                            select,
                                yes{{START_DATETIME}{DASH}{END_DATETIME}}
                                other{{START_DATETIME}{LONG_DASH}{END_DATETIME}}
                        }`
        },
        middle: {
            START_DATE: `{
                            SAME_MONTH,
                            select,
                                yes{{DAY}}
                                other{{
                                    CURRENT_YEAR,
                                    select,
                                        yes{{DATE}}
                                        other{{DATE} {YEAR}}
                                }}
                        }`,
            END_DATE: '{CURRENT_YEAR, select, yes{{DATE}} other{{DATE} {YEAR}}}',
            DATE: `{
                            SAME_MONTH,
                            select,
                                yes{{START_DATE}{DASH}{END_DATE}}
                                other{{START_DATE}{LONG_DASH}{END_DATE}}
                        }`,
            START_DATETIME: `{
                            SAME_DAY,
                            select,
                                yes{{TIME}}
                                other{{
                                    CURRENT_YEAR,
                                    select,
                                        yes{{DATE}, {TIME}}
                                        other{{DATE} {YEAR}, {TIME}}
                                }}
                        }`,
            END_DATETIME: `{
                            SAME_DAY,
                            select,
                                yes{{
                                    CURRENT_YEAR,
                                    select,
                                        yes{{TIME}, {DATE}}
                                        other{{TIME}, {DATE} {YEAR}}
                                }}
                                other{{
                                    CURRENT_YEAR,
                                    select,
                                        yes{{DATE}, {TIME}}
                                        other{{DATE} {YEAR}, {TIME}}
                                }}
                        }`,
            DATETIME: `{
                            SAME_DAY,
                            select,
                                yes{{START_DATETIME}{DASH}{END_DATETIME}}
                                other{{START_DATETIME}{LONG_DASH}{END_DATETIME}}
                        }`
        },
        long: {
            START_DATE: `{
                            SAME_MONTH,
                            select,
                                yes{{DAY}}
                                other{{
                                    CURRENT_YEAR,
                                    select,
                                        yes{{DATE}}
                                        other{{DATE} {YEAR}}
                                }}
                        }`,
            END_DATE: '{CURRENT_YEAR, select, yes{{DATE}} other{{DATE} {YEAR}}}',
            DATE: `{
                            SAME_MONTH,
                            select,
                                yes{{START_DATE}{DASH}{END_DATE}}
                                other{{START_DATE}{LONG_DASH}{END_DATE}}
                        }`,
            START_DATETIME: `{
                            SAME_DAY,
                            select,
                                yes{{
                                    CURRENT_YEAR,
                                    select,
                                        yes{{DATE}, с{NBSP}{TIME}}
                                        other{{DATE} {YEAR}, с{NBSP}{TIME}}
                                }}
                                other{{
                                    CURRENT_YEAR,
                                    select,
                                        yes{{DATE}, {TIME}}
                                        other{{DATE} {YEAR}, {TIME}}
                                }}
                        }`,
            END_DATETIME: `{
                            SAME_DAY,
                            select,
                                yes{по{NBSP}{TIME}}
                                other{{
                                    CURRENT_YEAR,
                                    select,
                                        yes{{DATE}, {TIME}}
                                        other{{DATE} {YEAR}, {TIME}}
                                }}
                        }`,
            DATETIME: `{
                            SAME_DAY,
                            select,
                                yes{{START_DATETIME} {END_DATETIME}}
                                other{С{NBSP}{START_DATETIME} по{NBSP}{END_DATETIME}}
                        }`
        }
    }
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const moment = _rollupMoment__default || _rollupMoment;
/**
 * InjectionToken for moment date adapter to configure options.
 * @type {?}
 */
const MC_MOMENT_DATE_ADAPTER_OPTIONS = new InjectionToken('MC_MOMENT_DATE_ADAPTER_OPTIONS', {
    providedIn: 'root',
    factory: MC_MOMENT_DATE_ADAPTER_OPTIONS_FACTORY
});
/**
 * \@docs-private
 * @return {?}
 */
// tslint:disable:naming-convention
function MC_MOMENT_DATE_ADAPTER_OPTIONS_FACTORY() {
    return {
        useUtc: false,
        findDateFormat: false
    };
}
/**
 * Creates an array and fills it with values.
 * @template T
 * @param {?} length
 * @param {?} valueFunction
 * @return {?}
 */
function range(length, valueFunction) {
    /** @type {?} */
    const valuesArray = Array(length);
    for (let i = 0; i < length; i++) {
        valuesArray[i] = valueFunction(i);
    }
    return valuesArray;
}
class MomentDateAdapter extends DateAdapter {
    /**
     * @param {?} dateLocale
     * @param {?=} options
     */
    constructor(dateLocale, options) {
        super();
        this.options = options;
        this.invalidDateErrorText = 'Invalid date';
        this.setLocale(dateLocale || moment.locale());
        this.configureTranslator(this.locale);
    }
    /**
     * @private
     * @return {?}
     */
    get momentWithLocale() {
        return moment().locale(this.locale);
    }
    /**
     * @param {?} locale
     * @return {?}
     */
    setLocale(locale) {
        super.setLocale(locale);
        /** @type {?} */
        let momentLocaleData = moment.localeData(locale);
        // This is our customs translations
        /** @type {?} */
        const i18nLocals = ['en', 'ru'];
        if (i18nLocals.indexOf(locale) !== -1) {
            this.formatterConfig = locale === 'en' ? enUS : ruRU;
            momentLocaleData = moment.updateLocale(locale, {
                monthsShort: {
                    format: this.formatterConfig.monthNames.short.formatted,
                    standalone: this.formatterConfig.monthNames.short.standalone
                },
                weekdaysShort: this.formatterConfig.dayOfWeekNames.short,
                weekdays: this.formatterConfig.dayOfWeekNames.long
            });
        }
        this.localeData = {
            firstDayOfWeek: momentLocaleData.firstDayOfWeek(),
            longMonths: momentLocaleData.months(),
            shortMonths: momentLocaleData.monthsShort(),
            dates: range(31, (/**
             * @param {?} i
             * @return {?}
             */
            (i) => this.createDate(2017, 0, i + 1).format('D'))),
            longDaysOfWeek: momentLocaleData.weekdays(),
            shortDaysOfWeek: momentLocaleData.weekdaysShort(),
            narrowDaysOfWeek: momentLocaleData.weekdaysMin()
        };
    }
    /**
     * @param {?} date
     * @return {?}
     */
    getYear(date) {
        return this.clone(date).year();
    }
    /**
     * @param {?} date
     * @return {?}
     */
    getMonth(date) {
        return this.clone(date).month();
    }
    /**
     * @param {?} date
     * @return {?}
     */
    getDate(date) {
        return this.clone(date).date();
    }
    /**
     * @param {?} date
     * @return {?}
     */
    getHours(date) {
        return this.clone(date).hours();
    }
    /**
     * @param {?} date
     * @return {?}
     */
    getMinutes(date) {
        return this.clone(date).minutes();
    }
    /**
     * @param {?} date
     * @return {?}
     */
    getSeconds(date) {
        return this.clone(date).seconds();
    }
    /**
     * @param {?} date
     * @return {?}
     */
    getMilliseconds(date) {
        return this.clone(date).milliseconds();
    }
    /**
     * @param {?} date
     * @return {?}
     */
    getTime(date) {
        return date.valueOf();
    }
    /**
     * @param {?} date
     * @return {?}
     */
    getDayOfWeek(date) {
        return this.clone(date).day();
    }
    /**
     * @param {?} style
     * @return {?}
     */
    getMonthNames(style) {
        // Moment.js doesn't support narrow month names
        return style === 'long' ? this.localeData.longMonths : this.localeData.shortMonths;
    }
    /**
     * @return {?}
     */
    getDateNames() {
        return this.localeData.dates;
    }
    /**
     * @param {?} style
     * @return {?}
     */
    getDayOfWeekNames(style) {
        if (style === 'long') {
            return this.localeData.longDaysOfWeek;
        }
        if (style === 'short') {
            return this.localeData.shortDaysOfWeek;
        }
        return this.localeData.narrowDaysOfWeek;
    }
    /**
     * @param {?} date
     * @return {?}
     */
    getYearName(date) {
        return this.clone(date).format('YYYY');
    }
    /**
     * @return {?}
     */
    getFirstDayOfWeek() {
        return this.localeData.firstDayOfWeek;
    }
    /**
     * @param {?} date
     * @return {?}
     */
    getNumDaysInMonth(date) {
        return this.clone(date).daysInMonth();
    }
    /**
     * @param {?} date
     * @return {?}
     */
    clone(date) {
        return date.clone().locale(this.locale);
    }
    /**
     * @param {?} year
     * @param {?} month
     * @param {?} date
     * @return {?}
     */
    createDate(year, month, date) {
        // Moment.js will create an invalid date if any of the components are out of bounds, but we
        // explicitly check each case so we can throw more descriptive errors.
        if (month < 0 || month > 11) {
            throw Error(`Invalid month index "${month}". Month index has to be between 0 and 11.`);
        }
        if (date < 1) {
            throw Error(`Invalid date "${date}". Date has to be greater than 0.`);
        }
        /** @type {?} */
        const result = this.createMoment({ year, month, date }).locale(this.locale);
        // If the result isn't valid, the date must have been out of bounds for this month.
        if (!result.isValid()) {
            throw Error(`Invalid date "${date}" for month with index "${month}".`);
        }
        return result;
    }
    /**
     * @param {?} year
     * @param {?} month
     * @param {?} date
     * @param {?} hours
     * @param {?} minutes
     * @param {?} seconds
     * @param {?} milliseconds
     * @return {?}
     */
    createDateTime(year, month, date, hours, minutes, seconds, milliseconds) {
        /** @type {?} */
        const newDate = this.createDate(year, month, date);
        newDate.hours(hours);
        newDate.minutes(minutes);
        newDate.seconds(seconds);
        newDate.milliseconds(milliseconds);
        return newDate;
    }
    /**
     * @return {?}
     */
    today() {
        return this.createMoment().locale(this.locale);
    }
    /**
     * @param {?} value
     * @param {?} parseFormat
     * @return {?}
     */
    parse(value, parseFormat) {
        if (value) {
            if (value && typeof value === 'string') {
                if (this.options && this.options.findDateFormat) {
                    return this.findFormat(value);
                }
                return parseFormat
                    ? this.createMoment(value, parseFormat, this.locale)
                    : this.createMoment(value).locale(this.locale);
            }
            return this.createMoment(value).locale(this.locale);
        }
        return null;
    }
    /**
     * @param {?} date
     * @param {?} displayFormat
     * @return {?}
     */
    format(date, displayFormat) {
        // tslint:disable:no-parameter-reassignment
        date = this.clone(date);
        if (!this.isValid(date)) {
            throw Error('MomentDateAdapter: Cannot format invalid date.');
        }
        return date.format(displayFormat);
    }
    /**
     * @param {?} date
     * @param {?} years
     * @return {?}
     */
    addCalendarYears(date, years) {
        return this.clone(date).add({ years });
    }
    /**
     * @param {?} date
     * @param {?} months
     * @return {?}
     */
    addCalendarMonths(date, months) {
        return this.clone(date).add({ months });
    }
    /**
     * @param {?} date
     * @param {?} days
     * @return {?}
     */
    addCalendarDays(date, days) {
        return this.clone(date).add({ days });
    }
    /**
     * @param {?} date
     * @return {?}
     */
    toIso8601(date) {
        return this.clone(date).format();
    }
    /**
     * https://www.ietf.org/rfc/rfc3339.txt
     * @param {?} value
     * @return {?}
     */
    deserialize(value) {
        /** @type {?} */
        let date;
        if (value instanceof Date) {
            date = this.createMoment(value).locale(this.locale);
        }
        else if (this.isDateInstance(value)) {
            // Note: assumes that cloning also sets the correct locale.
            return this.clone(value);
        }
        if (typeof value === 'string') {
            if (!value) {
                return null;
            }
            date = this.createMoment(value, moment.ISO_8601).locale(this.locale);
        }
        if (date && this.isValid(date)) {
            return this.createMoment(date).locale(this.locale);
        }
        return super.deserialize(value);
    }
    /**
     * @param {?} obj
     * @return {?}
     */
    isDateInstance(obj) {
        return moment.isMoment(obj);
    }
    /**
     * @param {?} date
     * @return {?}
     */
    isValid(date) {
        return this.clone(date).isValid();
    }
    /**
     * @return {?}
     */
    invalid() {
        return moment.invalid();
    }
    /**
     * @param {?} date
     * @param {?} template
     * @return {?}
     */
    relativeDate(date, template) {
        if (!this.isDateInstance(date)) {
            throw new Error(this.invalidDateErrorText);
        }
        /** @type {?} */
        const now = this.momentWithLocale;
        /** @type {?} */
        const totalSeconds = now.diff(date, 'seconds');
        /** @type {?} */
        const totalMinutes = now.diff(date, 'minutes');
        /** @type {?} */
        const isToday = now.isSame(date, 'day');
        /** @type {?} */
        const isYesterday = now.add(-1, 'days').isSame(date, 'day');
        /** @type {?} */
        const templateVariables = Object.assign({}, this.formatterConfig.variables, template.variables);
        /** @type {?} */
        const variables = this.compileVariables(date, templateVariables);
        /** @type {?} */
        let newTemplate;
        if (totalSeconds <= 59) { // seconds ago
            variables.SECONDS_PASSED = totalSeconds;
            newTemplate = template.SECONDS_AGO;
        }
        else if (totalMinutes <= 59) { // minutes ago
            variables.MINUTES_PASSED = totalMinutes;
            newTemplate = template.MINUTES_AGO;
        }
        else if (isToday) { // today
            newTemplate = template.TODAY;
        }
        else if (isYesterday) { // yesterday
            newTemplate = template.YESTERDAY;
        }
        else { // before yesterday
            newTemplate = template.BEFORE_YESTERDAY;
        }
        return this.messageformat.compile(newTemplate)(variables);
    }
    /**
     * @param {?} date
     * @return {?}
     */
    relativeShortDate(date) {
        return this.relativeDate(date, this.formatterConfig.relativeTemplates.short);
    }
    /**
     * @param {?} date
     * @return {?}
     */
    relativeLongDate(date) {
        return this.relativeDate(date, this.formatterConfig.relativeTemplates.long);
    }
    /**
     * @param {?} date
     * @param {?} params
     * @param {?=} datetime
     * @return {?}
     */
    absoluteDate(date, params, datetime = false) {
        if (!this.isDateInstance(date)) {
            throw new Error(this.invalidDateErrorText);
        }
        /** @type {?} */
        const variables = Object.assign({}, this.formatterConfig.variables, params.variables);
        /** @type {?} */
        const template = datetime ? params.DATETIME : params.DATE;
        return this.messageformat.compile(template)(this.compileVariables(date, variables));
    }
    /**
     * @param {?} date
     * @return {?}
     */
    absoluteShortDate(date) {
        return this.absoluteDate(date, this.formatterConfig.absoluteTemplates.short);
    }
    /**
     * @param {?} date
     * @return {?}
     */
    absoluteShortDateTime(date) {
        return this.absoluteDate(date, this.formatterConfig.absoluteTemplates.short, true);
    }
    /**
     * @param {?} date
     * @return {?}
     */
    absoluteLongDate(date) {
        return this.absoluteDate(date, this.formatterConfig.absoluteTemplates.long);
    }
    /**
     * @param {?} date
     * @return {?}
     */
    absoluteLongDateTime(date) {
        return this.absoluteDate(date, this.formatterConfig.absoluteTemplates.long, true);
    }
    /**
     * @param {?} startDate
     * @param {?} endDate
     * @param {?} template
     * @return {?}
     */
    rangeDate(startDate, endDate, template) {
        if (!this.isDateInstance(startDate) || !this.isDateInstance(endDate)) {
            throw new Error(this.invalidDateErrorText);
        }
        /** @type {?} */
        const variables = Object.assign({}, this.formatterConfig.variables, template.variables);
        /** @type {?} */
        const sameMonth = this.isSame('month', startDate, endDate);
        /** @type {?} */
        const startDateVariables = this.compileVariables(startDate, variables);
        startDateVariables.SAME_MONTH = sameMonth;
        /** @type {?} */
        const endDateVariables = this.compileVariables(endDate, variables);
        endDateVariables.SAME_MONTH = sameMonth;
        /** @type {?} */
        const bothCurrentYear = startDateVariables.CURRENT_YEAR === 'yes' &&
            endDateVariables.CURRENT_YEAR === 'yes';
        startDateVariables.CURRENT_YEAR = bothCurrentYear ? 'yes' : 'no';
        endDateVariables.CURRENT_YEAR = bothCurrentYear ? 'yes' : 'no';
        /** @type {?} */
        const params = Object.assign({}, variables, { START_DATE: this.messageformat.compile(template.START_DATE)(startDateVariables), END_DATE: this.messageformat.compile(template.END_DATE)(endDateVariables), SAME_MONTH: sameMonth });
        return this.messageformat.compile(template.DATE)(params);
    }
    /**
     * @param {?} startDate
     * @param {?} endDate
     * @param {?} template
     * @return {?}
     */
    rangeDateTime(startDate, endDate, template) {
        if (!this.isDateInstance(startDate) || !this.isDateInstance(endDate)) {
            throw new Error(this.invalidDateErrorText);
        }
        /** @type {?} */
        const variables = Object.assign({}, this.formatterConfig.variables, template.variables);
        /** @type {?} */
        const sameMonth = this.isSame('month', startDate, endDate);
        /** @type {?} */
        const sameDay = this.isSame('day', startDate, endDate);
        /** @type {?} */
        const startDateVariables = this.compileVariables(startDate, variables);
        startDateVariables.SAME_MONTH = sameMonth;
        startDateVariables.SAME_DAY = sameDay;
        /** @type {?} */
        const endDateVariables = this.compileVariables(endDate, variables);
        endDateVariables.SAME_MONTH = sameMonth;
        endDateVariables.SAME_DAY = sameDay;
        /** @type {?} */
        const bothCurrentYear = startDateVariables.CURRENT_YEAR === 'yes' &&
            endDateVariables.CURRENT_YEAR === 'yes';
        startDateVariables.CURRENT_YEAR = bothCurrentYear ? 'yes' : 'no';
        endDateVariables.CURRENT_YEAR = bothCurrentYear ? 'yes' : 'no';
        /** @type {?} */
        const params = Object.assign({}, variables, { START_DATETIME: this.messageformat.compile(template.START_DATETIME)(startDateVariables), END_DATETIME: this.messageformat.compile(template.END_DATETIME)(endDateVariables), SAME_MONTH: sameMonth, SAME_DAY: sameDay });
        return this.messageformat.compile(template.DATETIME)(params);
    }
    /**
     * @param {?} startDate
     * @param {?} endDate
     * @return {?}
     */
    rangeShortDate(startDate, endDate) {
        return this.rangeDate(startDate, endDate, this.formatterConfig.rangeTemplates.short);
    }
    /**
     * @param {?} startDate
     * @param {?} endDate
     * @return {?}
     */
    rangeShortDateTime(startDate, endDate) {
        return this.rangeDateTime(startDate, endDate, this.formatterConfig.rangeTemplates.short);
    }
    /**
     * @param {?} startDate
     * @param {?} endDate
     * @return {?}
     */
    rangeLongDate(startDate, endDate) {
        return this.rangeDate(startDate, endDate, this.formatterConfig.rangeTemplates.long);
    }
    /**
     * @param {?} startDate
     * @param {?} endDate
     * @return {?}
     */
    rangeLongDateTime(startDate, endDate) {
        return this.rangeDateTime(startDate, endDate, this.formatterConfig.rangeTemplates.long);
    }
    /**
     * @param {?} startDate
     * @param {?} endDate
     * @return {?}
     */
    rangeMiddleDateTime(startDate, endDate) {
        return this.rangeDateTime(startDate, endDate, this.formatterConfig.rangeTemplates.middle);
    }
    /**
     * Creates a Moment instance while respecting the current UTC settings.
     * @private
     * @param {...?} args
     * @return {?}
     */
    createMoment(...args) {
        return (this.options && this.options.useUtc) ? moment.utc(...args) : moment(...args);
    }
    /**
     * @private
     * @param {?} date
     * @param {?} variables
     * @return {?}
     */
    compileVariables(date, variables) {
        /** @type {?} */
        const compiledVariables = {};
        // tslint:disable-next-line:no-for-in
        for (const key in variables) {
            if (!variables.hasOwnProperty(key)) {
                continue;
            }
            /** @type {?} */
            const value = variables[key];
            compiledVariables[key] = date.format(value);
        }
        compiledVariables.CURRENT_YEAR = this.isCurrentYear(date);
        return compiledVariables;
    }
    /**
     * @private
     * @param {?} value
     * @return {?}
     */
    isCurrentYear(value) {
        return this.momentWithLocale.isSame(value, 'year') ? 'yes' : 'no';
    }
    /**
     * @private
     * @param {?} unit
     * @param {?} startDate
     * @param {?} endDate
     * @return {?}
     */
    isSame(unit, startDate, endDate) {
        return startDate.isSame(endDate, unit) ? 'yes' : 'no';
    }
    /**
     * @private
     * @param {?} locale
     * @return {?}
     */
    configureTranslator(locale) {
        this.messageformat = new MessageFormat(locale);
    }
    /**
     * @private
     * @param {?} value
     * @return {?}
     */
    isNumeric(value) {
        return !isNaN(parseFloat(value)) && isFinite(value);
    }
    /**
     * @private
     * @param {?} value
     * @return {?}
     */
    findFormat(value) {
        if (!value) {
            return null;
        }
        // default test - iso
        /** @type {?} */
        const isoDate = this.createMoment(value, moment.ISO_8601, this.locale);
        if (isoDate.isValid()) {
            return isoDate;
        }
        if (this.isNumeric(value)) {
            // unix time sec
            return this.createMoment(value, 'X', this.locale);
        }
        // long months naming: D MMM YYYY, MMM Do YYYY with short case support
        if (/^\d{1,2}\s\S+\s(\d{2}|\d{4})$/.test(value.trim()) ||
            /^\S+\s\d{1,2}[a-z]{2}\s(\d{2}|\d{4})$/.test(value.trim())) {
            return this.parseWithSpace(value);
        }
        // slash notation: DD/MM/YYYY, MM/DD/YYYY with short case support
        if (/^\d{1,2}\/\d{1,2}\/(\d{2}|\d{4})$/.test(value)) {
            return this.parseWithSlash(value);
        }
        // dash notation: DD-MM-YYYY, YYYY-DD-MM with short case support
        if (/(^(\d{1,2}|\d{4})-\d{1,2}-\d{1,2}$)|(^\d{1,2}-\d{1,2}-(\d{2}|\d{4})$)/.test(value)) {
            return this.parseWithDash(value);
        }
        // dot notation: DD.MM.YYYY with short case support
        if (/^\d{1,2}\.\d{1,2}\.(\d{2}|\d{4})$/.test(value)) {
            return this.parseWithDot(value);
        }
        return null;
    }
    /**
     * @private
     * @param {?} value
     * @return {?}
     */
    parseWithSpace(value) {
        switch (this.locale) {
            case 'ru':
                return this.createMoment(value, 'DD MMMM YYYY', this.locale);
            case 'en':
                // 16 Feb 2019 vs Feb 16th 2019, covers Feb and February cases
                if (this.isNumeric(value[0])) {
                    return this.createMoment(value, 'D MMMM YYYY', this.locale);
                }
                return this.createMoment(value, 'MMMM Do YYYY', this.locale);
            default:
                throw new Error(`Locale ${this.locale} is not supported`);
        }
    }
    /**
     * @private
     * @param {?} value
     * @return {?}
     */
    parseWithSlash(value) {
        switch (this.locale) {
            case 'ru':
                return this.createMoment(value, 'DD/MM/YYYY', this.locale);
            // todo do we use generalized locales? en vs en-US; until not we try to guess
            case 'en':
                // US vs UK
                /** @type {?} */
                const parts = value.split('/');
                /** @type {?} */
                const datePartsCount = 3;
                if (parts.length !== datePartsCount) {
                    return null;
                }
                /** @type {?} */
                const firstPart = parts[0].trim();
                /** @type {?} */
                const secondPart = parts[1].trim();
                if (!this.isNumeric(firstPart) || !this.isNumeric(secondPart)) {
                    return null;
                }
                /** @type {?} */
                const monthsInYears = 12;
                /** @type {?} */
                const canFirstBeMonth = +firstPart <= monthsInYears;
                /** @type {?} */
                const canSecondByMonth = +secondPart <= monthsInYears;
                // first two parts cannot be month
                if (!canFirstBeMonth && !canSecondByMonth) {
                    return null;
                }
                /** @type {?} */
                const canDetermineWhereMonth = canFirstBeMonth && canSecondByMonth;
                if (canDetermineWhereMonth) {
                    // use US format by default
                    return this.createMoment(value, 'MM/DD/YYYY', this.locale);
                }
                return canFirstBeMonth && !canSecondByMonth
                    ? this.createMoment(value, 'MM/DD/YYYY', this.locale)
                    : this.createMoment(value, 'DD/MM/YYYY', this.locale);
            default:
                throw new Error(`Locale ${this.locale} is not supported`);
        }
    }
    /**
     * @private
     * @param {?} value
     * @return {?}
     */
    parseWithDash(value) {
        // leading year vs finishing year
        /** @type {?} */
        const parts = value.split('-');
        if (parts[0].length === 0) {
            return null;
        }
        /** @type {?} */
        const maxDayOrMonthCharsCount = 2;
        return parts[0].length <= maxDayOrMonthCharsCount
            ? this.createMoment(value, 'DD-MM-YYYY', this.locale)
            : this.createMoment(value, 'YYYY-MM-DD', this.locale);
    }
    /**
     * @private
     * @param {?} value
     * @return {?}
     */
    parseWithDot(value) {
        // covers two cases YYYY and YY (for current year)
        return this.createMoment(value, 'DD.MM.YYYY', this.locale);
    }
}
MomentDateAdapter.decorators = [
    { type: Injectable },
];
/** @nocollapse */
MomentDateAdapter.ctorParameters = () => [
    { type: String, decorators: [{ type: Optional }, { type: Inject, args: [MC_DATE_LOCALE,] }] },
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [MC_MOMENT_DATE_ADAPTER_OPTIONS,] }] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const MC_MOMENT_DATE_FORMATS = {
    parse: {
        dateInput: 'L'
    },
    display: {
        dateInput: 'L',
        monthYearLabel: 'MMM YYYY',
        dateA11yLabel: 'LL',
        monthYearA11yLabel: 'MMMM YYYY'
    }
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class MomentDateModule {
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
            },] },
];
const ɵ0 = MC_MOMENT_DATE_FORMATS;
class McMomentDateModule {
}
McMomentDateModule.decorators = [
    { type: NgModule, args: [{
                imports: [MomentDateModule],
                providers: [{
                        provide: MC_DATE_FORMATS, useValue: ɵ0
                    }]
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { MomentDateModule, McMomentDateModule, MC_MOMENT_DATE_ADAPTER_OPTIONS_FACTORY, MC_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter, MC_MOMENT_DATE_FORMATS };
//# sourceMappingURL=mosaic-moment-adapter.js.map
