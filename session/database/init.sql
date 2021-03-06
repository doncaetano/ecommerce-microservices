CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS "session"
(
    id UUID NOT NULL DEFAULT uuid_generate_v4() PRIMARY KEY,
  	created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);
