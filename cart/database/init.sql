CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE OR REPLACE FUNCTION update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TABLE IF NOT EXISTS "cart"
(
    id UUID NOT NULL DEFAULT uuid_generate_v4() PRIMARY KEY,
    session_id UUID NOT NULL,
  	created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  	updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    closed_at TIMESTAMP WITH TIME ZONE
);

DROP TRIGGER IF EXISTS update_cart_timestamp ON "cart";
CREATE TRIGGER update_cart_timestamp
BEFORE UPDATE ON "cart"
FOR EACH ROW
EXECUTE PROCEDURE update_timestamp();

CREATE TABLE IF NOT EXISTS "cart_product"
(
    id UUID NOT NULL DEFAULT uuid_generate_v4() PRIMARY KEY,
    cart_id UUID NOT NULL,
    product_id UUID NOT NULL,
    quantity INTEGER NOT NULL DEFAULT 1,
  	created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  	updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    FOREIGN KEY (cart_id) REFERENCES "cart"(id)
);

DROP TRIGGER IF EXISTS update_cart_product_timestamp ON "cart_product";
CREATE TRIGGER update_cart_product_timestamp
BEFORE UPDATE ON "cart_product"
FOR EACH ROW
EXECUTE PROCEDURE update_timestamp();
