-- Step 1: Create the Central Database and Schemas
CREATE DATABASE IF NOT EXISTS CENTRAL_DB;
USE DATABASE CENTRAL_DB;

CREATE SCHEMA IF NOT EXISTS HOSPITAL;
CREATE SCHEMA IF NOT EXISTS DOCTOR;

-- Step 2: Create Tables in the Central Database
USE SCHEMA HOSPITAL;

CREATE OR REPLACE TABLE HOSPITALS (
    hospital_id STRING PRIMARY KEY,
    hospital_name STRING,
    location STRING,
    number_of_doctors INT,
    other_features STRING
);

USE SCHEMA DOCTOR;

CREATE OR REPLACE TABLE DOCTORS (
    doctor_id STRING PRIMARY KEY,
    name STRING,
    speciality STRING,
    rating FLOAT,
    fees STRING,
    phone_number STRING,
    hospital_id STRING REFERENCES HOSPITAL.HOSPITALS(hospital_id)
);

-- Step 3: Create the User-Specific Database and Schemas
CREATE DATABASE IF NOT EXISTS USER_DB;
USE DATABASE USER_DB;

CREATE SCHEMA IF NOT EXISTS USER_INFO;
CREATE SCHEMA IF NOT EXISTS HEALTH_RECORDS;

-- Step 4: Create Tables in the User-Specific Database
USE SCHEMA USER_INFO;

CREATE OR REPLACE TABLE USERS (
    user_id STRING PRIMARY KEY,
    name STRING,
    gender STRING,
    age INT,
    nationality STRING,
    has_insurance BOOLEAN,
    insurance_company_name STRING,
    insurance_plan STRING,
    insurance_card_number STRING
);

USE SCHEMA HEALTH_RECORDS;

-- Medication Tracking Table
CREATE OR REPLACE TABLE MEDICATIONS (
    medication_id STRING PRIMARY KEY,
    user_id STRING REFERENCES USER_INFO.USERS(user_id),
    medication_name STRING,
    quantity STRING,
    time STRING,
    frequency STRING,
    taken BOOLEAN
);

-- Appointment Table
CREATE OR REPLACE TABLE APPOINTMENTS (
    appointment_id STRING PRIMARY KEY,
    user_id STRING REFERENCES USER_INFO.USERS(user_id),
    doctor_id STRING REFERENCES CENTRAL_DB.DOCTOR.DOCTORS(doctor_id),
    doctor_name STRING,
    speciality STRING,
    date DATE,
    time STRING,
    place STRING,
    duration STRING,
    notes STRING,
    consultation_mode STRING  -- No CHECK constraint, handle this at the application level
);
-- Condition-Specific Tables
CREATE OR REPLACE TABLE CONDITIONS (
    condition_id STRING PRIMARY KEY,
    user_id STRING REFERENCES USER_INFO.USERS(user_id),
    condition_name STRING,
    last_check_date DATE
);

CREATE OR REPLACE TABLE DIABETES_RECORDS (
    record_id STRING PRIMARY KEY,
    user_id STRING REFERENCES USER_INFO.USERS(user_id),
    date DATE,
    sugar_level STRING,
    insulin_level STRING,
    hba1c STRING,
    visited_doctors STRING,
    notes STRING
);

CREATE OR REPLACE TABLE ASTHMA_RECORDS (
    record_id STRING PRIMARY KEY,
    user_id STRING REFERENCES USER_INFO.USERS(user_id),
    date DATE,
    peak_flow STRING,
    oxygen_level STRING,
    symptoms STRING,
    visited_doctors STRING,
    notes STRING
);

CREATE OR REPLACE TABLE CANCER_RECORDS (
    record_id STRING PRIMARY KEY,
    user_id STRING REFERENCES USER_INFO.USERS(user_id),
    date DATE,
    tumor_size STRING,
    white_blood_cells STRING,
    platelet_count STRING,
    visited_doctors STRING,
    notes STRING
);

CREATE OR REPLACE TABLE BRAIN_TUMOR_RECORDS (
    record_id STRING PRIMARY KEY,
    user_id STRING REFERENCES USER_INFO.USERS(user_id),
    date DATE,
    tumor_size STRING,
    cognitive_score STRING,
    headache_frequency STRING,
    visited_doctors STRING,
    notes STRING
);

CREATE OR REPLACE TABLE ALZHEIMERS_RECORDS (
    record_id STRING PRIMARY KEY,
    user_id STRING REFERENCES USER_INFO.USERS(user_id),
    date DATE,
    cognitive_score STRING,
    memory_test STRING,
    daily_function STRING,
    visited_doctors STRING,
    notes STRING
);

-- Step 5: Create the Doctor-Specific Database and Schema
CREATE DATABASE IF NOT EXISTS DOCTOR_DB;
USE DATABASE DOCTOR_DB;

CREATE SCHEMA IF NOT EXISTS PATIENT_DATA;

-- Step 6: Patient-Doctor Access Table
USE SCHEMA PATIENT_DATA;

CREATE OR REPLACE TABLE PATIENT_HEALTH_ACCESS (
    access_id STRING PRIMARY KEY,
    doctor_id STRING REFERENCES CENTRAL_DB.DOCTOR.DOCTORS(doctor_id),
    user_id STRING REFERENCES USER_DB.USER_INFO.USERS(user_id),
    condition_table STRING -- Specifies which table the doctor can access
);

-- Doctors can only access a patient's records if they have an appointment
CREATE OR REPLACE VIEW DOCTOR_PATIENT_RECORDS AS
SELECT
    A.doctor_id,
    A.user_id,
    C.condition_name,
    C.last_check_date,
    D.date AS diabetes_date,
    D.sugar_level,
    D.insulin_level,
    D.hba1c,
    D.visited_doctors AS diabetes_visited_doctors,
    D.notes AS diabetes_notes
FROM
    USER_DB.HEALTH_RECORDS.APPOINTMENTS A
JOIN USER_DB.HEALTH_RECORDS.CONDITIONS C 
    ON A.user_id = C.user_id
LEFT JOIN USER_DB.HEALTH_RECORDS.DIABETES_RECORDS D 
    ON A.user_id = D.user_id AND C.condition_name = 'Diabetes'
UNION ALL
SELECT
    A.doctor_id,
    A.user_id,
    C.condition_name,
    C.last_check_date,
    AST.date AS asthma_date,
    AST.peak_flow,
    AST.oxygen_level,
    AST.symptoms,
    AST.visited_doctors AS asthma_visited_doctors,
    AST.notes AS asthma_notes
FROM
    USER_DB.HEALTH_RECORDS.APPOINTMENTS A
JOIN USER_DB.HEALTH_RECORDS.CONDITIONS C 
    ON A.user_id = C.user_id
LEFT JOIN USER_DB.HEALTH_RECORDS.ASTHMA_RECORDS AST 
    ON A.user_id = AST.user_id AND C.condition_name = 'Asthma'
UNION ALL
SELECT
    A.doctor_id,
    A.user_id,
    C.condition_name,
    C.last_check_date,
    CAN.date AS cancer_date,
    CAN.tumor_size,
    CAN.white_blood_cells,
    CAN.platelet_count,
    CAN.visited_doctors AS cancer_visited_doctors,
    CAN.notes AS cancer_notes
FROM
    USER_DB.HEALTH_RECORDS.APPOINTMENTS A
JOIN USER_DB.HEALTH_RECORDS.CONDITIONS C 
    ON A.user_id = C.user_id
LEFT JOIN USER_DB.HEALTH_RECORDS.CANCER_RECORDS CAN 
    ON A.user_id = CAN.user_id AND C.condition_name = 'Cancer'
UNION ALL
SELECT
    A.doctor_id,
    A.user_id,
    C.condition_name,
    C.last_check_date,
    BT.date AS brain_tumor_date,
    BT.tumor_size,
    BT.cognitive_score,
    BT.headache_frequency,
    BT.visited_doctors AS brain_tumor_visited_doctors,
    BT.notes AS brain_tumor_notes
FROM
    USER_DB.HEALTH_RECORDS.APPOINTMENTS A
JOIN USER_DB.HEALTH_RECORDS.CONDITIONS C 
    ON A.user_id = C.user_id
LEFT JOIN USER_DB.HEALTH_RECORDS.BRAIN_TUMOR_RECORDS BT 
    ON A.user_id = BT.user_id AND C.condition_name = 'Brain Tumor'
UNION ALL
SELECT
    A.doctor_id,
    A.user_id,
    C.condition_name,
    C.last_check_date,
    ALZ.date AS alzheimers_date,
    ALZ.cognitive_score,
    ALZ.memory_test,
    ALZ.daily_function,
    ALZ.visited_doctors AS alzheimers_visited_doctors,
    ALZ.notes AS alzheimers_notes
FROM
    USER_DB.HEALTH_RECORDS.APPOINTMENTS A
JOIN USER_DB.HEALTH_RECORDS.CONDITIONS C 
    ON A.user_id = C.user_id
LEFT JOIN USER_DB.HEALTH_RECORDS.ALZHEIMERS_RECORDS ALZ 
    ON A.user_id = ALZ.user_id AND C.condition_name = 'Alzheimers';

-- inserting data into tables 
--inserting data 

-- Insert Data into HOSPITALS Table
INSERT INTO CENTRAL_DB.HOSPITAL.HOSPITALS (hospital_id, hospital_name, location, number_of_doctors, other_features) VALUES
('H1', 'City Hospital', 'New York', 50, 'Emergency, ICU, OPD'),
('H2', 'Sunrise Medical Center', 'Los Angeles', 35, 'Cancer Treatment, Cardiology, Neurology'),
('H3', 'Green Valley Hospital', 'Chicago', 40, 'Pediatrics, General Surgery, Orthopedics');

-- Insert Data into DOCTORS Table
INSERT INTO CENTRAL_DB.DOCTOR.DOCTORS (doctor_id, name, speciality, rating, fees, phone_number, hospital_id) VALUES
('D1', 'Dr. Smith', 'Diabetology', 4.8, '$100', '123-456-7890', 'H1'),
('D2', 'Dr. Brown', 'Pulmonology', 4.7, '$90', '987-654-3210', 'H2'),
('D3', 'Dr. Green', 'Oncology', 4.6, '$150', '456-789-0123', 'H2'),
('D4', 'Dr. Carter', 'Neurology', 4.9, '$120', '654-321-0987', 'H3');

-- Insert Data into USERS Table
INSERT INTO USER_DB.USER_INFO.USERS (user_id, name, gender, age, nationality, has_insurance, insurance_company_name, insurance_plan, insurance_card_number) VALUES
('U1', 'Alice', 'Female', 45, 'USA', TRUE, 'Aetna', 'Gold', 'AET12345'),
('U2', 'Bob', 'Male', 52, 'USA', FALSE, NULL, NULL, NULL),
('U3', 'Charlie', 'Male', 35, 'Canada', TRUE, 'Blue Cross', 'Silver', 'BC98765');

-- Insert Data into APPOINTMENTS Table
INSERT INTO USER_DB.HEALTH_RECORDS.APPOINTMENTS (appointment_id, user_id, doctor_id, doctor_name, speciality, date, time, place, duration, notes, consultation_mode) VALUES
('A1', 'U1', 'D1', 'Dr. Smith', 'Diabetology', '2023-06-10', '10:30 AM', 'City Hospital', '30 mins', 'Routine checkup', 'Offline'),
('A2', 'U1', 'D1', 'Dr. Smith', 'Diabetology', '2024-03-15', '11:00 AM', 'City Hospital', '30 mins', 'HbA1c test review', 'Online'),
('A3', 'U2', 'D2', 'Dr. Brown', 'Pulmonology', '2023-09-05', '2:00 PM', 'Sunrise Medical Center', '45 mins', 'Asthma worsening', 'Offline');

-- Insert Data into MEDICATIONS Table
INSERT INTO USER_DB.HEALTH_RECORDS.MEDICATIONS (medication_id, user_id, medication_name, quantity, time, frequency, taken) VALUES
('M1', 'U1', 'Metformin', '500mg', 'Morning', 'Daily', TRUE),
('M2', 'U1', 'Insulin', '10 units', 'Night', 'Daily', FALSE),
('M3', 'U2', 'Salbutamol', '2 puffs', 'As needed', 'Variable', TRUE);

-- Insert Data into CONDITIONS Table
INSERT INTO USER_DB.HEALTH_RECORDS.CONDITIONS (condition_id, user_id, condition_name, last_check_date) VALUES
('C1', 'U1', 'Diabetes', '2024-12-20'),
('C2', 'U2', 'Asthma', '2025-01-15'),
('C3', 'U3', 'Cancer', '2024-10-10');

-- Insert Data into DIABETES_RECORDS (spread over 2 years)
INSERT INTO USER_DB.HEALTH_RECORDS.DIABETES_RECORDS (record_id, user_id, date, sugar_level, insulin_level, hba1c, visited_doctors, notes) VALUES
('D1', 'U1', '2023-04-01', '160 mg/dL', '20 mU/L', '7.1%', 'Dr. Smith', 'High sugar levels, prescribed insulin.'),
('D2', 'U1', '2023-10-10', '150 mg/dL', '18 mU/L', '6.8%', 'Dr. Smith', 'Improved control with medication.'),
('D3', 'U1', '2024-05-15', '140 mg/dL', '15 mU/L', '6.5%', 'Dr. Smith', 'Better dietary management.'),
('D4', 'U1', '2024-12-25', '135 mg/dL', '14 mU/L', '6.3%', 'Dr. Smith', 'Stable, needs monitoring.'),
('D5', 'U1', '2025-02-01', '130 mg/dL', '12 mU/L', '6.0%', 'Dr. Smith', 'Significant improvement.');

-- Insert Data into ASTHMA_RECORDS
INSERT INTO USER_DB.HEALTH_RECORDS.ASTHMA_RECORDS (record_id, user_id, date, peak_flow, oxygen_level, symptoms, visited_doctors, notes) VALUES
('A1', 'U2', '2023-03-20', '390 L/min', '95%', 'Mild Wheezing', 'Dr. Brown', 'Inhaler prescribed.'),
('A2', 'U2', '2023-11-05', '400 L/min', '96%', 'No symptoms', 'Dr. Brown', 'Good improvement.'),
('A3', 'U2', '2024-06-10', '380 L/min', '94%', 'Coughing', 'Dr. Brown', 'New inhaler recommended.'),
('A4', 'U2', '2025-01-25', '395 L/min', '95%', 'No issues', 'Dr. Brown', 'Stable condition.');

-- Insert Data into CANCER_RECORDS
INSERT INTO USER_DB.HEALTH_RECORDS.CANCER_RECORDS (record_id, user_id, date, tumor_size, white_blood_cells, platelet_count, visited_doctors, notes) VALUES
('C1', 'U3', '2023-02-10', '3.0 cm', '5,800', '145,000', 'Dr. Green', 'Tumor stable, no growth detected.'),
('C2', 'U3', '2023-08-22', '2.9 cm', '6,000', '148,000', 'Dr. Green', 'Mild reduction in size.'),
('C3', 'U3', '2024-04-05', '2.7 cm', '6,200', '150,000', 'Dr. Green', 'Improvement observed.'),
('C4', 'U3', '2025-01-12', '2.5 cm', '6,500', '152,000', 'Dr. Green', 'Significant reduction.');

-- Insert Data into BRAIN_TUMOR_RECORDS
INSERT INTO USER_DB.HEALTH_RECORDS.BRAIN_TUMOR_RECORDS (record_id, user_id, date, tumor_size, cognitive_score, headache_frequency, visited_doctors, notes) VALUES
('BT1', 'U1', '2023-05-01', '4.0 cm', '80', '3 per week', 'Dr. Carter', 'Memory loss observed.'),
('BT2', 'U1', '2024-01-15', '3.8 cm', '85', '2 per week', 'Dr. Carter', 'Minor improvements.'),
('BT3', 'U1', '2024-08-30', '3.5 cm', '90', '1 per week', 'Dr. Carter', 'Symptoms reducing.'),
('BT4', 'U1', '2025-02-01', '3.2 cm', '92', 'No headaches', 'Dr. Carter', 'Stable condition.');


