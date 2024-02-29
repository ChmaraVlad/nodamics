export interface IParsedSpreadsheetItem {
  merge?: {
    s: {
      c: number;
      r: number;
    };
    e: {
      c: number;
      r: number;
    };
  };
  content: string | number;
}

export type IParsedSpreadsheet = IParsedSpreadsheetItem[][];
