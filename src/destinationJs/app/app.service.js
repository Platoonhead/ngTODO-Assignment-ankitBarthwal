"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var Rx_1 = require("rxjs/Rx");
require("rxjs/add/observable/of");
require("rxjs/add/observable/throw");
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
var http_1 = require("@angular/http");
var AppService = (function () {
    function AppService(http) {
        this.http = http;
        this.allevents = [];
    }
    AppService.prototype.setItems = function (ti, da, des, pr) {
        var _this = this;
        var jsonHeader = new http_1.Headers({
            'Content-Type': 'application/json'
        });
        var obj = {
            date: da,
            title: ti,
            description: des,
            priority: pr
        };
        return this.http.post('http://localhost:9000/add', obj, { headers: jsonHeader })
            .map(function (data) {
            return _this.extractData(data);
        })
            .catch(function (e) {
            return _this.handle(e);
        });
    };
    AppService.prototype.handle = function (error) {
        var errMsg;
        try {
            if (JSON.parse(error._body).message) {
                errMsg = JSON.parse(error._body).message;
            }
            else {
                errMsg = 'Some thing went wrong';
            }
        }
        catch (e) {
            errMsg = 'Somthing Went Wrong try again!!';
        }
        return Rx_1.Observable.throw(new Error(errMsg));
    };
    /* updateItems(id: number, ti: string, da: Date, des: string, pr: number): boolean {
  
  
     for (let i = 0; i < AppService.allevents.length; i++) {
  
     if (AppService.allevents[i].id == id) {
     AppService.allevents[i].title = ti;
     AppService.allevents[i].description = des;
     AppService.allevents[i].date = da;
     AppService.allevents[i].priority = pr;
     }
     }
     return true;
  
     }*/
    AppService.prototype.getItems = function () {
        var _this = this;
        var jsonHeader = new http_1.Headers({
            'Content-Type': 'application/json'
        });
        return this.http.get('http://localhost:9000/get/all', { headers: jsonHeader }).map(function (response) {
            return _this.extractData(response);
        });
    };
    AppService.prototype.extractData = function (res) {
        return res.json();
    };
    AppService.prototype.del = function (id) {
        var _this = this;
        var jsonHeader = new http_1.Headers({
            'Content-Type': 'application/json'
        });
        return this.http.get('http://localhost:9000/remove/' + id, { headers: jsonHeader }).map(function (data) {
            return _this.extractData(data);
        });
    };
    AppService.prototype.updateItems = function (ti, da, des, pr, id) {
        var _this = this;
        var jsonHeader = new http_1.Headers({
            'Content-Type': 'application/json'
        });
        var obj = {
            date: da,
            title: ti,
            description: des,
            priority: pr,
            _id: id
        };
        return this.http.post('http://localhost:9000/update', obj, { headers: jsonHeader })
            .map(function (data) {
            return _this.extractData(data);
        })
            .catch(function (e) {
            return _this.handle(e);
        });
    };
    AppService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], AppService);
    return AppService;
}());
exports.AppService = AppService;
//# sourceMappingURL=app.service.js.map