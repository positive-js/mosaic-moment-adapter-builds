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
        this.localeData = { ...this.localeData, ...localeData };
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
        return this.options?.useUtc ? moment.utc(...args) : moment(...args);
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
/** @nocollapse */ /** @nocollapse */ MomentDateAdapter.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.0", ngImport: i0, type: MomentDateAdapter, deps: [{ token: MC_DATE_LOCALE, optional: true }, { token: MC_MOMENT_DATE_ADAPTER_OPTIONS, optional: true }], target: i0.ɵɵFactoryTarget.Injectable });
/** @nocollapse */ /** @nocollapse */ MomentDateAdapter.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.1.0", ngImport: i0, type: MomentDateAdapter });
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
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.0", ngImport: i0, type: MomentDateAdapter, decorators: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9tZW50LWRhdGUtYWRhcHRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3BhY2thZ2VzL21vc2FpYy1tb21lbnQtYWRhcHRlci9hZGFwdGVyL21vbWVudC1kYXRlLWFkYXB0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGtDQUFrQztBQUNsQyxPQUFPLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxjQUFjLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzdFLE9BQU8sRUFDSCxXQUFXLEVBQ1gsY0FBYyxFQUNqQixNQUFNLDBCQUEwQixDQUFDO0FBQ2xDLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUN4RCxnRkFBZ0Y7QUFDaEYsNkZBQTZGO0FBQzdGLGlHQUFpRztBQUNqRywyQkFBMkI7QUFDM0IsT0FBTyxLQUFLLE9BQU8sTUFBTSxRQUFRLENBQUM7QUFDbEMsc0NBQXNDO0FBQ3RDLGdDQUFnQztBQUNoQyxPQUFPLEVBQUUsT0FBTyxJQUFJLGFBQWEsRUFBc0IsTUFBTSxRQUFRLENBQUM7QUFFdEUsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ3ZDLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQzs7QUFHdkMsTUFBTSxNQUFNLEdBQUcsYUFBYSxJQUFJLE9BQU8sQ0FBQztBQWdCeEMsbUVBQW1FO0FBQ25FLE1BQU0sQ0FBQyxNQUFNLDhCQUE4QixHQUFHLElBQUksY0FBYyxDQUM1RCxnQ0FBZ0MsRUFBRTtJQUM5QixVQUFVLEVBQUUsTUFBTTtJQUNsQixPQUFPLEVBQUUsc0NBQXNDO0NBQ2xELENBQUMsQ0FBQztBQUVQLG9CQUFvQjtBQUNwQixtQ0FBbUM7QUFDbkMsTUFBTSxVQUFVLHNDQUFzQztJQUNsRCxPQUFPO1FBQ0gsTUFBTSxFQUFFLEtBQUs7UUFDYixjQUFjLEVBQUUsS0FBSztLQUN4QixDQUFDO0FBQ04sQ0FBQztBQUVELGlEQUFpRDtBQUNqRCxTQUFTLEtBQUssQ0FBSSxNQUFjLEVBQUUsYUFBbUM7SUFDakUsTUFBTSxXQUFXLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBRWxDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7UUFDN0IsV0FBVyxDQUFDLENBQUMsQ0FBQyxHQUFHLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUNyQztJQUVELE9BQU8sV0FBVyxDQUFDO0FBQ3ZCLENBQUM7QUFFRCxhQUFhO0FBQ2IsTUFBTSxVQUFVLGdCQUFnQixDQUFDLE1BQVcsRUFBRSxHQUFXLEVBQUUsVUFBOEI7SUFDckYsTUFBTSxNQUFNLEdBQUcsVUFBVSxDQUFDLEtBQUssQ0FBQztJQUVoQyx1RUFBdUU7SUFDdkUsVUFBVSxDQUFDLEtBQUssR0FBRyxVQUFTLEdBQUcsSUFBVztRQUN0QyxPQUFPLENBQUMsSUFBSSxDQUNSLGtDQUFrQyxHQUFHLG1DQUFtQztZQUN4RSxrREFBa0QsQ0FDckQsQ0FBQztRQUVGLE9BQU8sTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDcEMsQ0FBQyxDQUFDO0lBRUYsT0FBTyxVQUFVLENBQUM7QUFDdEIsQ0FBQztBQUlELE1BQU0sT0FBTyxpQkFBa0IsU0FBUSxXQUFtQjtJQWF0RCxZQUN3QyxVQUFrQixFQUNlLE9BQXFDO1FBRTFHLEtBQUssRUFBRSxDQUFDO1FBRjZELFlBQU8sR0FBUCxPQUFPLENBQThCO1FBSTFHLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxJQUFJLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO0lBQ2xELENBQUM7SUFFRCxTQUFTLENBQUMsTUFBYztRQUNwQixLQUFLLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBRXhCLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxhQUFhLENBQVMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQzdELElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7UUFFNUMsSUFBSSxnQkFBZ0IsR0FBRyxNQUFNLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBRWpELG1DQUFtQztRQUNuQyxNQUFNLFVBQVUsR0FBRyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztRQUVoQyxJQUFJLFVBQVUsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7WUFDbkMsZ0JBQWdCLEdBQUcsTUFBTSxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUU7Z0JBQzNDLFdBQVcsRUFBRTtvQkFDVCxNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLFNBQVM7b0JBQzlDLFVBQVUsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsVUFBVTtpQkFDdEQ7Z0JBQ0QsUUFBUSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLElBQUk7Z0JBQ3pDLGFBQWEsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxLQUFLO2dCQUMvQyxXQUFXLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsTUFBTTthQUNqRCxDQUFDLENBQUM7U0FDTjtRQUVELElBQUksQ0FBQyxVQUFVLEdBQUc7WUFDZCxjQUFjLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjO1lBQzFDLFVBQVUsRUFBRSxnQkFBZ0IsQ0FBQyxNQUFNLEVBQUU7WUFDckMsV0FBVyxFQUFFLGdCQUFnQixDQUFDLFdBQVcsRUFBRTtZQUMzQyxLQUFLLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDcEUsY0FBYyxFQUFFLGdCQUFnQixDQUFDLFFBQVEsRUFBRTtZQUMzQyxlQUFlLEVBQUUsZ0JBQWdCLENBQUMsYUFBYSxFQUFFO1lBQ2pELGdCQUFnQixFQUFFLGdCQUFnQixDQUFDLFdBQVcsRUFBRTtTQUNuRCxDQUFDO0lBQ04sQ0FBQztJQUVELGFBQWE7UUFDVCxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUM7SUFDM0IsQ0FBQztJQUVELGFBQWEsQ0FBQyxVQUFVO1FBQ3BCLElBQUksQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDO0lBQ2pDLENBQUM7SUFFRCxnQkFBZ0IsQ0FBQyxVQUFVO1FBQ3ZCLElBQUksQ0FBQyxVQUFVLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxVQUFVLEVBQUUsR0FBRyxVQUFVLEVBQUUsQ0FBQztJQUM1RCxDQUFDO0lBRUQsT0FBTyxDQUFDLElBQVksSUFBWSxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBRWpFLFFBQVEsQ0FBQyxJQUFZLElBQVksT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztJQUVuRSxPQUFPLENBQUMsSUFBWSxJQUFZLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFFakUsUUFBUSxDQUFDLElBQVksSUFBWSxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBRW5FLFVBQVUsQ0FBQyxJQUFZLElBQVksT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQztJQUV2RSxVQUFVLENBQUMsSUFBWSxJQUFZLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFFdkUsZUFBZSxDQUFDLElBQVksSUFBWSxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBRWpGLE9BQU8sQ0FBQyxJQUFZLElBQVksT0FBTyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBRXhELFlBQVksQ0FBQyxJQUFZLElBQVksT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUVyRSxhQUFhLENBQUMsS0FBa0M7UUFDNUMsK0NBQStDO1FBQy9DLE9BQU8sS0FBSyxLQUFLLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDO0lBQ3ZGLENBQUM7SUFFRCxZQUFZO1FBQ1IsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQztJQUNqQyxDQUFDO0lBRUQsaUJBQWlCLENBQUMsS0FBa0M7UUFDaEQsSUFBSSxLQUFLLEtBQUssTUFBTSxFQUFFO1lBQUUsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLGNBQWMsQ0FBQztTQUFFO1FBRWhFLElBQUksS0FBSyxLQUFLLE9BQU8sRUFBRTtZQUFFLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxlQUFlLENBQUM7U0FBRTtRQUVsRSxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsZ0JBQWdCLENBQUM7SUFDNUMsQ0FBQztJQUVELFdBQVcsQ0FBQyxJQUFZO1FBQ3BCLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDM0MsQ0FBQztJQUVELGlCQUFpQjtRQUNiLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxjQUFjLENBQUM7SUFDMUMsQ0FBQztJQUVELGlCQUFpQixDQUFDLElBQVk7UUFDMUIsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQzFDLENBQUM7SUFFRCxLQUFLLENBQUMsSUFBWTtRQUNkLE9BQU8sSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDNUMsQ0FBQztJQUVELFVBQVUsQ0FBQyxJQUFZLEVBQUUsUUFBZ0IsQ0FBQyxFQUFFLE9BQWUsQ0FBQztRQUN4RCwyRkFBMkY7UUFDM0Ysc0VBQXNFO1FBQ3RFLElBQUksS0FBSyxHQUFHLENBQUMsSUFBSSxLQUFLLEdBQUcsRUFBRSxFQUFFO1lBQ3pCLE1BQU0sS0FBSyxDQUFDLHdCQUF3QixLQUFLLDRDQUE0QyxDQUFDLENBQUM7U0FDMUY7UUFFRCxJQUFJLElBQUksR0FBRyxDQUFDLEVBQUU7WUFDVixNQUFNLEtBQUssQ0FBQyxpQkFBaUIsSUFBSSxtQ0FBbUMsQ0FBQyxDQUFDO1NBQ3pFO1FBRUQsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBRTFFLG1GQUFtRjtRQUNuRixJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxFQUFFO1lBQ25CLE1BQU0sS0FBSyxDQUFDLGlCQUFpQixJQUFJLDJCQUEyQixLQUFLLElBQUksQ0FBQyxDQUFDO1NBQzFFO1FBRUQsT0FBTyxNQUFNLENBQUM7SUFDbEIsQ0FBQztJQUVELGNBQWMsQ0FDVixJQUFZLEVBQ1osS0FBYSxFQUNiLElBQVksRUFDWixLQUFhLEVBQ2IsT0FBZSxFQUNmLE9BQWUsRUFDZixZQUFvQjtRQUVwQixNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFFbkQsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNyQixPQUFPLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3pCLE9BQU8sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDekIsT0FBTyxDQUFDLFlBQVksQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUVuQyxPQUFPLE9BQU8sQ0FBQztJQUNuQixDQUFDO0lBRUQsS0FBSztRQUNELE9BQU8sSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDbkQsQ0FBQztJQUVELEtBQUssQ0FBQyxLQUFVLEVBQUUsV0FBOEI7UUFDNUMsSUFBSSxLQUFLLEVBQUU7WUFDUCxJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVEsRUFBRTtnQkFDM0IsSUFBSSxJQUFJLENBQUMsT0FBTyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsY0FBYyxFQUFFO29CQUM3QyxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7aUJBQ2pDO2dCQUVELE9BQU8sV0FBVztvQkFDZCxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLEVBQUUsV0FBVyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUM7b0JBQ3BELENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7YUFDdEQ7WUFFRCxPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUN2RDtRQUVELE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFRCxNQUFNLENBQUMsSUFBWSxFQUFFLGFBQXFCO1FBQ3RDLDJDQUEyQztRQUMzQyxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN4QixJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUNyQixNQUFNLEtBQUssQ0FBQyxnREFBZ0QsQ0FBQyxDQUFDO1NBQ2pFO1FBRUQsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQ3RDLENBQUM7SUFFRCxnQkFBZ0IsQ0FBQyxJQUFZLEVBQUUsS0FBYTtRQUN4QyxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQztJQUMzQyxDQUFDO0lBRUQsaUJBQWlCLENBQUMsSUFBWSxFQUFFLE1BQWM7UUFDMUMsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUM7SUFDNUMsQ0FBQztJQUVELGVBQWUsQ0FBQyxJQUFZLEVBQUUsSUFBWTtRQUN0QyxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztJQUMxQyxDQUFDO0lBRUQsU0FBUyxDQUFDLElBQVk7UUFDbEIsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ3JDLENBQUM7SUFFRCwyQ0FBMkM7SUFDM0MsV0FBVyxDQUFDLEtBQVU7UUFDbEIsSUFBSSxJQUFJLENBQUM7UUFDVCxJQUFJLEtBQUssWUFBWSxJQUFJLEVBQUU7WUFDdkIsSUFBSSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUN2RDthQUFNLElBQUksSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUNuQywyREFBMkQ7WUFDM0QsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQzVCO1FBRUQsSUFBSSxPQUFPLEtBQUssS0FBSyxRQUFRLEVBQUU7WUFDM0IsSUFBSSxDQUFDLEtBQUssRUFBRTtnQkFDUixPQUFPLElBQUksQ0FBQzthQUNmO1lBQ0QsSUFBSSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQ3hFO1FBRUQsSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUM1QixPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUN0RDtRQUVELE9BQU8sS0FBSyxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNwQyxDQUFDO0lBRUQsY0FBYyxDQUFDLEdBQVE7UUFDbkIsT0FBTyxNQUFNLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ2hDLENBQUM7SUFFRCxPQUFPLENBQUMsSUFBWTtRQUNoQixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDdEMsQ0FBQztJQUVELE9BQU87UUFDSCxPQUFPLE1BQU0sQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUM1QixDQUFDO0lBRUQsT0FBTyxDQUFDLFNBQWlCLEVBQUUsT0FBZSxFQUFFLElBQXFCO1FBQzdELE9BQU8sU0FBUyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDM0MsQ0FBQztJQUVELE9BQU8sQ0FBQyxJQUFZLEVBQUUsSUFBcUI7UUFDdkMsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUN6QyxDQUFDO0lBR0QsWUFBWSxDQUFDLElBQVksRUFBRSxNQUFNLEVBQUUsUUFBaUIsRUFBRSxZQUFxQjtRQUN2RSxPQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLFlBQVksQ0FBQyxDQUFDO0lBQ2pGLENBQUM7SUFHRCxnQkFBZ0IsQ0FBQyxJQUFZO1FBQ3pCLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNyRCxDQUFDO0lBR0Qsb0JBQW9CLENBQUMsSUFBWSxFQUFFLE9BQVE7UUFDdkMsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDLG9CQUFvQixDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQztJQUNsRSxDQUFDO0lBR0QsaUJBQWlCLENBQUMsSUFBWTtRQUMxQixPQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDdEQsQ0FBQztJQUdELHFCQUFxQixDQUFDLElBQVksRUFBRSxPQUFRO1FBQ3hDLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDbkUsQ0FBQztJQUdELGVBQWUsQ0FBQyxTQUFpQixFQUFFLE9BQWUsRUFBRSxRQUFRO1FBQ3hELE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxlQUFlLENBQUMsU0FBUyxFQUFFLE9BQU8sRUFBRSxRQUFRLENBQUMsQ0FBQztJQUM1RSxDQUFDO0lBR0QsbUJBQW1CLENBQUMsU0FBaUIsRUFBRSxPQUFlLEVBQUUsUUFBUTtRQUM1RCxPQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsbUJBQW1CLENBQUMsU0FBUyxFQUFFLE9BQU8sRUFBRSxRQUFRLENBQUMsQ0FBQztJQUNoRixDQUFDO0lBR0QsU0FBUyxDQUFDLFNBQWlCLEVBQUUsT0FBZSxFQUFFLFFBQVE7UUFDbEQsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxTQUFTLEVBQUUsT0FBTyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQ3RFLENBQUM7SUFHRCxhQUFhLENBQUMsU0FBaUIsRUFBRSxPQUFlLEVBQUUsUUFBUTtRQUN0RCxPQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDLFNBQVMsRUFBRSxPQUFPLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDMUUsQ0FBQztJQUdELGFBQWEsQ0FBQyxTQUF3QixFQUFFLE9BQWdCO1FBQ3BELE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUMsU0FBUyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQ2hFLENBQUM7SUFHRCxpQkFBaUIsQ0FBQyxTQUF3QixFQUFFLE9BQWdCO1FBQ3hELE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxpQkFBaUIsQ0FBQyxTQUFTLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDcEUsQ0FBQztJQUdELG1CQUFtQixDQUFDLFNBQWlCLEVBQUUsT0FBZTtRQUNsRCxPQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsbUJBQW1CLENBQUMsU0FBUyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQ3RFLENBQUM7SUFHRCxjQUFjLENBQUMsU0FBd0IsRUFBRSxPQUFnQjtRQUNyRCxPQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsY0FBYyxDQUFDLFNBQVMsRUFBRSxPQUFPLENBQUMsQ0FBQztJQUNqRSxDQUFDO0lBR0Qsa0JBQWtCLENBQUMsU0FBd0IsRUFBRSxPQUFnQjtRQUN6RCxPQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsa0JBQWtCLENBQUMsU0FBUyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQ3JFLENBQUM7SUFHRCxZQUFZLENBQUMsSUFBWSxFQUFFLFFBQVE7UUFDL0IsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDM0QsQ0FBQztJQUdELGdCQUFnQixDQUFDLElBQVk7UUFDekIsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3JELENBQUM7SUFHRCxpQkFBaUIsQ0FBQyxJQUFZO1FBQzFCLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN0RCxDQUFDO0lBRUQsMkVBQTJFO0lBQ25FLFlBQVksQ0FBQyxHQUFHLElBQVc7UUFDL0IsT0FBTyxJQUFJLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQztJQUN4RSxDQUFDO0lBRU8sU0FBUyxDQUFDLEtBQVU7UUFDeEIsT0FBTyxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDeEQsQ0FBQztJQUVPLFVBQVUsQ0FBQyxLQUFhO1FBQzVCLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFBRSxPQUFPLElBQUksQ0FBQztTQUFFO1FBRTVCLHFCQUFxQjtRQUNyQixNQUFNLE9BQU8sR0FBSSxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUV4RSxJQUFJLE9BQU8sQ0FBQyxPQUFPLEVBQUUsRUFBRTtZQUFFLE9BQU8sT0FBTyxDQUFDO1NBQUU7UUFFMUMsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ3ZCLGdCQUFnQjtZQUNoQixPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDckQ7UUFFRCxzRUFBc0U7UUFDdEUsSUFDSSwrQkFBK0IsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ2xELHVDQUF1QyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUMsRUFDNUQ7WUFDRSxPQUFPLElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDckM7UUFFRCxpRUFBaUU7UUFDakUsSUFBSSxtQ0FBbUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDakQsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ3JDO1FBRUQsZ0VBQWdFO1FBQ2hFLElBQUksdUVBQXVFLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ3RGLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUNuQztRQUVELG1EQUFtRDtRQUNuRCxJQUFJLG1DQUFtQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUNqRCxPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDbkM7UUFFRCxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBRU8sY0FBYyxDQUFDLEtBQWE7UUFDaEMsUUFBUSxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ2pCLEtBQUssSUFBSTtnQkFDTCxPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLGNBQWMsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDakUsS0FBSyxJQUFJO2dCQUNMLDhEQUE4RDtnQkFDOUQsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFO29CQUMxQixPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLGFBQWEsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7aUJBQy9EO2dCQUVELE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLEVBQUUsY0FBYyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUNqRTtnQkFDSSxNQUFNLElBQUksS0FBSyxDQUFDLFVBQVUsSUFBSSxDQUFDLE1BQU0sbUJBQW1CLENBQUMsQ0FBQztTQUNqRTtJQUNMLENBQUM7SUFFTyxjQUFjLENBQUMsS0FBYTtRQUNoQyxRQUFRLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDakIsS0FBSyxJQUFJO2dCQUNMLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLEVBQUUsWUFBWSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUMvRCw2RUFBNkU7WUFDN0UsS0FBSyxJQUFJO2dCQUNMLFdBQVc7Z0JBQ1gsTUFBTSxLQUFLLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDL0IsTUFBTSxjQUFjLEdBQUcsQ0FBQyxDQUFDO2dCQUN6QixJQUFJLEtBQUssQ0FBQyxNQUFNLEtBQUssY0FBYyxFQUFFO29CQUFFLE9BQU8sSUFBSSxDQUFDO2lCQUFFO2dCQUVyRCxNQUFNLFNBQVMsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7Z0JBQ2xDLE1BQU0sVUFBVSxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztnQkFFbkMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxFQUFFO29CQUFFLE9BQU8sSUFBSSxDQUFDO2lCQUFFO2dCQUUvRSxNQUFNLGFBQWEsR0FBRyxFQUFFLENBQUM7Z0JBRXpCLE1BQU0sZUFBZSxHQUFHLENBQUMsU0FBUyxJQUFJLGFBQWEsQ0FBQztnQkFDcEQsTUFBTSxnQkFBZ0IsR0FBRyxDQUFDLFVBQVUsSUFBSSxhQUFhLENBQUM7Z0JBRXRELGtDQUFrQztnQkFDbEMsSUFBSSxDQUFDLGVBQWUsSUFBSSxDQUFDLGdCQUFnQixFQUFFO29CQUFFLE9BQU8sSUFBSSxDQUFDO2lCQUFFO2dCQUUzRCxNQUFNLHNCQUFzQixHQUFHLGVBQWUsSUFBSSxnQkFBZ0IsQ0FBQztnQkFFbkUsMkJBQTJCO2dCQUMzQixJQUFJLHNCQUFzQixFQUFFO29CQUFFLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLEVBQUUsWUFBWSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztpQkFBRTtnQkFFM0YsT0FBTyxlQUFlLElBQUksQ0FBQyxnQkFBZ0I7b0JBQ3ZDLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssRUFBRSxZQUFZLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQztvQkFDckQsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLFlBQVksRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDOUQ7Z0JBQ0ksTUFBTSxJQUFJLEtBQUssQ0FBQyxVQUFVLElBQUksQ0FBQyxNQUFNLG1CQUFtQixDQUFDLENBQUM7U0FDakU7SUFDTCxDQUFDO0lBRU8sYUFBYSxDQUFDLEtBQWE7UUFDL0IsaUNBQWlDO1FBQ2pDLE1BQU0sS0FBSyxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDL0IsSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtZQUFFLE9BQU8sSUFBSSxDQUFDO1NBQUU7UUFFM0MsTUFBTSx1QkFBdUIsR0FBRyxDQUFDLENBQUM7UUFFbEMsT0FBTyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxJQUFJLHVCQUF1QjtZQUM3QyxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLEVBQUUsWUFBWSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUM7WUFDckQsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLFlBQVksRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDOUQsQ0FBQztJQUVPLFlBQVksQ0FBQyxLQUFhO1FBQzlCLGtEQUFrRDtRQUNsRCxPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLFlBQVksRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDL0QsQ0FBQzs7b0pBcGNRLGlCQUFpQixrQkFjRixjQUFjLDZCQUNkLDhCQUE4Qjt3SkFmN0MsaUJBQWlCO0FBNFAxQjtJQURDLGdCQUFnQjs7OztxREFHaEI7QUFHRDtJQURDLGdCQUFnQjs7Ozt5REFHaEI7QUFHRDtJQURDLGdCQUFnQjs7Ozs2REFHaEI7QUFHRDtJQURDLGdCQUFnQjs7OzswREFHaEI7QUFHRDtJQURDLGdCQUFnQjs7Ozs4REFHaEI7QUFHRDtJQURDLGdCQUFnQjs7Ozt3REFHaEI7QUFHRDtJQURDLGdCQUFnQjs7Ozs0REFHaEI7QUFHRDtJQURDLGdCQUFnQjs7OztrREFHaEI7QUFHRDtJQURDLGdCQUFnQjs7OztzREFHaEI7QUFHRDtJQURDLGdCQUFnQjs7OztzREFHaEI7QUFHRDtJQURDLGdCQUFnQjs7OzswREFHaEI7QUFHRDtJQURDLGdCQUFnQjs7Ozs0REFHaEI7QUFHRDtJQURDLGdCQUFnQjs7Ozt1REFHaEI7QUFHRDtJQURDLGdCQUFnQjs7OzsyREFHaEI7QUFHRDtJQURDLGdCQUFnQjs7OztxREFHaEI7QUFHRDtJQURDLGdCQUFnQjs7Ozt5REFHaEI7QUFHRDtJQURDLGdCQUFnQjs7OzswREFHaEI7MkZBOVVRLGlCQUFpQjtrQkFEN0IsVUFBVTs7MEJBZUYsUUFBUTs7MEJBQUksTUFBTTsyQkFBQyxjQUFjOzswQkFDakMsUUFBUTs7MEJBQUksTUFBTTsyQkFBQyw4QkFBOEI7NENBNk90RCxZQUFZLE1BS1osZ0JBQWdCLE1BS2hCLG9CQUFvQixNQUtwQixpQkFBaUIsTUFLakIscUJBQXFCLE1BS3JCLGVBQWUsTUFLZixtQkFBbUIsTUFLbkIsU0FBUyxNQUtULGFBQWEsTUFLYixhQUFhLE1BS2IsaUJBQWlCLE1BS2pCLG1CQUFtQixNQUtuQixjQUFjLE1BS2Qsa0JBQWtCLE1BS2xCLFlBQVksTUFLWixnQkFBZ0IsTUFLaEIsaUJBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiLy8gdHNsaW50OmRpc2FibGU6bm8tbWFnaWMtbnVtYmVyc1xuaW1wb3J0IHsgSW5qZWN0LCBJbmplY3RhYmxlLCBJbmplY3Rpb25Ub2tlbiwgT3B0aW9uYWwgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gICAgRGF0ZUFkYXB0ZXIsXG4gICAgTUNfREFURV9MT0NBTEVcbn0gZnJvbSAnQHB0c2VjdXJpdHkvY2RrL2RhdGV0aW1lJztcbmltcG9ydCB7IERhdGVGb3JtYXR0ZXIgfSBmcm9tICdAcHRzZWN1cml0eS9tb3NhaWMvY29yZSc7XG4vLyBEZXBlbmRpbmcgb24gd2hldGhlciByb2xsdXAgaXMgdXNlZCwgbW9tZW50IG5lZWRzIHRvIGJlIGltcG9ydGVkIGRpZmZlcmVudGx5LlxuLy8gU2luY2UgTW9tZW50LmpzIGRvZXNuJ3QgaGF2ZSBhIGRlZmF1bHQgZXhwb3J0LCB3ZSBub3JtYWxseSBuZWVkIHRvIGltcG9ydCB1c2luZyB0aGUgYCogYXNgXG4vLyBzeW50YXguIEhvd2V2ZXIsIHJvbGx1cCBjcmVhdGVzIGEgc3ludGhldGljIGRlZmF1bHQgbW9kdWxlIGFuZCB3ZSB0aHVzIG5lZWQgdG8gaW1wb3J0IGl0IHVzaW5nXG4vLyB0aGUgYGRlZmF1bHQgYXNgIHN5bnRheC5cbmltcG9ydCAqIGFzIF9tb21lbnQgZnJvbSAnbW9tZW50Jztcbi8vIHRzbGludDpkaXNhYmxlOm5vLWR1cGxpY2F0ZS1pbXBvcnRzXG4vLyBAdHMtaWdub3JlIChsb29rIGF0IHRzY29uZmlnKVxuaW1wb3J0IHsgZGVmYXVsdCBhcyBfcm9sbHVwTW9tZW50LCBNb21lbnQsIHVuaXRPZlRpbWUgfSBmcm9tICdtb21lbnQnO1xuXG5pbXBvcnQgeyBlblVTIH0gZnJvbSAnLi9sb2NhbGVzL2VuLVVTJztcbmltcG9ydCB7IHJ1UlUgfSBmcm9tICcuL2xvY2FsZXMvcnUtUlUnO1xuXG5cbmNvbnN0IG1vbWVudCA9IF9yb2xsdXBNb21lbnQgfHwgX21vbWVudDtcblxuLyoqIENvbmZpZ3VyYWJsZSBvcHRpb25zIGZvciB7QHNlZSBNb21lbnREYXRlQWRhcHRlcn0uICovXG5leHBvcnQgaW50ZXJmYWNlIElNY01vbWVudERhdGVBZGFwdGVyT3B0aW9ucyB7XG4gICAgLyoqXG4gICAgICogVHVybnMgdGhlIHVzZSBvZiB1dGMgZGF0ZXMgb24gb3Igb2ZmLlxuICAgICAqIHtAZGVmYXVsdCBmYWxzZX1cbiAgICAgKi9cbiAgICB1c2VVdGM6IGJvb2xlYW47XG4gICAgLyoqXG4gICAgICogd2hldGhlciBzaG91bGQgcGFyc2UgbWV0aG9kIHRyeSBndWVzcyBkYXRlIGZvcm1hdFxuICAgICAqIHtAZGVmYXVsdCBmYWxzZX1cbiAgICAgKi9cbiAgICBmaW5kRGF0ZUZvcm1hdDogYm9vbGVhbjtcbn1cblxuLyoqIEluamVjdGlvblRva2VuIGZvciBtb21lbnQgZGF0ZSBhZGFwdGVyIHRvIGNvbmZpZ3VyZSBvcHRpb25zLiAqL1xuZXhwb3J0IGNvbnN0IE1DX01PTUVOVF9EQVRFX0FEQVBURVJfT1BUSU9OUyA9IG5ldyBJbmplY3Rpb25Ub2tlbjxJTWNNb21lbnREYXRlQWRhcHRlck9wdGlvbnM+KFxuICAgICdNQ19NT01FTlRfREFURV9BREFQVEVSX09QVElPTlMnLCB7XG4gICAgICAgIHByb3ZpZGVkSW46ICdyb290JyxcbiAgICAgICAgZmFjdG9yeTogTUNfTU9NRU5UX0RBVEVfQURBUFRFUl9PUFRJT05TX0ZBQ1RPUllcbiAgICB9KTtcblxuLyoqIEBkb2NzLXByaXZhdGUgKi9cbi8vIHRzbGludDpkaXNhYmxlOm5hbWluZy1jb252ZW50aW9uXG5leHBvcnQgZnVuY3Rpb24gTUNfTU9NRU5UX0RBVEVfQURBUFRFUl9PUFRJT05TX0ZBQ1RPUlkoKTogSU1jTW9tZW50RGF0ZUFkYXB0ZXJPcHRpb25zIHtcbiAgICByZXR1cm4ge1xuICAgICAgICB1c2VVdGM6IGZhbHNlLFxuICAgICAgICBmaW5kRGF0ZUZvcm1hdDogZmFsc2VcbiAgICB9O1xufVxuXG4vKiogQ3JlYXRlcyBhbiBhcnJheSBhbmQgZmlsbHMgaXQgd2l0aCB2YWx1ZXMuICovXG5mdW5jdGlvbiByYW5nZTxUPihsZW5ndGg6IG51bWJlciwgdmFsdWVGdW5jdGlvbjogKGluZGV4OiBudW1iZXIpID0+IFQpOiBUW10ge1xuICAgIGNvbnN0IHZhbHVlc0FycmF5ID0gQXJyYXkobGVuZ3RoKTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFsdWVzQXJyYXlbaV0gPSB2YWx1ZUZ1bmN0aW9uKGkpO1xuICAgIH1cblxuICAgIHJldHVybiB2YWx1ZXNBcnJheTtcbn1cblxuLy8gQHRzLWlnbm9yZVxuZXhwb3J0IGZ1bmN0aW9uIERlcHJlY2F0ZWRNZXRob2QodGFyZ2V0OiBhbnksIGtleTogc3RyaW5nLCBkZXNjcmlwdG9yOiBQcm9wZXJ0eURlc2NyaXB0b3IpIHtcbiAgICBjb25zdCBvcmlnaW4gPSBkZXNjcmlwdG9yLnZhbHVlO1xuXG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWZ1bmN0aW9uLWV4cHJlc3Npb24gb25seS1hcnJvdy1mdW5jdGlvbnNcbiAgICBkZXNjcmlwdG9yLnZhbHVlID0gZnVuY3Rpb24oLi4uYXJnczogYW55W10pIHtcbiAgICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICAgICAgYEZvdW5kIHVzZSBvZiBkZXByZWNhdGVkIG1ldGhvZCAke2tleX0sIGl0IHdhcyBtb3ZlZCBpbiBEYXRlRm9ybWF0dGVyLiBgICtcbiAgICAgICAgICAgIGBUaGUgZGVwcmVjYXRlZCBtZXRob2Qgd2lsbCBiZSByZW1vdmVkIGluIDEzLjAuMC5gXG4gICAgICAgICk7XG5cbiAgICAgICAgcmV0dXJuIG9yaWdpbi5hcHBseSh0aGlzLCBhcmdzKTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIGRlc2NyaXB0b3I7XG59XG5cblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE1vbWVudERhdGVBZGFwdGVyIGV4dGVuZHMgRGF0ZUFkYXB0ZXI8TW9tZW50PiB7XG4gICAgcHJpdmF0ZSBkYXRlRm9ybWF0dGVyOiBEYXRlRm9ybWF0dGVyPE1vbWVudD47XG5cbiAgICBwcml2YXRlIGxvY2FsZURhdGE6IHtcbiAgICAgICAgZmlyc3REYXlPZldlZWs6IG51bWJlcjtcbiAgICAgICAgbG9uZ01vbnRoczogc3RyaW5nW107XG4gICAgICAgIHNob3J0TW9udGhzOiBzdHJpbmdbXTtcbiAgICAgICAgZGF0ZXM6IHN0cmluZ1tdO1xuICAgICAgICBsb25nRGF5c09mV2Vlazogc3RyaW5nW107XG4gICAgICAgIHNob3J0RGF5c09mV2Vlazogc3RyaW5nW107XG4gICAgICAgIG5hcnJvd0RheXNPZldlZWs6IHN0cmluZ1tdO1xuICAgIH07XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgQE9wdGlvbmFsKCkgQEluamVjdChNQ19EQVRFX0xPQ0FMRSkgZGF0ZUxvY2FsZTogc3RyaW5nLFxuICAgICAgICBAT3B0aW9uYWwoKSBASW5qZWN0KE1DX01PTUVOVF9EQVRFX0FEQVBURVJfT1BUSU9OUykgcHJpdmF0ZSByZWFkb25seSBvcHRpb25zPzogSU1jTW9tZW50RGF0ZUFkYXB0ZXJPcHRpb25zXG4gICAgKSB7XG4gICAgICAgIHN1cGVyKCk7XG5cbiAgICAgICAgdGhpcy5zZXRMb2NhbGUoZGF0ZUxvY2FsZSB8fCBtb21lbnQubG9jYWxlKCkpO1xuICAgIH1cblxuICAgIHNldExvY2FsZShsb2NhbGU6IHN0cmluZyk6IHZvaWQge1xuICAgICAgICBzdXBlci5zZXRMb2NhbGUobG9jYWxlKTtcblxuICAgICAgICB0aGlzLmRhdGVGb3JtYXR0ZXIgPSBuZXcgRGF0ZUZvcm1hdHRlcjxNb21lbnQ+KHRoaXMsIGxvY2FsZSk7XG4gICAgICAgIHRoaXMuY29uZmlnID0gbG9jYWxlID09PSAnZW4nID8gZW5VUyA6IHJ1UlU7XG5cbiAgICAgICAgbGV0IG1vbWVudExvY2FsZURhdGEgPSBtb21lbnQubG9jYWxlRGF0YShsb2NhbGUpO1xuXG4gICAgICAgIC8vIFRoaXMgaXMgb3VyIGN1c3RvbXMgdHJhbnNsYXRpb25zXG4gICAgICAgIGNvbnN0IGkxOG5Mb2NhbHMgPSBbJ2VuJywgJ3J1J107XG5cbiAgICAgICAgaWYgKGkxOG5Mb2NhbHMuaW5kZXhPZihsb2NhbGUpICE9PSAtMSkge1xuICAgICAgICAgICAgbW9tZW50TG9jYWxlRGF0YSA9IG1vbWVudC51cGRhdGVMb2NhbGUobG9jYWxlLCB7XG4gICAgICAgICAgICAgICAgbW9udGhzU2hvcnQ6IHtcbiAgICAgICAgICAgICAgICAgICAgZm9ybWF0OiB0aGlzLmNvbmZpZy5tb250aE5hbWVzLnNob3J0LmZvcm1hdHRlZCxcbiAgICAgICAgICAgICAgICAgICAgc3RhbmRhbG9uZTogdGhpcy5jb25maWcubW9udGhOYW1lcy5zaG9ydC5zdGFuZGFsb25lXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB3ZWVrZGF5czogdGhpcy5jb25maWcuZGF5T2ZXZWVrTmFtZXMubG9uZyxcbiAgICAgICAgICAgICAgICB3ZWVrZGF5c1Nob3J0OiB0aGlzLmNvbmZpZy5kYXlPZldlZWtOYW1lcy5zaG9ydCxcbiAgICAgICAgICAgICAgICB3ZWVrZGF5c01pbjogdGhpcy5jb25maWcuZGF5T2ZXZWVrTmFtZXMubmFycm93XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMubG9jYWxlRGF0YSA9IHtcbiAgICAgICAgICAgIGZpcnN0RGF5T2ZXZWVrOiB0aGlzLmNvbmZpZy5maXJzdERheU9mV2VlayxcbiAgICAgICAgICAgIGxvbmdNb250aHM6IG1vbWVudExvY2FsZURhdGEubW9udGhzKCksXG4gICAgICAgICAgICBzaG9ydE1vbnRoczogbW9tZW50TG9jYWxlRGF0YS5tb250aHNTaG9ydCgpLFxuICAgICAgICAgICAgZGF0ZXM6IHJhbmdlKDMxLCAoaSkgPT4gdGhpcy5jcmVhdGVEYXRlKDIwMTcsIDAsIGkgKyAxKS5mb3JtYXQoJ0QnKSksXG4gICAgICAgICAgICBsb25nRGF5c09mV2VlazogbW9tZW50TG9jYWxlRGF0YS53ZWVrZGF5cygpLFxuICAgICAgICAgICAgc2hvcnREYXlzT2ZXZWVrOiBtb21lbnRMb2NhbGVEYXRhLndlZWtkYXlzU2hvcnQoKSxcbiAgICAgICAgICAgIG5hcnJvd0RheXNPZldlZWs6IG1vbWVudExvY2FsZURhdGEud2Vla2RheXNNaW4oKVxuICAgICAgICB9O1xuICAgIH1cblxuICAgIGdldExvY2FsZURhdGEoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmxvY2FsZURhdGE7XG4gICAgfVxuXG4gICAgc2V0TG9jYWxlRGF0YShsb2NhbGVEYXRhKTogdm9pZCB7XG4gICAgICAgIHRoaXMubG9jYWxlRGF0YSA9IGxvY2FsZURhdGE7XG4gICAgfVxuXG4gICAgdXBkYXRlTG9jYWxlRGF0YShsb2NhbGVEYXRhKTogdm9pZCB7XG4gICAgICAgIHRoaXMubG9jYWxlRGF0YSA9IHsgLi4udGhpcy5sb2NhbGVEYXRhLCAuLi5sb2NhbGVEYXRhIH07XG4gICAgfVxuXG4gICAgZ2V0WWVhcihkYXRlOiBNb21lbnQpOiBudW1iZXIgeyByZXR1cm4gdGhpcy5jbG9uZShkYXRlKS55ZWFyKCk7IH1cblxuICAgIGdldE1vbnRoKGRhdGU6IE1vbWVudCk6IG51bWJlciB7IHJldHVybiB0aGlzLmNsb25lKGRhdGUpLm1vbnRoKCk7IH1cblxuICAgIGdldERhdGUoZGF0ZTogTW9tZW50KTogbnVtYmVyIHsgcmV0dXJuIHRoaXMuY2xvbmUoZGF0ZSkuZGF0ZSgpOyB9XG5cbiAgICBnZXRIb3VycyhkYXRlOiBNb21lbnQpOiBudW1iZXIgeyByZXR1cm4gdGhpcy5jbG9uZShkYXRlKS5ob3VycygpOyB9XG5cbiAgICBnZXRNaW51dGVzKGRhdGU6IE1vbWVudCk6IG51bWJlciB7IHJldHVybiB0aGlzLmNsb25lKGRhdGUpLm1pbnV0ZXMoKTsgfVxuXG4gICAgZ2V0U2Vjb25kcyhkYXRlOiBNb21lbnQpOiBudW1iZXIgeyByZXR1cm4gdGhpcy5jbG9uZShkYXRlKS5zZWNvbmRzKCk7IH1cblxuICAgIGdldE1pbGxpc2Vjb25kcyhkYXRlOiBNb21lbnQpOiBudW1iZXIgeyByZXR1cm4gdGhpcy5jbG9uZShkYXRlKS5taWxsaXNlY29uZHMoKTsgfVxuXG4gICAgZ2V0VGltZShkYXRlOiBNb21lbnQpOiBudW1iZXIgeyByZXR1cm4gZGF0ZS52YWx1ZU9mKCk7IH1cblxuICAgIGdldERheU9mV2VlayhkYXRlOiBNb21lbnQpOiBudW1iZXIgeyByZXR1cm4gdGhpcy5jbG9uZShkYXRlKS5kYXkoKTsgfVxuXG4gICAgZ2V0TW9udGhOYW1lcyhzdHlsZTogJ2xvbmcnIHwgJ3Nob3J0JyB8ICduYXJyb3cnKTogc3RyaW5nW10ge1xuICAgICAgICAvLyBNb21lbnQuanMgZG9lc24ndCBzdXBwb3J0IG5hcnJvdyBtb250aCBuYW1lc1xuICAgICAgICByZXR1cm4gc3R5bGUgPT09ICdsb25nJyA/IHRoaXMubG9jYWxlRGF0YS5sb25nTW9udGhzIDogdGhpcy5sb2NhbGVEYXRhLnNob3J0TW9udGhzO1xuICAgIH1cblxuICAgIGdldERhdGVOYW1lcygpOiBzdHJpbmdbXSB7XG4gICAgICAgIHJldHVybiB0aGlzLmxvY2FsZURhdGEuZGF0ZXM7XG4gICAgfVxuXG4gICAgZ2V0RGF5T2ZXZWVrTmFtZXMoc3R5bGU6ICdsb25nJyB8ICdzaG9ydCcgfCAnbmFycm93Jyk6IHN0cmluZ1tdIHtcbiAgICAgICAgaWYgKHN0eWxlID09PSAnbG9uZycpIHsgcmV0dXJuIHRoaXMubG9jYWxlRGF0YS5sb25nRGF5c09mV2VlazsgfVxuXG4gICAgICAgIGlmIChzdHlsZSA9PT0gJ3Nob3J0JykgeyByZXR1cm4gdGhpcy5sb2NhbGVEYXRhLnNob3J0RGF5c09mV2VlazsgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLmxvY2FsZURhdGEubmFycm93RGF5c09mV2VlaztcbiAgICB9XG5cbiAgICBnZXRZZWFyTmFtZShkYXRlOiBNb21lbnQpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5jbG9uZShkYXRlKS5mb3JtYXQoJ1lZWVknKTtcbiAgICB9XG5cbiAgICBnZXRGaXJzdERheU9mV2VlaygpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5sb2NhbGVEYXRhLmZpcnN0RGF5T2ZXZWVrO1xuICAgIH1cblxuICAgIGdldE51bURheXNJbk1vbnRoKGRhdGU6IE1vbWVudCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLmNsb25lKGRhdGUpLmRheXNJbk1vbnRoKCk7XG4gICAgfVxuXG4gICAgY2xvbmUoZGF0ZTogTW9tZW50KTogTW9tZW50IHtcbiAgICAgICAgcmV0dXJuIGRhdGUuY2xvbmUoKS5sb2NhbGUodGhpcy5sb2NhbGUpO1xuICAgIH1cblxuICAgIGNyZWF0ZURhdGUoeWVhcjogbnVtYmVyLCBtb250aDogbnVtYmVyID0gMCwgZGF0ZTogbnVtYmVyID0gMSk6IE1vbWVudCB7XG4gICAgICAgIC8vIE1vbWVudC5qcyB3aWxsIGNyZWF0ZSBhbiBpbnZhbGlkIGRhdGUgaWYgYW55IG9mIHRoZSBjb21wb25lbnRzIGFyZSBvdXQgb2YgYm91bmRzLCBidXQgd2VcbiAgICAgICAgLy8gZXhwbGljaXRseSBjaGVjayBlYWNoIGNhc2Ugc28gd2UgY2FuIHRocm93IG1vcmUgZGVzY3JpcHRpdmUgZXJyb3JzLlxuICAgICAgICBpZiAobW9udGggPCAwIHx8IG1vbnRoID4gMTEpIHtcbiAgICAgICAgICAgIHRocm93IEVycm9yKGBJbnZhbGlkIG1vbnRoIGluZGV4IFwiJHttb250aH1cIi4gTW9udGggaW5kZXggaGFzIHRvIGJlIGJldHdlZW4gMCBhbmQgMTEuYCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZGF0ZSA8IDEpIHtcbiAgICAgICAgICAgIHRocm93IEVycm9yKGBJbnZhbGlkIGRhdGUgXCIke2RhdGV9XCIuIERhdGUgaGFzIHRvIGJlIGdyZWF0ZXIgdGhhbiAwLmApO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgcmVzdWx0ID0gdGhpcy5jcmVhdGVNb21lbnQoe3llYXIsIG1vbnRoLCBkYXRlfSkubG9jYWxlKHRoaXMubG9jYWxlKTtcblxuICAgICAgICAvLyBJZiB0aGUgcmVzdWx0IGlzbid0IHZhbGlkLCB0aGUgZGF0ZSBtdXN0IGhhdmUgYmVlbiBvdXQgb2YgYm91bmRzIGZvciB0aGlzIG1vbnRoLlxuICAgICAgICBpZiAoIXJlc3VsdC5pc1ZhbGlkKCkpIHtcbiAgICAgICAgICAgIHRocm93IEVycm9yKGBJbnZhbGlkIGRhdGUgXCIke2RhdGV9XCIgZm9yIG1vbnRoIHdpdGggaW5kZXggXCIke21vbnRofVwiLmApO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbiAgICBjcmVhdGVEYXRlVGltZShcbiAgICAgICAgeWVhcjogbnVtYmVyLFxuICAgICAgICBtb250aDogbnVtYmVyLFxuICAgICAgICBkYXRlOiBudW1iZXIsXG4gICAgICAgIGhvdXJzOiBudW1iZXIsXG4gICAgICAgIG1pbnV0ZXM6IG51bWJlcixcbiAgICAgICAgc2Vjb25kczogbnVtYmVyLFxuICAgICAgICBtaWxsaXNlY29uZHM6IG51bWJlclxuICAgICk6IE1vbWVudCB7XG4gICAgICAgIGNvbnN0IG5ld0RhdGUgPSB0aGlzLmNyZWF0ZURhdGUoeWVhciwgbW9udGgsIGRhdGUpO1xuXG4gICAgICAgIG5ld0RhdGUuaG91cnMoaG91cnMpO1xuICAgICAgICBuZXdEYXRlLm1pbnV0ZXMobWludXRlcyk7XG4gICAgICAgIG5ld0RhdGUuc2Vjb25kcyhzZWNvbmRzKTtcbiAgICAgICAgbmV3RGF0ZS5taWxsaXNlY29uZHMobWlsbGlzZWNvbmRzKTtcblxuICAgICAgICByZXR1cm4gbmV3RGF0ZTtcbiAgICB9XG5cbiAgICB0b2RheSgpOiBNb21lbnQge1xuICAgICAgICByZXR1cm4gdGhpcy5jcmVhdGVNb21lbnQoKS5sb2NhbGUodGhpcy5sb2NhbGUpO1xuICAgIH1cblxuICAgIHBhcnNlKHZhbHVlOiBhbnksIHBhcnNlRm9ybWF0OiBzdHJpbmcgfCBzdHJpbmdbXSk6IE1vbWVudCB8IG51bGwge1xuICAgICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMub3B0aW9ucyAmJiB0aGlzLm9wdGlvbnMuZmluZERhdGVGb3JtYXQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZmluZEZvcm1hdCh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHBhcnNlRm9ybWF0XG4gICAgICAgICAgICAgICAgICAgID8gdGhpcy5jcmVhdGVNb21lbnQodmFsdWUsIHBhcnNlRm9ybWF0LCB0aGlzLmxvY2FsZSlcbiAgICAgICAgICAgICAgICAgICAgOiB0aGlzLmNyZWF0ZU1vbWVudCh2YWx1ZSkubG9jYWxlKHRoaXMubG9jYWxlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY3JlYXRlTW9tZW50KHZhbHVlKS5sb2NhbGUodGhpcy5sb2NhbGUpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgZm9ybWF0KGRhdGU6IE1vbWVudCwgZGlzcGxheUZvcm1hdDogc3RyaW5nKTogc3RyaW5nIHtcbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGU6bm8tcGFyYW1ldGVyLXJlYXNzaWdubWVudFxuICAgICAgICBkYXRlID0gdGhpcy5jbG9uZShkYXRlKTtcbiAgICAgICAgaWYgKCF0aGlzLmlzVmFsaWQoZGF0ZSkpIHtcbiAgICAgICAgICAgIHRocm93IEVycm9yKCdNb21lbnREYXRlQWRhcHRlcjogQ2Fubm90IGZvcm1hdCBpbnZhbGlkIGRhdGUuJyk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZGF0ZS5mb3JtYXQoZGlzcGxheUZvcm1hdCk7XG4gICAgfVxuXG4gICAgYWRkQ2FsZW5kYXJZZWFycyhkYXRlOiBNb21lbnQsIHllYXJzOiBudW1iZXIpOiBNb21lbnQge1xuICAgICAgICByZXR1cm4gdGhpcy5jbG9uZShkYXRlKS5hZGQoeyB5ZWFycyB9KTtcbiAgICB9XG5cbiAgICBhZGRDYWxlbmRhck1vbnRocyhkYXRlOiBNb21lbnQsIG1vbnRoczogbnVtYmVyKTogTW9tZW50IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2xvbmUoZGF0ZSkuYWRkKHsgbW9udGhzIH0pO1xuICAgIH1cblxuICAgIGFkZENhbGVuZGFyRGF5cyhkYXRlOiBNb21lbnQsIGRheXM6IG51bWJlcik6IE1vbWVudCB7XG4gICAgICAgIHJldHVybiB0aGlzLmNsb25lKGRhdGUpLmFkZCh7IGRheXMgfSk7XG4gICAgfVxuXG4gICAgdG9Jc284NjAxKGRhdGU6IE1vbWVudCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmNsb25lKGRhdGUpLmZvcm1hdCgpO1xuICAgIH1cblxuICAgIC8qKiBodHRwczovL3d3dy5pZXRmLm9yZy9yZmMvcmZjMzMzOS50eHQgKi9cbiAgICBkZXNlcmlhbGl6ZSh2YWx1ZTogYW55KTogTW9tZW50IHwgbnVsbCB7XG4gICAgICAgIGxldCBkYXRlO1xuICAgICAgICBpZiAodmFsdWUgaW5zdGFuY2VvZiBEYXRlKSB7XG4gICAgICAgICAgICBkYXRlID0gdGhpcy5jcmVhdGVNb21lbnQodmFsdWUpLmxvY2FsZSh0aGlzLmxvY2FsZSk7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5pc0RhdGVJbnN0YW5jZSh2YWx1ZSkpIHtcbiAgICAgICAgICAgIC8vIE5vdGU6IGFzc3VtZXMgdGhhdCBjbG9uaW5nIGFsc28gc2V0cyB0aGUgY29ycmVjdCBsb2NhbGUuXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jbG9uZSh2YWx1ZSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgaWYgKCF2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZGF0ZSA9IHRoaXMuY3JlYXRlTW9tZW50KHZhbHVlLCBtb21lbnQuSVNPXzg2MDEpLmxvY2FsZSh0aGlzLmxvY2FsZSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZGF0ZSAmJiB0aGlzLmlzVmFsaWQoZGF0ZSkpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNyZWF0ZU1vbWVudChkYXRlKS5sb2NhbGUodGhpcy5sb2NhbGUpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHN1cGVyLmRlc2VyaWFsaXplKHZhbHVlKTtcbiAgICB9XG5cbiAgICBpc0RhdGVJbnN0YW5jZShvYmo6IGFueSk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gbW9tZW50LmlzTW9tZW50KG9iaik7XG4gICAgfVxuXG4gICAgaXNWYWxpZChkYXRlOiBNb21lbnQpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2xvbmUoZGF0ZSkuaXNWYWxpZCgpO1xuICAgIH1cblxuICAgIGludmFsaWQoKTogTW9tZW50IHtcbiAgICAgICAgcmV0dXJuIG1vbWVudC5pbnZhbGlkKCk7XG4gICAgfVxuXG4gICAgaGFzU2FtZShzdGFydERhdGU6IE1vbWVudCwgZW5kRGF0ZTogTW9tZW50LCB1bml0OiB1bml0T2ZUaW1lLkRpZmYpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHN0YXJ0RGF0ZS5pc1NhbWUoZW5kRGF0ZSwgdW5pdCk7XG4gICAgfVxuXG4gICAgZGlmZk5vdyhkYXRlOiBNb21lbnQsIHVuaXQ6IHVuaXRPZlRpbWUuRGlmZik6IG51bWJlciB7XG4gICAgICAgIHJldHVybiBkYXRlLmRpZmYodGhpcy50b2RheSgpLCB1bml0KTtcbiAgICB9XG5cbiAgICBARGVwcmVjYXRlZE1ldGhvZFxuICAgIGFic29sdXRlRGF0ZShkYXRlOiBNb21lbnQsIHBhcmFtcywgZGF0ZXRpbWU6IGJvb2xlYW4sIG1pbGxpc2Vjb25kczogYm9vbGVhbik6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmRhdGVGb3JtYXR0ZXIuYWJzb2x1dGVEYXRlKGRhdGUsIHBhcmFtcywgZGF0ZXRpbWUsIG1pbGxpc2Vjb25kcyk7XG4gICAgfVxuXG4gICAgQERlcHJlY2F0ZWRNZXRob2RcbiAgICBhYnNvbHV0ZUxvbmdEYXRlKGRhdGU6IE1vbWVudCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmRhdGVGb3JtYXR0ZXIuYWJzb2x1dGVMb25nRGF0ZShkYXRlKTtcbiAgICB9XG5cbiAgICBARGVwcmVjYXRlZE1ldGhvZFxuICAgIGFic29sdXRlTG9uZ0RhdGVUaW1lKGRhdGU6IE1vbWVudCwgb3B0aW9ucz8pOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5kYXRlRm9ybWF0dGVyLmFic29sdXRlTG9uZ0RhdGVUaW1lKGRhdGUsIG9wdGlvbnMpO1xuICAgIH1cblxuICAgIEBEZXByZWNhdGVkTWV0aG9kXG4gICAgYWJzb2x1dGVTaG9ydERhdGUoZGF0ZTogTW9tZW50KTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0ZUZvcm1hdHRlci5hYnNvbHV0ZVNob3J0RGF0ZShkYXRlKTtcbiAgICB9XG5cbiAgICBARGVwcmVjYXRlZE1ldGhvZFxuICAgIGFic29sdXRlU2hvcnREYXRlVGltZShkYXRlOiBNb21lbnQsIG9wdGlvbnM/KTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0ZUZvcm1hdHRlci5hYnNvbHV0ZVNob3J0RGF0ZVRpbWUoZGF0ZSwgb3B0aW9ucyk7XG4gICAgfVxuXG4gICAgQERlcHJlY2F0ZWRNZXRob2RcbiAgICBvcGVuZWRSYW5nZURhdGUoc3RhcnREYXRlOiBNb21lbnQsIGVuZERhdGU6IE1vbWVudCwgdGVtcGxhdGUpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5kYXRlRm9ybWF0dGVyLm9wZW5lZFJhbmdlRGF0ZShzdGFydERhdGUsIGVuZERhdGUsIHRlbXBsYXRlKTtcbiAgICB9XG5cbiAgICBARGVwcmVjYXRlZE1ldGhvZFxuICAgIG9wZW5lZFJhbmdlRGF0ZVRpbWUoc3RhcnREYXRlOiBNb21lbnQsIGVuZERhdGU6IE1vbWVudCwgdGVtcGxhdGUpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5kYXRlRm9ybWF0dGVyLm9wZW5lZFJhbmdlRGF0ZVRpbWUoc3RhcnREYXRlLCBlbmREYXRlLCB0ZW1wbGF0ZSk7XG4gICAgfVxuXG4gICAgQERlcHJlY2F0ZWRNZXRob2RcbiAgICByYW5nZURhdGUoc3RhcnREYXRlOiBNb21lbnQsIGVuZERhdGU6IE1vbWVudCwgdGVtcGxhdGUpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5kYXRlRm9ybWF0dGVyLnJhbmdlRGF0ZShzdGFydERhdGUsIGVuZERhdGUsIHRlbXBsYXRlKTtcbiAgICB9XG5cbiAgICBARGVwcmVjYXRlZE1ldGhvZFxuICAgIHJhbmdlRGF0ZVRpbWUoc3RhcnREYXRlOiBNb21lbnQsIGVuZERhdGU6IE1vbWVudCwgdGVtcGxhdGUpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5kYXRlRm9ybWF0dGVyLnJhbmdlRGF0ZVRpbWUoc3RhcnREYXRlLCBlbmREYXRlLCB0ZW1wbGF0ZSk7XG4gICAgfVxuXG4gICAgQERlcHJlY2F0ZWRNZXRob2RcbiAgICByYW5nZUxvbmdEYXRlKHN0YXJ0RGF0ZTogTW9tZW50IHwgbnVsbCwgZW5kRGF0ZT86IE1vbWVudCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmRhdGVGb3JtYXR0ZXIucmFuZ2VMb25nRGF0ZShzdGFydERhdGUsIGVuZERhdGUpO1xuICAgIH1cblxuICAgIEBEZXByZWNhdGVkTWV0aG9kXG4gICAgcmFuZ2VMb25nRGF0ZVRpbWUoc3RhcnREYXRlOiBNb21lbnQgfCBudWxsLCBlbmREYXRlPzogTW9tZW50KTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0ZUZvcm1hdHRlci5yYW5nZUxvbmdEYXRlVGltZShzdGFydERhdGUsIGVuZERhdGUpO1xuICAgIH1cblxuICAgIEBEZXByZWNhdGVkTWV0aG9kXG4gICAgcmFuZ2VNaWRkbGVEYXRlVGltZShzdGFydERhdGU6IE1vbWVudCwgZW5kRGF0ZTogTW9tZW50KTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0ZUZvcm1hdHRlci5yYW5nZU1pZGRsZURhdGVUaW1lKHN0YXJ0RGF0ZSwgZW5kRGF0ZSk7XG4gICAgfVxuXG4gICAgQERlcHJlY2F0ZWRNZXRob2RcbiAgICByYW5nZVNob3J0RGF0ZShzdGFydERhdGU6IE1vbWVudCB8IG51bGwsIGVuZERhdGU/OiBNb21lbnQpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5kYXRlRm9ybWF0dGVyLnJhbmdlU2hvcnREYXRlKHN0YXJ0RGF0ZSwgZW5kRGF0ZSk7XG4gICAgfVxuXG4gICAgQERlcHJlY2F0ZWRNZXRob2RcbiAgICByYW5nZVNob3J0RGF0ZVRpbWUoc3RhcnREYXRlOiBNb21lbnQgfCBudWxsLCBlbmREYXRlPzogTW9tZW50KTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0ZUZvcm1hdHRlci5yYW5nZVNob3J0RGF0ZVRpbWUoc3RhcnREYXRlLCBlbmREYXRlKTtcbiAgICB9XG5cbiAgICBARGVwcmVjYXRlZE1ldGhvZFxuICAgIHJlbGF0aXZlRGF0ZShkYXRlOiBNb21lbnQsIHRlbXBsYXRlKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0ZUZvcm1hdHRlci5yZWxhdGl2ZURhdGUoZGF0ZSwgdGVtcGxhdGUpO1xuICAgIH1cblxuICAgIEBEZXByZWNhdGVkTWV0aG9kXG4gICAgcmVsYXRpdmVMb25nRGF0ZShkYXRlOiBNb21lbnQpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5kYXRlRm9ybWF0dGVyLnJlbGF0aXZlTG9uZ0RhdGUoZGF0ZSk7XG4gICAgfVxuXG4gICAgQERlcHJlY2F0ZWRNZXRob2RcbiAgICByZWxhdGl2ZVNob3J0RGF0ZShkYXRlOiBNb21lbnQpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5kYXRlRm9ybWF0dGVyLnJlbGF0aXZlU2hvcnREYXRlKGRhdGUpO1xuICAgIH1cblxuICAgIC8qKiBDcmVhdGVzIGEgTW9tZW50IGluc3RhbmNlIHdoaWxlIHJlc3BlY3RpbmcgdGhlIGN1cnJlbnQgVVRDIHNldHRpbmdzLiAqL1xuICAgIHByaXZhdGUgY3JlYXRlTW9tZW50KC4uLmFyZ3M6IGFueVtdKTogTW9tZW50IHtcbiAgICAgICAgcmV0dXJuIHRoaXMub3B0aW9ucz8udXNlVXRjID8gbW9tZW50LnV0YyguLi5hcmdzKSA6IG1vbWVudCguLi5hcmdzKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGlzTnVtZXJpYyh2YWx1ZTogYW55KTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiAhaXNOYU4ocGFyc2VGbG9hdCh2YWx1ZSkpICYmIGlzRmluaXRlKHZhbHVlKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGZpbmRGb3JtYXQodmFsdWU6IHN0cmluZyk6IE1vbWVudCB8IG51bGwge1xuICAgICAgICBpZiAoIXZhbHVlKSB7IHJldHVybiBudWxsOyB9XG5cbiAgICAgICAgLy8gZGVmYXVsdCB0ZXN0IC0gaXNvXG4gICAgICAgIGNvbnN0IGlzb0RhdGUgPSAgdGhpcy5jcmVhdGVNb21lbnQodmFsdWUsIG1vbWVudC5JU09fODYwMSwgdGhpcy5sb2NhbGUpO1xuXG4gICAgICAgIGlmIChpc29EYXRlLmlzVmFsaWQoKSkgeyByZXR1cm4gaXNvRGF0ZTsgfVxuXG4gICAgICAgIGlmICh0aGlzLmlzTnVtZXJpYyh2YWx1ZSkpIHtcbiAgICAgICAgICAgIC8vIHVuaXggdGltZSBzZWNcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNyZWF0ZU1vbWVudCh2YWx1ZSwgJ1gnLCB0aGlzLmxvY2FsZSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBsb25nIG1vbnRocyBuYW1pbmc6IEQgTU1NIFlZWVksIE1NTSBEbyBZWVlZIHdpdGggc2hvcnQgY2FzZSBzdXBwb3J0XG4gICAgICAgIGlmIChcbiAgICAgICAgICAgIC9eXFxkezEsMn1cXHNcXFMrXFxzKFxcZHsyfXxcXGR7NH0pJC8udGVzdCh2YWx1ZS50cmltKCkpIHx8XG4gICAgICAgICAgICAvXlxcUytcXHNcXGR7MSwyfVthLXpdezJ9XFxzKFxcZHsyfXxcXGR7NH0pJC8udGVzdCh2YWx1ZS50cmltKCkpXG4gICAgICAgICkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucGFyc2VXaXRoU3BhY2UodmFsdWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gc2xhc2ggbm90YXRpb246IEREL01NL1lZWVksIE1NL0REL1lZWVkgd2l0aCBzaG9ydCBjYXNlIHN1cHBvcnRcbiAgICAgICAgaWYgKC9eXFxkezEsMn1cXC9cXGR7MSwyfVxcLyhcXGR7Mn18XFxkezR9KSQvLnRlc3QodmFsdWUpKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wYXJzZVdpdGhTbGFzaCh2YWx1ZSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBkYXNoIG5vdGF0aW9uOiBERC1NTS1ZWVlZLCBZWVlZLURELU1NIHdpdGggc2hvcnQgY2FzZSBzdXBwb3J0XG4gICAgICAgIGlmICgvKF4oXFxkezEsMn18XFxkezR9KS1cXGR7MSwyfS1cXGR7MSwyfSQpfCheXFxkezEsMn0tXFxkezEsMn0tKFxcZHsyfXxcXGR7NH0pJCkvLnRlc3QodmFsdWUpKSB7XG4gICAgICAgICAgIHJldHVybiB0aGlzLnBhcnNlV2l0aERhc2godmFsdWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gZG90IG5vdGF0aW9uOiBERC5NTS5ZWVlZIHdpdGggc2hvcnQgY2FzZSBzdXBwb3J0XG4gICAgICAgIGlmICgvXlxcZHsxLDJ9XFwuXFxkezEsMn1cXC4oXFxkezJ9fFxcZHs0fSkkLy50ZXN0KHZhbHVlKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucGFyc2VXaXRoRG90KHZhbHVlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIHByaXZhdGUgcGFyc2VXaXRoU3BhY2UodmFsdWU6IHN0cmluZyk6IE1vbWVudCB8IG51bGwge1xuICAgICAgICBzd2l0Y2ggKHRoaXMubG9jYWxlKSB7XG4gICAgICAgICAgICBjYXNlICdydSc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuY3JlYXRlTW9tZW50KHZhbHVlLCAnREQgTU1NTSBZWVlZJywgdGhpcy5sb2NhbGUpO1xuICAgICAgICAgICAgY2FzZSAnZW4nOlxuICAgICAgICAgICAgICAgIC8vIDE2IEZlYiAyMDE5IHZzIEZlYiAxNnRoIDIwMTksIGNvdmVycyBGZWIgYW5kIEZlYnJ1YXJ5IGNhc2VzXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNOdW1lcmljKHZhbHVlWzBdKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5jcmVhdGVNb21lbnQodmFsdWUsICdEIE1NTU0gWVlZWScsIHRoaXMubG9jYWxlKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5jcmVhdGVNb21lbnQodmFsdWUsICdNTU1NIERvIFlZWVknLCB0aGlzLmxvY2FsZSk7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgTG9jYWxlICR7dGhpcy5sb2NhbGV9IGlzIG5vdCBzdXBwb3J0ZWRgKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgcGFyc2VXaXRoU2xhc2godmFsdWU6IHN0cmluZyk6IE1vbWVudCB8IG51bGwge1xuICAgICAgICBzd2l0Y2ggKHRoaXMubG9jYWxlKSB7XG4gICAgICAgICAgICBjYXNlICdydSc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuY3JlYXRlTW9tZW50KHZhbHVlLCAnREQvTU0vWVlZWScsIHRoaXMubG9jYWxlKTtcbiAgICAgICAgICAgIC8vIHRvZG8gZG8gd2UgdXNlIGdlbmVyYWxpemVkIGxvY2FsZXM/IGVuIHZzIGVuLVVTOyB1bnRpbCBub3Qgd2UgdHJ5IHRvIGd1ZXNzXG4gICAgICAgICAgICBjYXNlICdlbic6XG4gICAgICAgICAgICAgICAgLy8gVVMgdnMgVUtcbiAgICAgICAgICAgICAgICBjb25zdCBwYXJ0cyA9IHZhbHVlLnNwbGl0KCcvJyk7XG4gICAgICAgICAgICAgICAgY29uc3QgZGF0ZVBhcnRzQ291bnQgPSAzO1xuICAgICAgICAgICAgICAgIGlmIChwYXJ0cy5sZW5ndGggIT09IGRhdGVQYXJ0c0NvdW50KSB7IHJldHVybiBudWxsOyB9XG5cbiAgICAgICAgICAgICAgICBjb25zdCBmaXJzdFBhcnQgPSBwYXJ0c1swXS50cmltKCk7XG4gICAgICAgICAgICAgICAgY29uc3Qgc2Vjb25kUGFydCA9IHBhcnRzWzFdLnRyaW0oKTtcblxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5pc051bWVyaWMoZmlyc3RQYXJ0KSB8fCAhdGhpcy5pc051bWVyaWMoc2Vjb25kUGFydCkpIHsgcmV0dXJuIG51bGw7IH1cblxuICAgICAgICAgICAgICAgIGNvbnN0IG1vbnRoc0luWWVhcnMgPSAxMjtcblxuICAgICAgICAgICAgICAgIGNvbnN0IGNhbkZpcnN0QmVNb250aCA9ICtmaXJzdFBhcnQgPD0gbW9udGhzSW5ZZWFycztcbiAgICAgICAgICAgICAgICBjb25zdCBjYW5TZWNvbmRCeU1vbnRoID0gK3NlY29uZFBhcnQgPD0gbW9udGhzSW5ZZWFycztcblxuICAgICAgICAgICAgICAgIC8vIGZpcnN0IHR3byBwYXJ0cyBjYW5ub3QgYmUgbW9udGhcbiAgICAgICAgICAgICAgICBpZiAoIWNhbkZpcnN0QmVNb250aCAmJiAhY2FuU2Vjb25kQnlNb250aCkgeyByZXR1cm4gbnVsbDsgfVxuXG4gICAgICAgICAgICAgICAgY29uc3QgY2FuRGV0ZXJtaW5lV2hlcmVNb250aCA9IGNhbkZpcnN0QmVNb250aCAmJiBjYW5TZWNvbmRCeU1vbnRoO1xuXG4gICAgICAgICAgICAgICAgLy8gdXNlIFVTIGZvcm1hdCBieSBkZWZhdWx0XG4gICAgICAgICAgICAgICAgaWYgKGNhbkRldGVybWluZVdoZXJlTW9udGgpIHsgcmV0dXJuIHRoaXMuY3JlYXRlTW9tZW50KHZhbHVlLCAnTU0vREQvWVlZWScsIHRoaXMubG9jYWxlKTsgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIGNhbkZpcnN0QmVNb250aCAmJiAhY2FuU2Vjb25kQnlNb250aFxuICAgICAgICAgICAgICAgICAgICA/IHRoaXMuY3JlYXRlTW9tZW50KHZhbHVlLCAnTU0vREQvWVlZWScsIHRoaXMubG9jYWxlKVxuICAgICAgICAgICAgICAgICAgICA6IHRoaXMuY3JlYXRlTW9tZW50KHZhbHVlLCAnREQvTU0vWVlZWScsIHRoaXMubG9jYWxlKTtcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBMb2NhbGUgJHt0aGlzLmxvY2FsZX0gaXMgbm90IHN1cHBvcnRlZGApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBwYXJzZVdpdGhEYXNoKHZhbHVlOiBzdHJpbmcpOiBNb21lbnQgfCBudWxsIHtcbiAgICAgICAgLy8gbGVhZGluZyB5ZWFyIHZzIGZpbmlzaGluZyB5ZWFyXG4gICAgICAgIGNvbnN0IHBhcnRzID0gdmFsdWUuc3BsaXQoJy0nKTtcbiAgICAgICAgaWYgKHBhcnRzWzBdLmxlbmd0aCA9PT0gMCkgeyByZXR1cm4gbnVsbDsgfVxuXG4gICAgICAgIGNvbnN0IG1heERheU9yTW9udGhDaGFyc0NvdW50ID0gMjtcblxuICAgICAgICByZXR1cm4gcGFydHNbMF0ubGVuZ3RoIDw9IG1heERheU9yTW9udGhDaGFyc0NvdW50XG4gICAgICAgICAgICA/IHRoaXMuY3JlYXRlTW9tZW50KHZhbHVlLCAnREQtTU0tWVlZWScsIHRoaXMubG9jYWxlKVxuICAgICAgICAgICAgOiB0aGlzLmNyZWF0ZU1vbWVudCh2YWx1ZSwgJ1lZWVktTU0tREQnLCB0aGlzLmxvY2FsZSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBwYXJzZVdpdGhEb3QodmFsdWU6IHN0cmluZyk6IE1vbWVudCB8IG51bGwge1xuICAgICAgICAvLyBjb3ZlcnMgdHdvIGNhc2VzIFlZWVkgYW5kIFlZIChmb3IgY3VycmVudCB5ZWFyKVxuICAgICAgICByZXR1cm4gdGhpcy5jcmVhdGVNb21lbnQodmFsdWUsICdERC5NTS5ZWVlZJywgdGhpcy5sb2NhbGUpO1xuICAgIH1cbn1cbiJdfQ==