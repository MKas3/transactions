const usdFormatter = new Intl.NumberFormat('us-US', {
  style: 'currency',
  currency: 'USD',
});

export const formatToUSD = (usd: number) => {
  return usdFormatter.format(usd);
};
