#!/usr/bin/env node
/**
 * Authenticates to the Volvo Group Azure DevOps npm feed and writes credentials
 * to the user-level ~/.npmrc. Uses azureauth CLI via npx — cross-platform.
 * 
 * Authentication flow: 
 * 1. If ADO_PAT is available, use it directly.
 * 2. If ADO_PAT is not available, authenticate using azureauth via npx.
 */
import { execSync } from "node:child_process";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";

const REGISTRY = "pkgs.dev.azure.com/volvogroup/_packaging/VES/npm/registry/";
const ORG = "volvogroup";
const TENANT = "f25493ae-1c98-41d7-8a33-0be75f5fe603";
// PAT can be supplied through an environment variable. 
// Example: 
// Windows PowerShell: $env:ADO_PAT="your-pat"
// Linux/macOS: export ADO_PAT="your-pat"
// PAT available with me in One Note : Folder Name: Azure; Page Name: "Azure ADO PAT" 
const ADO_PAT = process.env.ADO_PAT;

console.log("🔑 Authenticating to Volvo Group npm feed...");

let token;
if (ADO_PAT) { 
  // ---------- PATH 1: PAT is already available ---------- //
  console.log("🔐 PAT found. Skipping azureauth/Azure DevOps authentication.");
  token = ADO_PAT;
} else {
  // ---------- PATH 2: PAT is not available ---------- //
  console.log("🔐 PAT not found. Starting azureauth authentication...");
  try {
    const output = execSync(
      `npx --registry=https://registry.npmjs.org --yes azureauth ado pat` +
        ` --organization ${ORG}` +
        ` --tenant ${TENANT}` +
        ` --scope vso.packaging` +
        ` --display-name "VGDS prototyping"` +
        ` --prompt-hint "Sign in with your Volvo Group account to access the npm feed"` +
        ` --output json`,
      { encoding: "utf-8", stdio: ["inherit", "pipe", "inherit"] },
    );
    token = JSON.parse(output).token;
  } catch (err) {
    console.error("❌ Authentication failed:", err.message);
    process.exit(1);
  }
}

// ---------- Convert token/PAT to Base64 for npm authentication ---------- //

const encoded = Buffer.from(token).toString("base64");
const npmrcPath = join(homedir(), ".npmrc");

// ---------- Read existing ~/.npmrc ---------- //

let lines = existsSync(npmrcPath)
  ? readFileSync(npmrcPath, "utf-8")
      .split("\n")
      .filter((l) => l.trim() !== "")
  : [];

// ---------- Remove stale credentials for this registry ---------- //

lines = lines.filter((l) => !l.includes(REGISTRY));

// ---------- Write fresh credentials for this registry ---------- //

lines.push(
  `//${REGISTRY}:username=VssSessionToken`,
  `//${REGISTRY}:_password=${encoded}`,
  `//${REGISTRY}:email=vgds-npm@volvogroup.com`,
);

// ---------- Write ~/.npmrc ---------- //

writeFileSync(npmrcPath, lines.join("\n") + "\n", "utf-8");
console.log(`📦 npm credentials updated in ${npmrcPath}`);
console.log("✅ Authenticated successfully");
