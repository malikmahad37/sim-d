// SIM Database API - Real Working Database
// You can add more numbers here easily

const simDatabase = {
  "03086462372": {
    Mobile: "03086462372",
    Name: "MALIK MAHAD",
    CNIC: "12345-6789012-3",
    Address: "ISLAMABAD, PAKISTAN",
    Operator: "ZONG"
  },
  "03001234567": {
    Mobile: "03001234567",
    Name: "AHMED KHAN",
    CNIC: "12341-6789012-1",
    Address: "KARACHI, PAKISTAN",
    Operator: "JAZZ"
  },
  "03215678901": {
    Mobile: "03215678901",
    Name: "FATIMA ALI",
    CNIC: "12342-6789012-2",
    Address: "LAHORE, PAKISTAN",
    Operator: "ZONG"
  },
  "03324567890": {
    Mobile: "03324567890",
    Name: "HASSAN RAZA",
    CNIC: "12343-6789012-3",
    Address: "RAWALPINDI, PAKISTAN",
    Operator: "TELENOR"
  },
  "03435123456": {
    Mobile: "03435123456",
    Name: "SARA AHMED",
    CNIC: "12344-6789012-4",
    Address: "MULTAN, PAKISTAN",
    Operator: "JAZZ"
  },
  "03009876543": {
    Mobile: "03009876543",
    Name: "USMAN MALIK",
    CNIC: "12345-6789012-5",
    Address: "PESHAWAR, PAKISTAN",
    Operator: "ZONG"
  }
};

export default function handler(req, res) {
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

  // Normalize the phone number
  const normalizedNum = num.replace(/[^\d]/g, '');
  let formattedNum = '0' + normalizedNum.slice(-10);
  
  // Also check without leading 0
  const numWithoutZero = normalizedNum.slice(-10);

  // Check database first
  if (simDatabase[formattedNum]) {
    return res.status(200).json({
      status: "success",
      data: [simDatabase[formattedNum]]
    });
  }

  if (simDatabase['0' + numWithoutZero]) {
    return res.status(200).json({
      status: "success",
      data: [simDatabase['0' + numWithoutZero]]
    });
  }

  // If not found in database, return error
  return res.status(404).json({
    status: "error",
    message: "SIM data not found in database"
  });
}
