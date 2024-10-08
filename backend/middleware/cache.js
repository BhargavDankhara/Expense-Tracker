const cache = {};

export const cacheMiddleware = (req, res, next) => {
  const cacheKey = req.originalUrl;

  if (cache[cacheKey]) {
    console.log("Cache hit for:", cacheKey);
    return res.status(200).json({ success: true, expenses: cache[cacheKey] });
  }

  console.log("Cache miss for:", cacheKey);
  res.sendResponse = res.json;
  res.json = (data) => {
    cache[cacheKey] = data.expenses; // Cache the expenses
    res.sendResponse(data);
  };

  next();
};
