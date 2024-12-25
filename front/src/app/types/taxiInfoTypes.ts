export interface TaxiInfoType {
    currency: string
    options: Option[]
    estimatedTime: number
  }
  
  export interface Option {
    className: string
    classText: string
    price: number
    minPrice: number
    priceText: string
    waitingTime: number
  }
  