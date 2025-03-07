-- This is script to be pasted in snowflake database to train a classification model on heart attack
-----------------------------------------------------------
-- SETUP
-----------------------------------------------------------
use role ACCOUNTADMIN;
use warehouse COMPUTE_WH;
use database DISEASE_PREDICTION_TEXTREPORT;
use schema PUBLIC;

-- Inspect the first 10 rows of your training data. This is the data we'll
-- use to create your model.
select * from HEART_ATTACK_DATASET limit 10;

ALTER TABLE HEART_ATTACK_DATASET DROP COLUMN PATIENT_ID, COUNTRY, CONTINENT, HEMISPHERE;
-- Inspect the first 10 rows of your prediction data. This is the data the model
-- will use to generate predictions.
select * from HEART_ATTACK_DATASET_CLEAN limit 10;

-----------------------------------------------------------
-- CREATE PREDICTIONS
-----------------------------------------------------------
-- Create your model.
CREATE OR REPLACE SNOWFLAKE.ML.CLASSIFICATION heart_attack_predicton(
    INPUT_DATA => SYSTEM$REFERENCE('TABLE', 'HEART_ATTACK_DATASET'),
    TARGET_COLNAME => 'HEART_ATTACK_RISK',
    CONFIG_OBJECT => { 'ON_ERROR': 'SKIP' }
);

-- Inspect your logs to ensure training completed successfully. 
CALL heart_attack_predicton!SHOW_TRAINING_LOGS();

-- Generate predictions as new columns in to your prediction table.
CREATE TABLE heart_attack_prediction AS SELECT
    *, 
    heart_attack_predicton!PREDICT(
        OBJECT_CONSTRUCT(*),
        -- This option alows the prediction process to complete even if individual rows must be skipped.
        {'ON_ERROR': 'SKIP'}
    ) as predictions
from HEART_ATTACK_DATASET;

-- View your predictions.
SELECT * FROM heart_attack_prediction;

-- Parse the prediction results into separate columns. 
-- Note: This is a just an example. Be sure to update this to reflect 
-- the classes in your dataset.
SELECT * EXCLUDE predictions,
        predictions:class AS class,
        round(predictions['probability'][class], 3) as probability
FROM heart_attack_prediction;

-----------------------------------------------------------
-- INSPECT RESULTS
-----------------------------------------------------------

-- Inspect your model's evaluation metrics.
CALL heart_attack_predicton!SHOW_EVALUATION_METRICS();
CALL heart_attack_predicton!SHOW_GLOBAL_EVALUATION_METRICS();
CALL heart_attack_predicton!SHOW_CONFUSION_MATRIX();

-- Inspect the relative importance of your features, including auto-generated features.  
CALL heart_attack_predicton!SHOW_FEATURE_IMPORTANCE();
