-- locations -------------------------------------------------------------------
DROP TABLE IF EXISTS "locations";
CREATE TABLE "locations"(
    "id"   Integer PRIMARY KEY AUTOINCREMENT,
    "name" Text NOT NULL
);
INSERT INTO "locations" ("id", "name") VALUES (1, 'LONDON'), (2, 'LIVERPOOL');

-- categories ------------------------------------------------------------------
DROP TABLE IF EXISTS "categories";
CREATE TABLE "categories"(
    "id"   Integer PRIMARY KEY AUTOINCREMENT,
    "name" Text NOT NULL
);
INSERT INTO "categories" ("id", "name") VALUES (1, 'Sports'), (2, 'News');

-- products --------------------------------------------------------------------
DROP TABLE IF EXISTS "products";
CREATE TABLE "products"(
    "id"          Integer PRIMARY KEY AUTOINCREMENT,
    "name"        Text NOT NULL,
    "category_id" Integer NOT NULL,
    "location_id" Integer
);
INSERT INTO "products" ("id", "name", "category_id", "location_id") VALUES
    ( 1, 'Arsenal TV'     , 1, 1   ),
    ( 2, 'Chelsea TV'     , 1, 1   ),
    ( 3, 'Liverpool TV'   , 1, 2   ),
    ( 4, 'Sky News'       , 2, NULL),
    ( 5, 'Sky Sports News', 2, NULL);


-- customers -------------------------------------------------------------------
DROP TABLE IF EXISTS "customers";
CREATE TABLE "customers"(
    "customerID" Text    NOT NULL PRIMARY KEY,
    "locationID" Integer NOT NULL,
    CONSTRAINT "unique_customer_id" UNIQUE ( "customerID" )
);
INSERT INTO "customers" ("customerID", "locationID") VALUES
    ( 'london_user'   , 1 ),
    ( 'liverpool_user', 2 );
