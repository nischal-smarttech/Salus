-- This is script to be pasted in snowflake database to train a classification model on alzeimers
-----------------------------------------------------------
-- SETUP
-----------------------------------------------------------
use role ACCOUNTADMIN;
use warehouse COMPUTE_WH;
use database DISEASE_PREDICTION_TEXTREPORT;
use schema PUBLIC;

-- Inspect the first 10 rows of your training data. This is the data we'll
-- use to create your model.
select * from ALZEIMERS_DATASET limit 10;

-- Inspect the first 10 rows of your prediction data. This is the data the model
-- will use to generate predictions.
select * from ALZEIMERS_DATASET limit 10;

ALTER TABLE ALZEIMERS_DATASET DROP COLUMN EDUCATIONLEVEL, GENDER;
-----------------------------------------------------------
-- CREATE PREDICTIONS
-----------------------------------------------------------
-- Create your model.
CREATE OR REPLACE SNOWFLAKE.ML.CLASSIFICATION alzeimers_prediction_model(
    INPUT_DATA => SYSTEM$REFERENCE('TABLE', 'ALZEIMERS_DATASET'),
    TARGET_COLNAME => 'DIAGNOSIS',
    CONFIG_OBJECT => { 'ON_ERROR': 'SKIP' }
);

-- Inspect your logs to ensure training completed successfully. 
CALL alzeimers_prediction_model!SHOW_TRAINING_LOGS();

-- Generate predictions as new columns in to your prediction table.
CREATE TABLE Alzeimers_prediction_table AS SELECT
    *, 
    alzeimers_prediction_model!PREDICT(
        OBJECT_CONSTRUCT(*),
        -- This option alows the prediction process to complete even if individual rows must be skipped.
        {'ON_ERROR': 'SKIP'}
    ) as predictions
from ALZEIMERS_DATASET;

-- View your predictions.
SELECT * FROM Alzeimers_prediction_table;

-- Parse the prediction results into separate columns. 
-- Note: This is a just an example. Be sure to update this to reflect 
-- the classes in your dataset.
SELECT * EXCLUDE predictions,
        predictions:class AS class,
        round(predictions['probability'][class], 3) as probability
FROM Alzeimers_prediction_table;

-----------------------------------------------------------
-- INSPECT RESULTS
-----------------------------------------------------------

-- Inspect your model's evaluation metrics.
CALL alzeimers_prediction_model!SHOW_EVALUATION_METRICS();
CALL alzeimers_prediction_model!SHOW_GLOBAL_EVALUATION_METRICS();
CALL alzeimers_prediction_model!SHOW_CONFUSION_MATRIX();

-- Inspect the relative importance of your features, including auto-generated features.  
CALL alzeimers_prediction_model!SHOW_FEATURE_IMPORTANCE();
