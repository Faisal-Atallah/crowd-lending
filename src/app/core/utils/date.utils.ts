
/**
* Date To Time Stamp
* @param date
* @returns {string} 
*/
export function dateToTimeStamp(date: Date): number {
    return (new Date(date)).getTime();
}


/**
* Timestamp To Date
* @param timestamp
* @returns {string} 
*/
export function timestampToDate(timestamp: any): string {
    return new Date(timestamp).toLocaleDateString("en-GB");
}