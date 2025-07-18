export type Usuario = {
    id: number;
    nickname: string; // Adicionado o campo nickname
    nome?: string; // Tornar opcional, pois nem todos os tipos de usuário terão 'nome'
    nomeInstituicao?: string; // Para ONGs e Parceiros
    email: string;
    tipo: 'pessoa' | 'ong' | 'parceiro'; // Adicionado 'parceiro'
}