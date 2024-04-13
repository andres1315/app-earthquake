export type Earthquake = {
  id:         number;
  type:       string;
  attributes: Attributes;
  links:      Links;
}

export type Attributes = {
  external_id: string;
  magnitude:   number;
  place:       string;
  time:        string;
  tsunami:     boolean;
  mag_type:    string;
  title:       string;
  coordinates: Coordinates;
}

export type Coordinates = {
  longitude: number;
  latitude:  number;
}

export type Links = {
  external_url: string;
}
