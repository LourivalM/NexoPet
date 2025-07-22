export type Pet = {
    id: number;
    nome: string;
    especie: string;
    raca: string;
    idade: string;
    ong: string;
    img: string;
    adoptionStatus?: 'available' | 'pending' | 'adopted'; // Novo campo
}