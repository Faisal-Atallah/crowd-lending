import { BehaviorSubject, Observable, Observer, Subject } from 'rxjs';

/**
 * Complete a Subject
 */
export function unsubscribe<T = any>(subscription: Subject<T | any>) {
    subscription.next(null);
    subscription.complete();
}



export function handleImageUpload(fileList: FileList): Observable<any> | unknown {

    let _file: BehaviorSubject<any | null> = new BehaviorSubject(null);


    // Return if canceled
    if (!fileList.length) {
        return;
    }

    const allowedTypes = ['image/jpeg', 'image/png'];
    const file = fileList[0];

    // Return if the file is not allowed
    if (!allowedTypes.includes(file.type)) {
        return;
    }
    _file.next(file);

    return _file.asObservable();
}

/**
 * Split Base 64 
 */
export function splitBase64(base64Url: string | any): string {
    return base64Url.split("base64,")[1];
}

/**
 * Split String
 * @param {string}str 
 * @returns {string}
 */
export function splitString(str: string): string {
    return str.split('/')[1];
}

/**
 * Encode file to base 64 text format
 */
export function readFile(file: any): Observable<string> {
    return new Observable((observer: Observer<string>) => {
        const reader = new FileReader();
        reader.addEventListener('abort', (error) => observer.error(error));
        reader.addEventListener('error', (error) => observer.error(error));
        reader.addEventListener('loadend', () => {
            observer.next(splitBase64(reader.result) as any);
            observer.complete();
        });
        reader.readAsDataURL(file);
    });
}

/**
 * Track By
 * @param {number}index 
 * @param {any}item 
 * @returns {any}
 */
export function trackBy(index: number, item: any): any {
    return item.id || index;
}
