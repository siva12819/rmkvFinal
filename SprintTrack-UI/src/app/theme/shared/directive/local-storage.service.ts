import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  intGlobalUserId() {
    throw new Error('Method not implemented.');
  }

  constructor() { }

  getMinDate(): string {
    return "01/00/1900";
  }
  setApiUrl(apiURL: any): any {
    return <any>sessionStorage.setItem("Api_Url", apiURL);
  }

  getApiUrl(): string {
    return <string>sessionStorage.getItem("Api_Url");
  }

  getInventoryDocumentSize(): number {
    return +atob(sessionStorage.getItem("documentSize"));
}

getInventoryBasePathId(): number {
  let basePathId: any = sessionStorage.getItem("InventoryDocumentBasePathId");
  if (basePathId)
      basePathId = +atob(sessionStorage.getItem("InventoryDocumentBasePathId"));
  return +basePathId;
}

getInventoryDocumentPath(): string {
  let documentPath = sessionStorage.getItem("InventoryDocumentRootPath");
  if (documentPath)
      documentPath = atob(sessionStorage.getItem("InventoryDocumentRootPath"));
  return documentPath;
}

getHRDocumentURL(): string {
  let documentRoot = sessionStorage.getItem("HRDocumentRootURL");
  if (documentRoot)
      documentRoot = atob(sessionStorage.getItem("HRDocumentRootURL"));
  return documentRoot;
}

getHRDocumentSize(): number {
  return +atob(sessionStorage.getItem("documentSize"));
}

  public getAuthToken(): string {
    const token = sessionStorage.getItem("AuthToken");
    if (token === null) {
      return "";
    }
    return atob(token);
  }

  getHRDocumentPath(): string {
    debugger;
    let documentPath = sessionStorage.getItem("HRDocumentRootPath");
    if (documentPath)
        documentPath = atob(sessionStorage.getItem("HRDocumentRootPath"));
    return documentPath;
}
}
