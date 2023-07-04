export interface Location {
  city: String;
  //   coordinates: {
  //     latitude: String;
  //     longitude: String;
  //   };
  country: String;
  postcode: Number;
  state: String;
  street: {
    name: String;
    number: Number;
  };
}
