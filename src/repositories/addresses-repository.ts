const addresses = [
  { id: "1", city: "Brest", street: "Vereskovay" },
  { id: "2", city: "Warsaw", street: "Suwalska" },
  { id: "3", city: "Jerusalem", street: "Shlomo Ben Yosef" },
];

export const addressesRepository = {
  findAddresses() {
    return addresses;
  },
  getAddressByCity(city: string) {
    const findedCity = addresses.find(
      (item: { city: string; street: string }) => item.city === city
    );
    return findedCity;
  },
};
