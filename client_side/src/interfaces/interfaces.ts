export interface Props {}

interface grades {
  date?: string;
  grade?: string;
  score: number;
}

interface Restaurants {
  address: {
    building?: number;
    coord: [number, number];
    street?: string;
    zipcode?: string;
  };
  borough?: string;
  cuisine?: string;
  grades: grades[];
  name: string;
}

export interface Restaurant {
  restaurants: Restaurants[];
  page: number;
  error: string;
  showMap: boolean;
  totalRestaurants: number;
  isLoading: boolean;
}
