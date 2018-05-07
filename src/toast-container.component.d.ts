import { AnimationEvent } from '@angular/animations';
import { ChangeDetectorRef, NgZone, OnDestroy } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { Toast } from './toast';
import { ToastOptions } from './toast-options';
export declare class ToastContainer implements OnDestroy {
    private sanitizer;
    private cdr;
    private _zone;
    position: string;
    messageClass: string;
    titleClass: string;
    positionClass: string;
    maxShown: number;
    newestOnTop: boolean;
    animate: string;
    toasts: Toast[];
    private _fresh;
    private onToastClicked;
    private _onEnter;
    private _onExit;
    constructor(sanitizer: DomSanitizer, cdr: ChangeDetectorRef, _zone: NgZone, options: ToastOptions);
    onEnter(): Observable<void>;
    onExit(): Observable<void>;
    addToast(toast: Toast): void;
    removeToast(toast: Toast): void;
    removeAllToasts(): void;
    clicked(toast: Toast): void;
    anyToast(): boolean;
    findToast(toastId: number): Toast | void;
    onAnimationEnd(event: AnimationEvent): void;
    private _ngExit();
    ngOnDestroy(): void;
}
