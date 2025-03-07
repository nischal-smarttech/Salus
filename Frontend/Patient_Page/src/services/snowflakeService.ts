import axios from 'axios';

const SNOWFLAKE_API_URL = process.env.SNOWFLAKE_API_URL || 'http://localhost:3001/api/snowflake';

const snowflakeService = {
  async query(query: string) {
    try {
      const response = await axios.post(`${SNOWFLAKE_API_URL}/query`, { query });
      return response.data;
    } catch (error) {
      console.error('Snowflake query error:', error);
      throw error;
    }
  },

  async getTestResults() {
    const query = `SELECT * FROM medical_tests`;
    return this.query(query);
  },

  async getNavigationItems() {
    const query = `SELECT * FROM navigation_items`;
    return this.query(query);
  },

  async getSettingsOptions() {
    const query = `SELECT * FROM settings_options`;
    return this.query(query);
  }
};

export default snowflakeService;
