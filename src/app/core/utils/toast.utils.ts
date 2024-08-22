import { MessageService } from "primeng/api";

/**
  * Show Success Toast
  * @param {string}details 
  */
export function showSuccessToast(details: string, summary: string, messageService: MessageService): void {
    messageService.add({
        severity: 'success',
        summary: summary,
        detail: details,
        life: 5000
    });
}


/**
 * Show Error Toast
 * @param {any}error 
 * @param {string}summary 
 */
export function showErrorToast(error: any, summary: string, messageService: MessageService): void {
    messageService.add({
        severity: 'error',
        summary: summary,
        detail: error,
        life: 7000
    });
}