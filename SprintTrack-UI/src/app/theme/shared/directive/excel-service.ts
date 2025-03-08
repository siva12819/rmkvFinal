import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Injectable({
  providedIn: 'root',  
})
export class ExcelService {
  constructor() {}

  public exportAsExcelFile(json: any[], excelFileName: string, datetime: string): void {
    const header = Object.keys(json[0]);
    const wscols = header.map((col) => ({ wch: col.length + 5 }));

    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    worksheet["!cols"] = wscols;

    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
      cellDates: true,
      cellStyles: true,
    });

    this.saveAsExcelFile(excelBuffer, excelFileName, datetime);
    worksheet['B1'].s = { font: { bold: true } };
  }

  private saveAsExcelFile(buffer: any, fileName: string, datetime: string): void {
    const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });
    const formattedDateTime = datetime.split(" ").join(" at ");
    FileSaver.saveAs(data, `${fileName} Excel on ${formattedDateTime}${EXCEL_EXTENSION}`);
  }

  public exportAsExcelFileSupplier(json: any[], excelFileName: string, datetime: string): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

    this.saveAsExcelFile(excelBuffer, excelFileName, datetime);
  }

  public exportAsExcelTableRecord(tableName: string, excelFileName: string, datetime: string): void {
    const tableRecord: HTMLElement = document.getElementById(tableName);
    const worksheet: XLSX.WorkSheet = XLSX.utils.table_to_book(tableRecord).Sheets['Sheet1'];

    const workbook: XLSX.WorkBook = { SheetNames: [excelFileName], Sheets: { [excelFileName]: worksheet } };
    const formattedDateTime = datetime.split(" ").join(" at ");

    XLSX.writeFile(workbook, `${excelFileName} Excel on ${formattedDateTime}.xlsx`);
  }
}
