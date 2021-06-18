import { __decorate, __metadata } from "tslib";
// tslint:disable:no-magic-numbers
import { Inject, Injectable, InjectionToken, Optional } from '@angular/core';
import { DateAdapter, MC_DATE_LOCALE } from '@ptsecurity/cdk/datetime';
import { DateFormatter } from '@ptsecurity/mosaic/core';
// Depending on whether rollup is used, moment needs to be imported differently.
// Since Moment.js doesn't have a default export, we normally need to import using the `* as`
// syntax. However, rollup creates a synthetic default module and we thus need to import it using
// the `default as` syntax.
import * as _moment from 'moment';
// tslint:disable:no-duplicate-imports
// @ts-ignore (look at tsconfig)
import { default as _rollupMoment } from 'moment';
import { enUS } from './locales/en-US';
import { ruRU } from './locales/ru-RU';
import * as i0 from "@angular/core";
const moment = _rollupMoment || _moment;
/** InjectionToken for moment date adapter to configure options. */
export const MC_MOMENT_DATE_ADAPTER_OPTIONS = new InjectionToken('MC_MOMENT_DATE_ADAPTER_OPTIONS', {
    providedIn: 'root',
    factory: MC_MOMENT_DATE_ADAPTER_OPTIONS_FACTORY
});
/** @docs-private */
// tslint:disable:naming-convention
export function MC_MOMENT_DATE_ADAPTER_OPTIONS_FACTORY() {
    return {
        useUtc: false,
        findDateFormat: false
    };
}
/** Creates an array and fills it with values. */
function range(length, valueFunction) {
    const valuesArray = Array(length);
    for (let i = 0; i < length; i++) {
        valuesArray[i] = valueFunction(i);
    }
    return valuesArray;
}
// @ts-ignore
export function DeprecatedMethod(target, key, descriptor) {
    const origin = descriptor.value;
    // tslint:disable-next-line:no-function-expression only-arrow-functions
    descriptor.value = function (...args) {
        console.warn(`Found use of deprecated method ${key}, it was moved in DateFormatter. ` +
            `The deprecated method will be removed in 13.0.0.`);
        return origin.apply(this, args);
    };
    return descriptor;
}
export class MomentDateAdapter extends DateAdapter {
    constructor(dateLocale, options) {
        super();
        this.options = options;
        this.firstMonth = 0;
        this.setLocale(dateLocale || moment.locale());
    }
    get lastMonth() {
        // tslint:disable-next-line:binary-expression-operand-order no-magic-numbers
        return 11 + this.firstMonth;
    }
    setLocale(locale) {
        super.setLocale(locale);
        this.dateFormatter = new DateFormatter(this, locale);
        this.config = locale === 'en' ? enUS : ruRU;
        let momentLocaleData = moment.localeData(locale);
        // This is our customs translations
        const i18nLocals = ['en', 'ru'];
        if (i18nLocals.indexOf(locale) !== -1) {
            momentLocaleData = moment.updateLocale(locale, {
                monthsShort: {
                    format: this.config.monthNames.short.formatted,
                    standalone: this.config.monthNames.short.standalone
                },
                weekdaysShort: this.config.dayOfWeekNames.short,
                weekdays: this.config.dayOfWeekNames.long
            });
        }
        this.localeData = {
            firstDayOfWeek: this.config.firstDayOfWeek,
            longMonths: momentLocaleData.months(),
            shortMonths: momentLocaleData.monthsShort(),
            dates: range(31, (i) => this.createDate(2017, this.firstMonth, i + 1).format('D')),
            longDaysOfWeek: momentLocaleData.weekdays(),
            shortDaysOfWeek: momentLocaleData.weekdaysShort(),
            narrowDaysOfWeek: momentLocaleData.weekdaysMin()
        };
    }
    getLocaleData() {
        return this.localeData;
    }
    setLocaleData(localeData) {
        this.localeData = localeData;
    }
    updateLocaleData(localeData) {
        this.localeData = Object.assign(Object.assign({}, this.localeData), localeData);
    }
    getYear(date) { return this.clone(date).year(); }
    getMonth(date) { return this.clone(date).month(); }
    getDate(date) { return this.clone(date).date(); }
    getHours(date) { return this.clone(date).hours(); }
    getMinutes(date) { return this.clone(date).minutes(); }
    getSeconds(date) { return this.clone(date).seconds(); }
    getMilliseconds(date) { return this.clone(date).milliseconds(); }
    getTime(date) { return date.valueOf(); }
    getDayOfWeek(date) { return this.clone(date).day(); }
    getMonthNames(style) {
        // Moment.js doesn't support narrow month names
        return style === 'long' ? this.localeData.longMonths : this.localeData.shortMonths;
    }
    getDateNames() {
        return this.localeData.dates;
    }
    getDayOfWeekNames(style) {
        if (style === 'long') {
            return this.localeData.longDaysOfWeek;
        }
        if (style === 'short') {
            return this.localeData.shortDaysOfWeek;
        }
        return this.localeData.narrowDaysOfWeek;
    }
    getYearName(date) {
        return this.clone(date).format('YYYY');
    }
    getFirstDayOfWeek() {
        return this.localeData.firstDayOfWeek;
    }
    getNumDaysInMonth(date) {
        return this.clone(date).daysInMonth();
    }
    clone(date) {
        return date.clone().locale(this.locale);
    }
    createDate(year, month = 0, date = 1) {
        // Moment.js will create an invalid date if any of the components are out of bounds, but we
        // explicitly check each case so we can throw more descriptive errors.
        if (month < this.firstMonth || month > this.lastMonth) {
            throw Error(`Invalid month index "${month}".
                Month index has to be between ${this.firstMonth} and ${this.lastMonth}.`);
        }
        if (date < 1) {
            throw Error(`Invalid date "${date}". Date has to be greater than 0.`);
        }
        const result = this.createMoment({ year, month, date }).locale(this.locale);
        // If the result isn't valid, the date must have been out of bounds for this month.
        if (!result.isValid()) {
            throw Error(`Invalid date "${date}" for month with index "${month}".`);
        }
        return result;
    }
    createDateTime(year, month, date, hours, minutes, seconds, milliseconds) {
        const newDate = this.createDate(year, month, date);
        newDate.hours(hours);
        newDate.minutes(minutes);
        newDate.seconds(seconds);
        newDate.milliseconds(milliseconds);
        return newDate;
    }
    today() {
        return this.createMoment().locale(this.locale);
    }
    parse(value, parseFormat) {
        if (value) {
            if (typeof value === 'string') {
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
    format(date, displayFormat) {
        // tslint:disable:no-parameter-reassignment
        date = this.clone(date);
        if (!this.isValid(date)) {
            throw Error('MomentDateAdapter: Cannot format invalid date.');
        }
        return date.format(displayFormat);
    }
    addCalendarYears(date, years) {
        return this.clone(date).add({ years });
    }
    addCalendarMonths(date, months) {
        return this.clone(date).add({ months });
    }
    addCalendarDays(date, days) {
        return this.clone(date).add({ days });
    }
    toIso8601(date) {
        return this.clone(date).format();
    }
    /** https://www.ietf.org/rfc/rfc3339.txt */
    deserialize(value) {
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
    isDateInstance(obj) {
        return moment.isMoment(obj);
    }
    isValid(date) {
        return this.clone(date).isValid();
    }
    invalid() {
        return moment.invalid();
    }
    hasSame(startDate, endDate, unit) {
        return startDate.isSame(endDate, unit);
    }
    diffNow(date, unit) {
        return date.diff(this.today(), unit);
    }
    absoluteDate(date, params, datetime, milliseconds) {
        return this.dateFormatter.absoluteDate(date, params, datetime, milliseconds);
    }
    absoluteLongDate(date) {
        return this.dateFormatter.absoluteLongDate(date);
    }
    absoluteLongDateTime(date, options) {
        return this.dateFormatter.absoluteLongDateTime(date, options);
    }
    absoluteShortDate(date) {
        return this.dateFormatter.absoluteShortDate(date);
    }
    absoluteShortDateTime(date, options) {
        return this.dateFormatter.absoluteShortDateTime(date, options);
    }
    openedRangeDate(startDate, endDate, template) {
        return this.dateFormatter.openedRangeDate(startDate, endDate, template);
    }
    openedRangeDateTime(startDate, endDate, template) {
        return this.dateFormatter.openedRangeDateTime(startDate, endDate, template);
    }
    rangeDate(startDate, endDate, template) {
        return this.dateFormatter.rangeDate(startDate, endDate, template);
    }
    rangeDateTime(startDate, endDate, template) {
        return this.dateFormatter.rangeDateTime(startDate, endDate, template);
    }
    rangeLongDate(startDate, endDate) {
        return this.dateFormatter.rangeLongDate(startDate, endDate);
    }
    rangeLongDateTime(startDate, endDate) {
        return this.dateFormatter.rangeLongDateTime(startDate, endDate);
    }
    rangeMiddleDateTime(startDate, endDate) {
        return this.dateFormatter.rangeMiddleDateTime(startDate, endDate);
    }
    rangeShortDate(startDate, endDate) {
        return this.dateFormatter.rangeShortDate(startDate, endDate);
    }
    rangeShortDateTime(startDate, endDate) {
        return this.dateFormatter.rangeShortDateTime(startDate, endDate);
    }
    relativeDate(date, template) {
        return this.dateFormatter.relativeDate(date, template);
    }
    relativeLongDate(date) {
        return this.dateFormatter.relativeLongDate(date);
    }
    relativeShortDate(date) {
        return this.dateFormatter.relativeShortDate(date);
    }
    /** Creates a Moment instance while respecting the current UTC settings. */
    createMoment(...args) {
        var _a;
        return ((_a = this.options) === null || _a === void 0 ? void 0 : _a.useUtc) ? moment.utc(...args) : moment(...args);
    }
    isNumeric(value) {
        return !isNaN(parseFloat(value)) && isFinite(value);
    }
    findFormat(value) {
        if (!value) {
            return null;
        }
        // default test - iso
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
    parseWithSlash(value) {
        switch (this.locale) {
            case 'ru':
                return this.createMoment(value, 'DD/MM/YYYY', this.locale);
            // todo do we use generalized locales? en vs en-US; until not we try to guess
            case 'en':
                // US vs UK
                const parts = value.split('/');
                const datePartsCount = 3;
                if (parts.length !== datePartsCount) {
                    return null;
                }
                const firstPart = parts[0].trim();
                const secondPart = parts[1].trim();
                if (!this.isNumeric(firstPart) || !this.isNumeric(secondPart)) {
                    return null;
                }
                const monthsInYears = 12;
                const canFirstBeMonth = +firstPart <= monthsInYears;
                const canSecondByMonth = +secondPart <= monthsInYears;
                // first two parts cannot be month
                if (!canFirstBeMonth && !canSecondByMonth) {
                    return null;
                }
                const canDetermineWhereMonth = canFirstBeMonth && canSecondByMonth;
                // use US format by default
                if (canDetermineWhereMonth) {
                    return this.createMoment(value, 'MM/DD/YYYY', this.locale);
                }
                return canFirstBeMonth && !canSecondByMonth
                    ? this.createMoment(value, 'MM/DD/YYYY', this.locale)
                    : this.createMoment(value, 'DD/MM/YYYY', this.locale);
            default:
                throw new Error(`Locale ${this.locale} is not supported`);
        }
    }
    parseWithDash(value) {
        // leading year vs finishing year
        const parts = value.split('-');
        if (parts[0].length === 0) {
            return null;
        }
        const maxDayOrMonthCharsCount = 2;
        return parts[0].length <= maxDayOrMonthCharsCount
            ? this.createMoment(value, 'DD-MM-YYYY', this.locale)
            : this.createMoment(value, 'YYYY-MM-DD', this.locale);
    }
    parseWithDot(value) {
        // covers two cases YYYY and YY (for current year)
        return this.createMoment(value, 'DD.MM.YYYY', this.locale);
    }
}
/** @nocollapse */ MomentDateAdapter.ɵfac = function MomentDateAdapter_Factory(t) { return new (t || MomentDateAdapter)(i0.ɵɵinject(MC_DATE_LOCALE, 8), i0.ɵɵinject(MC_MOMENT_DATE_ADAPTER_OPTIONS, 8)); };
/** @nocollapse */ MomentDateAdapter.ɵprov = i0.ɵɵdefineInjectable({ token: MomentDateAdapter, factory: MomentDateAdapter.ɵfac });
__decorate([
    DeprecatedMethod,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Boolean, Boolean]),
    __metadata("design:returntype", String)
], MomentDateAdapter.prototype, "absoluteDate", null);
__decorate([
    DeprecatedMethod,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", String)
], MomentDateAdapter.prototype, "absoluteLongDate", null);
__decorate([
    DeprecatedMethod,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", String)
], MomentDateAdapter.prototype, "absoluteLongDateTime", null);
__decorate([
    DeprecatedMethod,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", String)
], MomentDateAdapter.prototype, "absoluteShortDate", null);
__decorate([
    DeprecatedMethod,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", String)
], MomentDateAdapter.prototype, "absoluteShortDateTime", null);
__decorate([
    DeprecatedMethod,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", String)
], MomentDateAdapter.prototype, "openedRangeDate", null);
__decorate([
    DeprecatedMethod,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", String)
], MomentDateAdapter.prototype, "openedRangeDateTime", null);
__decorate([
    DeprecatedMethod,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", String)
], MomentDateAdapter.prototype, "rangeDate", null);
__decorate([
    DeprecatedMethod,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", String)
], MomentDateAdapter.prototype, "rangeDateTime", null);
__decorate([
    DeprecatedMethod,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", String)
], MomentDateAdapter.prototype, "rangeLongDate", null);
__decorate([
    DeprecatedMethod,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", String)
], MomentDateAdapter.prototype, "rangeLongDateTime", null);
__decorate([
    DeprecatedMethod,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", String)
], MomentDateAdapter.prototype, "rangeMiddleDateTime", null);
__decorate([
    DeprecatedMethod,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", String)
], MomentDateAdapter.prototype, "rangeShortDate", null);
__decorate([
    DeprecatedMethod,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", String)
], MomentDateAdapter.prototype, "rangeShortDateTime", null);
__decorate([
    DeprecatedMethod,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", String)
], MomentDateAdapter.prototype, "relativeDate", null);
__decorate([
    DeprecatedMethod,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", String)
], MomentDateAdapter.prototype, "relativeLongDate", null);
__decorate([
    DeprecatedMethod,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", String)
], MomentDateAdapter.prototype, "relativeShortDate", null);
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(MomentDateAdapter, [{
        type: Injectable
    }], function () { return [{ type: undefined, decorators: [{
                type: Optional
            }, {
                type: Inject,
                args: [MC_DATE_LOCALE]
            }] }, { type: undefined, decorators: [{
                type: Optional
            }, {
                type: Inject,
                args: [MC_MOMENT_DATE_ADAPTER_OPTIONS]
            }] }]; }, { absoluteDate: [], absoluteLongDate: [], absoluteLongDateTime: [], absoluteShortDate: [], absoluteShortDateTime: [], openedRangeDate: [], openedRangeDateTime: [], rangeDate: [], rangeDateTime: [], rangeLongDate: [], rangeLongDateTime: [], rangeMiddleDateTime: [], rangeShortDate: [], rangeShortDateTime: [], relativeDate: [], relativeLongDate: [], relativeShortDate: [] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9tZW50LWRhdGUtYWRhcHRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3BhY2thZ2VzL21vc2FpYy1tb21lbnQtYWRhcHRlci9hZGFwdGVyL21vbWVudC1kYXRlLWFkYXB0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGtDQUFrQztBQUNsQyxPQUFPLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxjQUFjLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzdFLE9BQU8sRUFDSCxXQUFXLEVBQ1gsY0FBYyxFQUNqQixNQUFNLDBCQUEwQixDQUFDO0FBQ2xDLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUN4RCxnRkFBZ0Y7QUFDaEYsNkZBQTZGO0FBQzdGLGlHQUFpRztBQUNqRywyQkFBMkI7QUFDM0IsT0FBTyxLQUFLLE9BQU8sTUFBTSxRQUFRLENBQUM7QUFDbEMsc0NBQXNDO0FBQ3RDLGdDQUFnQztBQUNoQyxPQUFPLEVBQUUsT0FBTyxJQUFJLGFBQWEsRUFBc0IsTUFBTSxRQUFRLENBQUM7QUFFdEUsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ3ZDLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQzs7QUFHdkMsTUFBTSxNQUFNLEdBQUcsYUFBYSxJQUFJLE9BQU8sQ0FBQztBQWdCeEMsbUVBQW1FO0FBQ25FLE1BQU0sQ0FBQyxNQUFNLDhCQUE4QixHQUFHLElBQUksY0FBYyxDQUM1RCxnQ0FBZ0MsRUFBRTtJQUM5QixVQUFVLEVBQUUsTUFBTTtJQUNsQixPQUFPLEVBQUUsc0NBQXNDO0NBQ2xELENBQUMsQ0FBQztBQUVQLG9CQUFvQjtBQUNwQixtQ0FBbUM7QUFDbkMsTUFBTSxVQUFVLHNDQUFzQztJQUNsRCxPQUFPO1FBQ0gsTUFBTSxFQUFFLEtBQUs7UUFDYixjQUFjLEVBQUUsS0FBSztLQUN4QixDQUFDO0FBQ04sQ0FB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bnQ6ZGlzYWJsZTpuby1tYWdpYy1udW1iZXJzXG5pbXBvcnQgeyBJbmplY3QsIEluamVjdGFibGUsIEluamVjdGlvblRva2VuLCBPcHRpb25hbCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgICBEYXRlQWRhcHRlcixcbiAgICBNQ19EQVRFX0xPQ0FMRVxufSBmcm9tICdAcHRzZWN1cml0eS9jZGsvZGF0ZXRpbWUnO1xuaW1wb3J0IHsgRGF0ZUZvcm1hdHRlciB9IGZyb20gJ0BwdHNlY3VyaXR5L21vc2FpYy9jb3JlJztcbi8vIERlcGVuZGluZyBvbiB3aGV0aGVyIHJvbGx1cCBpcyB1c2VkLCBtb21lbnQgbmVlZHMgdG8gYmUgaW1wb3J0ZWQgZGlmZmVyZW50bHkuXG4vLyBTaW5jZSBNb21lbnQuanMgZG9lc24ndCBoYXZlIGEgZGVmYXVsdCBleHBvcnQsIHdlIG5vcm1hbGx5IG5lZWQgdG8gaW1wb3J0IHVzaW5nIHRoZSBgKiBhc2Bcbi8vIHN5bnRheC4gSG93ZXZlciwgcm9sbHVwIGNyZWF0ZXMgYSBzeW50aGV0aWMgZGVmYXVsdCBtb2R1bGUgYW5kIHdlIHRodXMgbmVlZCB0byBpbXBvcnQgaXQgdXNpbmdcbi8vIHRoZSBgZGVmYXVsdCBhc2Agc3ludGF4LlxuaW1wb3J0ICogYXMgX21vbWVudCBmcm9tICdtb21lbnQnO1xuLy8gdHNsaW50OmRpc2FibGU6bm8tZHVwbGljYXRlLWltcG9ydHNcbi8vIEB0cy1pZ25vcmUgKGxvb2sgYXQgdHNjb25maWcpXG5pbXBvcnQgeyBkZWZhdWx0IGFzIF9yb2xsdXBNb21lbnQsIE1vbWVudCwgdW5pdE9mVGltZSB9IGZyb20gJ21vbWVudCc7XG5cbmltcG9ydCB7IGVuVVMgfSBmcm9tICcuL2xvY2FsZXMvZW4tVVMnO1xuaW1wb3J0IHsgcnVSVSB9IGZyb20gJy4vbG9jYWxlcy9ydS1SVSc7XG5cblxuY29uc3QgbW9tZW50ID0gX3JvbGx1cE1vbWVudCB8fCBfbW9tZW50O1xuXG4vKiogQ29uZmlndXJhYmxlIG9wdGlvbnMgZm9yIHtAc2VlIE1vbWVudERhdGVBZGFwdGVyfS4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgSU1jTW9tZW50RGF0ZUFkYXB0ZXJPcHRpb25zIHtcbiAgICAvKipcbiAgICAgKiBUdXJucyB0aGUgdXNlIG9mIHV0YyBkYXRlcyBvbiBvciBvZmYuXG4gICAgICoge0BkZWZhdWx0IGZhbHNlfVxuICAgICAqL1xuICAgIHVzZVV0YzogYm9vbGVhbjtcbiAgICAvKipcbiAgICAgKiB3aGV0aGVyIHNob3VsZCBwYXJzZSBtZXRob2QgdHJ5IGd1ZXNzIGRhdGUgZm9ybWF0XG4gICAgICoge0BkZWZhdWx0IGZhbHNlfVxuICAgICAqL1xuICAgIGZpbmREYXRlRm9ybWF0OiBib29sZWFuO1xufVxuXG4vKiogSW5qZWN0aW9uVG9rZW4gZm9yIG1vbWVudCBkYXRlIGFkYXB0ZXIgdG8gY29uZmlndXJlIG9wdGlvbnMuICovXG5leHBvcnQgY29uc3QgTUNfTU9NRU5UX0RBVEVfQURBUFRFUl9PUFRJT05TID0gbmV3IEluamVjdGlvblRva2VuPElNY01vbWVudERhdGVBZGFwdGVyT3B0aW9ucz4oXG4gICAgJ01DX01PTUVOVF9EQVRFX0FEQVBURVJfT1BUSU9OUycsIHtcbiAgICAgICAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxuICAgICAgICBmYWN0b3J5OiBNQ19NT01FTlRfREFURV9BREFQVEVSX09QVElPTlNfRkFDVE9SWVxuICAgIH0pO1xuXG4vKiogQGRvY3MtcHJpdmF0ZSAqL1xuLy8gdHNsaW50OmRpc2FibGU6bmFtaW5nLWNvbnZlbnRpb25cbmV4cG9ydCBmdW5jdGlvbiBNQ19NT01FTlRfREFURV9BREFQVEVSX09QVElPTlNfRkFDVE9SWSgpOiBJTWNNb21lbnREYXRlQWRhcHRlck9wdGlvbnMge1xuICAgIHJldHVybiB7XG4gICAgICAgIHVzZVV0YzogZmFsc2UsXG4gICAgICAgIGZpbmREYXRlRm9ybWF0OiBmYWxzZVxuICAgIH07XG59XG5cbi8qKiBDcmVhdGVzIGFuIGFycmF5IGFuZCBmaWxscyBpdCB3aXRoIHZhbHVlcy4gKi9cbmZ1bmN0aW9uIHJhbmdlPFQ+KGxlbmd0aDogbnVtYmVyLCB2YWx1ZUZ1bmN0aW9uOiAoaW5kZXg6IG51bWJlcikgPT4gVCk6IFRbXSB7XG4gICAgY29uc3QgdmFsdWVzQXJyYXkgPSBBcnJheShsZW5ndGgpO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICB2YWx1ZXNBcnJheVtpXSA9IHZhbHVlRnVuY3Rpb24oaSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHZhbHVlc0FycmF5O1xufVxuXG4vLyBAdHMtaWdub3JlXG5leHBvcnQgZnVuY3Rpb24gRGVwcmVjYXRlZE1ldGhvZCh0YXJnZXQ6IGFueSwga2V5OiBzdHJpbmcsIGRlc2NyaXB0b3I6IFByb3BlcnR5RGVzY3JpcHRvcikge1xuICAgIGNvbnN0IG9yaWdpbiA9IGRlc2NyaXB0b3IudmFsdWU7XG5cbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tZnVuY3Rpb24tZXhwcmVzc2lvbiBvbmx5LWFycm93LWZ1bmN0aW9uc1xuICAgIGRlc2NyaXB0b3IudmFsdWUgPSBmdW5jdGlvbiguLi5hcmdzOiBhbnlbXSkge1xuICAgICAgICBjb25zb2xlLndhcm4oXG4gICAgICAgICAgICBgRm91bmQgdXNlIG9mIGRlcHJlY2F0ZWQgbWV0aG9kICR7a2V5fSwgaXQgd2FzIG1vdmVkIGluIERhdGVGb3JtYXR0ZXIuIGAgK1xuICAgICAgICAgICAgYFRoZSBkZXByZWNhdGVkIG1ldGhvZCB3aWxsIGJlIHJlbW92ZWQgaW4gMTMuMC4wLmBcbiAgICAgICAgKTtcblxuICAgICAgICByZXR1cm4gb3JpZ2luLmFwcGx5KHRoaXMsIGFyZ3MpO1xuICAgIH07XG5cbiAgICByZXR1cm4gZGVzY3JpcHRvcjtcbn1cblxuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTW9tZW50RGF0ZUFkYXB0ZXIgZXh0ZW5kcyBEYXRlQWRhcHRlcjxNb21lbnQ+IHtcbiAgICBmaXJzdE1vbnRoOiBudW1iZXIgPSAwO1xuXG4gICAgZ2V0IGxhc3RNb250aCgpOiBudW1iZXIge1xuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6YmluYXJ5LWV4cHJlc3Npb24tb3BlcmFuZC1vcmRlciBuby1tYWdpYy1udW1iZXJzXG4gICAgICAgIHJldHVybiAxMSArIHRoaXMuZmlyc3RNb250aDtcbiAgICB9XG5cbiAgICBwcml2YXRlIGRhdGVGb3JtYXR0ZXI6IERhdGVGb3JtYXR0ZXI8TW9tZW50PjtcblxuICAgIHByaXZhdGUgbG9jYWxlRGF0YToge1xuICAgICAgICBmaXJzdERheU9mV2VlazogbnVtYmVyO1xuICAgICAgICBsb25nTW9udGhzOiBzdHJpbmdbXTtcbiAgICAgICAgc2hvcnRNb250aHM6IHN0cmluZ1tdO1xuICAgICAgICBkYXRlczogc3RyaW5nW107XG4gICAgICAgIGxvbmdEYXlzT2ZXZWVrOiBzdHJpbmdbXTtcbiAgICAgICAgc2hvcnREYXlzT2ZXZWVrOiBzdHJpbmdbXTtcbiAgICAgICAgbmFycm93RGF5c09mV2Vlazogc3RyaW5nW107XG4gICAgfTtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBAT3B0aW9uYWwoKSBASW5qZWN0KE1DX0RBVEVfTE9DQUxFKSBkYXRlTG9jYWxlOiBzdHJpbmcsXG4gICAgICAgIEBPcHRpb25hbCgpIEBJbmplY3QoTUNfTU9NRU5UX0RBVEVfQURBUFRFUl9PUFRJT05TKSBwcml2YXRlIHJlYWRvbmx5IG9wdGlvbnM/OiBJTWNNb21lbnREYXRlQWRhcHRlck9wdGlvbnNcbiAgICApIHtcbiAgICAgICAgc3VwZXIoKTtcblxuICAgICAgICB0aGlzLnNldExvY2FsZShkYXRlTG9jYWxlIHx8IG1vbWVudC5sb2NhbGUoKSk7XG4gICAgfVxuXG4gICAgc2V0TG9jYWxlKGxvY2FsZTogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgIHN1cGVyLnNldExvY2FsZShsb2NhbGUpO1xuXG4gICAgICAgIHRoaXMuZGF0ZUZvcm1hdHRlciA9IG5ldyBEYXRlRm9ybWF0dGVyPE1vbWVudD4odGhpcywgbG9jYWxlKTtcbiAgICAgICAgdGhpcy5jb25maWcgPSBsb2NhbGUgPT09ICdlbicgPyBlblVTIDogcnVSVTtcblxuICAgICAgICBsZXQgbW9tZW50TG9jYWxlRGF0YSA9IG1vbWVudC5sb2NhbGVEYXRhKGxvY2FsZSk7XG5cbiAgICAgICAgLy8gVGhpcyBpcyBvdXIgY3VzdG9tcyB0cmFuc2xhdGlvbnNcbiAgICAgICAgY29uc3QgaTE4bkxvY2FscyA9IFsnZW4nLCAncnUnXTtcblxuICAgICAgICBpZiAoaTE4bkxvY2Fscy5pbmRleE9mKGxvY2FsZSkgIT09IC0xKSB7XG4gICAgICAgICAgICBtb21lbnRMb2NhbGVEYXRhID0gbW9tZW50LnVwZGF0ZUxvY2FsZShsb2NhbGUsIHtcbiAgICAgICAgICAgICAgICBtb250aHNTaG9ydDoge1xuICAgICAgICAgICAgICAgICAgICBmb3JtYXQ6IHRoaXMuY29uZmlnLm1vbnRoTmFtZXMuc2hvcnQuZm9ybWF0dGVkLFxuICAgICAgICAgICAgICAgICAgICBzdGFuZGFsb25lOiB0aGlzLmNvbmZpZy5tb250aE5hbWVzLnNob3J0LnN0YW5kYWxvbmVcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHdlZWtkYXlzU2hvcnQ6IHRoaXMuY29uZmlnLmRheU9mV2Vla05hbWVzLnNob3J0LFxuICAgICAgICAgICAgICAgIHdlZWtkYXlzOiB0aGlzLmNvbmZpZy5kYXlPZldlZWtOYW1lcy5sb25nXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMubG9jYWxlRGF0YSA9IHtcbiAgICAgICAgICAgIGZpcnN0RGF5T2ZXZWVrOiB0aGlzLmNvbmZpZy5maXJzdERheU9mV2VlayxcbiAgICAgICAgICAgIGxvbmdNb250aHM6IG1vbWVudExvY2FsZURhdGEubW9udGhzKCksXG4gICAgICAgICAgICBzaG9ydE1vbnRoczogbW9tZW50TG9jYWxlRGF0YS5tb250aHNTaG9ydCgpLFxuICAgICAgICAgICAgZGF0ZXM6IHJhbmdlKDMxLCAoaSkgPT4gdGhpcy5jcmVhdGVEYXRlKDIwMTcsIHRoaXMuZmlyc3RNb250aCwgaSArIDEpLmZvcm1hdCgnRCcpKSxcbiAgICAgICAgICAgIGxvbmdEYXlzT2ZXZWVrOiBtb21lbnRMb2NhbGVEYXRhLndlZWtkYXlzKCksXG4gICAgICAgICAgICBzaG9ydERheXNPZldlZWs6IG1vbWVudExvY2FsZURhdGEud2Vla2RheXNTaG9ydCgpLFxuICAgICAgICAgICAgbmFycm93RGF5c09mV2VlazogbW9tZW50TG9jYWxlRGF0YS53ZWVrZGF5c01pbigpXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgZ2V0TG9jYWxlRGF0YSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubG9jYWxlRGF0YTtcbiAgICB9XG5cbiAgICBzZXRMb2NhbGVEYXRhKGxvY2FsZURhdGEpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5sb2NhbGVEYXRhID0gbG9jYWxlRGF0YTtcbiAgICB9XG5cbiAgICB1cGRhdGVMb2NhbGVEYXRhKGxvY2FsZURhdGEpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5sb2NhbGVEYXRhID0geyAuLi50aGlzLmxvY2FsZURhdGEsIC4uLmxvY2FsZURhdGEgfTtcbiAgICB9XG5cbiAgICBnZXRZZWFyKGRhdGU6IE1vbWVudCk6IG51bWJlciB7IHJldHVybiB0aGlzLmNsb25lKGRhdGUpLnllYXIoKTsgfVxuXG4gICAgZ2V0TW9udGgoZGF0ZTogTW9tZW50KTogbnVtYmVyIHsgcmV0dXJuIHRoaXMuY2xvbmUoZGF0ZSkubW9udGgoKTsgfVxuXG4gICAgZ2V0RGF0ZShkYXRlOiBNb21lbnQpOiBudW1iZXIgeyByZXR1cm4gdGhpcy5jbG9uZShkYXRlKS5kYXRlKCk7IH1cblxuICAgIGdldEhvdXJzKGRhdGU6IE1vbWVudCk6IG51bWJlciB7IHJldHVybiB0aGlzLmNsb25lKGRhdGUpLmhvdXJzKCk7IH1cblxuICAgIGdldE1pbnV0ZXMoZGF0ZTogTW9tZW50KTogbnVtYmVyIHsgcmV0dXJuIHRoaXMuY2xvbmUoZGF0ZSkubWludXRlcygpOyB9XG5cbiAgICBnZXRTZWNvbmRzKGRhdGU6IE1vbWVudCk6IG51bWJlciB7IHJldHVybiB0aGlzLmNsb25lKGRhdGUpLnNlY29uZHMoKTsgfVxuXG4gICAgZ2V0TWlsbGlzZWNvbmRzKGRhdGU6IE1vbWVudCk6IG51bWJlciB7IHJldHVybiB0aGlzLmNsb25lKGRhdGUpLm1pbGxpc2Vjb25kcygpOyB9XG5cbiAgICBnZXRUaW1lKGRhdGU6IE1vbWVudCk6IG51bWJlciB7IHJldHVybiBkYXRlLnZhbHVlT2YoKTsgfVxuXG4gICAgZ2V0RGF5T2ZXZWVrKGRhdGU6IE1vbWVudCk6IG51bWJlciB7IHJldHVybiB0aGlzLmNsb25lKGRhdGUpLmRheSgpOyB9XG5cbiAgICBnZXRNb250aE5hbWVzKHN0eWxlOiAnbG9uZycgfCAnc2hvcnQnIHwgJ25hcnJvdycpOiBzdHJpbmdbXSB7XG4gICAgICAgIC8vIE1vbWVudC5qcyBkb2Vzbid0IHN1cHBvcnQgbmFycm93IG1vbnRoIG5hbWVzXG4gICAgICAgIHJldHVybiBzdHlsZSA9PT0gJ2xvbmcnID8gdGhpcy5sb2NhbGVEYXRhLmxvbmdNb250aHMgOiB0aGlzLmxvY2FsZURhdGEuc2hvcnRNb250aHM7XG4gICAgfVxuXG4gICAgZ2V0RGF0ZU5hbWVzKCk6IHN0cmluZ1tdIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubG9jYWxlRGF0YS5kYXRlcztcbiAgICB9XG5cbiAgICBnZXREYXlPZldlZWtOYW1lcyhzdHlsZTogJ2xvbmcnIHwgJ3Nob3J0JyB8ICduYXJyb3cnKTogc3RyaW5nW10ge1xuICAgICAgICBpZiAoc3R5bGUgPT09ICdsb25nJykgeyByZXR1cm4gdGhpcy5sb2NhbGVEYXRhLmxvbmdEYXlzT2ZXZWVrOyB9XG5cbiAgICAgICAgaWYgKHN0eWxlID09PSAnc2hvcnQnKSB7IHJldHVybiB0aGlzLmxvY2FsZURhdGEuc2hvcnREYXlzT2ZXZWVrOyB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMubG9jYWxlRGF0YS5uYXJyb3dEYXlzT2ZXZWVrO1xuICAgIH1cblxuICAgIGdldFllYXJOYW1lKGRhdGU6IE1vbWVudCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmNsb25lKGRhdGUpLmZvcm1hdCgnWVlZWScpO1xuICAgIH1cblxuICAgIGdldEZpcnN0RGF5T2ZXZWVrKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLmxvY2FsZURhdGEuZmlyc3REYXlPZldlZWs7XG4gICAgfVxuXG4gICAgZ2V0TnVtRGF5c0luTW9udGgoZGF0ZTogTW9tZW50KTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2xvbmUoZGF0ZSkuZGF5c0luTW9udGgoKTtcbiAgICB9XG5cbiAgICBjbG9uZShkYXRlOiBNb21lbnQpOiBNb21lbnQge1xuICAgICAgICByZXR1cm4gZGF0ZS5jbG9uZSgpLmxvY2FsZSh0aGlzLmxvY2FsZSk7XG4gICAgfVxuXG4gICAgY3JlYXRlRGF0ZSh5ZWFyOiBudW1iZXIsIG1vbnRoOiBudW1iZXIgPSAwLCBkYXRlOiBudW1iZXIgPSAxKTogTW9tZW50IHtcbiAgICAgICAgLy8gTW9tZW50LmpzIHdpbGwgY3JlYXRlIGFuIGludmFsaWQgZGF0ZSBpZiBhbnkgb2YgdGhlIGNvbXBvbmVudHMgYXJlIG91dCBvZiBib3VuZHMsIGJ1dCB3ZVxuICAgICAgICAvLyBleHBsaWNpdGx5IGNoZWNrIGVhY2ggY2FzZSBzbyB3ZSBjYW4gdGhyb3cgbW9yZSBkZXNjcmlwdGl2ZSBlcnJvcnMuXG4gICAgICAgIGlmIChtb250aCA8IHRoaXMuZmlyc3RNb250aCB8fCBtb250aCA+IHRoaXMubGFzdE1vbnRoKSB7XG4gICAgICAgICAgICB0aHJvdyBFcnJvcihcbiAgICAgICAgICAgICAgICBgSW52YWxpZCBtb250aCBpbmRleCBcIiR7bW9udGh9XCIuXG4gICAgICAgICAgICAgICAgTW9udGggaW5kZXggaGFzIHRvIGJlIGJldHdlZW4gJHt0aGlzLmZpcnN0TW9udGh9IGFuZCAke3RoaXMubGFzdE1vbnRofS5gXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGRhdGUgPCAxKSB7XG4gICAgICAgICAgICB0aHJvdyBFcnJvcihgSW52YWxpZCBkYXRlIFwiJHtkYXRlfVwiLiBEYXRlIGhhcyB0byBiZSBncmVhdGVyIHRoYW4gMC5gKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IHRoaXMuY3JlYXRlTW9tZW50KHt5ZWFyLCBtb250aCwgZGF0ZX0pLmxvY2FsZSh0aGlzLmxvY2FsZSk7XG5cbiAgICAgICAgLy8gSWYgdGhlIHJlc3VsdCBpc24ndCB2YWxpZCwgdGhlIGRhdGUgbXVzdCBoYXZlIGJlZW4gb3V0IG9mIGJvdW5kcyBmb3IgdGhpcyBtb250aC5cbiAgICAgICAgaWYgKCFyZXN1bHQuaXNWYWxpZCgpKSB7XG4gICAgICAgICAgICB0aHJvdyBFcnJvcihgSW52YWxpZCBkYXRlIFwiJHtkYXRlfVwiIGZvciBtb250aCB3aXRoIGluZGV4IFwiJHttb250aH1cIi5gKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG4gICAgY3JlYXRlRGF0ZVRpbWUoXG4gICAgICAgIHllYXI6IG51bWJlcixcbiAgICAgICAgbW9udGg6IG51bWJlcixcbiAgICAgICAgZGF0ZTogbnVtYmVyLFxuICAgICAgICBob3VyczogbnVtYmVyLFxuICAgICAgICBtaW51dGVzOiBudW1iZXIsXG4gICAgICAgIHNlY29uZHM6IG51bWJlcixcbiAgICAgICAgbWlsbGlzZWNvbmRzOiBudW1iZXJcbiAgICApOiBNb21lbnQge1xuICAgICAgICBjb25zdCBuZXdEYXRlID0gdGhpcy5jcmVhdGVEYXRlKHllYXIsIG1vbnRoLCBkYXRlKTtcblxuICAgICAgICBuZXdEYXRlLmhvdXJzKGhvdXJzKTtcbiAgICAgICAgbmV3RGF0ZS5taW51dGVzKG1pbnV0ZXMpO1xuICAgICAgICBuZXdEYXRlLnNlY29uZHMoc2Vjb25kcyk7XG4gICAgICAgIG5ld0RhdGUubWlsbGlzZWNvbmRzKG1pbGxpc2Vjb25kcyk7XG5cbiAgICAgICAgcmV0dXJuIG5ld0RhdGU7XG4gICAgfVxuXG4gICAgdG9kYXkoKTogTW9tZW50IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY3JlYXRlTW9tZW50KCkubG9jYWxlKHRoaXMubG9jYWxlKTtcbiAgICB9XG5cbiAgICBwYXJzZSh2YWx1ZTogYW55LCBwYXJzZUZvcm1hdDogc3RyaW5nIHwgc3RyaW5nW10pOiBNb21lbnQgfCBudWxsIHtcbiAgICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLm9wdGlvbnMgJiYgdGhpcy5vcHRpb25zLmZpbmREYXRlRm9ybWF0KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmZpbmRGb3JtYXQodmFsdWUpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVybiBwYXJzZUZvcm1hdFxuICAgICAgICAgICAgICAgICAgICA/IHRoaXMuY3JlYXRlTW9tZW50KHZhbHVlLCBwYXJzZUZvcm1hdCwgdGhpcy5sb2NhbGUpXG4gICAgICAgICAgICAgICAgICAgIDogdGhpcy5jcmVhdGVNb21lbnQodmFsdWUpLmxvY2FsZSh0aGlzLmxvY2FsZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNyZWF0ZU1vbWVudCh2YWx1ZSkubG9jYWxlKHRoaXMubG9jYWxlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGZvcm1hdChkYXRlOiBNb21lbnQsIGRpc3BsYXlGb3JtYXQ6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlOm5vLXBhcmFtZXRlci1yZWFzc2lnbm1lbnRcbiAgICAgICAgZGF0ZSA9IHRoaXMuY2xvbmUoZGF0ZSk7XG4gICAgICAgIGlmICghdGhpcy5pc1ZhbGlkKGRhdGUpKSB7XG4gICAgICAgICAgICB0aHJvdyBFcnJvcignTW9tZW50RGF0ZUFkYXB0ZXI6IENhbm5vdCBmb3JtYXQgaW52YWxpZCBkYXRlLicpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGRhdGUuZm9ybWF0KGRpc3BsYXlGb3JtYXQpO1xuICAgIH1cblxuICAgIGFkZENhbGVuZGFyWWVhcnMoZGF0ZTogTW9tZW50LCB5ZWFyczogbnVtYmVyKTogTW9tZW50IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2xvbmUoZGF0ZSkuYWRkKHsgeWVhcnMgfSk7XG4gICAgfVxuXG4gICAgYWRkQ2FsZW5kYXJNb250aHMoZGF0ZTogTW9tZW50LCBtb250aHM6IG51bWJlcik6IE1vbWVudCB7XG4gICAgICAgIHJldHVybiB0aGlzLmNsb25lKGRhdGUpLmFkZCh7IG1vbnRocyB9KTtcbiAgICB9XG5cbiAgICBhZGRDYWxlbmRhckRheXMoZGF0ZTogTW9tZW50LCBkYXlzOiBudW1iZXIpOiBNb21lbnQge1xuICAgICAgICByZXR1cm4gdGhpcy5jbG9uZShkYXRlKS5hZGQoeyBkYXlzIH0pO1xuICAgIH1cblxuICAgIHRvSXNvODYwMShkYXRlOiBNb21lbnQpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5jbG9uZShkYXRlKS5mb3JtYXQoKTtcbiAgICB9XG5cbiAgICAvKiogaHR0cHM6Ly93d3cuaWV0Zi5vcmcvcmZjL3JmYzMzMzkudHh0ICovXG4gICAgZGVzZXJpYWxpemUodmFsdWU6IGFueSk6IE1vbWVudCB8IG51bGwge1xuICAgICAgICBsZXQgZGF0ZTtcbiAgICAgICAgaWYgKHZhbHVlIGluc3RhbmNlb2YgRGF0ZSkge1xuICAgICAgICAgICAgZGF0ZSA9IHRoaXMuY3JlYXRlTW9tZW50KHZhbHVlKS5sb2NhbGUodGhpcy5sb2NhbGUpO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuaXNEYXRlSW5zdGFuY2UodmFsdWUpKSB7XG4gICAgICAgICAgICAvLyBOb3RlOiBhc3N1bWVzIHRoYXQgY2xvbmluZyBhbHNvIHNldHMgdGhlIGNvcnJlY3QgbG9jYWxlLlxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY2xvbmUodmFsdWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIGlmICghdmFsdWUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGRhdGUgPSB0aGlzLmNyZWF0ZU1vbWVudCh2YWx1ZSwgbW9tZW50LklTT184NjAxKS5sb2NhbGUodGhpcy5sb2NhbGUpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGRhdGUgJiYgdGhpcy5pc1ZhbGlkKGRhdGUpKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jcmVhdGVNb21lbnQoZGF0ZSkubG9jYWxlKHRoaXMubG9jYWxlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBzdXBlci5kZXNlcmlhbGl6ZSh2YWx1ZSk7XG4gICAgfVxuXG4gICAgaXNEYXRlSW5zdGFuY2Uob2JqOiBhbnkpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIG1vbWVudC5pc01vbWVudChvYmopO1xuICAgIH1cblxuICAgIGlzVmFsaWQoZGF0ZTogTW9tZW50KTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLmNsb25lKGRhdGUpLmlzVmFsaWQoKTtcbiAgICB9XG5cbiAgICBpbnZhbGlkKCk6IE1vbWVudCB7XG4gICAgICAgIHJldHVybiBtb21lbnQuaW52YWxpZCgpO1xuICAgIH1cblxuICAgIGhhc1NhbWUoc3RhcnREYXRlOiBNb21lbnQsIGVuZERhdGU6IE1vbWVudCwgdW5pdDogdW5pdE9mVGltZS5EaWZmKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiBzdGFydERhdGUuaXNTYW1lKGVuZERhdGUsIHVuaXQpO1xuICAgIH1cblxuICAgIGRpZmZOb3coZGF0ZTogTW9tZW50LCB1bml0OiB1bml0T2ZUaW1lLkRpZmYpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gZGF0ZS5kaWZmKHRoaXMudG9kYXkoKSwgdW5pdCk7XG4gICAgfVxuXG4gICAgQERlcHJlY2F0ZWRNZXRob2RcbiAgICBhYnNvbHV0ZURhdGUoZGF0ZTogTW9tZW50LCBwYXJhbXMsIGRhdGV0aW1lOiBib29sZWFuLCBtaWxsaXNlY29uZHM6IGJvb2xlYW4pOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5kYXRlRm9ybWF0dGVyLmFic29sdXRlRGF0ZShkYXRlLCBwYXJhbXMsIGRhdGV0aW1lLCBtaWxsaXNlY29uZHMpO1xuICAgIH1cblxuICAgIEBEZXByZWNhdGVkTWV0aG9kXG4gICAgYWJzb2x1dGVMb25nRGF0ZShkYXRlOiBNb21lbnQpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5kYXRlRm9ybWF0dGVyLmFic29sdXRlTG9uZ0RhdGUoZGF0ZSk7XG4gICAgfVxuXG4gICAgQERlcHJlY2F0ZWRNZXRob2RcbiAgICBhYnNvbHV0ZUxvbmdEYXRlVGltZShkYXRlOiBNb21lbnQsIG9wdGlvbnM/KTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0ZUZvcm1hdHRlci5hYnNvbHV0ZUxvbmdEYXRlVGltZShkYXRlLCBvcHRpb25zKTtcbiAgICB9XG5cbiAgICBARGVwcmVjYXRlZE1ldGhvZFxuICAgIGFic29sdXRlU2hvcnREYXRlKGRhdGU6IE1vbWVudCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmRhdGVGb3JtYXR0ZXIuYWJzb2x1dGVTaG9ydERhdGUoZGF0ZSk7XG4gICAgfVxuXG4gICAgQERlcHJlY2F0ZWRNZXRob2RcbiAgICBhYnNvbHV0ZVNob3J0RGF0ZVRpbWUoZGF0ZTogTW9tZW50LCBvcHRpb25zPyk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmRhdGVGb3JtYXR0ZXIuYWJzb2x1dGVTaG9ydERhdGVUaW1lKGRhdGUsIG9wdGlvbnMpO1xuICAgIH1cblxuICAgIEBEZXByZWNhdGVkTWV0aG9kXG4gICAgb3BlbmVkUmFuZ2VEYXRlKHN0YXJ0RGF0ZTogTW9tZW50LCBlbmREYXRlOiBNb21lbnQsIHRlbXBsYXRlKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0ZUZvcm1hdHRlci5vcGVuZWRSYW5nZURhdGUoc3RhcnREYXRlLCBlbmREYXRlLCB0ZW1wbGF0ZSk7XG4gICAgfVxuXG4gICAgQERlcHJlY2F0ZWRNZXRob2RcbiAgICBvcGVuZWRSYW5nZURhdGVUaW1lKHN0YXJ0RGF0ZTogTW9tZW50LCBlbmREYXRlOiBNb21lbnQsIHRlbXBsYXRlKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0ZUZvcm1hdHRlci5vcGVuZWRSYW5nZURhdGVUaW1lKHN0YXJ0RGF0ZSwgZW5kRGF0ZSwgdGVtcGxhdGUpO1xuICAgIH1cblxuICAgIEBEZXByZWNhdGVkTWV0aG9kXG4gICAgcmFuZ2VEYXRlKHN0YXJ0RGF0ZTogTW9tZW50LCBlbmREYXRlOiBNb21lbnQsIHRlbXBsYXRlKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0ZUZvcm1hdHRlci5yYW5nZURhdGUoc3RhcnREYXRlLCBlbmREYXRlLCB0ZW1wbGF0ZSk7XG4gICAgfVxuXG4gICAgQERlcHJlY2F0ZWRNZXRob2RcbiAgICByYW5nZURhdGVUaW1lKHN0YXJ0RGF0ZTogTW9tZW50LCBlbmREYXRlOiBNb21lbnQsIHRlbXBsYXRlKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0ZUZvcm1hdHRlci5yYW5nZURhdGVUaW1lKHN0YXJ0RGF0ZSwgZW5kRGF0ZSwgdGVtcGxhdGUpO1xuICAgIH1cblxuICAgIEBEZXByZWNhdGVkTWV0aG9kXG4gICAgcmFuZ2VMb25nRGF0ZShzdGFydERhdGU6IE1vbWVudCB8IG51bGwsIGVuZERhdGU/OiBNb21lbnQpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5kYXRlRm9ybWF0dGVyLnJhbmdlTG9uZ0RhdGUoc3RhcnREYXRlLCBlbmREYXRlKTtcbiAgICB9XG5cbiAgICBARGVwcmVjYXRlZE1ldGhvZFxuICAgIHJhbmdlTG9uZ0RhdGVUaW1lKHN0YXJ0RGF0ZTogTW9tZW50IHwgbnVsbCwgZW5kRGF0ZT86IE1vbWVudCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmRhdGVGb3JtYXR0ZXIucmFuZ2VMb25nRGF0ZVRpbWUoc3RhcnREYXRlLCBlbmREYXRlKTtcbiAgICB9XG5cbiAgICBARGVwcmVjYXRlZE1ldGhvZFxuICAgIHJhbmdlTWlkZGxlRGF0ZVRpbWUoc3RhcnREYXRlOiBNb21lbnQsIGVuZERhdGU6IE1vbWVudCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmRhdGVGb3JtYXR0ZXIucmFuZ2VNaWRkbGVEYXRlVGltZShzdGFydERhdGUsIGVuZERhdGUpO1xuICAgIH1cblxuICAgIEBEZXByZWNhdGVkTWV0aG9kXG4gICAgcmFuZ2VTaG9ydERhdGUoc3RhcnREYXRlOiBNb21lbnQgfCBudWxsLCBlbmREYXRlPzogTW9tZW50KTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0ZUZvcm1hdHRlci5yYW5nZVNob3J0RGF0ZShzdGFydERhdGUsIGVuZERhdGUpO1xuICAgIH1cblxuICAgIEBEZXByZWNhdGVkTWV0aG9kXG4gICAgcmFuZ2VTaG9ydERhdGVUaW1lKHN0YXJ0RGF0ZTogTW9tZW50IHwgbnVsbCwgZW5kRGF0ZT86IE1vbWVudCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmRhdGVGb3JtYXR0ZXIucmFuZ2VTaG9ydERhdGVUaW1lKHN0YXJ0RGF0ZSwgZW5kRGF0ZSk7XG4gICAgfVxuXG4gICAgQERlcHJlY2F0ZWRNZXRob2RcbiAgICByZWxhdGl2ZURhdGUoZGF0ZTogTW9tZW50LCB0ZW1wbGF0ZSk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmRhdGVGb3JtYXR0ZXIucmVsYXRpdmVEYXRlKGRhdGUsIHRlbXBsYXRlKTtcbiAgICB9XG5cbiAgICBARGVwcmVjYXRlZE1ldGhvZFxuICAgIHJlbGF0aXZlTG9uZ0RhdGUoZGF0ZTogTW9tZW50KTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0ZUZvcm1hdHRlci5yZWxhdGl2ZUxvbmdEYXRlKGRhdGUpO1xuICAgIH1cblxuICAgIEBEZXByZWNhdGVkTWV0aG9kXG4gICAgcmVsYXRpdmVTaG9ydERhdGUoZGF0ZTogTW9tZW50KTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0ZUZvcm1hdHRlci5yZWxhdGl2ZVNob3J0RGF0ZShkYXRlKTtcbiAgICB9XG5cbiAgICAvKiogQ3JlYXRlcyBhIE1vbWVudCBpbnN0YW5jZSB3aGlsZSByZXNwZWN0aW5nIHRoZSBjdXJyZW50IFVUQyBzZXR0aW5ncy4gKi9cbiAgICBwcml2YXRlIGNyZWF0ZU1vbWVudCguLi5hcmdzOiBhbnlbXSk6IE1vbWVudCB7XG4gICAgICAgIHJldHVybiB0aGlzLm9wdGlvbnM/LnVzZVV0YyA/IG1vbWVudC51dGMoLi4uYXJncykgOiBtb21lbnQoLi4uYXJncyk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBpc051bWVyaWModmFsdWU6IGFueSk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gIWlzTmFOKHBhcnNlRmxvYXQodmFsdWUpKSAmJiBpc0Zpbml0ZSh2YWx1ZSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBmaW5kRm9ybWF0KHZhbHVlOiBzdHJpbmcpOiBNb21lbnQgfCBudWxsIHtcbiAgICAgICAgaWYgKCF2YWx1ZSkgeyByZXR1cm4gbnVsbDsgfVxuXG4gICAgICAgIC8vIGRlZmF1bHQgdGVzdCAtIGlzb1xuICAgICAgICBjb25zdCBpc29EYXRlID0gIHRoaXMuY3JlYXRlTW9tZW50KHZhbHVlLCBtb21lbnQuSVNPXzg2MDEsIHRoaXMubG9jYWxlKTtcblxuICAgICAgICBpZiAoaXNvRGF0ZS5pc1ZhbGlkKCkpIHsgcmV0dXJuIGlzb0RhdGU7IH1cblxuICAgICAgICBpZiAodGhpcy5pc051bWVyaWModmFsdWUpKSB7XG4gICAgICAgICAgICAvLyB1bml4IHRpbWUgc2VjXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jcmVhdGVNb21lbnQodmFsdWUsICdYJywgdGhpcy5sb2NhbGUpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gbG9uZyBtb250aHMgbmFtaW5nOiBEIE1NTSBZWVlZLCBNTU0gRG8gWVlZWSB3aXRoIHNob3J0IGNhc2Ugc3VwcG9ydFxuICAgICAgICBpZiAoXG4gICAgICAgICAgICAvXlxcZHsxLDJ9XFxzXFxTK1xccyhcXGR7Mn18XFxkezR9KSQvLnRlc3QodmFsdWUudHJpbSgpKSB8fFxuICAgICAgICAgICAgL15cXFMrXFxzXFxkezEsMn1bYS16XXsyfVxccyhcXGR7Mn18XFxkezR9KSQvLnRlc3QodmFsdWUudHJpbSgpKVxuICAgICAgICApIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnBhcnNlV2l0aFNwYWNlKHZhbHVlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHNsYXNoIG5vdGF0aW9uOiBERC9NTS9ZWVlZLCBNTS9ERC9ZWVlZIHdpdGggc2hvcnQgY2FzZSBzdXBwb3J0XG4gICAgICAgIGlmICgvXlxcZHsxLDJ9XFwvXFxkezEsMn1cXC8oXFxkezJ9fFxcZHs0fSkkLy50ZXN0KHZhbHVlKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucGFyc2VXaXRoU2xhc2godmFsdWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gZGFzaCBub3RhdGlvbjogREQtTU0tWVlZWSwgWVlZWS1ERC1NTSB3aXRoIHNob3J0IGNhc2Ugc3VwcG9ydFxuICAgICAgICBpZiAoLyheKFxcZHsxLDJ9fFxcZHs0fSktXFxkezEsMn0tXFxkezEsMn0kKXwoXlxcZHsxLDJ9LVxcZHsxLDJ9LShcXGR7Mn18XFxkezR9KSQpLy50ZXN0KHZhbHVlKSkge1xuICAgICAgICAgICByZXR1cm4gdGhpcy5wYXJzZVdpdGhEYXNoKHZhbHVlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGRvdCBub3RhdGlvbjogREQuTU0uWVlZWSB3aXRoIHNob3J0IGNhc2Ugc3VwcG9ydFxuICAgICAgICBpZiAoL15cXGR7MSwyfVxcLlxcZHsxLDJ9XFwuKFxcZHsyfXxcXGR7NH0pJC8udGVzdCh2YWx1ZSkpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnBhcnNlV2l0aERvdCh2YWx1ZSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBwcml2YXRlIHBhcnNlV2l0aFNwYWNlKHZhbHVlOiBzdHJpbmcpOiBNb21lbnQgfCBudWxsIHtcbiAgICAgICAgc3dpdGNoICh0aGlzLmxvY2FsZSkge1xuICAgICAgICAgICAgY2FzZSAncnUnOlxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmNyZWF0ZU1vbWVudCh2YWx1ZSwgJ0REIE1NTU0gWVlZWScsIHRoaXMubG9jYWxlKTtcbiAgICAgICAgICAgIGNhc2UgJ2VuJzpcbiAgICAgICAgICAgICAgICAvLyAxNiBGZWIgMjAxOSB2cyBGZWIgMTZ0aCAyMDE5LCBjb3ZlcnMgRmViIGFuZCBGZWJydWFyeSBjYXNlc1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzTnVtZXJpYyh2YWx1ZVswXSkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuY3JlYXRlTW9tZW50KHZhbHVlLCAnRCBNTU1NIFlZWVknLCB0aGlzLmxvY2FsZSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuY3JlYXRlTW9tZW50KHZhbHVlLCAnTU1NTSBEbyBZWVlZJywgdGhpcy5sb2NhbGUpO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYExvY2FsZSAke3RoaXMubG9jYWxlfSBpcyBub3Qgc3VwcG9ydGVkYCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIHBhcnNlV2l0aFNsYXNoKHZhbHVlOiBzdHJpbmcpOiBNb21lbnQgfCBudWxsIHtcbiAgICAgICAgc3dpdGNoICh0aGlzLmxvY2FsZSkge1xuICAgICAgICAgICAgY2FzZSAncnUnOlxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmNyZWF0ZU1vbWVudCh2YWx1ZSwgJ0REL01NL1lZWVknLCB0aGlzLmxvY2FsZSk7XG4gICAgICAgICAgICAvLyB0b2RvIGRvIHdlIHVzZSBnZW5lcmFsaXplZCBsb2NhbGVzPyBlbiB2cyBlbi1VUzsgdW50aWwgbm90IHdlIHRyeSB0byBndWVzc1xuICAgICAgICAgICAgY2FzZSAnZW4nOlxuICAgICAgICAgICAgICAgIC8vIFVTIHZzIFVLXG4gICAgICAgICAgICAgICAgY29uc3QgcGFydHMgPSB2YWx1ZS5zcGxpdCgnLycpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGRhdGVQYXJ0c0NvdW50ID0gMztcbiAgICAgICAgICAgICAgICBpZiAocGFydHMubGVuZ3RoICE9PSBkYXRlUGFydHNDb3VudCkgeyByZXR1cm4gbnVsbDsgfVxuXG4gICAgICAgICAgICAgICAgY29uc3QgZmlyc3RQYXJ0ID0gcGFydHNbMF0udHJpbSgpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHNlY29uZFBhcnQgPSBwYXJ0c1sxXS50cmltKCk7XG5cbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuaXNOdW1lcmljKGZpcnN0UGFydCkgfHwgIXRoaXMuaXNOdW1lcmljKHNlY29uZFBhcnQpKSB7IHJldHVybiBudWxsOyB9XG5cbiAgICAgICAgICAgICAgICBjb25zdCBtb250aHNJblllYXJzID0gMTI7XG5cbiAgICAgICAgICAgICAgICBjb25zdCBjYW5GaXJzdEJlTW9udGggPSArZmlyc3RQYXJ0IDw9IG1vbnRoc0luWWVhcnM7XG4gICAgICAgICAgICAgICAgY29uc3QgY2FuU2Vjb25kQnlNb250aCA9ICtzZWNvbmRQYXJ0IDw9IG1vbnRoc0luWWVhcnM7XG5cbiAgICAgICAgICAgICAgICAvLyBmaXJzdCB0d28gcGFydHMgY2Fubm90IGJlIG1vbnRoXG4gICAgICAgICAgICAgICAgaWYgKCFjYW5GaXJzdEJlTW9udGggJiYgIWNhblNlY29uZEJ5TW9udGgpIHsgcmV0dXJuIG51bGw7IH1cblxuICAgICAgICAgICAgICAgIGNvbnN0IGNhbkRldGVybWluZVdoZXJlTW9udGggPSBjYW5GaXJzdEJlTW9udGggJiYgY2FuU2Vjb25kQnlNb250aDtcblxuICAgICAgICAgICAgICAgIC8vIHVzZSBVUyBmb3JtYXQgYnkgZGVmYXVsdFxuICAgICAgICAgICAgICAgIGlmIChjYW5EZXRlcm1pbmVXaGVyZU1vbnRoKSB7IHJldHVybiB0aGlzLmNyZWF0ZU1vbWVudCh2YWx1ZSwgJ01NL0REL1lZWVknLCB0aGlzLmxvY2FsZSk7IH1cblxuICAgICAgICAgICAgICAgIHJldHVybiBjYW5GaXJzdEJlTW9udGggJiYgIWNhblNlY29uZEJ5TW9udGhcbiAgICAgICAgICAgICAgICAgICAgPyB0aGlzLmNyZWF0ZU1vbWVudCh2YWx1ZSwgJ01NL0REL1lZWVknLCB0aGlzLmxvY2FsZSlcbiAgICAgICAgICAgICAgICAgICAgOiB0aGlzLmNyZWF0ZU1vbWVudCh2YWx1ZSwgJ0REL01NL1lZWVknLCB0aGlzLmxvY2FsZSk7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgTG9jYWxlICR7dGhpcy5sb2NhbGV9IGlzIG5vdCBzdXBwb3J0ZWRgKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgcGFyc2VXaXRoRGFzaCh2YWx1ZTogc3RyaW5nKTogTW9tZW50IHwgbnVsbCB7XG4gICAgICAgIC8vIGxlYWRpbmcgeWVhciB2cyBmaW5pc2hpbmcgeWVhclxuICAgICAgICBjb25zdCBwYXJ0cyA9IHZhbHVlLnNwbGl0KCctJyk7XG4gICAgICAgIGlmIChwYXJ0c1swXS5sZW5ndGggPT09IDApIHsgcmV0dXJuIG51bGw7IH1cblxuICAgICAgICBjb25zdCBtYXhEYXlPck1vbnRoQ2hhcnNDb3VudCA9IDI7XG5cbiAgICAgICAgcmV0dXJuIHBhcnRzWzBdLmxlbmd0aCA8PSBtYXhEYXlPck1vbnRoQ2hhcnNDb3VudFxuICAgICAgICAgICAgPyB0aGlzLmNyZWF0ZU1vbWVudCh2YWx1ZSwgJ0RELU1NLVlZWVknLCB0aGlzLmxvY2FsZSlcbiAgICAgICAgICAgIDogdGhpcy5jcmVhdGVNb21lbnQodmFsdWUsICdZWVlZLU1NLUREJywgdGhpcy5sb2NhbGUpO1xuICAgIH1cblxuICAgIHByaXZhdGUgcGFyc2VXaXRoRG90KHZhbHVlOiBzdHJpbmcpOiBNb21lbnQgfCBudWxsIHtcbiAgICAgICAgLy8gY292ZXJzIHR3byBjYXNlcyBZWVlZIGFuZCBZWSAoZm9yIGN1cnJlbnQgeWVhcilcbiAgICAgICAgcmV0dXJuIHRoaXMuY3JlYXRlTW9tZW50KHZhbHVlLCAnREQuTU0uWVlZWScsIHRoaXMubG9jYWxlKTtcbiAgICB9XG59XG4iXX0=