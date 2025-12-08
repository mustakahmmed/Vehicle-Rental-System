import { Pool } from "pg";
import config from ".";

const pool = new Pool({
    connectionString: `${config.connection_str}`
})


const initDB = async() =>{
    await pool.query(`
        CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        phone TEXT NOT NULL,
        role TEXT NOT NULL CHECK (role IN ('admin','customer')) DEFAULT 'customer',
        created_at TIMESTAMP DEFAULT now()
)`)

await pool.query(`
    CREATE TABLE vehicles (
    id SERIAL PRIMARY KEY,
    vehicle_name TEXT NOT NULL,
    type TEXT NOT NULL CHECK (type IN ('car','bike','van','SUV')),
    registration_number TEXT NOT NULL UNIQUE,
    daily_rent_price NUMERIC NOT NULL CHECK (daily_rent_price > 0),
    availability_status TEXT NOT NULL CHECK (availability_status IN ('available','booked')) DEFAULT 'available',
    created_at TIMESTAMP DEFAULT now()
    )
    `)

    await pool.query(`
        CREATE TABLE bookings (
        id SERIAL PRIMARY KEY,
        customer_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        vehicle_id INTEGER REFERENCES vehicles(id) ON DELETE CASCADE,
        rent_start_date DATE NOT NULL,
        rent_end_date DATE NOT NULL,
        total_price NUMERIC NOT NULL CHECK (total_price > 0),
        status TEXT NOT NULL CHECK (status IN ('active','cancelled','returned')) DEFAULT 'active',
        created_at TIMESTAMP DEFAULT now()
)
        `)
}

export default initDB;