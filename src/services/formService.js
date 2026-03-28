import api from './api';

class FormService {
  async getAllForms() {
    try {
      const response = await api.get('/api/forms');
      return {
        success: true,
        data: response.data,
        count: response.count,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message || 'Failed to fetch forms',
        data: [],
      };
    }
  }
}

export default new FormService();
