import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { env } from "@/lib/env.mjs";
import { sql } from 'drizzle-orm';
const client = postgres(process.env.DATABASE_URL!, {
    ssl: { rejectUnauthorized: false },
    prepare: false
});
export const db = drizzle(client);

