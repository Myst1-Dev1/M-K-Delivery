export type Order = {
    id:number;
    name:string;
    tel:string;
    adress:string;
    zipCode:number;
    additionalInformation:string;
    cartValue:[];
    cartPrice:[];
    paymentMethod:string;
    changeValue:number;
}