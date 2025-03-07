-- Create Contacts Table
CREATE TABLE IF NOT EXISTS contacts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    associated_property_address_full TEXT,
    first_name TEXT,
    last_name TEXT,
    middle_initial TEXT,
    generational_suffix TEXT,
    contact_flags TEXT,
    gender TEXT,
    email_address_1 TEXT,
    email_address_2 TEXT,
    email_address_3 TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Email Templates Table
CREATE TABLE IF NOT EXISTS templates (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT UNIQUE NOT NULL,
    subject TEXT NOT NULL,
    body TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Campaigns Table
CREATE TABLE IF NOT EXISTS campaigns (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT UNIQUE NOT NULL,
    template_id INTEGER,
    sender_email TEXT NOT NULL,
    batch_size INTEGER DEFAULT 10,
    status TEXT DEFAULT 'Pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (template_id) REFERENCES templates(id)
);

-- Create Email Batches Table
CREATE TABLE IF NOT EXISTS batches (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    campaign_id INTEGER NOT NULL,
    batch_number INTEGER NOT NULL,
    status TEXT DEFAULT 'Pending',
    sent_count INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (campaign_id) REFERENCES campaigns(id)
);

-- Create Senders Table
CREATE TABLE IF NOT EXISTS senders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,  -- Will store encrypted password or OAuth token
    service TEXT NOT NULL,   -- e.g., 'gmail', 'outlook', 'smtp'
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
