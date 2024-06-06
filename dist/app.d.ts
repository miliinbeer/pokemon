declare const card: HTMLElement;
declare const buttons: HTMLElement;
interface Data {
    name: string;
    url: string;
}
interface Info {
    name: string;
    sprites: {
        front_shiny: string;
    };
    moves: string;
    id: string;
    height: string;
    stats: Array<{
        base_stat: number;
    }>;
}
declare function showData(): Promise<any>;
declare function showFirstCard(): Promise<void>;
declare function showItems(): Promise<void>;
declare function showInfo(el: Info): void;
declare function createButton(item: Data): HTMLDivElement;
