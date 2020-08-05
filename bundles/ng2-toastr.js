System.registerDynamic("ng2-toastr/src/toast", [], true, function ($__require, exports, module) {
    "use strict";

    var global = this || self,
        GLOBAL = global;
    Object.defineProperty(exports, "__esModule", { value: true });
    var Toast = /** @class */function () {
        function Toast(type, message, title, data) {
            this.type = type;
            this.message = message;
            this.title = title;
            this.data = data;
            this.config = {
                dismiss: 'auto',
                enableHTML: false,
                titleClass: '',
                messageClass: '',
                toastLife: 3000,
                showCloseButton: false
            };
        }
        return Toast;
    }();
    exports.Toast = Toast;

});
System.registerDynamic("ng2-toastr/src/toast-container.component", ["@angular/animations", "@angular/core", "@angular/platform-browser", "rxjs", "rxjs/operators", "./toast-options"], true, function ($__require, exports, module) {
    "use strict";

    var global = this || self,
        GLOBAL = global;
    var __decorate = exports && exports.__decorate || function (decorators, target, key, desc) {
        var c = arguments.length,
            r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
            d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = exports && exports.__metadata || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    var animations_1 = $__require("@angular/animations");
    var core_1 = $__require("@angular/core");
    var platform_browser_1 = $__require("@angular/platform-browser");
    var rxjs_1 = $__require("rxjs");
    var operators_1 = $__require("rxjs/operators");
    var toast_options_1 = $__require("./toast-options");
    var ToastContainer = /** @class */function () {
        function ToastContainer(sanitizer, cdr, _zone, options) {
            this.sanitizer = sanitizer;
            this.cdr = cdr;
            this._zone = _zone;
            this.position = 'fixed';
            this.toasts = [];
            this._fresh = true;
            this._onEnter = new rxjs_1.Subject();
            this._onExit = new rxjs_1.Subject();
            Object.assign(this, options);
        }
        ToastContainer.prototype.onEnter = function () {
            return this._onEnter.asObservable();
        };
        ToastContainer.prototype.onExit = function () {
            return this._onExit.asObservable();
        };
        ToastContainer.prototype.addToast = function (toast) {
            if (this.positionClass.indexOf('top') > 0) {
                if (this.newestOnTop) {
                    this.toasts.unshift(toast);
                } else {
                    this.toasts.push(toast);
                }
                if (this.toasts.length > this.maxShown) {
                    var diff = this.toasts.length - this.maxShown;
                    if (this.newestOnTop) {
                        this.toasts.splice(this.maxShown);
                    } else {
                        this.toasts.splice(0, diff);
                    }
                }
            } else {
                this.toasts.unshift(toast);
                if (this.toasts.length > this.maxShown) {
                    this.toasts.splice(this.maxShown);
                }
            }
            if (this.animate === null && this._fresh) {
                this._fresh = false;
                this._onEnter.next();
                this._onEnter.complete();
            }
            this.cdr.detectChanges();
        };
        ToastContainer.prototype.removeToast = function (toast) {
            if (toast.timeoutId) {
                clearTimeout(toast.timeoutId);
                toast.timeoutId = null;
            }
            this.toasts = this.toasts.filter(function (t) {
                return t.id !== toast.id;
            });
        };
        ToastContainer.prototype.removeAllToasts = function () {
            this.toasts = [];
        };
        ToastContainer.prototype.clicked = function (toast) {
            if (this.onToastClicked) {
                this.onToastClicked(toast);
            }
        };
        ToastContainer.prototype.anyToast = function () {
            return this.toasts.length > 0;
        };
        ToastContainer.prototype.findToast = function (toastId) {
            for (var _i = 0, _a = this.toasts; _i < _a.length; _i++) {
                var toast = _a[_i];
                if (toast.id === toastId) {
                    return toast;
                }
            }
            return null;
        };
        ToastContainer.prototype.onAnimationEnd = function (event) {
            var _this = this;
            if (event.toState === 'void' && !this.anyToast()) {
                this._ngExit();
            } else if (this._fresh && event.fromState === 'void') {
                // notify when first animation is done
                this._fresh = false;
                this._zone.run(function () {
                    _this._onEnter.next();
                    _this._onEnter.complete();
                });
            }
        };
        ToastContainer.prototype._ngExit = function () {
            var _this = this;
            this._zone.onMicrotaskEmpty.pipe(operators_1.first()).subscribe(function () {
                _this._onExit.next();
                _this._onExit.complete();
            });
        };
        ToastContainer.prototype.ngOnDestroy = function () {
            this._ngExit();
        };
        ToastContainer = __decorate([core_1.Component({
            selector: 'toast-container',
            template: "\n    <div #toastContainer id=\"toast-container\" [style.position]=\"position\" class=\"{{positionClass}}\">\n      <div *ngFor=\"let toast of toasts\" [@inOut]=\"animate\" (@inOut.done)=\"onAnimationEnd($event)\" class=\"toast toast-{{toast.type}}\"\n      (click)=\"clicked(toast)\">\n        <div class=\"toast-close-button\" *ngIf=\"toast.config.showCloseButton\" (click)=\"removeToast(toast)\">&times;\n        </div>\n        <div *ngIf=\"toast.title\" class=\"{{toast.config.titleClass || titleClass}}\">{{toast.title}}</div>\n        <div [ngSwitch]=\"toast.config.enableHTML\">\n          <span *ngSwitchCase=\"true\" class=\"{{toast.config.messageClass || messageClass}}\" [innerHTML]=\"sanitizer.bypassSecurityTrustHtml(toast.message)\"></span>\n          <span *ngSwitchDefault class=\"{{toast.config.messageClass || messageClass}}\">{{toast.message}}</span>\n        </div>\n      </div>\n    </div>\n    ",
            animations: [animations_1.trigger('inOut', [animations_1.state('flyRight, flyLeft', animations_1.style({ opacity: 1, transform: 'translateX(0)' })), animations_1.state('fade', animations_1.style({ opacity: 1 })), animations_1.state('slideDown, slideUp', animations_1.style({ opacity: 1, transform: 'translateY(0)' })), animations_1.transition('void => flyRight', [animations_1.style({
                opacity: 0,
                transform: 'translateX(100%)'
            }), animations_1.animate('0.2s ease-in')]), animations_1.transition('flyRight => void', [animations_1.animate('0.2s 10ms ease-out', animations_1.style({
                opacity: 0,
                transform: 'translateX(100%)'
            }))]), animations_1.transition('void => flyLeft', [animations_1.style({
                opacity: 0,
                transform: 'translateX(-100%)'
            }), animations_1.animate('0.2s ease-in')]), animations_1.transition('flyLeft => void', [animations_1.animate('0.2s 10ms ease-out', animations_1.style({
                opacity: 0,
                transform: 'translateX(-100%)'
            }))]), animations_1.transition('void => fade', [animations_1.style({
                opacity: 0
            }), animations_1.animate('0.3s ease-in')]), animations_1.transition('fade => void', [animations_1.animate('0.3s 10ms ease-out', animations_1.style({
                opacity: 0
            }))]), animations_1.transition('void => slideDown', [animations_1.style({
                opacity: 0,
                transform: 'translateY(-200%)'
            }), animations_1.animate('0.3s ease-in')]), animations_1.transition('slideDown => void', [animations_1.animate('0.3s 10ms ease-out', animations_1.style({
                opacity: 0,
                transform: 'translateY(-200%)'
            }))]), animations_1.transition('void => slideUp', [animations_1.style({
                opacity: 0,
                transform: 'translateY(200%)'
            }), animations_1.animate('0.3s ease-in')]), animations_1.transition('slideUp => void', [animations_1.animate('0.3s 10ms ease-out', animations_1.style({
                opacity: 0,
                transform: 'translateY(200%)'
            }))])])]
        }), __metadata("design:paramtypes", [platform_browser_1.DomSanitizer, core_1.ChangeDetectorRef, core_1.NgZone, toast_options_1.ToastOptions])], ToastContainer);
        return ToastContainer;
    }();
    exports.ToastContainer = ToastContainer;

});
System.registerDynamic("ng2-toastr/src/toast-manager", ["@angular/core", "rxjs", "./toast", "./toast-container.component", "./toast-options"], true, function ($__require, exports, module) {
    "use strict";

    var global = this || self,
        GLOBAL = global;
    var __decorate = exports && exports.__decorate || function (decorators, target, key, desc) {
        var c = arguments.length,
            r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
            d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = exports && exports.__metadata || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    var core_1 = $__require("@angular/core");
    var rxjs_1 = $__require("rxjs");
    var toast_1 = $__require("./toast");
    var toast_container_component_1 = $__require("./toast-container.component");
    var toast_options_1 = $__require("./toast-options");
    var ToastsManager = /** @class */function () {
        function ToastsManager(componentFactoryResolver, ngZone, appRef, options) {
            this.componentFactoryResolver = componentFactoryResolver;
            this.ngZone = ngZone;
            this.appRef = appRef;
            this.options = options;
            this.index = 0;
            this.toastClicked = new rxjs_1.Subject();
        }
        ToastsManager.prototype.setRootViewContainerRef = function (vRef) {
            this._rootViewContainerRef = vRef;
        };
        ToastsManager.prototype.onClickToast = function () {
            return this.toastClicked.asObservable();
        };
        ToastsManager.prototype.show = function (toast, options) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                if (!_this.container) {
                    // get app root view component ref
                    if (!_this._rootViewContainerRef) {
                        try {
                            _this._rootViewContainerRef = _this.appRef['_rootComponents'][0]['_hostElement'].vcRef;
                        } catch (e) {
                            reject(new Error('Please set root ViewContainerRef using setRootViewContainerRef(vRef: ViewContainerRef) method.'));
                        }
                    }
                    // get options providers
                    var providers = core_1.ReflectiveInjector.resolve([{ provide: toast_options_1.ToastOptions, useValue: _this.options }]);
                    // create and load ToastContainer
                    var toastFactory = _this.componentFactoryResolver.resolveComponentFactory(toast_container_component_1.ToastContainer);
                    var childInjector = core_1.ReflectiveInjector.fromResolvedProviders(providers, _this._rootViewContainerRef.parentInjector);
                    _this.container = _this._rootViewContainerRef.createComponent(toastFactory, _this._rootViewContainerRef.length, childInjector);
                    _this.container.instance.onToastClicked = function (toast) {
                        _this._onToastClicked(toast);
                    };
                    _this.container.instance.onExit().subscribe(function () {
                        _this.dispose();
                    });
                }
                resolve(_this.setupToast(toast, options));
            });
        };
        ToastsManager.prototype.createTimeout = function (toast) {
            var _this = this;
            var task;
            this.ngZone.runOutsideAngular(function () {
                task = setTimeout(function () {
                    return _this.ngZone.run(function () {
                        return _this.clearToast(toast);
                    });
                }, toast.config.toastLife);
            });
            return task.toString();
        };
        ToastsManager.prototype.setupToast = function (toast, options) {
            toast.id = ++this.index;
            if (options && options.hasOwnProperty('toastLife')) {
                options.dismiss = 'auto';
            }
            var customConfig = Object.assign({}, this.options, options || {});
            Object.keys(toast.config).forEach(function (k) {
                if (customConfig.hasOwnProperty(k)) {
                    toast.config[k] = customConfig[k];
                }
            });
            if (toast.config.dismiss === 'auto') {
                toast.timeoutId = this.createTimeout(toast);
            }
            this.container.instance.addToast(toast);
            return toast;
        };
        ToastsManager.prototype._onToastClicked = function (toast) {
            this.toastClicked.next(toast);
            if (toast.config.dismiss === 'click') {
                this.clearToast(toast);
            }
        };
        ToastsManager.prototype.dismissToast = function (toast) {
            this.clearToast(toast);
        };
        ToastsManager.prototype.clearToast = function (toast) {
            if (this.container) {
                var instance = this.container.instance;
                instance.removeToast(toast);
            }
        };
        ToastsManager.prototype.clearAllToasts = function () {
            if (this.container) {
                var instance = this.container.instance;
                instance.removeAllToasts();
                this.dispose();
            }
        };
        ToastsManager.prototype.dispose = function () {
            if (this.container) {
                this.container.destroy();
                this.container = null;
            }
        };
        ToastsManager.prototype.error = function (message, title, options) {
            var data = options && options.data ? options.data : null;
            var toast = new toast_1.Toast('error', message, title, data);
            return this.show(toast, options);
        };
        ToastsManager.prototype.info = function (message, title, options) {
            var data = options && options.data ? options.data : null;
            var toast = new toast_1.Toast('info', message, title, data);
            return this.show(toast, options);
        };
        ToastsManager.prototype.success = function (message, title, options) {
            var data = options && options.data ? options.data : null;
            var toast = new toast_1.Toast('success', message, title, data);
            return this.show(toast, options);
        };
        ToastsManager.prototype.warning = function (message, title, options) {
            var data = options && options.data ? options.data : null;
            var toast = new toast_1.Toast('warning', message, title, data);
            return this.show(toast, options);
        };
        // allow user define custom background color and image
        ToastsManager.prototype.custom = function (message, title, options) {
            var data = options && options.data ? options.data : null;
            var toast = new toast_1.Toast('custom', message, title, data);
            return this.show(toast, options);
        };
        ToastsManager = __decorate([core_1.Injectable(), __metadata("design:paramtypes", [core_1.ComponentFactoryResolver, core_1.NgZone, core_1.ApplicationRef, toast_options_1.ToastOptions])], ToastsManager);
        return ToastsManager;
    }();
    exports.ToastsManager = ToastsManager;

});
System.registerDynamic("ng2-toastr/src/toast-options", ["@angular/core"], true, function ($__require, exports, module) {
    "use strict";

    var global = this || self,
        GLOBAL = global;
    var __decorate = exports && exports.__decorate || function (decorators, target, key, desc) {
        var c = arguments.length,
            r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
            d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = exports && exports.__metadata || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    var core_1 = $__require("@angular/core");
    var ToastOptions = /** @class */function () {
        function ToastOptions() {
            this.positionClass = 'toast-top-right';
            this.maxShown = 5;
            this.newestOnTop = false;
            this.animate = 'fade';
            // override-able properties
            this.toastLife = 5000;
            this.enableHTML = false;
            this.dismiss = 'auto'; // 'auto' | 'click' | 'controlled'
            this.messageClass = 'toast-message';
            this.titleClass = 'toast-title';
            this.showCloseButton = false;
        }
        ToastOptions = __decorate([core_1.Injectable(), __metadata("design:paramtypes", [])], ToastOptions);
        return ToastOptions;
    }();
    exports.ToastOptions = ToastOptions;

});
System.registerDynamic("ng2-toastr/src/toast.module", ["@angular/core", "@angular/common", "./toast-container.component", "./toast-manager", "./toast-options"], true, function ($__require, exports, module) {
    "use strict";

    var global = this || self,
        GLOBAL = global;
    var __decorate = exports && exports.__decorate || function (decorators, target, key, desc) {
        var c = arguments.length,
            r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
            d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    var core_1 = $__require("@angular/core");
    var common_1 = $__require("@angular/common");
    var toast_container_component_1 = $__require("./toast-container.component");
    var toast_manager_1 = $__require("./toast-manager");
    var toast_options_1 = $__require("./toast-options");
    var ToastModule = /** @class */function () {
        function ToastModule() {}
        ToastModule_1 = ToastModule;
        ToastModule.forRoot = function () {
            return {
                ngModule: ToastModule_1,
                providers: [toast_manager_1.ToastsManager, toast_options_1.ToastOptions]
            };
        };
        var ToastModule_1;
        ToastModule = ToastModule_1 = __decorate([core_1.NgModule({
            imports: [common_1.CommonModule],
            declarations: [toast_container_component_1.ToastContainer],
            exports: [toast_container_component_1.ToastContainer],
            entryComponents: [toast_container_component_1.ToastContainer]
        })], ToastModule);
        return ToastModule;
    }();
    exports.ToastModule = ToastModule;

});
System.registerDynamic("ng2-toastr/ng2-toastr", ["./src/toast", "./src/toast-manager", "./src/toast-container.component", "./src/toast-options", "./src/toast.module"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  Object.defineProperty(exports, "__esModule", { value: true });
  var toast_1 = $__require("./src/toast");
  exports.Toast = toast_1.Toast;
  var toast_manager_1 = $__require("./src/toast-manager");
  exports.ToastsManager = toast_manager_1.ToastsManager;
  var toast_container_component_1 = $__require("./src/toast-container.component");
  exports.ToastContainer = toast_container_component_1.ToastContainer;
  var toast_options_1 = $__require("./src/toast-options");
  exports.ToastOptions = toast_options_1.ToastOptions;
  var toast_module_1 = $__require("./src/toast.module");
  exports.ToastModule = toast_module_1.ToastModule;

});
//# sourceMappingURL=ng2-toastr.js.map