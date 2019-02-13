const formatNumber = (n, ranges) => {
  for (let i = 0; i < ranges.length; i++) {
    if (n >= ranges[i].divider) {
      return (n / ranges[i].divider).toString() + ranges[i].suffix;
    }
    if (n >= 1e2) {
      return `${(n / 1e3).toString()}k`;
    }
  }
  return n.toString();
};

export default formatNumber;
