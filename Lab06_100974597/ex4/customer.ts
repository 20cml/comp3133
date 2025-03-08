export class Customer {
    private firstName: string; 
    private lastName: string;
    private _age: number;  

    constructor(firstName: string, lastName: string, age: number){
        this.firstName = firstName;
        this.lastName = lastName;
        this._age = age;  
    }

    public GetAge(): void {
        console.log(`Age of ${this.firstName} ${this.lastName} is: ${this._age}`);
    }

    public greeter(): void {
        console.log(`Hello ${this.firstName} ${this.lastName}`);
    }
}

let customer = new Customer("Camila", "Lee", 30);
customer.greeter();
customer.GetAge(); 
