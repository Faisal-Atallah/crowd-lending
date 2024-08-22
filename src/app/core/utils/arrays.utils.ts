import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';


/**
 * Array To Object
 * @param array 
 */
// export function arrayToObject = (array) =>
//     array.reduce((obj, item) => {
//         obj = item
//         return obj
//     }, {});


/**
* reomveItem 
* @param {number}index 
* @param {any}items 
*/
export function removeItemFromArray(index: number, items: any): any {
    return items.splice(index, 1);
}


/**
* Add Item To Array
* @param items 
* @param fieldName 
* @param field 
*/
export function addItemToArray(items: any, fieldName: any, field: any): any {
    return items[fieldName].push(field);
}

/**
* Push Item To Array
* @param {any}array 
* @param {any}item 
*/
export function pushItemToArray(array: any, item: any): any {
    return array.push(item);
}


/**
* 
* Insert Item Into Array At Specific Index
* @param {any}array 
* @param {number}index 
* @param {any}item 
*/
export function insertItemIntoArrayAtSpecificIndex(array: any, index: number, item: any): any {
    return array.splice(index, 0, item);
}

/**
 * Clone Object
 * @param object 
 */
export function cloneObject(object: {}): any {
    const clonedObject = JSON.parse(JSON.stringify(object));
    return clonedObject;
}

/**
 * Remove Field Item
 * @param {any}items 
 * @param fieldName 
 * @param {number}index 
 */
export function removeFieldItem(items: any, fieldName: any, index: number): any {
    return items[fieldName].splice(index, 1);
}

/**
 * Filter Array By Number
 * 
 * @param data 
 * @param number 
 * @returns {any}
 */
export function filterArrayByNumber(data: any, number: number, filterItem: any): any {

    return data.filter(function (item: any) {
        return item[filterItem] === number;
    });
}

/**
 * Filter Array By Property
 * @param {any}array 
 * @param {string}filterText 
 * @param {any}filterItem 
 */
export function filterArrayByProperty(array: any, filterText: string, filterItem: any): any {
    return array.filter(function (item: any) {
        return item[filterItem] === filterText;
    });
}

/**
 * Get Last Item In Array
 * @param array 
 */
export function getLastItemInArray(array: []) {
    return array[array.length - 1];
}

/**
* Filter array by string
*
* @param mainArr
* @param searchText
* @returns {any}
*/
export function filterArrayByString(mainArr: [], searchText: string): any {
    if (searchText === '') {
        return mainArr;
    }

    searchText = searchText.toLowerCase();

    return mainArr.filter(itemObj => {
        return this.searchInObj(itemObj, searchText);
    });
}

/**
     * Search in string
     *
     * @param value
     * @param searchText
     * @returns {any}
     */
export function searchInString(value: any, searchText: string): any {
    return value.toLowerCase().includes(searchText);
}

/**
* Search in array
*
* @param arr
* @param searchText
* @returns {boolean}
*/
export function searchInArray(arr: [], searchText: string): boolean | any {
    for (const value of arr) {
        if (typeof value === 'string') {
            if (this.searchInString(value, searchText)) {
                return true;
            }
        }

        if (typeof value === 'object') {
            if (this.searchInObj(value, searchText)) {
                return true;
            }
        }
    }
}



/**
* Get All List Connections
* @param {any}list 
* @param {number}index 
*/
export function getAllListConnections(list: any, index: number): any {
    var connections = []
    for (var i = 0; i < list.length; i++) {
        if (i != index) {
            connections.push("list-" + i);
        }
    }
    return connections;
}

/**
* Drop
* @param {any}list 
* @param {CdkDragDrop<string[]>}event 
*/
export function drop(list: any, event: CdkDragDrop<string[]>) {
    var previousIndex = parseInt(event.previousContainer.id.replace("list-", ""));
    var currentIndex = parseInt(event.container.id.replace("list-", ""));
    if (!Number.isNaN(previousIndex) && !Number.isNaN(currentIndex) && previousIndex != undefined && currentIndex != undefined && previousIndex != currentIndex) {

        moveItemInArray(list, previousIndex, currentIndex);
    }
}


/**
 * 
 * @param item 
 * @param array 
 */
export function checkIfItemInArray(item: any, array: any[]) {
    return array.includes(item);
}

/**
 * 
 * @param {any[]}data 
 */
export function flatArray(data: any[]) {
    return data.reduce((a, b) => a.concat(b), []);
}

/**
* Search in object
*
* @param itemObj
* @param searchText
* @returns {boolean}
*/
export function searchInObj(itemObj: any, searchText: string): boolean | any {
    for (const prop in itemObj) {
        if (!itemObj.hasOwnProperty(prop)) {
            continue;
        }

        const value = itemObj[prop];

        if (typeof value === 'string') {
            if (this.searchInString(value, searchText)) {
                return true;
            }
        }

        else if (Array.isArray(value)) {
            if (this.searchInArray(value, searchText)) {
                return true;
            }
        }

        if (typeof value === 'object') {
            if (this.searchInObj(value, searchText)) {
                return true;
            }
        }
    }
}


export function toBytesArray(str: string): any {
    const encoder = new TextEncoder();
    return encoder.encode(str);
}