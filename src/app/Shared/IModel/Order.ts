export interface IOrder {
     ID :number;
     Price :number;
     Quantity :string;
     Commission :number;
      Stoke :StokeDto;
      Broker :BrokerDto;
     StockId :number;
     BrokerId :number;
     personId :number; 
}
export interface StokeDto {   
      StokeId :number;
      StockName :string
      Price :number;
}
export interface BrokerDto {   
      ID :number;
      Name :string;
      person:PersonDto[];
}

export interface PersonDto {
    Id :number;
    Name :string;
    BrokerId :number;
}

export interface IOrderParameter {
      ID :number;
      Price :number;
      Quantity :string;
      Commission :number;
      stockId :number;
      BrokerId :number;
      personId :number;
}