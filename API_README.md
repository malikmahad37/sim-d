# SIM Database API - Setup Guide

## How to Add Your Own Data

The API stores SIM holder data in the file: `api/sim.js`

### Step 1: Open the API File
Edit `api/sim.js` and find the `simDatabase` object.

### Step 2: Add New Phone Numbers
Add your numbers in this format:

```javascript
const simDatabase = {
  "03086462372": {
    Mobile: "03086462372",
    Name: "MALIK MAHAD",
    CNIC: "12345-6789012-3",
    Address: "ISLAMABAD, PAKISTAN",
    Operator: "ZONG"
  },
  "YOUR_NUMBER_HERE": {
    Mobile: "YOUR_NUMBER_HERE",
    Name: "PERSON NAME",
    CNIC: "XXXXX-XXXXXXX-X",
    Address: "CITY, COUNTRY",
    Operator: "ZONG|JAZZ|TELENOR|UFONE"
  }
};
```

### Step 3: Deploy
```bash
git add .
git commit -m "Update: Add new SIM data"
git push origin main
```

Vercel will automatically redeploy!

## API Endpoint
```
GET /api/sim?num=03086462372
```

### Response Format
```json
{
  "status": "success",
  "data": [
    {
      "Mobile": "03086462372",
      "Name": "MALIK MAHAD",
      "CNIC": "12345-6789012-3",
      "Address": "ISLAMABAD, PAKISTAN",
      "Operator": "ZONG"
    }
  ]
}
```

### Error Response
```json
{
  "status": "error",
  "message": "SIM data not found in database"
}
```

## Current Test Numbers

1. **03086462372** - Malik Mahad
2. **03001234567** - Ahmed Khan
3. **03215678901** - Fatima Ali
4. **03324567890** - Hassan Raza
5. **03435123456** - Sara Ahmed
6. **03009876543** - Usman Malik

## Features
✅ Real working API on Vercel
✅ No external dependencies
✅ CORS enabled
✅ Fast response times
✅ Easy to update
✅ Production ready
