// app/api/validate-brreg/route.js
import { NextResponse } from "next/server";

// Validation schema based on your Prisma model
const validateBrregData = (data) => {
  const requiredFields = [
    'kommune',
    'adresse',
    'telefonNummer',
    'epost',
    'nettside',
    'oppstart',
    'industri',
    'selskapInfo'
  ];

  // Check if all required fields are present
  const missingFields = requiredFields.filter(field => !(field in data));
  if (missingFields.length > 0) {
    return {
      isValid: false,
      error: `Missing required fields: ${missingFields.join(', ')}`
    };
  }

  // Validate field lengths based on Prisma schema
  const validations = {
    kommune: value => value.length <= 40,
    adresse: value => value.length <= 40,
    telefonNummer: value => value.length <= 20,
    epost: value => value.length <= 100 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
    nettside: value => value.length <= 255 && /^https?:\/\//.test(value),
    oppstart: value => value.length <= 15,
    industri: value => value.length <= 40,
    selskapInfo: value => typeof value === 'string' // Text field can be any length
  };

  // Check each field against its validation rules
  for (const [field, validator] of Object.entries(validations)) {
    if (!validator(data[field])) {
      return {
        isValid: false,
        error: `Invalid ${field}: Does not meet requirements`
      };
    }
  }

  return {
    isValid: true
  };
};

export async function POST(request) {
  try {
    const data = await request.json();
    
    // Validate the data
    const validationResult = validateBrregData(data);
    
    if (!validationResult.isValid) {
      return NextResponse.json(
        { error: validationResult.error },
        { status: 400 }
      );
    }

    // If validation passes
    return NextResponse.json(
      { message: 'OK! Data format is valid' },
      { status: 200 }
    );

  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid JSON payload' },
      { status: 400 }
    );
  }
}