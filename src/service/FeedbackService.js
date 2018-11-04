import {API_FEEDBACK} from './api';
import axios from 'axios';

class FeedbackService {

  static createFeedback(feedback) {
    const data = {
      data: {
        type: "feedbacks",
        attributes: feedback
      }
    };

    return axios.post(API_FEEDBACK, data)
      .then(response => response.data);
  }
}

export {FeedbackService};
