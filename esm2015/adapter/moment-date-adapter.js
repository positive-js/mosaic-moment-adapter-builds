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
        this.setLocale(dateLocale || moment.locale());
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
                weekdays: this.config.dayOfWeekNames.long,
                weekdaysShort: this.config.dayOfWeekNames.short,
                weekdaysMin: this.config.dayOfWeekNames.narrow
            });
        }
        this.localeData = {
            firstDayOfWeek: this.config.firstDayOfWeek,
            longMonths: momentLocaleData.months(),
            shortMonths: momentLocaleData.monthsShort(),
            dates: range(31, (i) => this.createDate(2017, 0, i + 1).format('D')),
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
        if (month < 0 || month > 11) {
            throw Error(`Invalid month index "${month}". Month index has to be between 0 and 11.`);
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
/** @nocollapse */ MomentDateAdapter.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0, type: MomentDateAdapter, deps: [{ token: MC_DATE_LOCALE, optional: true }, { token: MC_MOMENT_DATE_ADAPTER_OPTIONS, optional: true }], target: i0.ɵɵFactoryTarget.Injectable });
/** @nocollapse */ MomentDateAdapter.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0, type: MomentDateAdapter });
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
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0, type: MomentDateAdapter, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [MC_DATE_LOCALE]
                }] }, { type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [MC_MOMENT_DATE_ADAPTER_OPTIONS]
                }] }]; }, propDecorators: { absoluteDate: [], absoluteLongDate: [], absoluteLongDateTime: [], absoluteShortDate: [], absoluteShortDateTime: [], openedRangeDate: [], openedRangeDateTime: [], rangeDate: [], rangeDateTime: [], rangeLongDate: [], rangeLongDateTime: [], rangeMiddleDateTime: [], rangeShortDate: [], rangeShortDateTime: [], relativeDate: [], relativeLongDate: [], relativeShortDate: [] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9tZW50LWRhdGUtYWRhcHRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3BhY2thZ2VzL21vc2FpYy1tb21lbnQtYWRhcHRlci9hZGFwdGVyL21vbWVudC1kYXRlLWFkYXB0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGtDQUFrQztBQUNsQyxPQUFPLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxjQUFjLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzdFLE9BQU8sRUFDSCxXQUFXLEVBQ1gsY0FBYyxFQUNqQixNQUFNLDBCQUEwQixDQUFDO0FBQ2xDLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUN4RCxnRkFBZ0Y7QUFDaEYsNkZBQTZGO0FBQzdGLGlHQUFpRztBQUNqRywyQkFBMkI7QUFDM0IsT0FBTyxLQUFLLE9BQU8sTUFBTSxRQUFRLENBQUM7QUFDbEMsc0NBQXNDO0FBQ3RDLGdDQUFnQztBQUNoQyxPQUFPLEVBQUUsT0FBTyxJQUFJLGFBQWEsRUFBc0IsTUFBTSxRQUFRLENBQUM7QUFFdEUsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ3ZDLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQzs7QUFHdkMsTUFBTSxNQUFNLEdBQUcsYUFBYSxJQUFJLE9BQU8sQ0FBQztBQWdCeEMsbUVBQW1FO0FBQ25FLE1BQU0sQ0FBQyxNQUFNLDhCQUE4QixHQUFHLElBQUksY0FBYyxDQUM1RCxnQ0FBZ0MsRUFBRTtJQUM5QixVQUFVLEVBQUUsTUFBTTtJQUNsQixPQUFPLEVBQUUsc0NBQXNDO0NBQ2xELENBQUMsQ0FBQztBQUVQLG9CQUFvQjtBQUNwQixtQ0FBbUM7QUFDbkMsTUFBTSxVQUFVLHNDQUFzQztJQUNsRCxPQUFPO1FBQ0gsTUFBTSxFQUFFLEtBQUs7UUFDYixjQUFjLEVBQUUsS0FBSztLQUN4QixDQUFDO0FBQ04sQ0FB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R2hCO0FBR0Q7SUFEQyxnQkFBZ0I7Ozs7eURBR2hCO0FBR0Q7SUFEQyxnQkFBZ0I7Ozs7NkRBR2hCO0FBR0Q7SUFEQyxnQkFBZ0I7Ozs7MERBR2hCO0FBR0Q7SUFEQyxnQkFBZ0I7Ozs7OERBR2hCO0FBR0Q7SUFEQyxnQkFBZ0I7Ozs7d0RBR2hCO0FBR0Q7SUFEQyxnQkFBZ0I7Ozs7NERBR2hCO0FBR0Q7SUFEQyxnQkFBZ0I7Ozs7a0RBR2hCO0FBR0Q7SUFEQyxnQkFBZ0I7Ozs7c0RBR2hCO0FBR0Q7SUFEQyxnQkFBZ0I7Ozs7c0RBR2hCO0FBR0Q7SUFEQyxnQkFBZ0I7Ozs7MERBR2hCO0FBR0Q7SUFEQyxnQkFBZ0I7Ozs7NERBR2hCO0FBR0Q7SUFEQyxnQkFBZ0I7Ozs7dURBR2hCO0FBR0Q7SUFEQyxnQkFBZ0I7Ozs7MkRBR2hCO0FBR0Q7SUFEQyxnQkFBZ0I7Ozs7cURBR2hCO0FBR0Q7SUFEQyxnQkFBZ0I7Ozs7eURBR2hCO0FBR0Q7SUFEQyxnQkFBZ0I7Ozs7MERBR2hCOzRGQTlVUSxpQkFBaUI7a0JBRDdCLFVBQVU7OzBCQWVGLFFBQVE7OzBCQUFJLE1BQU07MkJBQUMsY0FBYzs7MEJBQ2pDLFFBQVE7OzBCQUFJLE1BQU07MkJBQUMsOEJBQThCOzRDQTZPdEQsWUFBWSxNQUtaLGdCQUFnQixNQUtoQixvQkFBb0IsTUFLcEIsaUJBQWlCLE1BS2pCLHFCQUFxQixNQUtyQixlQUFlLE1BS2YsbUJBQW1CLE1BS25CLFNBQVMsTUFLVCxhQUFhLE1BS2IsYUFBYSxNQUtiLGlCQUFpQixNQUtqQixtQkFBbUIsTUFLbkIsY0FBYyxNQUtkLGtCQUFrQixNQUtsQixZQUFZLE1BS1osZ0JBQWdCLE1BS2hCLGlCQUFpQiIsInNvdXJjZXNDb250ZW50IjpbIi8vIHRzbGludDpkaXNhYmxlOm5vLW1hZ2ljLW51bWJlcnNcbmltcG9ydCB7IEluamVjdCwgSW5qZWN0YWJsZSwgSW5qZWN0aW9uVG9rZW4sIE9wdGlvbmFsIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICAgIERhdGVBZGFwdGVyLFxuICAgIE1DX0RBVEVfTE9DQUxFXG59IGZyb20gJ0BwdHNlY3VyaXR5L2Nkay9kYXRldGltZSc7XG5pbXBvcnQgeyBEYXRlRm9ybWF0dGVyIH0gZnJvbSAnQHB0c2VjdXJpdHkvbW9zYWljL2NvcmUnO1xuLy8gRGVwZW5kaW5nIG9uIHdoZXRoZXIgcm9sbHVwIGlzIHVzZWQsIG1vbWVudCBuZWVkcyB0byBiZSBpbXBvcnRlZCBkaWZmZXJlbnRseS5cbi8vIFNpbmNlIE1vbWVudC5qcyBkb2Vzbid0IGhhdmUgYSBkZWZhdWx0IGV4cG9ydCwgd2Ugbm9ybWFsbHkgbmVlZCB0byBpbXBvcnQgdXNpbmcgdGhlIGAqIGFzYFxuLy8gc3ludGF4LiBIb3dldmVyLCByb2xsdXAgY3JlYXRlcyBhIHN5bnRoZXRpYyBkZWZhdWx0IG1vZHVsZSBhbmQgd2UgdGh1cyBuZWVkIHRvIGltcG9ydCBpdCB1c2luZ1xuLy8gdGhlIGBkZWZhdWx0IGFzYCBzeW50YXguXG5pbXBvcnQgKiBhcyBfbW9tZW50IGZyb20gJ21vbWVudCc7XG4vLyB0c2xpbnQ6ZGlzYWJsZTpuby1kdXBsaWNhdGUtaW1wb3J0c1xuLy8gQHRzLWlnbm9yZSAobG9vayBhdCB0c2NvbmZpZylcbmltcG9ydCB7IGRlZmF1bHQgYXMgX3JvbGx1cE1vbWVudCwgTW9tZW50LCB1bml0T2ZUaW1lIH0gZnJvbSAnbW9tZW50JztcblxuaW1wb3J0IHsgZW5VUyB9IGZyb20gJy4vbG9jYWxlcy9lbi1VUyc7XG5pbXBvcnQgeyBydVJVIH0gZnJvbSAnLi9sb2NhbGVzL3J1LVJVJztcblxuXG5jb25zdCBtb21lbnQgPSBfcm9sbHVwTW9tZW50IHx8IF9tb21lbnQ7XG5cbi8qKiBDb25maWd1cmFibGUgb3B0aW9ucyBmb3Ige0BzZWUgTW9tZW50RGF0ZUFkYXB0ZXJ9LiAqL1xuZXhwb3J0IGludGVyZmFjZSBJTWNNb21lbnREYXRlQWRhcHRlck9wdGlvbnMge1xuICAgIC8qKlxuICAgICAqIFR1cm5zIHRoZSB1c2Ugb2YgdXRjIGRhdGVzIG9uIG9yIG9mZi5cbiAgICAgKiB7QGRlZmF1bHQgZmFsc2V9XG4gICAgICovXG4gICAgdXNlVXRjOiBib29sZWFuO1xuICAgIC8qKlxuICAgICAqIHdoZXRoZXIgc2hvdWxkIHBhcnNlIG1ldGhvZCB0cnkgZ3Vlc3MgZGF0ZSBmb3JtYXRcbiAgICAgKiB7QGRlZmF1bHQgZmFsc2V9XG4gICAgICovXG4gICAgZmluZERhdGVGb3JtYXQ6IGJvb2xlYW47XG59XG5cbi8qKiBJbmplY3Rpb25Ub2tlbiBmb3IgbW9tZW50IGRhdGUgYWRhcHRlciB0byBjb25maWd1cmUgb3B0aW9ucy4gKi9cbmV4cG9ydCBjb25zdCBNQ19NT01FTlRfREFURV9BREFQVEVSX09QVElPTlMgPSBuZXcgSW5qZWN0aW9uVG9rZW48SU1jTW9tZW50RGF0ZUFkYXB0ZXJPcHRpb25zPihcbiAgICAnTUNfTU9NRU5UX0RBVEVfQURBUFRFUl9PUFRJT05TJywge1xuICAgICAgICBwcm92aWRlZEluOiAncm9vdCcsXG4gICAgICAgIGZhY3Rvcnk6IE1DX01PTUVOVF9EQVRFX0FEQVBURVJfT1BUSU9OU19GQUNUT1JZXG4gICAgfSk7XG5cbi8qKiBAZG9jcy1wcml2YXRlICovXG4vLyB0c2xpbnQ6ZGlzYWJsZTpuYW1pbmctY29udmVudGlvblxuZXhwb3J0IGZ1bmN0aW9uIE1DX01PTUVOVF9EQVRFX0FEQVBURVJfT1BUSU9OU19GQUNUT1JZKCk6IElNY01vbWVudERhdGVBZGFwdGVyT3B0aW9ucyB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgdXNlVXRjOiBmYWxzZSxcbiAgICAgICAgZmluZERhdGVGb3JtYXQ6IGZhbHNlXG4gICAgfTtcbn1cblxuLyoqIENyZWF0ZXMgYW4gYXJyYXkgYW5kIGZpbGxzIGl0IHdpdGggdmFsdWVzLiAqL1xuZnVuY3Rpb24gcmFuZ2U8VD4obGVuZ3RoOiBudW1iZXIsIHZhbHVlRnVuY3Rpb246IChpbmRleDogbnVtYmVyKSA9PiBUKTogVFtdIHtcbiAgICBjb25zdCB2YWx1ZXNBcnJheSA9IEFycmF5KGxlbmd0aCk7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhbHVlc0FycmF5W2ldID0gdmFsdWVGdW5jdGlvbihpKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdmFsdWVzQXJyYXk7XG59XG5cbi8vIEB0cy1pZ25vcmVcbmV4cG9ydCBmdW5jdGlvbiBEZXByZWNhdGVkTWV0aG9kKHRhcmdldDogYW55LCBrZXk6IHN0cmluZywgZGVzY3JpcHRvcjogUHJvcGVydHlEZXNjcmlwdG9yKSB7XG4gICAgY29uc3Qgb3JpZ2luID0gZGVzY3JpcHRvci52YWx1ZTtcblxuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1mdW5jdGlvbi1leHByZXNzaW9uIG9ubHktYXJyb3ctZnVuY3Rpb25zXG4gICAgZGVzY3JpcHRvci52YWx1ZSA9IGZ1bmN0aW9uKC4uLmFyZ3M6IGFueVtdKSB7XG4gICAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgICAgIGBGb3VuZCB1c2Ugb2YgZGVwcmVjYXRlZCBtZXRob2QgJHtrZXl9LCBpdCB3YXMgbW92ZWQgaW4gRGF0ZUZvcm1hdHRlci4gYCArXG4gICAgICAgICAgICBgVGhlIGRlcHJlY2F0ZWQgbWV0aG9kIHdpbGwgYmUgcmVtb3ZlZCBpbiAxMy4wLjAuYFxuICAgICAgICApO1xuXG4gICAgICAgIHJldHVybiBvcmlnaW4uYXBwbHkodGhpcywgYXJncyk7XG4gICAgfTtcblxuICAgIHJldHVybiBkZXNjcmlwdG9yO1xufVxuXG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBNb21lbnREYXRlQWRhcHRlciBleHRlbmRzIERhdGVBZGFwdGVyPE1vbWVudD4ge1xuICAgIHByaXZhdGUgZGF0ZUZvcm1hdHRlcjogRGF0ZUZvcm1hdHRlcjxNb21lbnQ+O1xuXG4gICAgcHJpdmF0ZSBsb2NhbGVEYXRhOiB7XG4gICAgICAgIGZpcnN0RGF5T2ZXZWVrOiBudW1iZXI7XG4gICAgICAgIGxvbmdNb250aHM6IHN0cmluZ1tdO1xuICAgICAgICBzaG9ydE1vbnRoczogc3RyaW5nW107XG4gICAgICAgIGRhdGVzOiBzdHJpbmdbXTtcbiAgICAgICAgbG9uZ0RheXNPZldlZWs6IHN0cmluZ1tdO1xuICAgICAgICBzaG9ydERheXNPZldlZWs6IHN0cmluZ1tdO1xuICAgICAgICBuYXJyb3dEYXlzT2ZXZWVrOiBzdHJpbmdbXTtcbiAgICB9O1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIEBPcHRpb25hbCgpIEBJbmplY3QoTUNfREFURV9MT0NBTEUpIGRhdGVMb2NhbGU6IHN0cmluZyxcbiAgICAgICAgQE9wdGlvbmFsKCkgQEluamVjdChNQ19NT01FTlRfREFURV9BREFQVEVSX09QVElPTlMpIHByaXZhdGUgcmVhZG9ubHkgb3B0aW9ucz86IElNY01vbWVudERhdGVBZGFwdGVyT3B0aW9uc1xuICAgICkge1xuICAgICAgICBzdXBlcigpO1xuXG4gICAgICAgIHRoaXMuc2V0TG9jYWxlKGRhdGVMb2NhbGUgfHwgbW9tZW50LmxvY2FsZSgpKTtcbiAgICB9XG5cbiAgICBzZXRMb2NhbGUobG9jYWxlOiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgc3VwZXIuc2V0TG9jYWxlKGxvY2FsZSk7XG5cbiAgICAgICAgdGhpcy5kYXRlRm9ybWF0dGVyID0gbmV3IERhdGVGb3JtYXR0ZXI8TW9tZW50Pih0aGlzLCBsb2NhbGUpO1xuICAgICAgICB0aGlzLmNvbmZpZyA9IGxvY2FsZSA9PT0gJ2VuJyA/IGVuVVMgOiBydVJVO1xuXG4gICAgICAgIGxldCBtb21lbnRMb2NhbGVEYXRhID0gbW9tZW50LmxvY2FsZURhdGEobG9jYWxlKTtcblxuICAgICAgICAvLyBUaGlzIGlzIG91ciBjdXN0b21zIHRyYW5zbGF0aW9uc1xuICAgICAgICBjb25zdCBpMThuTG9jYWxzID0gWydlbicsICdydSddO1xuXG4gICAgICAgIGlmIChpMThuTG9jYWxzLmluZGV4T2YobG9jYWxlKSAhPT0gLTEpIHtcbiAgICAgICAgICAgIG1vbWVudExvY2FsZURhdGEgPSBtb21lbnQudXBkYXRlTG9jYWxlKGxvY2FsZSwge1xuICAgICAgICAgICAgICAgIG1vbnRoc1Nob3J0OiB7XG4gICAgICAgICAgICAgICAgICAgIGZvcm1hdDogdGhpcy5jb25maWcubW9udGhOYW1lcy5zaG9ydC5mb3JtYXR0ZWQsXG4gICAgICAgICAgICAgICAgICAgIHN0YW5kYWxvbmU6IHRoaXMuY29uZmlnLm1vbnRoTmFtZXMuc2hvcnQuc3RhbmRhbG9uZVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgd2Vla2RheXM6IHRoaXMuY29uZmlnLmRheU9mV2Vla05hbWVzLmxvbmcsXG4gICAgICAgICAgICAgICAgd2Vla2RheXNTaG9ydDogdGhpcy5jb25maWcuZGF5T2ZXZWVrTmFtZXMuc2hvcnQsXG4gICAgICAgICAgICAgICAgd2Vla2RheXNNaW46IHRoaXMuY29uZmlnLmRheU9mV2Vla05hbWVzLm5hcnJvd1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmxvY2FsZURhdGEgPSB7XG4gICAgICAgICAgICBmaXJzdERheU9mV2VlazogdGhpcy5jb25maWcuZmlyc3REYXlPZldlZWssXG4gICAgICAgICAgICBsb25nTW9udGhzOiBtb21lbnRMb2NhbGVEYXRhLm1vbnRocygpLFxuICAgICAgICAgICAgc2hvcnRNb250aHM6IG1vbWVudExvY2FsZURhdGEubW9udGhzU2hvcnQoKSxcbiAgICAgICAgICAgIGRhdGVzOiByYW5nZSgzMSwgKGkpID0+IHRoaXMuY3JlYXRlRGF0ZSgyMDE3LCAwLCBpICsgMSkuZm9ybWF0KCdEJykpLFxuICAgICAgICAgICAgbG9uZ0RheXNPZldlZWs6IG1vbWVudExvY2FsZURhdGEud2Vla2RheXMoKSxcbiAgICAgICAgICAgIHNob3J0RGF5c09mV2VlazogbW9tZW50TG9jYWxlRGF0YS53ZWVrZGF5c1Nob3J0KCksXG4gICAgICAgICAgICBuYXJyb3dEYXlzT2ZXZWVrOiBtb21lbnRMb2NhbGVEYXRhLndlZWtkYXlzTWluKClcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBnZXRMb2NhbGVEYXRhKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5sb2NhbGVEYXRhO1xuICAgIH1cblxuICAgIHNldExvY2FsZURhdGEobG9jYWxlRGF0YSk6IHZvaWQge1xuICAgICAgICB0aGlzLmxvY2FsZURhdGEgPSBsb2NhbGVEYXRhO1xuICAgIH1cblxuICAgIHVwZGF0ZUxvY2FsZURhdGEobG9jYWxlRGF0YSk6IHZvaWQge1xuICAgICAgICB0aGlzLmxvY2FsZURhdGEgPSB7IC4uLnRoaXMubG9jYWxlRGF0YSwgLi4ubG9jYWxlRGF0YSB9O1xuICAgIH1cblxuICAgIGdldFllYXIoZGF0ZTogTW9tZW50KTogbnVtYmVyIHsgcmV0dXJuIHRoaXMuY2xvbmUoZGF0ZSkueWVhcigpOyB9XG5cbiAgICBnZXRNb250aChkYXRlOiBNb21lbnQpOiBudW1iZXIgeyByZXR1cm4gdGhpcy5jbG9uZShkYXRlKS5tb250aCgpOyB9XG5cbiAgICBnZXREYXRlKGRhdGU6IE1vbWVudCk6IG51bWJlciB7IHJldHVybiB0aGlzLmNsb25lKGRhdGUpLmRhdGUoKTsgfVxuXG4gICAgZ2V0SG91cnMoZGF0ZTogTW9tZW50KTogbnVtYmVyIHsgcmV0dXJuIHRoaXMuY2xvbmUoZGF0ZSkuaG91cnMoKTsgfVxuXG4gICAgZ2V0TWludXRlcyhkYXRlOiBNb21lbnQpOiBudW1iZXIgeyByZXR1cm4gdGhpcy5jbG9uZShkYXRlKS5taW51dGVzKCk7IH1cblxuICAgIGdldFNlY29uZHMoZGF0ZTogTW9tZW50KTogbnVtYmVyIHsgcmV0dXJuIHRoaXMuY2xvbmUoZGF0ZSkuc2Vjb25kcygpOyB9XG5cbiAgICBnZXRNaWxsaXNlY29uZHMoZGF0ZTogTW9tZW50KTogbnVtYmVyIHsgcmV0dXJuIHRoaXMuY2xvbmUoZGF0ZSkubWlsbGlzZWNvbmRzKCk7IH1cblxuICAgIGdldFRpbWUoZGF0ZTogTW9tZW50KTogbnVtYmVyIHsgcmV0dXJuIGRhdGUudmFsdWVPZigpOyB9XG5cbiAgICBnZXREYXlPZldlZWsoZGF0ZTogTW9tZW50KTogbnVtYmVyIHsgcmV0dXJuIHRoaXMuY2xvbmUoZGF0ZSkuZGF5KCk7IH1cblxuICAgIGdldE1vbnRoTmFtZXMoc3R5bGU6ICdsb25nJyB8ICdzaG9ydCcgfCAnbmFycm93Jyk6IHN0cmluZ1tdIHtcbiAgICAgICAgLy8gTW9tZW50LmpzIGRvZXNuJ3Qgc3VwcG9ydCBuYXJyb3cgbW9udGggbmFtZXNcbiAgICAgICAgcmV0dXJuIHN0eWxlID09PSAnbG9uZycgPyB0aGlzLmxvY2FsZURhdGEubG9uZ01vbnRocyA6IHRoaXMubG9jYWxlRGF0YS5zaG9ydE1vbnRocztcbiAgICB9XG5cbiAgICBnZXREYXRlTmFtZXMoKTogc3RyaW5nW10ge1xuICAgICAgICByZXR1cm4gdGhpcy5sb2NhbGVEYXRhLmRhdGVzO1xuICAgIH1cblxuICAgIGdldERheU9mV2Vla05hbWVzKHN0eWxlOiAnbG9uZycgfCAnc2hvcnQnIHwgJ25hcnJvdycpOiBzdHJpbmdbXSB7XG4gICAgICAgIGlmIChzdHlsZSA9PT0gJ2xvbmcnKSB7IHJldHVybiB0aGlzLmxvY2FsZURhdGEubG9uZ0RheXNPZldlZWs7IH1cblxuICAgICAgICBpZiAoc3R5bGUgPT09ICdzaG9ydCcpIHsgcmV0dXJuIHRoaXMubG9jYWxlRGF0YS5zaG9ydERheXNPZldlZWs7IH1cblxuICAgICAgICByZXR1cm4gdGhpcy5sb2NhbGVEYXRhLm5hcnJvd0RheXNPZldlZWs7XG4gICAgfVxuXG4gICAgZ2V0WWVhck5hbWUoZGF0ZTogTW9tZW50KTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2xvbmUoZGF0ZSkuZm9ybWF0KCdZWVlZJyk7XG4gICAgfVxuXG4gICAgZ2V0Rmlyc3REYXlPZldlZWsoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubG9jYWxlRGF0YS5maXJzdERheU9mV2VlaztcbiAgICB9XG5cbiAgICBnZXROdW1EYXlzSW5Nb250aChkYXRlOiBNb21lbnQpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5jbG9uZShkYXRlKS5kYXlzSW5Nb250aCgpO1xuICAgIH1cblxuICAgIGNsb25lKGRhdGU6IE1vbWVudCk6IE1vbWVudCB7XG4gICAgICAgIHJldHVybiBkYXRlLmNsb25lKCkubG9jYWxlKHRoaXMubG9jYWxlKTtcbiAgICB9XG5cbiAgICBjcmVhdGVEYXRlKHllYXI6IG51bWJlciwgbW9udGg6IG51bWJlciA9IDAsIGRhdGU6IG51bWJlciA9IDEpOiBNb21lbnQge1xuICAgICAgICAvLyBNb21lbnQuanMgd2lsbCBjcmVhdGUgYW4gaW52YWxpZCBkYXRlIGlmIGFueSBvZiB0aGUgY29tcG9uZW50cyBhcmUgb3V0IG9mIGJvdW5kcywgYnV0IHdlXG4gICAgICAgIC8vIGV4cGxpY2l0bHkgY2hlY2sgZWFjaCBjYXNlIHNvIHdlIGNhbiB0aHJvdyBtb3JlIGRlc2NyaXB0aXZlIGVycm9ycy5cbiAgICAgICAgaWYgKG1vbnRoIDwgMCB8fCBtb250aCA+IDExKSB7XG4gICAgICAgICAgICB0aHJvdyBFcnJvcihgSW52YWxpZCBtb250aCBpbmRleCBcIiR7bW9udGh9XCIuIE1vbnRoIGluZGV4IGhhcyB0byBiZSBiZXR3ZWVuIDAgYW5kIDExLmApO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGRhdGUgPCAxKSB7XG4gICAgICAgICAgICB0aHJvdyBFcnJvcihgSW52YWxpZCBkYXRlIFwiJHtkYXRlfVwiLiBEYXRlIGhhcyB0byBiZSBncmVhdGVyIHRoYW4gMC5gKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IHRoaXMuY3JlYXRlTW9tZW50KHt5ZWFyLCBtb250aCwgZGF0ZX0pLmxvY2FsZSh0aGlzLmxvY2FsZSk7XG5cbiAgICAgICAgLy8gSWYgdGhlIHJlc3VsdCBpc24ndCB2YWxpZCwgdGhlIGRhdGUgbXVzdCBoYXZlIGJlZW4gb3V0IG9mIGJvdW5kcyBmb3IgdGhpcyBtb250aC5cbiAgICAgICAgaWYgKCFyZXN1bHQuaXNWYWxpZCgpKSB7XG4gICAgICAgICAgICB0aHJvdyBFcnJvcihgSW52YWxpZCBkYXRlIFwiJHtkYXRlfVwiIGZvciBtb250aCB3aXRoIGluZGV4IFwiJHttb250aH1cIi5gKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG4gICAgY3JlYXRlRGF0ZVRpbWUoXG4gICAgICAgIHllYXI6IG51bWJlcixcbiAgICAgICAgbW9udGg6IG51bWJlcixcbiAgICAgICAgZGF0ZTogbnVtYmVyLFxuICAgICAgICBob3VyczogbnVtYmVyLFxuICAgICAgICBtaW51dGVzOiBudW1iZXIsXG4gICAgICAgIHNlY29uZHM6IG51bWJlcixcbiAgICAgICAgbWlsbGlzZWNvbmRzOiBudW1iZXJcbiAgICApOiBNb21lbnQge1xuICAgICAgICBjb25zdCBuZXdEYXRlID0gdGhpcy5jcmVhdGVEYXRlKHllYXIsIG1vbnRoLCBkYXRlKTtcblxuICAgICAgICBuZXdEYXRlLmhvdXJzKGhvdXJzKTtcbiAgICAgICAgbmV3RGF0ZS5taW51dGVzKG1pbnV0ZXMpO1xuICAgICAgICBuZXdEYXRlLnNlY29uZHMoc2Vjb25kcyk7XG4gICAgICAgIG5ld0RhdGUubWlsbGlzZWNvbmRzKG1pbGxpc2Vjb25kcyk7XG5cbiAgICAgICAgcmV0dXJuIG5ld0RhdGU7XG4gICAgfVxuXG4gICAgdG9kYXkoKTogTW9tZW50IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY3JlYXRlTW9tZW50KCkubG9jYWxlKHRoaXMubG9jYWxlKTtcbiAgICB9XG5cbiAgICBwYXJzZSh2YWx1ZTogYW55LCBwYXJzZUZvcm1hdDogc3RyaW5nIHwgc3RyaW5nW10pOiBNb21lbnQgfCBudWxsIHtcbiAgICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLm9wdGlvbnMgJiYgdGhpcy5vcHRpb25zLmZpbmREYXRlRm9ybWF0KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmZpbmRGb3JtYXQodmFsdWUpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVybiBwYXJzZUZvcm1hdFxuICAgICAgICAgICAgICAgICAgICA/IHRoaXMuY3JlYXRlTW9tZW50KHZhbHVlLCBwYXJzZUZvcm1hdCwgdGhpcy5sb2NhbGUpXG4gICAgICAgICAgICAgICAgICAgIDogdGhpcy5jcmVhdGVNb21lbnQodmFsdWUpLmxvY2FsZSh0aGlzLmxvY2FsZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNyZWF0ZU1vbWVudCh2YWx1ZSkubG9jYWxlKHRoaXMubG9jYWxlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGZvcm1hdChkYXRlOiBNb21lbnQsIGRpc3BsYXlGb3JtYXQ6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlOm5vLXBhcmFtZXRlci1yZWFzc2lnbm1lbnRcbiAgICAgICAgZGF0ZSA9IHRoaXMuY2xvbmUoZGF0ZSk7XG4gICAgICAgIGlmICghdGhpcy5pc1ZhbGlkKGRhdGUpKSB7XG4gICAgICAgICAgICB0aHJvdyBFcnJvcignTW9tZW50RGF0ZUFkYXB0ZXI6IENhbm5vdCBmb3JtYXQgaW52YWxpZCBkYXRlLicpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGRhdGUuZm9ybWF0KGRpc3BsYXlGb3JtYXQpO1xuICAgIH1cblxuICAgIGFkZENhbGVuZGFyWWVhcnMoZGF0ZTogTW9tZW50LCB5ZWFyczogbnVtYmVyKTogTW9tZW50IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2xvbmUoZGF0ZSkuYWRkKHsgeWVhcnMgfSk7XG4gICAgfVxuXG4gICAgYWRkQ2FsZW5kYXJNb250aHMoZGF0ZTogTW9tZW50LCBtb250aHM6IG51bWJlcik6IE1vbWVudCB7XG4gICAgICAgIHJldHVybiB0aGlzLmNsb25lKGRhdGUpLmFkZCh7IG1vbnRocyB9KTtcbiAgICB9XG5cbiAgICBhZGRDYWxlbmRhckRheXMoZGF0ZTogTW9tZW50LCBkYXlzOiBudW1iZXIpOiBNb21lbnQge1xuICAgICAgICByZXR1cm4gdGhpcy5jbG9uZShkYXRlKS5hZGQoeyBkYXlzIH0pO1xuICAgIH1cblxuICAgIHRvSXNvODYwMShkYXRlOiBNb21lbnQpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5jbG9uZShkYXRlKS5mb3JtYXQoKTtcbiAgICB9XG5cbiAgICAvKiogaHR0cHM6Ly93d3cuaWV0Zi5vcmcvcmZjL3JmYzMzMzkudHh0ICovXG4gICAgZGVzZXJpYWxpemUodmFsdWU6IGFueSk6IE1vbWVudCB8IG51bGwge1xuICAgICAgICBsZXQgZGF0ZTtcbiAgICAgICAgaWYgKHZhbHVlIGluc3RhbmNlb2YgRGF0ZSkge1xuICAgICAgICAgICAgZGF0ZSA9IHRoaXMuY3JlYXRlTW9tZW50KHZhbHVlKS5sb2NhbGUodGhpcy5sb2NhbGUpO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuaXNEYXRlSW5zdGFuY2UodmFsdWUpKSB7XG4gICAgICAgICAgICAvLyBOb3RlOiBhc3N1bWVzIHRoYXQgY2xvbmluZyBhbHNvIHNldHMgdGhlIGNvcnJlY3QgbG9jYWxlLlxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY2xvbmUodmFsdWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIGlmICghdmFsdWUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGRhdGUgPSB0aGlzLmNyZWF0ZU1vbWVudCh2YWx1ZSwgbW9tZW50LklTT184NjAxKS5sb2NhbGUodGhpcy5sb2NhbGUpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGRhdGUgJiYgdGhpcy5pc1ZhbGlkKGRhdGUpKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jcmVhdGVNb21lbnQoZGF0ZSkubG9jYWxlKHRoaXMubG9jYWxlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBzdXBlci5kZXNlcmlhbGl6ZSh2YWx1ZSk7XG4gICAgfVxuXG4gICAgaXNEYXRlSW5zdGFuY2Uob2JqOiBhbnkpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIG1vbWVudC5pc01vbWVudChvYmopO1xuICAgIH1cblxuICAgIGlzVmFsaWQoZGF0ZTogTW9tZW50KTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLmNsb25lKGRhdGUpLmlzVmFsaWQoKTtcbiAgICB9XG5cbiAgICBpbnZhbGlkKCk6IE1vbWVudCB7XG4gICAgICAgIHJldHVybiBtb21lbnQuaW52YWxpZCgpO1xuICAgIH1cblxuICAgIGhhc1NhbWUoc3RhcnREYXRlOiBNb21lbnQsIGVuZERhdGU6IE1vbWVudCwgdW5pdDogdW5pdE9mVGltZS5EaWZmKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiBzdGFydERhdGUuaXNTYW1lKGVuZERhdGUsIHVuaXQpO1xuICAgIH1cblxuICAgIGRpZmZOb3coZGF0ZTogTW9tZW50LCB1bml0OiB1bml0T2ZUaW1lLkRpZmYpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gZGF0ZS5kaWZmKHRoaXMudG9kYXkoKSwgdW5pdCk7XG4gICAgfVxuXG4gICAgQERlcHJlY2F0ZWRNZXRob2RcbiAgICBhYnNvbHV0ZURhdGUoZGF0ZTogTW9tZW50LCBwYXJhbXMsIGRhdGV0aW1lOiBib29sZWFuLCBtaWxsaXNlY29uZHM6IGJvb2xlYW4pOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5kYXRlRm9ybWF0dGVyLmFic29sdXRlRGF0ZShkYXRlLCBwYXJhbXMsIGRhdGV0aW1lLCBtaWxsaXNlY29uZHMpO1xuICAgIH1cblxuICAgIEBEZXByZWNhdGVkTWV0aG9kXG4gICAgYWJzb2x1dGVMb25nRGF0ZShkYXRlOiBNb21lbnQpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5kYXRlRm9ybWF0dGVyLmFic29sdXRlTG9uZ0RhdGUoZGF0ZSk7XG4gICAgfVxuXG4gICAgQERlcHJlY2F0ZWRNZXRob2RcbiAgICBhYnNvbHV0ZUxvbmdEYXRlVGltZShkYXRlOiBNb21lbnQsIG9wdGlvbnM/KTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0ZUZvcm1hdHRlci5hYnNvbHV0ZUxvbmdEYXRlVGltZShkYXRlLCBvcHRpb25zKTtcbiAgICB9XG5cbiAgICBARGVwcmVjYXRlZE1ldGhvZFxuICAgIGFic29sdXRlU2hvcnREYXRlKGRhdGU6IE1vbWVudCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmRhdGVGb3JtYXR0ZXIuYWJzb2x1dGVTaG9ydERhdGUoZGF0ZSk7XG4gICAgfVxuXG4gICAgQERlcHJlY2F0ZWRNZXRob2RcbiAgICBhYnNvbHV0ZVNob3J0RGF0ZVRpbWUoZGF0ZTogTW9tZW50LCBvcHRpb25zPyk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmRhdGVGb3JtYXR0ZXIuYWJzb2x1dGVTaG9ydERhdGVUaW1lKGRhdGUsIG9wdGlvbnMpO1xuICAgIH1cblxuICAgIEBEZXByZWNhdGVkTWV0aG9kXG4gICAgb3BlbmVkUmFuZ2VEYXRlKHN0YXJ0RGF0ZTogTW9tZW50LCBlbmREYXRlOiBNb21lbnQsIHRlbXBsYXRlKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0ZUZvcm1hdHRlci5vcGVuZWRSYW5nZURhdGUoc3RhcnREYXRlLCBlbmREYXRlLCB0ZW1wbGF0ZSk7XG4gICAgfVxuXG4gICAgQERlcHJlY2F0ZWRNZXRob2RcbiAgICBvcGVuZWRSYW5nZURhdGVUaW1lKHN0YXJ0RGF0ZTogTW9tZW50LCBlbmREYXRlOiBNb21lbnQsIHRlbXBsYXRlKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0ZUZvcm1hdHRlci5vcGVuZWRSYW5nZURhdGVUaW1lKHN0YXJ0RGF0ZSwgZW5kRGF0ZSwgdGVtcGxhdGUpO1xuICAgIH1cblxuICAgIEBEZXByZWNhdGVkTWV0aG9kXG4gICAgcmFuZ2VEYXRlKHN0YXJ0RGF0ZTogTW9tZW50LCBlbmREYXRlOiBNb21lbnQsIHRlbXBsYXRlKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0ZUZvcm1hdHRlci5yYW5nZURhdGUoc3RhcnREYXRlLCBlbmREYXRlLCB0ZW1wbGF0ZSk7XG4gICAgfVxuXG4gICAgQERlcHJlY2F0ZWRNZXRob2RcbiAgICByYW5nZURhdGVUaW1lKHN0YXJ0RGF0ZTogTW9tZW50LCBlbmREYXRlOiBNb21lbnQsIHRlbXBsYXRlKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0ZUZvcm1hdHRlci5yYW5nZURhdGVUaW1lKHN0YXJ0RGF0ZSwgZW5kRGF0ZSwgdGVtcGxhdGUpO1xuICAgIH1cblxuICAgIEBEZXByZWNhdGVkTWV0aG9kXG4gICAgcmFuZ2VMb25nRGF0ZShzdGFydERhdGU6IE1vbWVudCB8IG51bGwsIGVuZERhdGU/OiBNb21lbnQpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5kYXRlRm9ybWF0dGVyLnJhbmdlTG9uZ0RhdGUoc3RhcnREYXRlLCBlbmREYXRlKTtcbiAgICB9XG5cbiAgICBARGVwcmVjYXRlZE1ldGhvZFxuICAgIHJhbmdlTG9uZ0RhdGVUaW1lKHN0YXJ0RGF0ZTogTW9tZW50IHwgbnVsbCwgZW5kRGF0ZT86IE1vbWVudCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmRhdGVGb3JtYXR0ZXIucmFuZ2VMb25nRGF0ZVRpbWUoc3RhcnREYXRlLCBlbmREYXRlKTtcbiAgICB9XG5cbiAgICBARGVwcmVjYXRlZE1ldGhvZFxuICAgIHJhbmdlTWlkZGxlRGF0ZVRpbWUoc3RhcnREYXRlOiBNb21lbnQsIGVuZERhdGU6IE1vbWVudCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmRhdGVGb3JtYXR0ZXIucmFuZ2VNaWRkbGVEYXRlVGltZShzdGFydERhdGUsIGVuZERhdGUpO1xuICAgIH1cblxuICAgIEBEZXByZWNhdGVkTWV0aG9kXG4gICAgcmFuZ2VTaG9ydERhdGUoc3RhcnREYXRlOiBNb21lbnQgfCBudWxsLCBlbmREYXRlPzogTW9tZW50KTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0ZUZvcm1hdHRlci5yYW5nZVNob3J0RGF0ZShzdGFydERhdGUsIGVuZERhdGUpO1xuICAgIH1cblxuICAgIEBEZXByZWNhdGVkTWV0aG9kXG4gICAgcmFuZ2VTaG9ydERhdGVUaW1lKHN0YXJ0RGF0ZTogTW9tZW50IHwgbnVsbCwgZW5kRGF0ZT86IE1vbWVudCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmRhdGVGb3JtYXR0ZXIucmFuZ2VTaG9ydERhdGVUaW1lKHN0YXJ0RGF0ZSwgZW5kRGF0ZSk7XG4gICAgfVxuXG4gICAgQERlcHJlY2F0ZWRNZXRob2RcbiAgICByZWxhdGl2ZURhdGUoZGF0ZTogTW9tZW50LCB0ZW1wbGF0ZSk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmRhdGVGb3JtYXR0ZXIucmVsYXRpdmVEYXRlKGRhdGUsIHRlbXBsYXRlKTtcbiAgICB9XG5cbiAgICBARGVwcmVjYXRlZE1ldGhvZFxuICAgIHJlbGF0aXZlTG9uZ0RhdGUoZGF0ZTogTW9tZW50KTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0ZUZvcm1hdHRlci5yZWxhdGl2ZUxvbmdEYXRlKGRhdGUpO1xuICAgIH1cblxuICAgIEBEZXByZWNhdGVkTWV0aG9kXG4gICAgcmVsYXRpdmVTaG9ydERhdGUoZGF0ZTogTW9tZW50KTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0ZUZvcm1hdHRlci5yZWxhdGl2ZVNob3J0RGF0ZShkYXRlKTtcbiAgICB9XG5cbiAgICAvKiogQ3JlYXRlcyBhIE1vbWVudCBpbnN0YW5jZSB3aGlsZSByZXNwZWN0aW5nIHRoZSBjdXJyZW50IFVUQyBzZXR0aW5ncy4gKi9cbiAgICBwcml2YXRlIGNyZWF0ZU1vbWVudCguLi5hcmdzOiBhbnlbXSk6IE1vbWVudCB7XG4gICAgICAgIHJldHVybiB0aGlzLm9wdGlvbnM/LnVzZVV0YyA/IG1vbWVudC51dGMoLi4uYXJncykgOiBtb21lbnQoLi4uYXJncyk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBpc051bWVyaWModmFsdWU6IGFueSk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gIWlzTmFOKHBhcnNlRmxvYXQodmFsdWUpKSAmJiBpc0Zpbml0ZSh2YWx1ZSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBmaW5kRm9ybWF0KHZhbHVlOiBzdHJpbmcpOiBNb21lbnQgfCBudWxsIHtcbiAgICAgICAgaWYgKCF2YWx1ZSkgeyByZXR1cm4gbnVsbDsgfVxuXG4gICAgICAgIC8vIGRlZmF1bHQgdGVzdCAtIGlzb1xuICAgICAgICBjb25zdCBpc29EYXRlID0gIHRoaXMuY3JlYXRlTW9tZW50KHZhbHVlLCBtb21lbnQuSVNPXzg2MDEsIHRoaXMubG9jYWxlKTtcblxuICAgICAgICBpZiAoaXNvRGF0ZS5pc1ZhbGlkKCkpIHsgcmV0dXJuIGlzb0RhdGU7IH1cblxuICAgICAgICBpZiAodGhpcy5pc051bWVyaWModmFsdWUpKSB7XG4gICAgICAgICAgICAvLyB1bml4IHRpbWUgc2VjXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jcmVhdGVNb21lbnQodmFsdWUsICdYJywgdGhpcy5sb2NhbGUpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gbG9uZyBtb250aHMgbmFtaW5nOiBEIE1NTSBZWVlZLCBNTU0gRG8gWVlZWSB3aXRoIHNob3J0IGNhc2Ugc3VwcG9ydFxuICAgICAgICBpZiAoXG4gICAgICAgICAgICAvXlxcZHsxLDJ9XFxzXFxTK1xccyhcXGR7Mn18XFxkezR9KSQvLnRlc3QodmFsdWUudHJpbSgpKSB8fFxuICAgICAgICAgICAgL15cXFMrXFxzXFxkezEsMn1bYS16XXsyfVxccyhcXGR7Mn18XFxkezR9KSQvLnRlc3QodmFsdWUudHJpbSgpKVxuICAgICAgICApIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnBhcnNlV2l0aFNwYWNlKHZhbHVlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHNsYXNoIG5vdGF0aW9uOiBERC9NTS9ZWVlZLCBNTS9ERC9ZWVlZIHdpdGggc2hvcnQgY2FzZSBzdXBwb3J0XG4gICAgICAgIGlmICgvXlxcZHsxLDJ9XFwvXFxkezEsMn1cXC8oXFxkezJ9fFxcZHs0fSkkLy50ZXN0KHZhbHVlKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucGFyc2VXaXRoU2xhc2godmFsdWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gZGFzaCBub3RhdGlvbjogREQtTU0tWVlZWSwgWVlZWS1ERC1NTSB3aXRoIHNob3J0IGNhc2Ugc3VwcG9ydFxuICAgICAgICBpZiAoLyheKFxcZHsxLDJ9fFxcZHs0fSktXFxkezEsMn0tXFxkezEsMn0kKXwoXlxcZHsxLDJ9LVxcZHsxLDJ9LShcXGR7Mn18XFxkezR9KSQpLy50ZXN0KHZhbHVlKSkge1xuICAgICAgICAgICByZXR1cm4gdGhpcy5wYXJzZVdpdGhEYXNoKHZhbHVlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGRvdCBub3RhdGlvbjogREQuTU0uWVlZWSB3aXRoIHNob3J0IGNhc2Ugc3VwcG9ydFxuICAgICAgICBpZiAoL15cXGR7MSwyfVxcLlxcZHsxLDJ9XFwuKFxcZHsyfXxcXGR7NH0pJC8udGVzdCh2YWx1ZSkpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnBhcnNlV2l0aERvdCh2YWx1ZSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBwcml2YXRlIHBhcnNlV2l0aFNwYWNlKHZhbHVlOiBzdHJpbmcpOiBNb21lbnQgfCBudWxsIHtcbiAgICAgICAgc3dpdGNoICh0aGlzLmxvY2FsZSkge1xuICAgICAgICAgICAgY2FzZSAncnUnOlxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmNyZWF0ZU1vbWVudCh2YWx1ZSwgJ0REIE1NTU0gWVlZWScsIHRoaXMubG9jYWxlKTtcbiAgICAgICAgICAgIGNhc2UgJ2VuJzpcbiAgICAgICAgICAgICAgICAvLyAxNiBGZWIgMjAxOSB2cyBGZWIgMTZ0aCAyMDE5LCBjb3ZlcnMgRmViIGFuZCBGZWJydWFyeSBjYXNlc1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzTnVtZXJpYyh2YWx1ZVswXSkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuY3JlYXRlTW9tZW50KHZhbHVlLCAnRCBNTU1NIFlZWVknLCB0aGlzLmxvY2FsZSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuY3JlYXRlTW9tZW50KHZhbHVlLCAnTU1NTSBEbyBZWVlZJywgdGhpcy5sb2NhbGUpO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYExvY2FsZSAke3RoaXMubG9jYWxlfSBpcyBub3Qgc3VwcG9ydGVkYCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIHBhcnNlV2l0aFNsYXNoKHZhbHVlOiBzdHJpbmcpOiBNb21lbnQgfCBudWxsIHtcbiAgICAgICAgc3dpdGNoICh0aGlzLmxvY2FsZSkge1xuICAgICAgICAgICAgY2FzZSAncnUnOlxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmNyZWF0ZU1vbWVudCh2YWx1ZSwgJ0REL01NL1lZWVknLCB0aGlzLmxvY2FsZSk7XG4gICAgICAgICAgICAvLyB0b2RvIGRvIHdlIHVzZSBnZW5lcmFsaXplZCBsb2NhbGVzPyBlbiB2cyBlbi1VUzsgdW50aWwgbm90IHdlIHRyeSB0byBndWVzc1xuICAgICAgICAgICAgY2FzZSAnZW4nOlxuICAgICAgICAgICAgICAgIC8vIFVTIHZzIFVLXG4gICAgICAgICAgICAgICAgY29uc3QgcGFydHMgPSB2YWx1ZS5zcGxpdCgnLycpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGRhdGVQYXJ0c0NvdW50ID0gMztcbiAgICAgICAgICAgICAgICBpZiAocGFydHMubGVuZ3RoICE9PSBkYXRlUGFydHNDb3VudCkgeyByZXR1cm4gbnVsbDsgfVxuXG4gICAgICAgICAgICAgICAgY29uc3QgZmlyc3RQYXJ0ID0gcGFydHNbMF0udHJpbSgpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHNlY29uZFBhcnQgPSBwYXJ0c1sxXS50cmltKCk7XG5cbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuaXNOdW1lcmljKGZpcnN0UGFydCkgfHwgIXRoaXMuaXNOdW1lcmljKHNlY29uZFBhcnQpKSB7IHJldHVybiBudWxsOyB9XG5cbiAgICAgICAgICAgICAgICBjb25zdCBtb250aHNJblllYXJzID0gMTI7XG5cbiAgICAgICAgICAgICAgICBjb25zdCBjYW5GaXJzdEJlTW9udGggPSArZmlyc3RQYXJ0IDw9IG1vbnRoc0luWWVhcnM7XG4gICAgICAgICAgICAgICAgY29uc3QgY2FuU2Vjb25kQnlNb250aCA9ICtzZWNvbmRQYXJ0IDw9IG1vbnRoc0luWWVhcnM7XG5cbiAgICAgICAgICAgICAgICAvLyBmaXJzdCB0d28gcGFydHMgY2Fubm90IGJlIG1vbnRoXG4gICAgICAgICAgICAgICAgaWYgKCFjYW5GaXJzdEJlTW9udGggJiYgIWNhblNlY29uZEJ5TW9udGgpIHsgcmV0dXJuIG51bGw7IH1cblxuICAgICAgICAgICAgICAgIGNvbnN0IGNhbkRldGVybWluZVdoZXJlTW9udGggPSBjYW5GaXJzdEJlTW9udGggJiYgY2FuU2Vjb25kQnlNb250aDtcblxuICAgICAgICAgICAgICAgIC8vIHVzZSBVUyBmb3JtYXQgYnkgZGVmYXVsdFxuICAgICAgICAgICAgICAgIGlmIChjYW5EZXRlcm1pbmVXaGVyZU1vbnRoKSB7IHJldHVybiB0aGlzLmNyZWF0ZU1vbWVudCh2YWx1ZSwgJ01NL0REL1lZWVknLCB0aGlzLmxvY2FsZSk7IH1cblxuICAgICAgICAgICAgICAgIHJldHVybiBjYW5GaXJzdEJlTW9udGggJiYgIWNhblNlY29uZEJ5TW9udGhcbiAgICAgICAgICAgICAgICAgICAgPyB0aGlzLmNyZWF0ZU1vbWVudCh2YWx1ZSwgJ01NL0REL1lZWVknLCB0aGlzLmxvY2FsZSlcbiAgICAgICAgICAgICAgICAgICAgOiB0aGlzLmNyZWF0ZU1vbWVudCh2YWx1ZSwgJ0REL01NL1lZWVknLCB0aGlzLmxvY2FsZSk7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgTG9jYWxlICR7dGhpcy5sb2NhbGV9IGlzIG5vdCBzdXBwb3J0ZWRgKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgcGFyc2VXaXRoRGFzaCh2YWx1ZTogc3RyaW5nKTogTW9tZW50IHwgbnVsbCB7XG4gICAgICAgIC8vIGxlYWRpbmcgeWVhciB2cyBmaW5pc2hpbmcgeWVhclxuICAgICAgICBjb25zdCBwYXJ0cyA9IHZhbHVlLnNwbGl0KCctJyk7XG4gICAgICAgIGlmIChwYXJ0c1swXS5sZW5ndGggPT09IDApIHsgcmV0dXJuIG51bGw7IH1cblxuICAgICAgICBjb25zdCBtYXhEYXlPck1vbnRoQ2hhcnNDb3VudCA9IDI7XG5cbiAgICAgICAgcmV0dXJuIHBhcnRzWzBdLmxlbmd0aCA8PSBtYXhEYXlPck1vbnRoQ2hhcnNDb3VudFxuICAgICAgICAgICAgPyB0aGlzLmNyZWF0ZU1vbWVudCh2YWx1ZSwgJ0RELU1NLVlZWVknLCB0aGlzLmxvY2FsZSlcbiAgICAgICAgICAgIDogdGhpcy5jcmVhdGVNb21lbnQodmFsdWUsICdZWVlZLU1NLUREJywgdGhpcy5sb2NhbGUpO1xuICAgIH1cblxuICAgIHByaXZhdGUgcGFyc2VXaXRoRG90KHZhbHVlOiBzdHJpbmcpOiBNb21lbnQgfCBudWxsIHtcbiAgICAgICAgLy8gY292ZXJzIHR3byBjYXNlcyBZWVlZIGFuZCBZWSAoZm9yIGN1cnJlbnQgeWVhcilcbiAgICAgICAgcmV0dXJuIHRoaXMuY3JlYXRlTW9tZW50KHZhbHVlLCAnREQuTU0uWVlZWScsIHRoaXMubG9jYWxlKTtcbiAgICB9XG59XG4iXX0=