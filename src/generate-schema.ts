import fs from "fs";
import path from "path";

const schemasPath = path.join(__dirname, "modules");

const typeMapping: Record<string, string> = {
  string: 'Joi.string().required()',
  number: 'Joi.number().required()',
  boolean: 'Joi.boolean().required()',
  date: 'Joi.string().isoDate().required()',
  "string?": 'Joi.string().optional()',
  "number?": 'Joi.number().optional()',
  "boolean?": 'Joi.boolean().optional()',
};

const generateSchema = (entityName: string, properties: Record<string, string>) => {
  const interfaceName = `${entityName}Request`;

  let schemaFields = Object.entries(properties)
    .map(([key, type]) => `  ${key}: ${typeMapping[type] || 'Joi.any()'},`)
    .join("\n");

  const schemaContent = `
import Joi from "joi";

export interface ${interfaceName} {
${Object.keys(properties).map((key) => `  ${key}: ${properties[key]};`).join("\n")}
}

export const ${entityName}Schema = Joi.object<${interfaceName}>({
${schemaFields}
});
`;

  fs.writeFileSync(path.join(schemasPath, `${entityName.toLowerCase()}.schema.ts`), schemaContent.trim());
};

const entityDefinitions: Record<string, Record<string, string>> = {
  Admin: {
    full_name: "string",
    email: "string",
    password_hash: "string",
    role: '"SuperAdmin" | "Verifier" | "Support"',
  },
  Helper: {
    full_name: "string",
    email: "string",
    phone: "string",
    date_of_birth: "date",
    gender: '"Male" | "Female" | "Other"',
    address: "string?",
    qualification: "string?",
    experience_years: "number?",
    verification_status: '"Pending" | "Verified" | "Rejected"',
    profile_photo_url: "string?",
  },
  Patient: {
    full_name: "string",
    phone: "string",
    address: "string?",
    emergency_contact: "string?",
    medical_conditions: "string?",
  },
  Booking: {
    helper_id: "string",
    patient_id: "string",
    start_time: "date",
    end_time: "date",
    status: '"Pending" | "Confirmed" | "Completed" | "Cancelled"',
  },
  Payment: {
    booking_id: "string",
    amount: "number",
    currency: '"LKR"',
    payment_status: '"Pending" | "Paid" | "Failed" | "Refunded"',
    payment_method: "string?",
  },
  Review: {
    helper_id: "string",
    patient_id: "string",
    rating: "number",
    comment: "string?",
  },
};

// Ensure schemas directory exists
if (!fs.existsSync(schemasPath)) {
  fs.mkdirSync(schemasPath);
}

// Generate schemas
Object.entries(entityDefinitions).forEach(([entityName, properties]) => {
  generateSchema(entityName, properties);
});

console.log("✅ Schema files generated successfully!");
