export type Usuario = {
    id: number;
    nickname: string; // Adicionado o campo nickname
    nome?: string; // Tornar opcional, pois nem todos os tipos de usuário terão 'nome'
    nomeInstituicao?: string; // Para ONGs e Parceiros
    email: string;
    tipo: 'pessoa' | 'ong' | 'parceiro'; // Adicionado 'parceiro'
    // Outros campos específicos de cada tipo de usuário podem ser adicionados aqui, se necessário
    // Ex: cnpj?: string;
    //     telefone?: string;
    //     cidade?: string;
    //     estado?: string;
    //     pais?: string;
    //     cargoRepresentante?: string;
    //     areaAtuacao?: string;
}
