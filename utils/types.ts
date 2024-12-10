export interface FileObject {
    id: string;
    name: string;
    created_at: string;
    metadata:Record<string, any>
}

export interface Document {
    id:number,
    name: string;
    uri: string;
    type: "pdf" | "image" | "video";
  }