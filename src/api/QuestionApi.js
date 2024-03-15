import Api from "./core/BaseApi";

class QuestionApi {
  getAllQuestions = (categoryId, difficulty) => {
    return Api.get(
      `/api.php?amount=5&category=${categoryId}&difficulty=${difficulty}&type=multiple`
    );
  };
}

const questionApi = new QuestionApi();
export default questionApi;
