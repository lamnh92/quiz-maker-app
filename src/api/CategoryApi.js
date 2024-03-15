import Api from "./core/BaseApi";

class CategoryApi {
  getAllCategories = () => {
    return Api.get("/api_category.php");
  };
}

const categoryApi = new CategoryApi();
export default categoryApi;
