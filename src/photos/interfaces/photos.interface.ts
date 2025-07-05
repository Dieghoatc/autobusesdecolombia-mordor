// Interface is a contract that defines the shape of an object, for example the API response shape to the client

export interface Photo {
  photo_id: number;
  category_id: number;
  type_id: number;
  url: string;
  company: string;
  serial: string;
  bodywork: string;
  chassis: string;
  plate: string;
  service: string;
  author: string;
  id_international: number;
  country: string;
  location: string;
  create_at: string;
}

export interface PhotoResponse {
  data: Photo[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
    hasNext: boolean;
    hasPrev: boolean;
    startItem: number;
    endItem: number;
  }
}

export interface UploadResultCloudinary {
  secure_url: string;
}
