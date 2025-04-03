// src/types/csv-parser.d.ts
declare module "csv-parser" {
    import { Transform } from "stream";
  
    interface CsvParserOptions {
      headers?: string[] | boolean;
      separator?: string;
      strict?: boolean;
      skipLines?: number;
    }
  
    function csvParser(options?: CsvParserOptions): Stream;
  
    export = csvParser;
  }