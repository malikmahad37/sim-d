// SIM Database API Proxy
// Wraps famofc.site API and handles CORS/format issues

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Handle preflight
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const { num } = req.query;

  if (!num) {
    return res.status(400).json({
      status: "error",
      message: "Phone number is required"
    });
  }

  try {
    // Call external API
    const externalApiUrl = `https://famofc.site/api/database.php?num=${encodeURIComponent(num)}`;
    
    const response = await fetch(externalApiUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'Mozilla/5.0'
      }
    });

    if (!response.ok) {
      console.error(`External API error: ${response.status}`);
      return res.status(response.status).json({
        status: "error",
        message: `API returned status ${response.status}`
      });
    }

    let apiData = await response.json();
    
    // Handle different response formats
    if (typeof apiData === 'string') {
      try {
        apiData = JSON.parse(apiData);
      } catch (e) {
        return res.status(200).json({
          status: "error",
          message: "Invalid response format from API"
        });
      }
    }

    // If data is already an array, wrap it properly
    if (Array.isArray(apiData)) {
      return res.status(200).json({
        status: "success",
        data: apiData
      });
    }

    // If it's an object with data property
    if (apiData.data || apiData.status) {
      return res.status(200).json(apiData);
    }

    // If it's a single object, wrap it in array
    if (apiData.Mobile || apiData.mobile || apiData.Name || apiData.name) {
      return res.status(200).json({
        status: "success",
        data: [apiData]
      });
    }

    // If nothing matches, return success with the data as-is
    return res.status(200).json({
      status: "success",
      data: Array.isArray(apiData) ? apiData : [apiData]
    });

  } catch (error) {
    console.error('Proxy error:', error.message);
    
    return res.status(500).json({
      status: "error",
      message: `Server error: ${error.message}`
    });
  }
}
