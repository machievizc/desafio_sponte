export type User = {
    id: number;
    name: string;
    email: string;
    avatar: string;
}

export type SignUpUser = {
    name: string;
    email: string;
    password: string;
    avatar: string;
}

export type CredentialType = {
    username: string;
    password: string;
}

export type ErrorType = {
    type?: string;
    message: string;
}

export type Product = {
    id: number;
    createdAt: Date;
    titulo: string;
    descricao: string;
    altura: number;
    largura: number;
    comprimento: number;
    peso: number;
    categorias: Array<string>;
    valor: number;
    codigoBarras: number;
    dataAquisicao: Date;
    imagem: string;
    user: User;
}