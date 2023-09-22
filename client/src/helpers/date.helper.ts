export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('us-US', {
    dateStyle: 'long',
  });
};
