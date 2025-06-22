export type StyleFormat = 0 | 1;
export type TailwindClasses = string;
export type NestedStyles = Record<string, TailwindClasses | StyleObject>;
export type StyleArray = Array<TailwindClasses | StyleObject>;
export type StyleObject = Record<string, TailwindClasses | StyleObject | StyleArray>;

export function tws(classes: TailwindClasses, format?: StyleFormat): string | Record<string, any>;
export function twsx(styles: StyleObject): string;

export interface Config {
  theme: {
    [key: string]: any;
  };
  variants: {
    [key: string]: any;
  };
}

export function setConfig(config: Partial<Config>): void;
