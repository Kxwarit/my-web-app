
CREATE TABLE IF NOT EXISTS patients(
 hn TEXT PRIMARY KEY,
 an TEXT,
 name TEXT,
 age INTEGER,
 gender TEXT,
 admit_date TEXT,
 discharge_date TEXT,
 ward_id TEXT,
 room_id TEXT,
 bed_id TEXT,
 status TEXT
);

CREATE TABLE IF NOT EXISTS menu_items(
 id INTEGER PRIMARY KEY AUTOINCREMENT,
 name TEXT,
 category TEXT,
 price INTEGER,
 available INTEGER
);

CREATE TABLE IF NOT EXISTS orders(
 id INTEGER PRIMARY KEY AUTOINCREMENT,
 hn TEXT,
 bed_id TEXT,
 meal_date TEXT,
 meal_type TEXT,
 status TEXT,
 created_at TEXT
);

CREATE TABLE IF NOT EXISTS order_items(
 id INTEGER PRIMARY KEY AUTOINCREMENT,
 order_id INTEGER,
 menu_id INTEGER,
 qty INTEGER
);

INSERT OR IGNORE INTO menu_items(id,name,category,price,available) VALUES
(1,'ข้าวต้มหมู','เช้า',40,1),
(2,'โจ๊กไก่','เช้า',40,1),
(3,'ข้าวผัดไข่','กลางวัน',50,1),
(4,'ก๋วยเตี๋ยวน้ำใส','กลางวัน',50,1),
(5,'ข้าวต้มปลา','เย็น',45,1),
(6,'แกงจืดเต้าหู้','เย็น',50,1);
