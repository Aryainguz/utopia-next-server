// lib/cache.js
import NodeCache from "node-cache";

const cache = new NodeCache({ stdTTL: 60 * 5 }); // Cache for 5 minutes

export default cache;
