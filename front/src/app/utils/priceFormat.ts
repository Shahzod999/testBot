export const formatPrice = (price: number) => {
  return new Intl.NumberFormat("ru-RU").format(price); // Разделение на тысячные
};

export const newCurrency = (currency: string) => {
  return currency == "UZS" ? "so`m" : currency.toLowerCase();
};
