export type Usuario = {
    id: number;
    nickname: string; // Adicionado o campo nickname
    nome?: string; // Tornar opcional, pois nem todos os tipos de usuário terão 'nome'
    nomeSocial?: string;
    telefone?: string;
    cidade?: string;
    estado?: string;
    pais?: string;
    cnpj?: string;
    rua?: string;
    numero?: string;
    bairro?: string;
    cargoRepresentante?: string;
    areaAtuacao?: string;
    nomeInstituicao?: string; // Para ONGs e Parceiros
    email: string;
    tipo: 'pessoa' | 'ong' | 'parceiro'; // Adicionado 'parceiro'
}