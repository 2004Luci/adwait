/**
 * Seed Script: Create Initial Admin User
 *
 * Run this script to create the first admin user for the CMS.
 *
 * Usage:
 *   npx tsx supabase/seed-admin.ts
 *
 * Before running:
 *   1. Make sure your .env.local has the Supabase credentials
 *   2. Make sure you've run the schema.sql in Supabase SQL Editor
 */

import { config } from "dotenv";
import { createClient } from "@supabase/supabase-js";
import bcrypt from "bcryptjs";
import * as readline from "readline";

// Load environment variables from .env.local (Next.js convention)
config({ path: ".env.local" });
// Also try .env.development as fallback
config({ path: ".env.development" });
// Also try .env as fallback
config({ path: ".env" });

// Get environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error("❌ Error: Missing Supabase environment variables.");
  console.error("Make sure NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are set.");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function question(prompt: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(prompt, resolve);
  });
}

async function main() {
  console.log("\n🔐 Adwait Artha CMS - Create Admin User\n");
  console.log("This script will create an admin user for the CMS.\n");

  // Get user input
  const email = await question("Enter admin email: ");
  const name = await question("Enter admin name: ");
  const password = await question("Enter password (min 8 characters): ");

  // Validate inputs
  if (!email || !email.includes("@")) {
    console.error("❌ Invalid email address");
    process.exit(1);
  }

  if (password.length < 8) {
    console.error("❌ Password must be at least 8 characters");
    process.exit(1);
  }

  // Hash password with bcrypt (12 rounds)
  console.log("\n⏳ Hashing password...");
  const passwordHash = await bcrypt.hash(password, 12);

  // Check if user already exists
  const { data: existingUser } = await supabase
    .from("admin_users")
    .select("id")
    .eq("email", email)
    .single();

  if (existingUser) {
    console.error(`❌ User with email ${email} already exists`);
    process.exit(1);
  }

  // Insert the admin user
  console.log("⏳ Creating admin user...");
  const { data, error } = await supabase
    .from("admin_users")
    .insert({
      email,
      password_hash: passwordHash,
      name: name || null,
      role: "admin",
    })
    .select()
    .single();

  if (error) {
    console.error("❌ Error creating user:", error.message);
    process.exit(1);
  }

  console.log("\n✅ Admin user created successfully!");
  console.log(`   Email: ${data.email}`);
  console.log(`   Name: ${data.name || "(not set)"}`);
  console.log(`   Role: ${data.role}`);
  console.log(`   ID: ${data.id}`);
  console.log("\nYou can now log in to the CMS at /admin/login\n");

  rl.close();
}

main().catch((error) => {
  console.error("❌ Unexpected error:", error);
  process.exit(1);
});
