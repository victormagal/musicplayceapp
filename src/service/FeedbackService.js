import {API} from './api';
import axios from 'axios';


const API_FEEDBACK = `${API}/feedbacks`;


class FeedbackService {

  static createFeedback(feedback) {
    const data = {
      data: {
        type: "feedback",
        attributes: feedback
      }
    };

    return axios.post(API_FEEDBACK, data)
      .then(response => response.data);
  }
}

export {FeedbackService};
