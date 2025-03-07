-- This is script to be pasted in snowflake database to train a classification model on diabetes 
-----------------------------------------------------------
-- SETUP
-----------------------------------------------------------
USE ROLE ACCOUNTADMIN;
USE WAREHOUSE COMPUTE_WH;
USE DATABASE DISEASE_PREDICTION_TEXTREPORT;
USE SCHEMA PUBLIC;

-- Create your classification model.
CREATE OR REPLACE SNOWFLAKE.ML.CLASSIFICATION diabetes_prediction(
    INPUT_DATA => SYSTEM$REFERENCE('TABLE', 'DIABETES_DATASET'),
    TARGET_COLNAME => 'OUTCOME',DISEASE_PREDICTION_TEXTREPORT.PUBLIC.HEART_ATTACK_DATASET_CLEANDISEASE_PREDICTION_TEXTREPORT.PUBLIC.MY_MODEL_STAGEDISEASE_PREDICTION_TEXTREPORT.PUBLIC."GSDC04UGCNZH22UI (Stage)"DISEASE_PREDICTION_TEXTREPORT.PUBLIC.MY_MODEL_STAGE
    CONFIG_OBJECT => { 'ON_ERROR': 'SKIP' }
);

-- Inspect training logs to ensure the model trained successfully.
CALL diabetes_prediction!SHOW_TRAINING_LOGS();

-----------------------------------------------------------
-- EXPORT MODEL
-----------------------------------------------------------
-- Ensure you have a stage to store the exported model.
CREATE STAGE IF NOT EXISTS my_model_stage;

-- Export the trained model to a Snowflake stage.
CALL ML.EXPORT_MODEL('diabetes_prediction', '@my_model_stage/diabetes_model/');
