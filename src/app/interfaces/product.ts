export interface Product {
    id?: string;
    Marca?: string;
    ano?: string;
    modelo?: string;
    combustivel?: string;
    lugares?: string;
    cambio?: string;
    categoria?: string;
    cor?: string;
    quilometragem?: string;
    placa?: string;
    seguradora?: string;

    picture?: string;
    price?: string;

    logradouro?:string;
    numero?:string;
    bairro?:string;
    cidade?:string;
    estado?:string;

    createdAt?: number;
    userId?: string;
}