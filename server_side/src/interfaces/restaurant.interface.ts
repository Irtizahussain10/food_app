interface grades {
  date?: Date;
  grade?: string;
  score?: number;
}

export interface Restaurant {
  address?: {
    building?: number;
    coord?: [number, number];
    street?: string;
    zipcode?: string;
  };
  borough?: string;
  cuisine?: string;
  grades?: grades[];
  name: string;
}
