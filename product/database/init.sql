CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE OR REPLACE FUNCTION update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TABLE IF NOT EXISTS "product"
(
    id UUID NOT NULL DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    price REAL,
  	created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    removed_at TIMESTAMP WITH TIME ZONE
);

DROP TRIGGER IF EXISTS update_product_timestamp ON "product";
CREATE TRIGGER update_product_timestamp
BEFORE UPDATE ON "product"
FOR EACH ROW
EXECUTE PROCEDURE update_timestamp();

CREATE TABLE IF NOT EXISTS "product_promotion"
(
    id UUID NOT NULL DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    fixed_discount REAL DEFAULT 0,
    percentage_discount REAL DEFAULT 0,
    valid_from TIMESTAMP WITH TIME ZONE NOT NULL,
    valid_to TIMESTAMP WITH TIME ZONE NOT NULL,
    product_id UUID NOT NULL,
  	created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    FOREIGN KEY (product_id) REFERENCES "product"(id)
);

DROP TRIGGER IF EXISTS update_product_promotion_timestamp ON "product_promotion";
CREATE TRIGGER update_product_promotion_timestamp
BEFORE UPDATE ON "product_promotion"
FOR EACH ROW
EXECUTE PROCEDURE update_timestamp();
