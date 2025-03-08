"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Customer = void 0;
var Customer = /** @class */ (function () {
    function Customer(firstName, lastName, age) {
        this.firstName = firstName;
        this.lastName = lastName;
        this._age = age;
    }
    Customer.prototype.GetAge = function () {
        console.log("Age of ".concat(this.firstName, " ").concat(this.lastName, " is: ").concat(this._age));
    };
    Customer.prototype.greeter = function () {
        console.log("Hello ".concat(this.firstName, " ").concat(this.lastName));
    };
    return Customer;
}());
exports.Customer = Customer;
var customer = new Customer("Camila", "Lee", 30);
customer.greeter();
customer.GetAge();
