// Mock SIM Database API
// This is a demo API that returns simulated SIM holder data

// Sample database with phone numbers
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
  const formattedNum = '0' + normalizedNum.slice(-10);

  // Check if number exists in database
  if (simDatabase[formattedNum]) {
    return res.status(200).json({
      status: "success",
      data: [simDatabase[formattedNum]]
    });
  }

  // Generate random data for demo purposes (numbers not in database)
  const names = ["ALICE JOHNSON", "BOB SMITH", "CHARLIE BROWN", "DIANA PRINCE", "EVE MARTIN"];
  const operators = ["ZONG", "JAZZ", "TELENOR", "UFONE"];
  const cities = ["KARACHI", "LAHORE", "ISLAMABAD", "RAWALPINDI", "MULTAN", "PESHAWAR", "QUETTA"];

  if (req.method === 'GET') {
    const randomName = names[Math.floor(Math.random() * names.length)];
    const randomOperator = operators[Math.floor(Math.random() * operators.length)];
    const randomCity = cities[Math.floor(Math.random() * cities.length)];
    const randomCNIC = Math.floor(Math.random() * 90000) + 10000 + "-" + Math.floor(Math.random() * 9000000) + 1000000 + "-" + Math.floor(Math.random() * 9) + 1;

    return res.status(200).json({
      status: "success",
      data: [
        {
          Mobile: formattedNum,
          Name: randomName,
          CNIC: randomCNIC,
          Address: randomCity + ", PAKISTAN",
          Operator: randomOperator
        }
      ]
    });
  }

  return res.status(405).json({
    status: "error",
    message: "Method not allowed"
  });
}
