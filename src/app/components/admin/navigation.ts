export class MenuItem {
    label: string;
    url: string;
    icon: string;
};

export const MENU: MenuItem[] = [
    { label: "Countries", url: "/countries", icon: "fa fa-envelope" },
    { label: "Persons", url: "/persons", icon: "fa fa-envelope" }
];