import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import categoryApi from "../api/CategoryApi";
import questionApi from "../api/QuestionApi";

export default function QuizMaker() {
  const navigate = useNavigate();

  const [isBtn, setIsBtn] = useState(false);
  const [categories, setCategories] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [chossedAnswer, setChossedAnswer] = useState([]);
  const initState = {
    categorySelect: "",
    difficultySelect: "",
  };

  const redirectToQuizResult = () => {
    navigate("/results", { state: { data: questions, chosse: chossedAnswer } });
  };

  const getCategories = async () => {
    const data = await categoryApi.getAllCategories();
    setCategories(data?.trivia_categories);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: initState });

  const shuffleArray = (array) => {
    for (let i = array?.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const setChosseAnswer = (answer, question) => {
    const oldAnswer = chossedAnswer?.filter(
      (item) => item?.question !== question?.question
    );
    if (oldAnswer?.length < chossedAnswer?.length) {
      setChossedAnswer(oldAnswer);
    } else {
      setChossedAnswer([
        ...chossedAnswer,
        {
          question: question?.question,
          answer: answer,
        },
      ]);
    }
  };

  const onSubmit = async (input) => {
    const data = await questionApi.getAllQuestions(
      input?.categorySelect,
      input?.difficultySelect
    );
    let q = data?.results?.map((item) => ({
      ...item,
      answers: shuffleArray([item?.correct_answer, ...item?.incorrect_answers]),
    }));
    setQuestions(q);
    setIsBtn(true);
    setChossedAnswer([]);
  };

  const chosse = useMemo(() => chossedAnswer, [chossedAnswer]);

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <p className="h1 text-center">QUIZ MAKER</p>
        <div className="row justify-content-md-center m-2">
          <div className=" col col-lg-2">
            <select
              className="form-select"
              id="categorySelect"
              {...register("categorySelect", {
                required: { value: true, message: "Please select category!" },
              })}
            >
              <option value="">Select a category</option>
              {categories?.map((item) => (
                <option value={item?.id} key={item?.id}>
                  {item?.name}
                </option>
              ))}
            </select>
          </div>
          <div className=" col col-lg-2">
            <select
              className="form-select"
              id="difficultySelect"
              {...register("difficultySelect", {
                required: { value: true, message: "Please select difficulty!" },
              })}
            >
              <option value="">Select difficulty</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
          <div className=" col col-lg-2">
            <button
              type="submit"
              id="createBtn"
              className="btn btn-primary"
              disabled={isBtn}
            >
              Create
            </button>
          </div>
        </div>
      </form>

      {questions?.map((item, row) => (
        <div className="row justify-content-md-center" key={row}>
          <div className="row justify-content-md-center">
            <div className=" col col-lg-10">
              <p dangerouslySetInnerHTML={{ __html: item?.question }}></p>
            </div>
          </div>
          <div className="row justify-content-md-center">
            <div className=" col col-lg-10">
              <div className="d-flex flex-row">
                {item?.answers.map((answer, index) => (
                  <div className="p-2" key={index}>
                    <button
                      type="button"
                      className={
                        chosse !== undefined &&
                        chosse?.find((i) => i?.question === item?.question)
                          ?.answer === answer
                          ? "btn btn-success"
                          : "btn btn-outline-success"
                      }
                      onClick={() => setChosseAnswer(answer, item)}
                    >
                      <span dangerouslySetInnerHTML={{ __html: answer }} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}

      {chosse?.length === 5 && (
        <div className="row justify-content-md-center m-2">
          <div className=" col col-lg-2">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={redirectToQuizResult}
            >
              Submit
            </button>
          </div>
        </div>
      )}
    </>
  );
}
