// propiedades del objeto 

export interface Message {
    id: number;
    message: string;
    //type: "user" | "assistant";
    role: 'system' | 'user' | 'assistant' | 'data';
}
// interface a usar 