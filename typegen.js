// fetch-and-generate-types.js
import { compile } from "json-schema-to-typescript";
import fetch from "node-fetch";
import fs from "fs";

// URL of the JSON schema
const schemaUrl = "http://localhost:8080/api-types";

async function fetchJsonSchema(url) {
  console.log("downloading from " + schemaUrl);

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to fetch JSON schema: ${response.statusText}`);
  }
  console.log("downloaded successfully");
  return response.json();
}

async function generateTypes() {
  try {
    const schema = await fetchJsonSchema(schemaUrl);
    console.log("generating types...");

    const typescriptCode = await compile(schema, "GeneratedTypes", {
      unreachableDefinitions: true,
      additionalProperties: false,
    });
    
    console.log("writing...")
    fs.writeFileSync("src/lib/api/generated.d.ts", typescriptCode);
    console.log("TypeScript types generated successfully.");
  } catch (error) {
    console.error("Error generating TypeScript types:", error);
  }
}

generateTypes();
