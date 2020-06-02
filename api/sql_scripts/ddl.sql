USE animal_crossing;

-- Table definitions
DROP TABLE IF EXISTS critters_north;

CREATE TABLE critters_north (
	name VARCHAR(255) NOT NULL PRIMARY KEY,
    type VARCHAR(4) NOT NULL,
    img_src VARCHAR(255),
    price INT,
    location VARCHAR(255) NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    start_time2 TIME,
    end_time2 TIME,
    special_notes VARCHAR(1000),
    
    month0 BOOLEAN NOT NULL,
    month1 BOOLEAN NOT NULL,
    month2 BOOLEAN NOT NULL,
    month3 BOOLEAN NOT NULL,
    month4 BOOLEAN NOT NULL,
    month5 BOOLEAN NOT NULL,
    month6 BOOLEAN NOT NULL,
    month7 BOOLEAN NOT NULL,
    month8 BOOLEAN NOT NULL,
    month9 BOOLEAN NOT NULL,
    month10 BOOLEAN NOT NULL,
    month11 BOOLEAN NOT NULL
);


